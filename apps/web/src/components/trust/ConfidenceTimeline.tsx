import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import type { ConfidenceEvent } from "@jeevansetu/shared";
import { useA11y } from "@/context/A11yContext";
import { currentLocale } from "@/i18n";

const TONE_ICON: Record<string, typeof CheckCircle2> = {
  celebratory: CheckCircle2,
  reassuring: Info,
  informative: TriangleAlert,
};

const TONE_COLOR: Record<string, string> = {
  celebratory: "text-chart-2",
  reassuring: "text-chart-1",
  informative: "text-chart-4",
};

export function ConfidenceTimeline({ events }: { events: ConfidenceEvent[] }) {
  const { t, i18n } = useTranslation();
  const { reducedMotion } = useA11y();
  // Derived from the live UI language (i18n.language read so this re-renders on switch),
  // never from the session's frozen locale.
  void i18n.language;
  const locale = currentLocale();

  if (events.length === 0) {
    return <p className="text-muted-foreground text-sm">{t("verify.startSessionBody")}</p>;
  }

  return (
    <ol className="space-y-3">
      {[...events]
        .sort((a, b) => b.seq - a.seq)
        .map((event) => {
          const narrative = event.narrative[locale];
          const Icon = TONE_ICON[narrative.tone] ?? Info;
          return (
            <motion.li
              key={event.id}
              initial={reducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 rounded-lg border p-4"
            >
              <Icon
                className={`mt-0.5 size-5 shrink-0 ${TONE_COLOR[narrative.tone] ?? "text-chart-1"}`}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{narrative.title}</p>
                <p className="text-muted-foreground text-sm">{narrative.body}</p>
                <p className="text-muted-foreground mt-1 text-xs font-medium tabular-nums">
                  {event.scoreBefore}% → {event.scoreAfter}%
                </p>
              </div>
            </motion.li>
          );
        })}
    </ol>
  );
}
