import type { CategorySubtotals, NextBestAction, SignalType, VerificationSession } from "@jeevansetu/shared";
import { CATEGORY_CAPS, SIGNAL_DEFINITIONS } from "@jeevansetu/shared";

const EFFORT_COST: Record<string, number> = { none: 0.1, low: 1, medium: 2, high: 3.5, assisted: 4 };

export interface RecommenderContext {
  hasCamera: boolean;
  hasMic: boolean;
  hasFamilyContact: boolean;
}

export function computeNextBestActions(
  session: VerificationSession,
  ctx: RecommenderContext
): NextBestAction[] {
  const candidates: NextBestAction[] = [];

  for (const def of SIGNAL_DEFINITIONS) {
    if (def.automatic) continue;
    if (def.signal === "face_match" || def.signal === "liveness_challenge") {
      if (!ctx.hasCamera) continue;
    }
    if (def.signal === "voice_phrase" && !ctx.hasMic) continue;
    if (def.signal === "family_confirmation" && !ctx.hasFamilyContact) continue;
    if (def.signal === "manual_review") continue; // always appended separately

    const cap = CATEGORY_CAPS[def.category];
    const subtotal = session.categorySubtotals[def.category as keyof CategorySubtotals] ?? 0;
    const headroom = cap === null ? def.weight : Math.max(0, cap - subtotal);
    if (headroom <= 0) continue;

    const isRetry = session.completedSignals.includes(def.signal);
    const estimatedPoints = Math.min(def.weight, headroom) * (isRetry ? 0.6 : 1);
    if (estimatedPoints < 1) continue;

    candidates.push({
      signal: def.signal,
      estimatedPoints: Math.round(estimatedPoints),
      effort: def.effort,
      labelKey: isRetry ? `action.retry.${def.signal}` : `action.${def.signal}`,
      reason: isRetry ? "retry" : "fastest_remaining",
      isRetry,
    });
  }

  candidates.sort((a, b) => b.estimatedPoints / EFFORT_COST[b.effort]! - a.estimatedPoints / EFFORT_COST[a.effort]!);

  const top = candidates.slice(0, 3);
  top.push({
    signal: "manual_review" as SignalType,
    estimatedPoints: 40,
    effort: "assisted",
    labelKey: "action.manual_review",
    reason: "always_available",
    alwaysAvailable: true,
  });
  return top;
}
