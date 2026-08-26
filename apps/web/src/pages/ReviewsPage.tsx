import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LifeBuoy,
  Loader2,
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircleQuestion,
  CircleAlert,
  Ban,
} from "lucide-react";
import { toast } from "sonner";
import type { AssistedReviewRequest, AssistedReviewStatus } from "@jeevansetu/shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { api, ApiClientError } from "@/lib/api";
import { currentLocale } from "@/i18n";
import type { ReviewEligibility } from "@/features/status/useStatus";

const STATUS_ICON: Record<AssistedReviewStatus, typeof Clock> = {
  submitted: Clock,
  in_review: Loader2,
  approved: CheckCircle2,
  rejected: XCircle,
  more_info_needed: MessageCircleQuestion,
  cancelled: Ban,
};

const STATUS_VARIANT: Record<AssistedReviewStatus, "default" | "secondary" | "destructive" | "outline"> = {
  submitted: "secondary",
  in_review: "secondary",
  approved: "default",
  rejected: "destructive",
  more_info_needed: "secondary",
  cancelled: "outline",
};

interface ReviewsPayload {
  requests: AssistedReviewRequest[];
  eligibility: ReviewEligibility;
}

/**
 * Requesting help, and following what happens to that request.
 *
 * The copy here is deliberately unexciting: it says a team member *will* review the
 * case, never that one is reviewing it now. A pensioner whose payments have stopped
 * may sit and wait on a screen that implies someone is already looking — so the page
 * tells them plainly that they can close it, and gives them a reference to come back
 * with.
 */
export function ReviewsPage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const qc = useQueryClient();
  const locale = currentLocale();
  const dateLocale = locale === "hi" ? "hi-IN" : "en-IN";
  const [message, setMessage] = React.useState("");

  const reviews = useQuery({
    queryKey: ["reviews"],
    queryFn: () => api<ReviewsPayload>("/reviews"),
    refetchInterval: 60_000,
  });

  const create = useMutation({
    mutationFn: () => api<{ request: AssistedReviewRequest }>("/reviews", { method: "POST", body: { message } }),
    onSuccess: (res) => {
      setMessage("");
      toast.success(t("reviews.created", { ticket: res.request.ticketNumber }));
      void qc.invalidateQueries({ queryKey: ["reviews"] });
      void qc.invalidateQueries({ queryKey: ["verification-status"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiClientError ? err.message : t("common.somethingWrong")),
  });

  const cancel = useMutation({
    mutationFn: (id: string) => api(`/reviews/${id}/cancel`, { method: "POST", body: {} }),
    onSuccess: () => {
      toast.success(t("reviews.cancelled"));
      void qc.invalidateQueries({ queryKey: ["reviews"] });
      void qc.invalidateQueries({ queryKey: ["verification-status"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiClientError ? err.message : t("common.somethingWrong")),
  });

  const fmt = (iso: string) => new Date(iso).toLocaleDateString(dateLocale);
  const eligibility = reviews.data?.eligibility;
  const requests = reviews.data?.requests ?? [];

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("reviews.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("reviews.subtitle")}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <LifeBuoy className="text-muted-foreground size-4" />
            <CardTitle className="text-base">{t("reviews.requestTitle")}</CardTitle>
          </div>
          <CardDescription>{t("reviews.requestBody")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.isLoading && <Skeleton className="h-24 w-full" />}

          {eligibility && !eligibility.canRequest && (
            <Alert>
              <CircleAlert className="size-4" />
              <AlertTitle>
                {eligibility.reason === "already_open"
                  ? t("reviews.alreadyOpen", { ticket: eligibility.openRequest?.ticketNumber })
                  : t("reviews.cooldown", {
                      date: eligibility.nextAllowedAt ? fmt(eligibility.nextAllowedAt) : "",
                    })}
              </AlertTitle>
              {eligibility.reason === "cooldown" && (
                <AlertDescription>
                  {t("reviews.cooldownHelp", { days: eligibility.cooldownDays })}
                </AlertDescription>
              )}
            </Alert>
          )}

          {eligibility?.canRequest && (
            <>
              <div className="space-y-2">
                <Label htmlFor="review-message">{t("reviews.messageLabel")}</Label>
                <Textarea
                  id="review-message"
                  rows={3}
                  maxLength={1000}
                  placeholder={t("reviews.messagePlaceholder")}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button onClick={() => create.mutate()} disabled={create.isPending}>
                {create.isPending ? <Loader2 className="animate-spin" /> : <LifeBuoy />}
                {create.isPending ? t("reviews.submitting") : t("reviews.submit")}
              </Button>
            </>
          )}

          {reviews.isError && (
            <Alert variant="destructive">
              <CircleAlert className="size-4" />
              <AlertDescription>{t("reviews.loadError")}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {!reviews.isLoading && requests.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center gap-2 py-10 text-center">
            <LifeBuoy className="text-muted-foreground size-10" />
            <p className="font-medium">{t("reviews.none")}</p>
            <p className="text-muted-foreground max-w-sm text-sm">{t("reviews.noneHelp")}</p>
          </CardContent>
        </Card>
      )}

      {requests.map((request) => {
        const Icon = STATUS_ICON[request.status];
        const open = ["submitted", "in_review", "more_info_needed"].includes(request.status);
        return (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Icon
                    className={`text-muted-foreground mt-0.5 size-5 shrink-0 ${request.status === "in_review" ? "animate-spin" : ""}`}
                  />
                  <div>
                    <CardTitle className="font-mono text-base">
                      {t("reviews.ticket", { ticket: request.ticketNumber })}
                    </CardTitle>
                    <CardDescription>
                      {t("reviews.raisedOn", { date: fmt(request.submittedAt) })}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={STATUS_VARIANT[request.status]} className="shrink-0">
                  {t(`reviews.status.${request.status}`)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {open && (
                <p className="text-muted-foreground text-sm">
                  {t("reviews.expectBy", { date: fmt(request.slaDueAt) })}
                </p>
              )}

              {request.message && (
                <div className="bg-muted/50 rounded-lg border p-3 text-sm">
                  <p className="text-muted-foreground mb-1 text-xs">{t("reviews.author.pensioner")}</p>
                  {request.message}
                </div>
              )}

              {request.decisionNote && (
                <Alert variant={request.status === "rejected" ? "destructive" : "default"}>
                  <AlertTitle>
                    {request.reviewerName
                      ? t("reviews.reviewedBy", { name: request.reviewerName })
                      : t("reviews.activity")}
                  </AlertTitle>
                  <AlertDescription>{request.decisionNote[locale]}</AlertDescription>
                </Alert>
              )}

              <Separator />

              <div>
                <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">
                  {t("reviews.activity")}
                </p>
                <ol className="space-y-3">
                  {request.notes.map((note, i) => (
                    <li key={`${note.at}-${i}`} className="flex gap-3 text-sm">
                      <span className="bg-border mt-1.5 size-2 shrink-0 rounded-full" />
                      <div className="min-w-0">
                        <p className="text-muted-foreground text-xs">
                          {t(`reviews.author.${note.author}`)} ·{" "}
                          {new Date(note.at).toLocaleString(dateLocale)}
                        </p>
                        <p>{note.body[locale]}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {open && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => cancel.mutate(request.id)}
                  disabled={cancel.isPending}
                >
                  {cancel.isPending ? <Loader2 className="animate-spin" /> : <Ban />}
                  {t("reviews.cancel")}
                </Button>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
