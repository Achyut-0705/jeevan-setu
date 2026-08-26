import { Hono } from "hono";
import type { AuthedVars } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";
import { eventsForSession, findActiveSessionForUser, sessionsTable, usersTable } from "../db/repo";
import { ApiError } from "../middleware/error";
import { startVerificationSession } from "../engine/sessionInit";
import { computeNextBestActions } from "../engine/recommender";
import { buildRecommenderContext } from "../engine/context";
import { signalRoutes } from "./signals";

export const sessionRoutes = new Hono<{ Variables: AuthedVars }>();
sessionRoutes.use("*", requireAuth);

function ownedSession(userId: string, sessionId: string) {
  const session = sessionsTable.getById(sessionId);
  if (!session || session.userId !== userId) {
    throw new ApiError(404, "SESSION_NOT_FOUND", "Verification session not found.");
  }
  return session;
}

sessionRoutes.post("/", async (c) => {
  const userId = c.get("userId");
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");

  const existing = findActiveSessionForUser(userId);
  if (existing) return c.json({ session: existing }, 200);

  const fingerprint = c.req.header("x-device-fingerprint") ?? null;
  const session = startVerificationSession(user, fingerprint);
  return c.json({ session }, 201);
});

sessionRoutes.get("/active", async (c) => {
  const session = findActiveSessionForUser(c.get("userId"));
  return c.json({ session });
});

sessionRoutes.get("/:id", async (c) => {
  const session = ownedSession(c.get("userId"), c.req.param("id")!);
  return c.json({ session });
});

sessionRoutes.get("/:id/events", async (c) => {
  const session = ownedSession(c.get("userId"), c.req.param("id")!);
  return c.json({ events: eventsForSession(session.id) });
});

sessionRoutes.get("/:id/next-actions", async (c) => {
  const session = ownedSession(c.get("userId"), c.req.param("id")!);
  return c.json({ actions: computeNextBestActions(session, buildRecommenderContext(session.userId)) });
});

sessionRoutes.post("/:id/abandon", async (c) => {
  const session = ownedSession(c.get("userId"), c.req.param("id")!);
  const updated = { ...session, status: "abandoned" as const, completedAt: new Date().toISOString() };
  sessionsTable.update(session.id, updated);
  return c.json({ session: updated });
});

sessionRoutes.route("/:id/signals", signalRoutes);
