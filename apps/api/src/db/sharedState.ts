import { getMeta, restoreStore, snapshotStore, persistDriver } from "./store";
import type { StoreSnapshot } from "./store";
import { SEED_VERSION } from "./seed";

/**
 * Makes the in-memory store survive across serverless instances.
 *
 * The problem this solves is specific to running on Vercel. With PERSIST=memory each
 * function instance holds its own copy of the demo state, so anything created at
 * runtime — a verification session, its confidence events, an issued certificate —
 * exists only on the instance that happened to serve the request that created it. A
 * page that fires several requests at once gets them spread across instances, and
 * every one that lands elsewhere 404s. Measured on the deployed app before this
 * existed: 13 of 40 concurrent reads of the same freshly created session returned 404.
 *
 * Vercel's Runtime Cache is a key-value store shared by every function instance in a
 * region, needs no provisioning, and is reachable through `@vercel/functions`. So
 * rather than convert the whole synchronous `Table` API to async — which would ripple
 * through every service and route — the entire (small) store is parked there as one
 * JSON value: reloaded before a request runs, written back after. All existing
 * synchronous code stays exactly as it is.
 *
 * What this is honestly not:
 *
 * - It is not a database. The Runtime Cache is ephemeral and LRU-evicted, so state can
 *   disappear between demo runs. `vercel.json` pins the project to one region, which
 *   keeps a single cache in play; across regions it would not be shared at all.
 * - Writes are last-write-wins over the whole snapshot. Two requests mutating
 *   different tables at the same instant can lose one of the two. That is acceptable
 *   for one person clicking through a demo and would not be for real traffic.
 *
 * For anything beyond a prototype this belongs in a real shared database, and the
 * `Table` API is the seam where that swap would happen.
 */

const CACHE_KEY = `jeevansetu:store:${SEED_VERSION}`;
/** Long enough that a demo session never expires mid-walkthrough. */
const TTL_SECONDS = 60 * 60 * 12;

/** Only the serverless memory driver needs this; local SQLite is already shared. */
const enabled = persistDriver === "memory" && Boolean(process.env.VERCEL);

type Cache = {
  get(key: string): Promise<unknown>;
  set(key: string, value: unknown, opts?: { ttl?: number; tags?: string[] }): Promise<unknown>;
};

let cachePromise: Promise<Cache | null> | null = null;

/**
 * Imported lazily and defensively: `@vercel/functions` only has a real cache to hand
 * back inside the Vercel runtime, and a demo must not fail to boot locally — or on a
 * platform that has no such API — merely because this optimisation is unavailable.
 */
async function getCacheClient(): Promise<Cache | null> {
  if (!enabled) return null;
  cachePromise ??= import("@vercel/functions")
    .then((mod) => (typeof mod.getCache === "function" ? (mod.getCache() as Cache) : null))
    .catch(() => null);
  return cachePromise;
}

/** Pull the shared snapshot into this instance, if there is one. */
export async function hydrateFromShared(): Promise<void> {
  const cache = await getCacheClient();
  if (!cache) return;
  try {
    const snap = (await cache.get(CACHE_KEY)) as StoreSnapshot | undefined;
    // A snapshot older than the current seed would resurrect stale demo data; ignoring
    // it lets ensureSeeded() rebuild from the personas instead.
    if (snap?.tables && snap.meta?.seedVersion === SEED_VERSION) restoreStore(snap);
  } catch {
    // A cache miss or a transport error must never fail the request — the instance
    // simply serves its own seeded state, which is the behaviour without this file.
  }
}

/** Publish this instance's state so the next request sees it wherever it lands. */
export async function flushToShared(): Promise<void> {
  const cache = await getCacheClient();
  if (!cache) return;
  try {
    if (getMeta("seedVersion") !== SEED_VERSION) return;
    await cache.set(CACHE_KEY, snapshotStore(), {
      ttl: TTL_SECONDS,
      tags: ["jeevansetu-store"],
    });
  } catch {
    // Same reasoning as hydrate: losing a write degrades to per-instance state.
  }
}
