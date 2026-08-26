import { nanoid } from "nanoid";
import type { AssistedReviewRequest, AssistedReviewStatus, VerificationSession } from "@jeevansetu/shared";
import {
  ASSISTED_REVIEW_COOLDOWN_DAYS,
  ASSISTED_REVIEW_SLA_DAYS,
  isAssistedReviewOpen,
} from "@jeevansetu/shared";
import { assistedReviewsTable, insertAssistedReview, reviewsForUser } from "../db/repo";
import { ApiError } from "../middleware/error";
import { recordSignalEvent } from "../engine/scoring";

/**
 * Assisted review: asking a human being to look at the case.
 *
 * The important property of this module is what it does NOT do. Nothing here
 * approves a request on a timer. When a pensioner asks for help, they are told a
 * team member will review it, given a ticket they can quote, and shown a tracker —
 * and then nothing moves until a reviewer actually moves it. Faking a reviewer
 * would give a pensioner whose pension has stopped a false reason to stop trying.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

function ticket(): string {
  return `AR-${nanoid(6).toUpperCase()}`;
}

export interface ReviewEligibility {
  canRequest: boolean;
  reason: "ok" | "already_open" | "cooldown";
  openRequest: AssistedReviewRequest | null;
  /** When a new request becomes possible; null when one can be raised now. */
  nextAllowedAt: string | null;
  cooldownDays: number;
}

/**
 * One open request at a time, then a cooling-off period. Both limits exist so the
 * queue reflects real need — and both are reported to the UI as data, not as an
 * error, so the button can be disabled with an explanation instead of failing on
 * click.
 */
export function checkEligibility(userId: string, now = new Date()): ReviewEligibility {
  const all = reviewsForUser(userId);
  const open = all.find(isAssistedReviewOpen) ?? null;

  if (open) {
    return {
      canRequest: false,
      reason: "already_open",
      openRequest: open,
      nextAllowedAt: open.nextRequestAllowedAt,
      cooldownDays: ASSISTED_REVIEW_COOLDOWN_DAYS,
    };
  }

  const latest = all[0] ?? null;
  if (latest && new Date(latest.nextRequestAllowedAt) > now) {
    return {
      canRequest: false,
      reason: "cooldown",
      openRequest: null,
      nextAllowedAt: latest.nextRequestAllowedAt,
      cooldownDays: ASSISTED_REVIEW_COOLDOWN_DAYS,
    };
  }

  return {
    canRequest: true,
    reason: "ok",
    openRequest: null,
    nextAllowedAt: null,
    cooldownDays: ASSISTED_REVIEW_COOLDOWN_DAYS,
  };
}

