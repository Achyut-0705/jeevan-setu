import type { Context, Next } from "hono";
import { env } from "../env";

export async function devOnly(c: Context, next: Next) {
  if (!env.ENABLE_DEV_TOOLS) {
    return c.json({ error: { code: "NOT_FOUND", message: "Not found" } }, 404);
  }
  await next();
}
