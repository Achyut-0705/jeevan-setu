import { z } from "zod";
import { FAMILY_CONFIRMATION_STATUSES } from "../enums";

export const familyConfirmationRequestSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  userId: z.string(),
  familyContactId: z.string(),
  token: z.string(),
  status: z.enum(FAMILY_CONFIRMATION_STATUSES),
  sentAt: z.string(),
  respondedAt: z.string().nullable(),
  expiresAt: z.string(),
});
export type FamilyConfirmationRequest = z.infer<typeof familyConfirmationRequestSchema>;

export const respondFamilyConfirmationSchema = z.object({
  action: z.enum(["confirm", "decline"]),
  statement: z.string().max(500).optional(),
});
export type RespondFamilyConfirmationInput = z.infer<typeof respondFamilyConfirmationSchema>;
