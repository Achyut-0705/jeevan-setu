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
        throw new ApiError(429, "RATE_LIMITED", "Too many attempts. Please wait a moment and try again.");
      }
    }
    await next();
  };
}
