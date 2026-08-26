import { getRequestListener } from "@hono/node-server";
import app from "./apps/api/src/app";
import { ensureSeeded } from "./apps/api/src/db/seed";

/**
 * Source for the whole API as a single Vercel Function.
 *
 * This file is bundled by esbuild into `api/[...path].js` (see the "build:fn" script)
 * rather than deployed as-is. Node's ESM loader requires explicit file extensions on
 * relative imports, but this repo's `moduleResolution: "Bundler"` code — like the rest
 * of the workspace — uses extensionless imports throughout, so it must go through a
 * real bundler before Node can load it. Vercel's own per-file TypeScript transpilation
 * for `api/*.ts` does not bundle, so an un-bundled entry crashes at runtime with
 * `ERR_MODULE_NOT_FOUND`.
 *
 * Vercel maps every `/api/*` request onto the generated function, and the original
 * path is preserved on the request — so the same Hono app that `pnpm dev` serves from
 * a long-lived Node process handles requests here without a second routing layer.
 *
 * Seeding runs at module scope, which is once per cold start. With PERSIST=memory
 * (the default on Vercel, see apps/api/src/env.ts) that is exactly right: each new
 * instance begins from the same known demo state.
 */
ensureSeeded();

export default getRequestListener(app.fetch);
