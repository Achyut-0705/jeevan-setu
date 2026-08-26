import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createAssistedReviewSchema } from "@jeevansetu/shared";
import type { AuthedVars } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";
import { findActiveSessionForUser, reviewsForUser, sessionsTable } from "../db/repo";
import { ApiError } from "../middleware/error";
import { startVerificationSession } from "../engine/sessionInit";
import { usersTable } from "../db/repo";
import { cancelReview, checkEligibility, createReview, getReview } from "../services/assistedReview";

/**
 * Assisted review requests, from the pensioner's side.
 *
 * There is no endpoint here that approves anything: decisions come from the
 * operator console (routes/dev.ts) because a real one comes from a person.
 */
export const reviewRoutes = new Hono<{ Variables: AuthedVars }>();
reviewRoutes.use("*", requireAuth);

/** Everything the tracking screen needs in one call, including why the button is off. */
reviewRoutes.get("/", async (c) => {
  const userId = c.get("userId");
  return c.json({
    requests: reviewsForUser(userId),
    eligibility: checkEligibility(userId),
  });
});

reviewRoutes.get("/:id", async (c) => {
  return c.json({ request: getReview(c.get("userId"), c.req.param("id")!) });
});

reviewRoutes.post("/", zValidator("json", createAssistedReviewSchema), async (c) => {
  const userId = c.get("userId");
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");

  // A review is always attached to a session so the officer has the evidence trail.
  const session =
    findActiveSessionForUser(userId) ??
    startVerificationSession(user, c.req.header("x-device-fingerprint") ?? null);

  const request = createReview(session, c.req.valid("json").message ?? null);
  return c.json({ request, eligibility: checkEligibility(userId) }, 201);
});

reviewRoutes.post("/:id/cancel", async (c) => {
  const userId = c.get("userId");
  const request = cancelReview(userId, c.req.param("id")!);
  return c.json({ request, eligibility: checkEligibility(userId) });
});

/** Used by the tracker to show the session the request was raised against. */
reviewRoutes.get("/:id/session", async (c) => {
  const review = getReview(c.get("userId"), c.req.param("id")!);
  return c.json({ session: sessionsTable.getById(review.sessionId) });
});
