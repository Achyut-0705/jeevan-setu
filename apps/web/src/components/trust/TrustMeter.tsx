import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import type { CategorySubtotals, Tier } from "@jeevansetu/shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TierBadge } from "./TierBadge";
import { useA11y } from "@/context/A11yContext";
import { cn } from "@/lib/utils";

const TIER_INDICATOR: Record<Tier, string> = {
  started: "[&_[data-slot=progress-indicator]]:bg-muted-foreground",
  building: "[&_[data-slot=progress-indicator]]:bg-chart-1",
  provisional: "[&_[data-slot=progress-indicator]]:bg-chart-4",
  verified: "[&_[data-slot=progress-indicator]]:bg-chart-2",
};

export function TrustMeter({
  score,
  tier,
  categorySubtotals,
}: {
  score: number;
  tier: Tier;
  categorySubtotals: CategorySubtotals;
}) {
  const { t } = useTranslation();
  const { reducedMotion } = useA11y();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-base font-medium">{t("verify.trustScore")}</CardTitle>
            <div className="mt-1 flex items-baseline gap-1">
              <motion.span
                key={score}
                initial={reducedMotion ? false : { scale: 1.12, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-semibold tabular-nums tracking-tight"
              >
                {score}
              </motion.span>
              <span className="text-muted-foreground text-xl font-medium">%</span>
            </div>
          </div>
          <TierBadge tier={tier} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress
          value={score}
          className={cn("h-3", TIER_INDICATOR[tier])}
          aria-label={t("verify.trustScore")}
        />
        <CardDescription>{t(`tier.${tier}.description`)}</CardDescription>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {(Object.keys(categorySubtotals) as (keyof CategorySubtotals)[]).map((cat) => (
            <div key={cat} className="bg-muted/50 rounded-lg border p-3 text-center">
              <div className="text-lg font-semibold tabular-nums">{categorySubtotals[cat]}</div>
              <div className="text-muted-foreground text-xs capitalize">{t(`category.${cat}`)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
