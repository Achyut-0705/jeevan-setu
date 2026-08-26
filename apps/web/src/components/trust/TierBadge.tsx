import { useTranslation } from "react-i18next";
import type { Tier } from "@jeevansetu/shared";
import { Badge } from "@/components/ui/badge";

const VARIANT: Record<Tier, "secondary" | "outline" | "default"> = {
  started: "outline",
  building: "secondary",
  provisional: "default",
  verified: "default",
};

export function TierBadge({ tier }: { tier: Tier }) {
  const { t } = useTranslation();
  return <Badge variant={VARIANT[tier]}>{t(`tier.${tier}.label`)}</Badge>;
}
