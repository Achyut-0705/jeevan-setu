import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Camera, ScanFace, Mic, FileText, Users, Video, UserCheck, HelpCircle, ArrowRight } from "lucide-react";
import type { NextBestAction, SignalType } from "@jeevansetu/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ICONS: Record<string, typeof Camera> = {
  face_match: ScanFace,
  liveness_challenge: Camera,
  voice_phrase: Mic,
  document_upload: FileText,
  family_confirmation: Users,
  video_verification: Video,
  manual_review: UserCheck,
};

export const SIGNAL_ROUTE: Partial<Record<SignalType, string>> = {
  face_match: "/verify/face",
  liveness_challenge: "/verify/liveness",
  voice_phrase: "/verify/voice",
  document_upload: "/verify/document",
  family_confirmation: "/verify/family",
  // Both of these are now first-class destinations rather than verification steps:
  // a video check is a scheduled call, and asking for help opens a tracked request.
  video_verification: "/call",
  manual_review: "/help",
};

export function NextActionCard({ action }: { action: NextBestAction }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const Icon = ICONS[action.signal] ?? HelpCircle;
  const labelKey = action.isRetry ? `action.retry.${action.signal}` : `action.${action.signal}`;
  const route = SIGNAL_ROUTE[action.signal];

  return (
    <Card className={cn("transition-shadow hover:shadow-md", action.alwaysAvailable && "border-dashed")}>
      <CardContent className="flex items-start gap-4">
        <div className="bg-muted flex size-11 shrink-0 items-center justify-center rounded-lg">
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <p className="font-medium">{t(labelKey)}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant="secondary">+{action.estimatedPoints} {t("common.points")}</Badge>
              <span className="text-muted-foreground text-xs">{t(`effort.${action.effort}`)}</span>
            </div>
          </div>
          <Button
            variant={action.alwaysAvailable ? "outline" : "default"}
            size="sm"
            className="w-full sm:w-auto"
            disabled={!route}
            onClick={() => route && navigate(route)}
          >
            {t("common.continue")}
            <ArrowRight />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
