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
 * Exports the Hono app instance directly rather than wrapping it. Vercel's Node.js
 * runtime recognizes exactly one Fetch-style shape for a default export:
 * `{ fetch(request: Request): Response }` (see
 * https://vercel.com/docs/functions/functions-api-reference, which names Hono
 * explicitly as a supported framework for this). A Hono app instance already has a
 * `.fetch` method with that exact signature, so it satisfies the shape as-is.
 *
 * Both earlier attempts fed that recognizer a plain function instead of an object
 * with a `.fetch` method, and Vercel silently misclassified each one as the legacy
 * `(req, res) => void` Node handler signature — logging "default export returned a
 * `Response` ... returns are ignored" and then hanging until the 30s function
 * timeout, since nothing ever wrote through `res`. This reproduced for *every*
 * request once actually deployed (GET included), not just POST bodies as it first
 * appeared: `@hono/node-server`'s `getRequestListener()` returns a bare `(req, res)
 * => void` node-style listener (never matches the fetch shape, always legacy), and
 * `hono/vercel`'s `handle(app)` returns a bare `(req) => app.fetch(req)` function
 * (still not an object with `.fetch`, still misclassified as legacy) — neither is
 * detectable as a local-vs-deployed difference because the misclassification only
 * happens in Vercel's real Node.js Functions runtime, not in a plain http.Server.
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

export default app;
