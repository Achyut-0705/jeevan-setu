import { z } from "zod";
import { ASSISTED_REVIEW_STATUSES } from "../enums";
import { bilingualTextSchema } from "./user";

/** A pensioner may not flood the queue; one open request, then a wait. */
export const ASSISTED_REVIEW_COOLDOWN_DAYS = 3;
/** What we promise on the tracking screen. Nothing here happens automatically. */
export const ASSISTED_REVIEW_SLA_DAYS = 5;

export const assistedReviewNoteSchema = z.object({
  at: z.string(),
  author: z.enum(["pensioner", "reviewer", "system"]),
  body: bilingualTextSchema,
});
export type AssistedReviewNote = z.infer<typeof assistedReviewNoteSchema>;

/**
 * A request for a human being to look at this case.
 *
 * Deliberately NOT auto-approved on a timer: the user is told a team member will
 * review it and given a ticket to track, because implying someone is looking right
 * now when nobody is would be a lie the pensioner might act on.
 */
export const assistedReviewRequestSchema = z.object({
  id: z.string(),
  /** Short human-quotable reference, e.g. AR-4F2K9Q. */
  ticketNumber: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  status: z.enum(ASSISTED_REVIEW_STATUSES),
  reason: z.string(),
  /** Free-text context the pensioner typed when raising the request. */
  message: z.string().nullable(),
  submittedAt: z.string(),
  updatedAt: z.string(),
  /** Working-day target shown on the tracker. */
  slaDueAt: z.string(),
  /** Blocks a second request until this timestamp passes. */
  nextRequestAllowedAt: z.string(),
  reviewerName: z.string().nullable(),
  decisionNote: bilingualTextSchema.nullable(),
  decidedAt: z.string().nullable(),
  notes: z.array(assistedReviewNoteSchema),
});
export type AssistedReviewRequest = z.infer<typeof assistedReviewRequestSchema>;

export const createAssistedReviewSchema = z.object({
  message: z.string().max(1000).optional(),
});
export type CreateAssistedReviewInput = z.infer<typeof createAssistedReviewSchema>;

export function isAssistedReviewOpen(r: AssistedReviewRequest): boolean {
  return r.status === "submitted" || r.status === "in_review" || r.status === "more_info_needed";
}
