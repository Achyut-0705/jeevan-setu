import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
  ShieldX,
  Clock,
  Video,
  ArrowRight,
  LifeBuoy,
  Info,
} from "lucide-react";
import type { VerificationStatus, VerificationStatusDetail } from "@jeevansetu/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { currentLocale } from "@/i18n";

const ICONS: Record<VerificationStatus, typeof ShieldCheck> = {
  not_required: Info,
  not_started: ShieldQuestion,
  in_progress: Clock,
  awaiting_review: LifeBuoy,
  awaiting_call: Video,
  completed: ShieldCheck,
  rejected: ShieldX,
  expired: ShieldAlert,
};

const BADGE_VARIANT: Record<VerificationStatus, "default" | "secondary" | "destructive" | "outline"> = {
  not_required: "outline",
  not_started: "secondary",
  in_progress: "secondary",
  awaiting_review: "secondary",
  awaiting_call: "secondary",
  completed: "default",
  rejected: "destructive",
  expired: "destructive",
};

/**
 * Tells the pensioner exactly where they stand, including when the answer is
 * "waiting on us" or "we could not verify you". Every screen renders this same
 * component from the same endpoint so no two pages disagree.
 */
export function StatusCard({ detail }: { detail: VerificationStatusDetail }) {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const navigate = useNavigate();
  const locale = currentLocale();
  const Icon = ICONS[detail.status];

  return (
    <Card data-tour="status-card">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Icon className="text-muted-foreground mt-0.5 size-5 shrink-0" />
            <div>
              <CardTitle className="text-base">{detail.headline[locale]}</CardTitle>
              <p className="text-muted-foreground mt-1 text-sm">{detail.detail[locale]}</p>
            </div>
          </div>
          <Badge variant={BADGE_VARIANT[detail.status]} className="shrink-0">
            {t(`status.badge.${detail.status}`)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {detail.nextStep && (
          <>
            <Separator />
            <div>
              <p className="text-muted-foreground text-xs tracking-wide uppercase">
                {t("status.whatNext")}
              </p>
              <p className="mt-1 text-sm">{detail.nextStep[locale]}</p>
            </div>
          </>
        )}

        <div className="flex flex-wrap gap-2">
          {detail.status === "awaiting_review" && (
            <Button variant="outline" onClick={() => navigate("/help")}>
              <LifeBuoy />
              {t("reviews.ticket", { ticket: detail.openReviewTicket })}
            </Button>
          )}

          {detail.status === "awaiting_call" && detail.appointmentId && (
            <Button onClick={() => navigate("/call")}>
              <Video />
              {t("call.join")}
            </Button>
          )}

          {(detail.status === "not_started" ||
            detail.status === "in_progress" ||
            detail.status === "expired") && (
            <Button onClick={() => navigate("/verify")}>
              {detail.status === "in_progress"
                ? t("dashboard.resumeVerification")
                : t("dashboard.startVerification")}
              <ArrowRight />
            </Button>
          )}

          {detail.callRequired && detail.status !== "awaiting_call" && (
            <Button variant="outline" onClick={() => navigate("/call")}>
              <Video />
              {t("call.book")}
            </Button>
          )}

          {detail.status === "rejected" && (
            <Button onClick={() => navigate("/call")}>
              <Video />
              {t("call.book")}
            </Button>
          )}

          {detail.status === "completed" && detail.certificateId && (
            <Button variant="outline" onClick={() => navigate(`/certificates/${detail.certificateId}`)}>
              {t("nav.certificates")}
              <ArrowRight />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
