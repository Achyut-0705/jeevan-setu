import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { ASSISTED_REVIEW_STATUSES, MOCK_OUTCOMES, SIGNAL_TYPES } from "@jeevansetu/shared";
import { devOnly } from "../middleware/devOnly";
import { DEMO_OTP, ensureSeeded, PERSONAS, SEED_VERSION } from "../db/seed";
import {
  appointmentsTable,
  assistedReviewsTable,
  findUserByMobile,
  getMockControl,
  outboxTable,
  sessionsTable,
  upsertMockControl,
  usersTable,
} from "../db/repo";
import { persistDriver, resetDatabase, setMeta } from "../db/store";
import { ApiError } from "../middleware/error";
import { applyReviewerDecision } from "../services/assistedReview";
import { officerDecision } from "../services/appointments";

/**
 * Operator console.
 *
 * This is where the human side of the system is played during a demo: a verification
 * officer picking up a review, or confirming a video call. These actions live behind
 * an explicitly dev-gated route rather than on a timer, so nothing in the product
 * ever pretends a person acted when none did.
 */
export const devRoutes = new Hono();
devRoutes.use("*", devOnly);

devRoutes.get("/users", (c) => {
  const users = usersTable.all().map((u) => ({
    id: u.id,
    mobile: u.mobile,
    maskedAadhaar: u.maskedAadhaar,
    name: u.name,
    locale: u.locale,
    pensionStatus: u.pension.status,
    isDemo: u.isDemo,
  }));
  return c.json({ users, personas: PERSONAS, demoOtp: DEMO_OTP, store: persistDriver });
});

devRoutes.post("/reset", (c) => {
  resetDatabase();
  setMeta("seedVersion", "");
  ensureSeeded();
  return c.json({ reset: true, seedVersion: SEED_VERSION });
});

devRoutes.post("/reset-user/:id", (c) => {
  const user = usersTable.getById(c.req.param("id"));
  if (!user) throw new ApiError(404, "NOT_FOUND", "User not found.");
  for (const s of sessionsTable.findBy("userId", user.id)) sessionsTable.deleteById(s.id);
  for (const r of assistedReviewsTable.findBy("userId", user.id)) assistedReviewsTable.deleteById(r.id);
  for (const a of appointmentsTable.findBy("userId", user.id)) appointmentsTable.deleteById(a.id);
  return c.json({ reset: true, userId: user.id });
});

devRoutes.get("/otp", (c) => {
  const mobile = c.req.query("mobile");
  if (!mobile) throw new ApiError(422, "MISSING_MOBILE", "mobile query param required.");
  if (!findUserByMobile(mobile)) throw new ApiError(404, "NOT_FOUND", "No demo user for this mobile.");
  return c.json({ code: DEMO_OTP });
});

devRoutes.get("/outbox", (c) => {
  const userId = c.req.query("userId");
  const all = outboxTable.all().sort((a, b) => (a.sentAt < b.sentAt ? 1 : -1));
  return c.json({ messages: userId ? all.filter((m) => m.userId === userId) : all });
});

/* -------------------------------------------------------- reviewer actions */

devRoutes.get("/reviews", (c) => {
  return c.json({
    reviews: assistedReviewsTable.all().sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1)),
  });
});

const decisionSchema = z.object({
  status: z.enum(ASSISTED_REVIEW_STATUSES),
  reviewerName: z.string().min(1).default("Officer R. Nair (simulated)"),
  note: z.object({ en: z.string(), hi: z.string() }).nullable().optional(),
});

/** A verification officer moving a request along. Nothing else can do this. */
devRoutes.post("/reviews/:id/decide", zValidator("json", decisionSchema), async (c) => {
  const { status, reviewerName, note } = c.req.valid("json");
  const review = assistedReviewsTable.getById(c.req.param("id")!);
  if (!review) throw new ApiError(404, "NOT_FOUND", "Review request not found.");
  const session = sessionsTable.getById(review.sessionId);
  return c.json({
    review: applyReviewerDecision(review.id, status, reviewerName, note ?? null, session),
  });
});

/* ------------------------------------------------------- officer call sign-off */

devRoutes.get("/appointments", (c) => {
  return c.json({
    appointments: appointmentsTable.all().sort((a, b) => (a.slotStart < b.slotStart ? 1 : -1)),
  });
});

const callDecisionSchema = z.object({
  outcome: z.enum(["completed", "failed", "no_show"]),
  officerName: z.string().min(1).default("Officer R. Nair (simulated)"),
});

/**
 * The verification officer confirming (or rejecting) a call. This is the only way
 * a full life certificate becomes issuable — see services/certificates.ts.
 */
devRoutes.post("/appointments/:id/decide", zValidator("json", callDecisionSchema), async (c) => {
  const { outcome, officerName } = c.req.valid("json");
  const appointment = appointmentsTable.getById(c.req.param("id")!);
  if (!appointment) throw new ApiError(404, "NOT_FOUND", "Verification call not found.");
  const session = sessionsTable.getById(appointment.sessionId);
  return c.json({ appointment: officerDecision(appointment.id, outcome, session, officerName) });
});

/* --------------------------------------------------------------- mock rig */

const mockControlSchema = z.object({
  overrides: z.record(z.enum(SIGNAL_TYPES), z.enum(MOCK_OUTCOMES).nullable()).default({}),
  latencyMs: z.number().min(0).max(5000).default(900),
});

devRoutes.get("/mock-controls/:userId", (c) => {
  const userId = c.req.param("userId");
  const control = getMockControl(userId);
  return c.json({
    control:
      control ?? { id: userId, userId, overrides: {}, latencyMs: 900, updatedAt: new Date().toISOString() },
  });
});

devRoutes.patch("/mock-controls/:userId", zValidator("json", mockControlSchema), async (c) => {
  const userId = c.req.param("userId");
  const input = c.req.valid("json");
  upsertMockControl({
    id: userId,
    userId,
    overrides: input.overrides as never,
    latencyMs: input.latencyMs,
    updatedAt: new Date().toISOString(),
  });
  return c.json({ control: getMockControl(userId) });
});
