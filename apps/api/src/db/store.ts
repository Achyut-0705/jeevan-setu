import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { env } from "../env";

/**
 * Two storage drivers behind one tiny document-table API.
 *
 * - `sqlite` (local dev): a real file on disk, so a demo survives a restart.
 * - `memory` (serverless): Vercel Functions get a read-only filesystem and a fresh
 *   process on every cold start, and better-sqlite3 is a native module that cannot
 *   load there at all. The memory driver keeps the same semantics; the seed simply
 *   re-runs on boot.
 *
 * Everything above this file is driver-agnostic — nothing else in the API knows
 * which one is active.
 */

export type PersistDriver = "sqlite" | "memory";

/** Every table is a JSON-document store keyed by id, with a few indexed columns. */
const TABLES = [
  "users",
  "aadhaar_consents",
  "aadhaar_txns",
  "family_contacts",
  "pension_transactions",
  "trusted_devices",
  "otp_challenges",
  "refresh_tokens",
  "verification_sessions",
  "confidence_events",
  "certificates",
  "family_confirmations",
  "outbox",
  "mock_controls",
  "assisted_reviews",
  "appointments",
  "face_enrollments",
] as const;

const INDEXED: Record<string, string[]> = {
  users: ["mobile", "aadhaarUid"],
  aadhaar_consents: ["userId", "uid"],
  aadhaar_txns: ["mobile"],
  family_contacts: ["userId"],
  pension_transactions: ["userId"],
  trusted_devices: ["userId", "fingerprint"],
  otp_challenges: ["mobile"],
  refresh_tokens: ["userId", "tokenHash"],
  verification_sessions: ["userId", "status"],
  confidence_events: ["sessionId", "seq"],
  certificates: ["userId", "sessionId", "verificationCode"],
  family_confirmations: ["token", "sessionId"],
  outbox: ["userId"],
  mock_controls: [],
  assisted_reviews: ["userId", "sessionId", "ticketNumber"],
  appointments: ["userId", "sessionId"],
  face_enrollments: ["userId"],
};

interface Driver {
  insert(table: string, id: string, row: unknown, extra: Record<string, string | number>): void;
  update(table: string, id: string, row: unknown): void;
  getById<T>(table: string, id: string): T | null;
  findBy<T>(table: string, column: string, value: string): T[];
  all<T>(table: string): T[];
  deleteById(table: string, id: string): void;
  count(table: string): number;
  clear(): void;
  getMeta(key: string): string | null;
  setMeta(key: string, value: string): void;
  /**
   * Serialize / reload the whole store. Only the memory driver needs these: see
   * `db/sharedState.ts`, which uses them to park the demo state somewhere every
   * serverless instance can reach it. SQLite is already a shared file on disk.
   */
  snapshot(): StoreSnapshot;
  restore(snapshot: StoreSnapshot): void;
}

export interface StoreSnapshot {
  tables: Record<string, Record<string, unknown>>;
  meta: Record<string, string>;
}

/* ------------------------------------------------------------------ memory */

function createMemoryDriver(): Driver {
  const data = new Map<string, Map<string, unknown>>();
  const meta = new Map<string, string>();
  for (const t of TABLES) data.set(t, new Map());

  const tbl = (name: string) => {
    let m = data.get(name);
    if (!m) {
      m = new Map();
      data.set(name, m);
    }
    return m;
  };

  return {
    insert: (table, id, row) => void tbl(table).set(id, row),
    update: (table, id, row) => void tbl(table).set(id, row),
    getById: <T,>(table: string, id: string) => (tbl(table).get(id) as T) ?? null,
    // Indexed columns always mirror a field of the same name on the document, so a
    // straight field read matches what the SQLite driver does with real columns.
    findBy: <T,>(table: string, column: string, value: string) =>
      [...tbl(table).values()].filter(
        (r) => String((r as Record<string, unknown>)[column]) === String(value)
      ) as T[],
    all: <T,>(table: string) => [...tbl(table).values()] as T[],
    deleteById: (table, id) => void tbl(table).delete(id),
    count: (table) => tbl(table).size,
    clear: () => {
      for (const m of data.values()) m.clear();
      meta.clear();
    },
    getMeta: (key) => meta.get(key) ?? null,
    setMeta: (key, value) => void meta.set(key, value),
    snapshot: () => ({
      tables: Object.fromEntries(
        [...data.entries()].map(([table, rows]) => [table, Object.fromEntries(rows)])
      ),
      meta: Object.fromEntries(meta),
    }),
    restore: (snap) => {
      for (const m of data.values()) m.clear();
      meta.clear();
      for (const [table, rows] of Object.entries(snap.tables ?? {})) {
        tbl(table);
        for (const [id, row] of Object.entries(rows)) tbl(table).set(id, row);
      }
      for (const [k, v] of Object.entries(snap.meta ?? {})) meta.set(k, v);
    },
  };
}

/* ------------------------------------------------------------------ sqlite */

