import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { respondFamilyConfirmationSchema } from "@jeevansetu/shared";
import {
  familyConfirmationsTable,
  familyContactsTable,
  findFamilyConfirmationByToken,
  sessionsTable,
  usersTable,
} from "../db/repo";
import { ApiError } from "../middleware/error";
import { recordSignalEvent } from "../engine/scoring";

export const familyRoutes = new Hono();

function loadRequest(token: string) {
  const request = findFamilyConfirmationByToken(token);
  if (!request) throw new ApiError(404, "NOT_FOUND", "This confirmation link is invalid or has expired.");
  return request;
}

familyRoutes.get("/confirmations/:token", async (c) => {
  const request = loadRequest(c.req.param("token")!);
  const user = usersTable.getById(request.userId);
  const contact = familyContactsTable.getById(request.familyContactId);
  if (!user || !contact) throw new ApiError(404, "NOT_FOUND", "This confirmation link is invalid or has expired.");
  return c.json({
    request,
    pensioner: { name: user.name, photoInitials: user.photoInitials, district: user.address.district },
    // Both names come from the Aadhaar record, so both are bilingual.
    contact: { name: contact.name, relation: contact.relation, maskedUid: contact.maskedUid },
    expired: new Date(request.expiresAt) < new Date() || request.status !== "pending",
  });
});

familyRoutes.post(
  "/confirmations/:token/respond",
  zValidator("json", respondFamilyConfirmationSchema),
  async (c) => {
    const request = loadRequest(c.req.param("token")!);
    if (request.status !== "pending") {
      throw new ApiError(409, "ALREADY_RESPONDED", "This request has already been responded to.");
    }
    if (new Date(request.expiresAt) < new Date()) {
      throw new ApiError(410, "EXPIRED", "This confirmation link has expired.");
    }
    const { action } = c.req.valid("json");
    const session = sessionsTable.getById(request.sessionId);
    if (!session) throw new ApiError(404, "SESSION_NOT_FOUND", "The related verification session was not found.");

    if (action === "decline") {
      const updated = { ...request, status: "declined" as const, respondedAt: new Date().toISOString() };
      familyConfirmationsTable.update(request.id, updated);
      return c.json({ request: updated });
    }

    const { event } = recordSignalEvent({
      session,
      signal: "family_confirmation",
      similarity: 0.95,
      raw: { familyContactId: request.familyContactId },
    });
    const updated = {
      ...request,
      status: "confirmed" as const,
      respondedAt: new Date().toISOString(),
    };
    familyConfirmationsTable.update(request.id, updated);
    return c.json({ request: updated, event });
  }
);
