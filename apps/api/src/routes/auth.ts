import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { refreshSchema } from "@jeevansetu/shared";
import { refreshTokensTable, usersTable } from "../db/repo";
import { issueTokenPair, rotateRefreshToken } from "../services/tokens";
import { ApiError } from "../middleware/error";
import { requireAuth } from "../middleware/auth";
import type { AuthedVars } from "../middleware/auth";

/**
 * Session management only.
 *
 * Signing in no longer happens here: identity is established against the mocked
 * Aadhaar service (see routes/aadhaar.ts), which is the only place that holds
 * personal data and the only place an OTP is ever entered.
 */
export const authRoutes = new Hono<{ Variables: AuthedVars }>();

authRoutes.post("/refresh", zValidator("json", refreshSchema), async (c) => {
  const { refreshToken } = c.req.valid("json");
  const rotated = rotateRefreshToken(refreshToken);
  if (!rotated) throw new ApiError(401, "INVALID_REFRESH_TOKEN", "Please sign in again.");
  const user = usersTable.getById(rotated.userId);
  if (!user) throw new ApiError(401, "INVALID_REFRESH_TOKEN", "Please sign in again.");
  const tokens = issueTokenPair(user.id, user.mobile, null);
  return c.json({ ...tokens, refreshToken: rotated.newToken });
});

authRoutes.post("/logout", requireAuth, async (c) => {
  // Revoke every outstanding refresh token so a logout on a shared device is real.
  for (const token of refreshTokensTable.findBy("userId", c.get("userId"))) {
    if (!token.revokedAt) {
      refreshTokensTable.update(token.id, { ...token, revokedAt: new Date().toISOString() });
    }
  }
  return c.json({ loggedOut: true });
});

authRoutes.get("/me", requireAuth, async (c) => {
  const user = usersTable.getById(c.get("userId"));
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  return c.json({ user });
});
