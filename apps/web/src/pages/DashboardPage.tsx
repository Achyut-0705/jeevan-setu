import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Wallet, LifeBuoy, TriangleAlert, PlayCircle } from "lucide-react";
import type { Certificate, VerificationSession } from "@jeevansetu/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { currentLocale } from "@/i18n";
import { StatusCard } from "@/features/status/StatusCard";
import { usePensionHistory, useVerificationStatus } from "@/features/status/useStatus";
import { useOnboarding } from "@/features/onboarding/OnboardingProvider";

export function DashboardPage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const { user } = useAuth();
  const navigate = useNavigate();
  const locale = currentLocale();
  const dateLocale = locale === "hi" ? "hi-IN" : "en-IN";
  const onboarding = useOnboarding();

  const status = useVerificationStatus();
  const pension = usePensionHistory();
  const timeline = useQuery({
    queryKey: ["timeline"],
    queryFn: () =>
      api<{ sessions: VerificationSession[]; certificates: Certificate[] }>("/users/me/timeline"),
  });

  if (!user) return <Skeleton className="h-96 w-full rounded-xl" />;

  const certificates = [...(timeline.data?.certificates ?? [])].sort((a, b) =>
    a.issuedAt < b.issuedAt ? 1 : -1
  );
  const notEligible = user.pension.status === "not_eligible";
  const summary = pension.data?.summary;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {t("dashboard.welcomeBack", { name: user.name[locale] })}
          </h1>
          <p className="text-muted-foreground text-sm">{t("common.tagline")}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onboarding.start}>
          <PlayCircle />
          {t("onboarding.restart")}
        </Button>
      </div>

      {status.isLoading ? (
        <Skeleton className="h-40 w-full rounded-xl" />
      ) : status.data ? (
        <StatusCard detail={status.data.status} />
      ) : null}

      {summary && summary.monthsUnpaid > 0 && (
        <Alert variant="destructive">
          <TriangleAlert className="size-4" />
          <AlertTitle>
            {t("pension.withheldAmount", { amount: summary.withheldAmount.toLocaleString("en-IN") })}
          </AlertTitle>
          <AlertDescription className="flex flex-col items-start gap-3">
            {t("dashboard.certificateStatus.expired")}
            <Button size="sm" variant="outline" onClick={() => navigate("/pension")}>
              <Wallet />
              {t("nav.pension")}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card data-tour="pension-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Wallet className="text-muted-foreground size-4" />
              <CardTitle className="text-base">{t("dashboard.pensionCard.title")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {notEligible ? (
              <p className="text-muted-foreground text-sm">{t("pension.notEligible")}</p>
            ) : (
              <>
                <p className="text-3xl font-semibold tracking-tight">
                  ₹{user.pension.monthlyAmount.toLocaleString("en-IN")}
                </p>
                <p className="text-muted-foreground text-sm">{t("dashboard.pensionCard.monthly")}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-muted-foreground text-xs">{t("profile.passbookNumber")}</dt>
                    <dd className="font-medium">{user.pension.passbookNumber}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-xs">{t("dashboard.pensionCard.bank")}</dt>
                    <dd className="font-medium">{user.bank.maskedAccount}</dd>
                  </div>
                  {user.pension.lastCreditedAt && (
                    <div>
                      <dt className="text-muted-foreground text-xs">{t("pension.lastCredited")}</dt>
                      <dd className="font-medium">
                        {new Date(user.pension.lastCreditedAt).toLocaleDateString(dateLocale)}
                      </dd>
                    </div>
                  )}
                  {user.pension.nextRenewalDueAt && (
                    <div>
                      <dt className="text-muted-foreground text-xs">{t("pension.nextRenewal")}</dt>
                      <dd className="font-medium">
                        {new Date(user.pension.nextRenewalDueAt).toLocaleDateString(dateLocale)}
                      </dd>
                    </div>
                  )}
                </dl>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => navigate("/pension")}
                >
                  {t("pension.historyTitle")}
                  <ArrowRight />
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <LifeBuoy className="text-muted-foreground size-4" />
              <CardTitle className="text-base">{t("reviews.title")}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground text-sm">{t("reviews.noneHelp")}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => navigate("/help")} data-tour="help-button">
                <LifeBuoy />
                {t("reviews.title")}
              </Button>
              {!notEligible && (
                <Button variant="ghost" onClick={() => navigate("/family")}>
                  {t("dashboard.needAssistance")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("dashboard.timelineTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          {timeline.isLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : certificates.length === 0 ? (
            <p className="text-muted-foreground text-sm">{t("dashboard.noHistory")}</p>
          ) : (
            <ul className="divide-y">
              {certificates.slice(0, 4).map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.certificateNumber}</p>
                    <p className="text-muted-foreground text-sm">
                      {t("certificate.issuedOn", {
                        date: new Date(c.issuedAt).toLocaleDateString(dateLocale),
                      })}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant={c.status === "active" ? "default" : "secondary"}>
                      {t(`certificate.${c.kind}`)}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => navigate(`/certificates/${c.id}`)}>
                      {t("common.continue")}
                      <ArrowRight />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
