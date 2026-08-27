import type { Context, Next } from "hono";
import { ApiError } from "./error";

const buckets = new Map<string, { count: number; resetAt: number }>();

/** Simple in-memory fixed-window limiter — fine for a single-instance demo, not for multi-instance production. */
export function rateLimit(key: (c: Context) => string, max: number, windowMs: number) {
  return async (c: Context, next: Next) => {
    const bucketKey = key(c);
    const now = Date.now();
    const bucket = buckets.get(bucketKey);
    if (!bucket || bucket.resetAt < now) {
      buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    } else {
      bucket.count += 1;
      if (bucket.count > max) {
        // Tell the caller when the window actually reopens, so a retrying client waits
        // exactly that long instead of guessing and hammering the limit again. The web
        // client reads this in lib/api.ts and hands it to its backoff.
        c.header("Retry-After", String(Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))));
        throw new ApiError(429, "RATE_LIMITED", "Too many attempts. Please wait a moment and try again.");
      }
    }
    await next();
  };
}
