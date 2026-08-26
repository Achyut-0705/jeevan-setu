import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Award, ScanFace, ShieldAlert } from "lucide-react";
import { resolveTier } from "@jeevansetu/shared";
import { TrustMeter } from "@/components/trust/TrustMeter";
import { ConfidenceTimeline } from "@/components/trust/ConfidenceTimeline";
import { NextActionCard } from "@/components/trust/NextActionCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useEnsureSession,
  useFaceEnrollment,
  useNextActions,
  useSessionEvents,
} from "@/features/verify/useVerification";
import { api } from "@/lib/api";
import { toast } from "sonner";

export function VerifyPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session, isLoading } = useEnsureSession();
  const events = useSessionEvents(session?.id);
  const actions = useNextActions(session?.id);
  const enrollment = useFaceEnrollment();

  const issue = useMutation({
    mutationFn: () =>
      api<{ certificate: { id: string } }>("/certificates/issue", {
        method: "POST",
        body: { sessionId: session!.id },
      }),
    onSuccess: (res) => navigate(`/certificates/${res.certificate.id}`),
    onError: (err) => toast.error(err instanceof Error ? err.message : "Something went wrong"),
  });

  if (isLoading || !session) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-56 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    );
  }

  const tierDef = resolveTier(session.currentScore);
  const needsEnrollment = enrollment.isSuccess && !enrollment.data.enrolled;

  return (
    <div className="space-y-6">
      <TrustMeter
        score={session.currentScore}
        tier={session.currentTier}
        categorySubtotals={session.categorySubtotals}
      />

      {needsEnrollment && (
        <Alert>
          <ShieldAlert className="size-4" />
          <AlertTitle>{t("profile.faceIdMissing")}</AlertTitle>
          <AlertDescription className="flex flex-col items-start gap-3">
            {t("profile.faceIdHelp")}
            <Button size="sm" onClick={() => navigate("/verify/enroll")}>
              <ScanFace />
              {t("profile.setupFaceId")}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {tierDef.issuesCertificate && (
        <Card>
          <CardContent className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{t(`tier.${tierDef.tier}.label`)}</p>
              <p className="text-muted-foreground text-sm">{t(`tier.${tierDef.tier}.description`)}</p>
            </div>
            <Button onClick={() => issue.mutate()} disabled={issue.isPending}>
              <Award />
              {t("verify.issueCertificate")}
            </Button>
          </CardContent>
        </Card>
      )}

      <section>
        <h2 className="mb-3 text-lg font-semibold">{t("verify.whatNext")}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(actions.data?.actions ?? []).map((action) => (
            <NextActionCard key={`${action.signal}-${action.reason}`} action={action} />
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("verify.timeline")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ConfidenceTimeline events={events.data?.events ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
