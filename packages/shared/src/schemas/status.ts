import { z } from "zod";
import { TIERS, VERIFICATION_STATUSES } from "../enums";
import { bilingualTextSchema } from "./user";

/**
 * The single answer to "where does my life certificate stand?".
 *
 * Computed server-side from the session, any open assisted review, any scheduled
 * call and the latest certificate, so every surface in the UI tells the pensioner
 * the same story instead of each page inferring its own.
 */
export const verificationStatusDetailSchema = z.object({
  status: z.enum(VERIFICATION_STATUSES),
  headline: bilingualTextSchema,
  detail: bilingualTextSchema,
  /** What the pensioner should do next, or null when the ball is in our court. */
  nextStep: bilingualTextSchema.nullable(),
  score: z.number(),
  tier: z.enum(TIERS),
  sessionId: z.string().nullable(),
  certificateId: z.string().nullable(),
  /** Set when the certificate cannot be issued until a human acts. */
  waitingOn: z.enum(["assisted_review", "verification_call", "family_confirmation"]).nullable(),
  openReviewTicket: z.string().nullable(),
  appointmentId: z.string().nullable(),
  /**
   * True once every automated signal is done and only the scheduled call remains.
   * The call is always the final gate before a full certificate is issued.
   */
  callRequired: z.boolean(),
  updatedAt: z.string(),
});
export type VerificationStatusDetail = z.infer<typeof verificationStatusDetailSchema>;
