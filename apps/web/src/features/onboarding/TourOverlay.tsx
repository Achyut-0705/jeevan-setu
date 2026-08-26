import * as React from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, Check, Lightbulb, X, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TOUR_STEPS } from "./steps";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PAD = 8;
const CARD_WIDTH = 360;
const GAP = 14;

/**
 * The spotlight. Four dimmed panels are drawn around the target rather than one
 * overlay with a hole, so the highlighted element keeps its own colours and stays
 * readable — important when the thing being explained is a status card whose colour
 * is part of the message.
 */
export function TourOverlay({
  stepIndex,
  onNext,
  onBack,
  onSkip,
}: {
  stepIndex: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}) {
  const { t } = useTranslation();
  const step = TOUR_STEPS[stepIndex]!;
  const [rect, setRect] = React.useState<Rect | null>(null);

  const measure = React.useCallback(() => {
    if (!step.target) {
      setRect(null);
      return;
    }
    const el = document.querySelector<HTMLElement>(`[data-tour="${step.target}"]`);
    if (!el) {
      // Anchor is not on screen (collapsed sidebar, narrow layout) — fall back to a
      // centred card instead of pointing at empty space.
      setRect(null);
      return;
    }
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step.target]);

  React.useEffect(() => {
    const el = step.target
      ? document.querySelector<HTMLElement>(`[data-tour="${step.target}"]`)
      : null;
    el?.scrollIntoView({ block: "center", behavior: "smooth" });

    // Re-measure after the smooth scroll settles, then keep up with resizes.
    const initial = window.setTimeout(measure, 350);
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [measure, step.target]);

  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onSkip();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft" && stepIndex > 0) onBack();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onBack, onSkip, stepIndex]);

  const isLast = stepIndex === TOUR_STEPS.length - 1;
  const base = `onboarding.steps.${step.key}`;

  const card = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tour-title"
      className="bg-popover text-popover-foreground pointer-events-auto w-[min(22.5rem,calc(100vw-2rem))] rounded-xl border p-5 shadow-2xl"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-muted-foreground text-xs font-medium tabular-nums">
          {t("onboarding.stepCounter", { step: stepIndex + 1, total: TOUR_STEPS.length })}
        </span>
        <Button variant="ghost" size="icon-sm" aria-label={t("onboarding.skip")} onClick={onSkip}>
          <X />
        </Button>
      </div>

      <Progress value={((stepIndex + 1) / TOUR_STEPS.length) * 100} className="mb-4 h-1.5" />

      <h2 id="tour-title" className="text-base font-semibold">
        {t(`${base}.title`)}
      </h2>
      <p className="text-muted-foreground mt-1.5 text-sm">{t(`${base}.body`)}</p>

      <div className="bg-muted/60 mt-4 space-y-2 rounded-lg p-3 text-sm">
        <p className="flex gap-2">
          <Lightbulb className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <span>
            <span className="text-muted-foreground block text-xs">{t("onboarding.why")}</span>
            {t(`${base}.why`)}
          </span>
        </p>
        <p className="flex gap-2">
          <CornerDownRight className="text-muted-foreground mt-0.5 size-4 shrink-0" />
          <span>
            <span className="text-muted-foreground block text-xs">{t("onboarding.whatNext")}</span>
            {t(`${base}.next`)}
          </span>
        </p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {stepIndex > 0 && (
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft />
            {t("onboarding.back")}
          </Button>
        )}
        <Button size="sm" className="ml-auto" onClick={onNext}>
          {isLast ? <Check /> : null}
          {isLast ? t("onboarding.finish") : t("onboarding.next")}
          {!isLast ? <ArrowRight /> : null}
        </Button>
      </div>
    </div>
  );

  return createPortal(
    <div className="fixed inset-0 z-[60]">
      {rect ? (
        <>
          {/* Dimmed panels around the spotlit element. */}
          <Panel style={{ top: 0, left: 0, right: 0, height: Math.max(0, rect.top - PAD) }} />
          <Panel style={{ top: Math.max(0, rect.top + rect.height + PAD), left: 0, right: 0, bottom: 0 }} />
          <Panel
            style={{
              top: Math.max(0, rect.top - PAD),
              left: 0,
              width: Math.max(0, rect.left - PAD),
              height: rect.height + PAD * 2,
            }}
          />
          <Panel
            style={{
              top: Math.max(0, rect.top - PAD),
              left: rect.left + rect.width + PAD,
              right: 0,
              height: rect.height + PAD * 2,
            }}
          />
          <div
            aria-hidden="true"
            className="ring-primary pointer-events-none absolute rounded-xl ring-2 ring-offset-2 ring-offset-transparent"
            style={{
              top: rect.top - PAD,
              left: rect.left - PAD,
              width: rect.width + PAD * 2,
              height: rect.height + PAD * 2,
            }}
          />
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute" style={cardPosition(rect)}>
              {card}
            </div>
          </div>
        </>
      ) : (
        <div className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-black/60 p-4">
          {card}
        </div>
      )}
    </div>,
    document.body
  );
}

function Panel({ style }: { style: React.CSSProperties }) {
  return <div className="pointer-events-auto absolute bg-black/60" style={style} onClick={(e) => e.stopPropagation()} />;
}

/** Places the card beside the spotlight, flipping when it would leave the viewport. */
function cardPosition(rect: Rect): React.CSSProperties {
  const spaceBelow = window.innerHeight - (rect.top + rect.height);
  const spaceRight = window.innerWidth - (rect.left + rect.width);

  // Prefer to the right of narrow targets (sidebar items), otherwise below.
  if (rect.width < 260 && spaceRight > CARD_WIDTH + GAP * 2) {
    return {
      left: rect.left + rect.width + GAP,
      top: Math.min(Math.max(GAP, rect.top), Math.max(GAP, window.innerHeight - 340)),
    };
  }

  const left = Math.min(Math.max(GAP, rect.left), Math.max(GAP, window.innerWidth - CARD_WIDTH - GAP));
  if (spaceBelow > 340) return { left, top: rect.top + rect.height + GAP };
  return { left, bottom: Math.max(GAP, window.innerHeight - rect.top + GAP) };
}
