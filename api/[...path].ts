import { getRequestListener } from "@hono/node-server";
import app from "../apps/api/src/app";
import { ensureSeeded } from "../apps/api/src/db/seed";

/**
 * The whole API as a single Vercel Function.
 *
 * Vercel maps every `/api/*` request onto this catch-all, and the original path is
 * preserved on the request — so the same Hono app that `pnpm dev` serves from a
 * long-lived Node process handles requests here without a second routing layer.
 *
 * Seeding runs at module scope, which is once per cold start. With PERSIST=memory
 * (the default on Vercel, see apps/api/src/env.ts) that is exactly right: each new
 * instance begins from the same known demo state.
 */
ensureSeeded();

export default getRequestListener(app.fetch);