export function createReview(
  session: VerificationSession,
  message: string | null,
  now = new Date()
): AssistedReviewRequest {
  const eligibility = checkEligibility(session.userId, now);
  if (!eligibility.canRequest) {
    const when = eligibility.nextAllowedAt
      ? new Date(eligibility.nextAllowedAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "later";
    throw new ApiError(
      409,
      eligibility.reason === "already_open" ? "REVIEW_ALREADY_OPEN" : "REVIEW_COOLDOWN",
      eligibility.reason === "already_open"
        ? `You already have a review request open (${eligibility.openRequest?.ticketNumber}). Our team will get back to you on it — you can follow its progress on this page.`
        : `You can raise another review request from ${when}. Requests are spaced ${ASSISTED_REVIEW_COOLDOWN_DAYS} days apart so the team can work through them properly.`
    );
  }

  const request: AssistedReviewRequest = {
    id: `rev_${nanoid(10)}`,
    ticketNumber: ticket(),
    userId: session.userId,
    sessionId: session.id,
    status: "submitted",
    reason: "Pensioner requested assisted human review",
    message: message?.trim() ? message.trim() : null,
    submittedAt: now.toISOString(),
    updatedAt: now.toISOString(),
    slaDueAt: new Date(now.getTime() + ASSISTED_REVIEW_SLA_DAYS * DAY_MS).toISOString(),
    nextRequestAllowedAt: new Date(now.getTime() + ASSISTED_REVIEW_COOLDOWN_DAYS * DAY_MS).toISOString(),
    reviewerName: null,
    decisionNote: null,
    decidedAt: null,
    notes: [
      {
        at: now.toISOString(),
        author: "system",
        body: {
          en: "Request received. It is in the queue for a verification officer to pick up.",
          hi: "अनुरोध प्राप्त हुआ। यह सत्यापन अधिकारी द्वारा उठाए जाने की कतार में है।",
        },
      },
    ],
  };

  insertAssistedReview(request);
  return request;
}

export function getReview(userId: string, reviewId: string): AssistedReviewRequest {
  const review = assistedReviewsTable.getById(reviewId);
  if (!review || review.userId !== userId) {
    throw new ApiError(404, "NOT_FOUND", "We could not find that review request.");
  }
  return review;
}

export function cancelReview(userId: string, reviewId: string, now = new Date()): AssistedReviewRequest {
  const review = getReview(userId, reviewId);
  if (!isAssistedReviewOpen(review)) {
    throw new ApiError(409, "REVIEW_CLOSED", "That request has already been closed.");
  }
  const updated: AssistedReviewRequest = {
    ...review,
    status: "cancelled",
    updatedAt: now.toISOString(),
    notes: [
      ...review.notes,
      {
        at: now.toISOString(),
        author: "pensioner",
        body: { en: "Request withdrawn by the pensioner.", hi: "अनुरोध पेंशनभोगी द्वारा वापस लिया गया।" },
      },
    ],
  };
  assistedReviewsTable.update(review.id, updated);
  return updated;
}

/**
 * Applied by a reviewer, never by a timer. Reached through the operator console
 * (routes/dev.ts) so a demo can play the officer's side deliberately and visibly.
 *
 * An approval is the only path that awards confidence, and it awards it as a
 * `manual_review` signal so the certificate records that a human made the call.
 */
export function applyReviewerDecision(
  reviewId: string,
  status: AssistedReviewStatus,
  reviewerName: string,
  note: { en: string; hi: string } | null,
  session: VerificationSession | null,
  now = new Date()
): AssistedReviewRequest {
  const review = assistedReviewsTable.getById(reviewId);
  if (!review) throw new ApiError(404, "NOT_FOUND", "Review request not found.");

  let updated: AssistedReviewRequest = {
    ...review,
    status,
    reviewerName,
    updatedAt: now.toISOString(),
    decisionNote: note ?? review.decisionNote,
    decidedAt: status === "approved" || status === "rejected" ? now.toISOString() : review.decidedAt,
    notes: [
      ...review.notes,
      {
        at: now.toISOString(),
        author: "reviewer",
        body: note ?? DEFAULT_NOTES[status],
      },
    ],
  };

  if (status === "approved" && session) {
    const { event } = recordSignalEvent({
      session,
      signal: "manual_review",
      similarity: 0.95,
      raw: { officerDecision: "approved", channel: "assisted_review", ticket: review.ticketNumber },
    });
    updated = {
      ...updated,
      notes: [
        ...updated.notes,
        {
          at: now.toISOString(),
          author: "system",
          body: {
            en: `Confidence updated following the officer's decision (event ${event.id}).`,
            hi: `अधिकारी के निर्णय के बाद विश्वास स्कोर अद्यतन किया गया (घटना ${event.id})।`,
          },
        },
      ],
    };
  }

  assistedReviewsTable.update(review.id, updated);
  return updated;
}

const DEFAULT_NOTES: Record<AssistedReviewStatus, { en: string; hi: string }> = {
  submitted: {
    en: "Request received and queued.",
    hi: "अनुरोध प्राप्त और कतारबद्ध।",
  },
  in_review: {
    en: "A verification officer has picked up your request and is looking at it.",
    hi: "एक सत्यापन अधिकारी ने आपका अनुरोध लिया है और उसकी जाँच कर रहे हैं।",
  },
  approved: {
    en: "Your identity has been confirmed by a verification officer.",
    hi: "आपकी पहचान सत्यापन अधिकारी द्वारा पुष्ट कर दी गई है।",
  },
  rejected: {
    en: "We could not confirm your identity from what was submitted. Please book a verification call so we can help you directly.",
    hi: "प्रस्तुत जानकारी से हम आपकी पहचान की पुष्टि नहीं कर सके। कृपया सत्यापन कॉल बुक करें ताकि हम सीधे आपकी सहायता कर सकें।",
  },
  more_info_needed: {
    en: "The officer needs one more thing from you before they can decide.",
    hi: "निर्णय लेने से पहले अधिकारी को आपसे एक और जानकारी चाहिए।",
  },
  cancelled: {
    en: "Request withdrawn.",
    hi: "अनुरोध वापस लिया गया।",
  },
};