function createSqliteDriver(): Driver {
  // Resolved through a non-literal specifier so Vercel static file tracing does not
  // pull this native module into the serverless bundle, where it cannot load anyway.
  const moduleName = ["better", "sqlite3"].join("-");
  // Resolved from the working directory rather than import.meta.url so this file
  // parses whether it is emitted as ESM or CJS — the serverless bundler picks.
  const require_ = createRequire(path.join(process.cwd(), "noop.cjs"));
  const Database = require_(moduleName) as typeof import("better-sqlite3");

  fs.mkdirSync(env.DATA_DIR, { recursive: true });
  const sqlite = new Database(path.join(env.DATA_DIR, "jeevansetu.db"));
  sqlite.pragma("journal_mode = WAL");

  sqlite.exec("CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT);");
  for (const table of TABLES) {
    const cols = (INDEXED[table] ?? []).map((c) => ", " + c + " TEXT").join("");
    sqlite.exec(
      "CREATE TABLE IF NOT EXISTS " + table + " (id TEXT PRIMARY KEY, data TEXT NOT NULL" + cols + ");"
    );
    for (const c of INDEXED[table] ?? []) {
      sqlite.exec("CREATE INDEX IF NOT EXISTS idx_" + table + "_" + c + " ON " + table + "(" + c + ");");
    }
  }

  return {
    insert: (table, id, row, extra) => {
      const cols = ["id", "data", ...Object.keys(extra)];
      const placeholders = cols.map((c) => "@" + c).join(", ");
      sqlite
        .prepare("INSERT INTO " + table + " (" + cols.join(", ") + ") VALUES (" + placeholders + ")")
        .run({ id, data: JSON.stringify(row), ...extra });
    },
    update: (table, id, row) => {
      sqlite
        .prepare("UPDATE " + table + " SET data = @data WHERE id = @id")
        .run({ id, data: JSON.stringify(row) });
    },
    getById: <T,>(table: string, id: string) => {
      const r = sqlite.prepare("SELECT data FROM " + table + " WHERE id = ?").get(id) as
        | { data: string }
        | undefined;
      return r ? (JSON.parse(r.data) as T) : null;
    },
    findBy: <T,>(table: string, column: string, value: string) => {
      if ((INDEXED[table] ?? []).includes(column)) {
        const rows = sqlite
          .prepare("SELECT data FROM " + table + " WHERE " + column + " = ?")
          .all(value) as { data: string }[];
        return rows.map((r) => JSON.parse(r.data) as T);
      }
      // Not an indexed column — scan, so both drivers accept a filter on any field.
      const rows = sqlite.prepare("SELECT data FROM " + table).all() as { data: string }[];
      return rows
        .map((r) => JSON.parse(r.data) as T)
        .filter((r) => String((r as Record<string, unknown>)[column]) === String(value));
    },
    all: <T,>(table: string) => {
      const rows = sqlite.prepare("SELECT data FROM " + table).all() as { data: string }[];
      return rows.map((r) => JSON.parse(r.data) as T);
    },
    deleteById: (table, id) => void sqlite.prepare("DELETE FROM " + table + " WHERE id = ?").run(id),
    count: (table) =>
      (sqlite.prepare("SELECT COUNT(*) as c FROM " + table).get() as { c: number }).c,
    clear: () => {
      for (const t of TABLES) sqlite.exec("DELETE FROM " + t + ";");
      sqlite.exec("DELETE FROM meta;");
    },
    getMeta: (key) => {
      const r = sqlite.prepare("SELECT value FROM meta WHERE key = ?").get(key) as
        | { value: string }
        | undefined;
      return r?.value ?? null;
    },
    setMeta: (key, value) => {
      sqlite
        .prepare(
          "INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
        )
        .run(key, value);
    },
    // A file on disk is already shared by every request in local dev; there is
    // nothing to park elsewhere and nothing to reload.
    snapshot: () => ({ tables: {}, meta: {} }),
    restore: () => {},
  };
}

function resolveDriver(): { driver: Driver; kind: PersistDriver } {
  if (env.PERSIST === "memory") return { driver: createMemoryDriver(), kind: "memory" };
  try {
    return { driver: createSqliteDriver(), kind: "sqlite" };
  } catch (err) {
    // A missing native binary must not take the API down — degrade and say so loudly.
    // eslint-disable-next-line no-console
    console.warn("[store] SQLite unavailable (" + (err as Error).message + "); using in-memory storage.");
    return { driver: createMemoryDriver(), kind: "memory" };
  }
}

const resolved = resolveDriver();
export const persistDriver: PersistDriver = resolved.kind;
const driver = resolved.driver;

/** Typed handle onto one document table. */
export class Table<T extends { id: string }> {
  constructor(private tableName: string) {}

  insert(row: T, extraColumns: Record<string, string | number> = {}) {
    driver.insert(this.tableName, row.id, row, extraColumns);
  }
  update(id: string, row: T) {
    driver.update(this.tableName, id, row);
  }
  getById(id: string): T | null {
    return driver.getById<T>(this.tableName, id);
  }
  findBy(column: string, value: string): T[] {
    return driver.findBy<T>(this.tableName, column, value);
  }
  findOneBy(column: string, value: string): T | null {
    return this.findBy(column, value)[0] ?? null;
  }
  all(): T[] {
    return driver.all<T>(this.tableName);
  }
  deleteById(id: string) {
    driver.deleteById(this.tableName, id);
  }
  count(): number {
    return driver.count(this.tableName);
  }
}

export const getMeta = (key: string) => driver.getMeta(key);
export const setMeta = (key: string, value: string) => driver.setMeta(key, value);
export const resetDatabase = () => driver.clear();
export const snapshotStore = (): StoreSnapshot => driver.snapshot();
export const restoreStore = (snap: StoreSnapshot) => driver.restore(snap);
