import { handle } from "hono/vercel";
import app from "./apps/api/src/app";
import { ensureSeeded } from "./apps/api/src/db/seed";

/**
 * Source for the whole API as a single Vercel Function.
 *
 * This file is bundled by esbuild into `api/index.js` (see the "build:fn" script)
 * rather than deployed as-is. Node's ESM loader requires explicit file extensions on
 * relative imports, but this repo's `moduleResolution: "Bundler"` code — like the rest
 * of the workspace — uses extensionless imports throughout, so it must go through a
 * real bundler before Node can load it. Vercel's own per-file TypeScript transpilation
 * for `api/*.ts` does not bundle, so an un-bundled entry crashes at runtime with
 * `ERR_MODULE_NOT_FOUND`.
 *
 * Uses hono/vercel's `handle()` — a plain `(Request) => Response | Promise<Response>`
 * — rather than `@hono/node-server`'s `getRequestListener()`. The latter adapts a
 * classic Node `(req, res)` server to Hono's fetch handler by hand-converting
 * `http.IncomingMessage`/`ServerResponse` to/from the Fetch API, and that translation
 * hung indefinitely for any request with a body once actually deployed (GET requests
 * worked; every POST timed out at Vercel's 30s function limit) — reproducible only in
 * the real Vercel runtime, not against a local http.Server. Vercel's Node.js Functions
 * natively support exporting a Web Fetch-style handler, so `hono/vercel` skips that
 * translation layer altogether.
 *
 * Vercel maps every `/api/*` request onto the generated function via the rewrite in
 * vercel.json — so the same Hono app that `pnpm dev` serves from a long-lived Node
 * process handles requests here without a second routing layer.
 *
 * Seeding runs at module scope, which is once per cold start. With PERSIST=memory
 * (the default on Vercel, see apps/api/src/env.ts) that is exactly right: each new
 * instance begins from the same known demo state.
 */
ensureSeeded();

export default handle(app);
