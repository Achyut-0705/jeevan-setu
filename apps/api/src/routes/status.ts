import { Hono } from "hono";
import type { AuthedVars } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";
import { usersTable } from "../db/repo";
import { ApiError } from "../middleware/error";
import { computeVerificationStatus } from "../services/status";
import { checkEligibility } from "../services/assistedReview";
import { activeAppointment } from "../services/appointments";

/**
 * The one endpoint every screen asks "where do I stand?". Bundles the computed
 * status with the two things that most often gate the next action, so the UI can
 * render a complete, honest picture without three round trips.
 */
export const statusRoutes = new Hono<{ Variables: AuthedVars }>();
statusRoutes.use("*", requireAuth);

statusRoutes.get("/", async (c) => {
  const userId = c.get("userId");
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");

  return c.json({
    status: computeVerificationStatus(user),
    reviewEligibility: checkEligibility(userId),
    appointment: activeAppointment(userId),
  });
});
