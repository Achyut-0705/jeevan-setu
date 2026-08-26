import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Wallet, TriangleAlert, ArrowRight, CircleAlert } from "lucide-react";
import type { PensionTransaction } from "@jeevansetu/shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { usePensionHistory } from "@/features/status/useStatus";
import { currentLocale } from "@/i18n";

const STATUS_VARIANT: Record<PensionTransaction["status"], "default" | "secondary" | "destructive"> = {
  credited: "default",
  on_hold: "destructive",
  failed: "destructive",
};

/**
 * The disbursement statement. Every line carries the date, the amount, the masked
 * account it went to, the bank's transaction reference and the rail it settled on —
 * the same fields a pensioner would find on a passbook page, so they can match one
 * against the other.
 */
export function PensionPage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const { user } = useAuth();
  const navigate = useNavigate();
  const locale = currentLocale();
  const dateLocale = locale === "hi" ? "hi-IN" : "en-IN";
  const history = usePensionHistory();

  if (!user) return <Skeleton className="h-96 w-full rounded-xl" />;

  const notEligible = user.pension.status === "not_eligible";
  const summary = history.data?.summary;
  const rows = history.data?.transactions ?? [];

  const daysToRenewal = user.pension.nextRenewalDueAt
    ? Math.round(
        (new Date(user.pension.nextRenewalDueAt).getTime() - Date.now()) / (24 * 60 * 60 * 1000)
      )
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("pension.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("pension.subtitle")}</p>
      </div>

      {notEligible ? (
        <Alert>
          <CircleAlert className="size-4" />
          <AlertTitle>{t("pension.notEligible")}</AlertTitle>
          <AlertDescription>{user.pension.ineligibleReason?.[locale]}</AlertDescription>
        </Alert>
      ) : (
        <>
          {summary && summary.monthsUnpaid > 0 && (
            <Alert variant="destructive">
              <TriangleAlert className="size-4" />
              <AlertTitle>
                {t("pension.withheldAmount", {
                  amount: summary.withheldAmount.toLocaleString("en-IN"),
                })}
              </AlertTitle>
              <AlertDescription className="flex flex-col items-start gap-3">
                {rows.find((r) => r.status === "on_hold")?.remark?.[locale]}
                <Button size="sm" variant="outline" onClick={() => navigate("/verify")}>
                  {t("dashboard.startVerification")}
                  <ArrowRight />
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Wallet className="text-muted-foreground size-4" />
                <CardTitle className="text-base">{t("dashboard.pensionCard.title")}</CardTitle>
              </div>
              <CardDescription>{user.pension.disbursingAgency}</CardDescription>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Stat
                  label={t("pension.monthlyAmount")}
                  value={`₹${user.pension.monthlyAmount.toLocaleString("en-IN")}`}
                />
                <Stat label={t("profile.passbookNumber")} value={user.pension.passbookNumber} />
                <Stat
                  label={t("pension.lastCredited")}
                  value={
                    user.pension.lastCreditedAt
                      ? new Date(user.pension.lastCreditedAt).toLocaleDateString(dateLocale)
                      : t("common.notAvailable")
                  }
                />
                <Stat
                  label={t("pension.nextRenewal")}
                  value={
                    user.pension.nextRenewalDueAt
                      ? new Date(user.pension.nextRenewalDueAt).toLocaleDateString(dateLocale)
                      : t("common.notAvailable")
                  }
                  hint={
                    daysToRenewal === null
                      ? undefined
                      : daysToRenewal >= 0
                        ? t("pension.daysLeft", { count: daysToRenewal })
                        : t("pension.overdue", { count: Math.abs(daysToRenewal) })
                  }
                  hintTone={daysToRenewal !== null && daysToRenewal < 30 ? "warn" : "muted"}
                />
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("pension.historyTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              {history.isLoading ? (
                <Skeleton className="h-48 w-full" />
              ) : rows.length === 0 ? (
                <p className="text-muted-foreground text-sm">{t("pension.noTransactions")}</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[46rem] text-sm">
                    <thead>
                      <tr className="text-muted-foreground border-b text-left text-xs">
                        <th className="py-2 pr-4 font-medium">{t("pension.columns.date")}</th>
                        <th className="py-2 pr-4 font-medium">{t("pension.columns.amount")}</th>
                        <th className="py-2 pr-4 font-medium">{t("pension.columns.account")}</th>
                        <th className="py-2 pr-4 font-medium">{t("pension.columns.transactionId")}</th>
                        <th className="py-2 pr-4 font-medium">{t("pension.columns.mode")}</th>
                        <th className="py-2 font-medium">{t("pension.columns.status")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {rows.map((tx) => (
                        <tr key={tx.id} className="align-top">
                          <td className="py-3 pr-4 whitespace-nowrap tabular-nums">
                            {new Date(tx.date).toLocaleDateString(dateLocale)}
                          </td>
                          <td className="py-3 pr-4 font-medium whitespace-nowrap tabular-nums">
                            ₹{tx.amount.toLocaleString("en-IN")}
                          </td>
                          <td className="py-3 pr-4 whitespace-nowrap tabular-nums">
                            {tx.maskedAccount}
                          </td>
                          <td className="py-3 pr-4 font-mono text-xs">{tx.transactionId}</td>
                          <td className="py-3 pr-4">
                            <Badge variant="outline">{tx.mode}</Badge>
                          </td>
                          <td className="py-3">
                            <Badge variant={STATUS_VARIANT[tx.status]}>
                              {t(`pension.status.${tx.status}`)}
                            </Badge>
                            {tx.remark && (
                              <p className="text-muted-foreground mt-1 max-w-xs text-xs">
                                {tx.remark[locale]}
                              </p>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  hintTone = "muted",
}: {
  label: string;
  value: string;
  hint?: string;
  hintTone?: "muted" | "warn";
}) {
  return (
    <div className="space-y-0.5">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="font-medium">{value}</dd>
      {hint && (
        <p className={hintTone === "warn" ? "text-destructive text-xs" : "text-muted-foreground text-xs"}>
          {hint}
        </p>
      )}
    </div>
  );
}
