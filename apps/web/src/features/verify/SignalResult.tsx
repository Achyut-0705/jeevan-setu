import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Info, TriangleAlert, ArrowRight } from "lucide-react";
import type { ConfidenceEvent } from "@jeevansetu/shared";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { currentLocale } from "@/i18n";

const ICON = { celebratory: CheckCircle2, reassuring: Info, informative: TriangleAlert };

export function SignalResult({ event }: { event: ConfidenceEvent }) {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const navigate = useNavigate();
  const narrative = event.narrative[currentLocale()];
  const Icon = ICON[narrative.tone as keyof typeof ICON] ?? Info;

  return (
    <div className="space-y-4">
      <Alert>
        <Icon className="size-4" />
        <AlertTitle>{narrative.title}</AlertTitle>
        <AlertDescription>{narrative.body}</AlertDescription>
      </Alert>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={event.cappedPoints > 0 ? "default" : "secondary"}>
          +{event.cappedPoints} {t("common.points")}
        </Badge>
        <span className="text-muted-foreground text-sm tabular-nums">
          {event.scoreBefore}% → {event.scoreAfter}%
        </span>
      </div>

      <Button className="w-full" onClick={() => navigate("/verify")}>
        {t("common.continue")}
        <ArrowRight />
      </Button>
    </div>
  );
}
