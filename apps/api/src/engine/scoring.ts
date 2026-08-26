import { nanoid } from "nanoid";
import type {
  CategorySubtotals,
  ConfidenceEvent,
  EventStatus,
  SignalType,
  VerificationSession,
} from "@jeevansetu/shared";
import { CATEGORY_CAPS, getSignalDefinition, MAX_SCORE, qualityFor, resolveTier, retryDecay } from "@jeevansetu/shared";
import { eventsForSession, insertEvent, sessionsTable } from "../db/repo";
import { computeNextBestActions } from "./recommender";
import { buildRecommenderContext } from "./context";
import { narrativeFor } from "./narrative";

/** Each signal reports a different kind of measurement, so calibration is per-signal. */
export function qualityFromSimilarity(signal: SignalType, measurement: number): number {
  return qualityFor(signal, measurement);
}

function statusFor(quality: number, cappedPoints: number, rawPoints: number): EventStatus {
  if (quality <= 0) return "no_credit";
  if (cappedPoints === 0 && rawPoints > 0) return "capped";
  if (quality < 0.75) return "partial";
  return "awarded";
}

export function recordSignalEvent(params: {
  session: VerificationSession;
  signal: SignalType;
  similarity: number;
  raw: Record<string, number | string | boolean>;
}): { session: VerificationSession; event: ConfidenceEvent } {
  const { session, signal, similarity, raw } = params;
  const def = getSignalDefinition(signal);

  const priorEvents = eventsForSession(session.id).filter((e) => e.signal === signal);
  const attemptIndex = priorEvents.length + 1;
  const decay = retryDecay(attemptIndex);
  const quality = qualityFromSimilarity(signal, similarity);

  const rawPoints = Math.round(def.weight * quality * decay);

  const cap = CATEGORY_CAPS[def.category];
  const currentSubtotal = session.categorySubtotals[def.category as keyof CategorySubtotals] ?? 0;
  const newSubtotal = cap === null ? currentSubtotal + rawPoints : Math.min(cap, currentSubtotal + rawPoints);
  const cappedPoints = newSubtotal - currentSubtotal;
  const capReason = cap !== null && cappedPoints < rawPoints ? `${def.category}_cap_reached` : null;

  const newCategorySubtotals: CategorySubtotals = {
    ...session.categorySubtotals,
    [def.category]: newSubtotal,
  };

  const scoreBefore = session.currentScore;
  const scoreAfterRaw = Object.values(newCategorySubtotals).reduce((a, b) => a + b, 0);
  const scoreAfter = Math.min(MAX_SCORE, Math.max(scoreBefore, scoreAfterRaw)); // monotonic non-decreasing

  const tierBefore = resolveTier(scoreBefore).tier;
  const tierAfter = resolveTier(scoreAfter).tier;

  const status = statusFor(quality, cappedPoints, rawPoints);
  const riskFlags = quality < 0.3 && rawPoints > 0 ? [{ code: "low_quality_signal", severity: "low" as const }] : [];

  const completedSignals = session.completedSignals.includes(signal)
    ? session.completedSignals
    : [...session.completedSignals, signal];

  const updatedSession: VerificationSession = {
    ...session,
    currentScore: scoreAfter,
    currentTier: tierAfter,
    categorySubtotals: newCategorySubtotals,
    completedSignals,
  };

  const nextBestActions = computeNextBestActions(updatedSession, buildRecommenderContext(session.userId));

  const event: ConfidenceEvent = {
    id: `evt_${nanoid(8)}`,
    sessionId: session.id,
    userId: session.userId,
    seq: eventsForSession(session.id).length + 1,
    signal,
    category: def.category,
    attemptIndex,
    status,
    raw,
    quality,
    weight: def.weight,
    retryDecay: decay,
    rawPoints,
    cappedPoints,
    capReason,
    scoreBefore,
    scoreAfter,
    tierBefore,
    tierAfter,
    categorySubtotals: newCategorySubtotals,
    riskFlags,
    narrative: narrativeFor(signal, status, cappedPoints),
    nextBestActions,
    createdAt: new Date().toISOString(),
  };

  insertEvent(event);
  sessionsTable.update(session.id, updatedSession);

  return { session: updatedSession, event };
}
