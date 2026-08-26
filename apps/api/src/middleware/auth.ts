import type { Context, Next } from "hono";
import { verifyAccessToken } from "../services/tokens";

export interface AuthedVars {
  userId: string;
  mobile: string;
}

export async function requireAuth(c: Context, next: Next) {
  const header = c.req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return c.json({ error: { code: "UNAUTHENTICATED", message: "Missing access token" } }, 401);
  }
  try {
    const claims = verifyAccessToken(token);
    c.set("userId", claims.sub);
    c.set("mobile", claims.mobile);
    await next();
  } catch {
    return c.json({ error: { code: "TOKEN_EXPIRED", message: "Access token is invalid or expired" } }, 401);
  }
}
