import type { Context } from "hono";
import { ZodError } from "zod";

export class ApiError extends Error {
  constructor(public status: 400 | 401 | 403 | 404 | 409 | 410 | 422 | 429, public code: string, message: string) {
    super(message);
  }
}

export function handleError(err: unknown, c: Context) {
  if (err instanceof ApiError) {
    return c.json({ error: { code: err.code, message: err.message } }, err.status);
  }
  if (err instanceof ZodError) {
    return c.json(
      { error: { code: "VALIDATION_ERROR", message: "Invalid request", issues: err.issues } },
      422
    );
  }
  // eslint-disable-next-line no-console
  console.error(err);
  return c.json({ error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } }, 500);
}
