import { z } from "zod";
import { CERTIFICATE_KINDS, CERTIFICATE_STATUSES, SIGNAL_TYPES, TIERS } from "../enums";
import { bilingualTextSchema } from "./user";

export const certificateSchema = z.object({
  id: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  kind: z.enum(CERTIFICATE_KINDS),
  certificateNumber: z.string(),
  verificationCode: z.string(),
  confidenceScore: z.number(),
  tier: z.enum(TIERS),
  signalsUsed: z.array(z.enum(SIGNAL_TYPES)),
  issuedAt: z.string(),
  validFrom: z.string(),
  validUntil: z.string(),
  status: z.enum(CERTIFICATE_STATUSES),
  aiSummary: bilingualTextSchema.nullable(),
});
export type Certificate = z.infer<typeof certificateSchema>;
