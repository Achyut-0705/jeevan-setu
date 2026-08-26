import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Video,
  Loader2,
  CalendarClock,
  CheckCircle2,
  XCircle,
  TriangleAlert,
  Eye,
  MousePointer2,
  Keyboard,
  Activity,
  UserCheck,
  Info,
  Ban,
} from "lucide-react";
import { toast } from "sonner";
import type {
  AppointmentSlot,
  CallCheckType,
  VerificationAppointment,
} from "@jeevansetu/shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { api, ApiClientError } from "@/lib/api";
import { useCamera } from "@/hooks/useCamera";
import { useCallIntegrity } from "@/features/call/useCallIntegrity";
import { currentLocale } from "@/i18n";

interface JoinPayload {
  appointment: VerificationAppointment;
  readPhrase: string;
}

/**
 * Scheduled online verification.
 *
 * The whole page exists to make one thing true: a full life certificate is issued
 * only after a person has confirmed the pensioner on a call. Everything else here —
 * the slot booking, the officer's checks, the live-presence measurements — supports
 * that single gate, and the simulated parts are labelled wherever they appear.
 */
export function CallPage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const qc = useQueryClient();
  const locale = currentLocale();
  const dateLocale = locale === "hi" ? "hi-IN" : "en-IN";

  const [joined, setJoined] = React.useState<JoinPayload | null>(null);
  const [typed, setTyped] = React.useState("");

  const appointments = useQuery({
    queryKey: ["appointments"],
    queryFn: () => api<{ appointments: VerificationAppointment[] }>("/appointments"),
    refetchInterval: 20_000,
  });

  const slots = useQuery({
    queryKey: ["appointment-slots"],
    queryFn: () => api<{ slots: AppointmentSlot[] }>("/appointments/slots"),
  });

  const current =
    appointments.data?.appointments.find((a) => a.status === "scheduled" || a.status === "in_call") ??
    null;
  const latest = appointments.data?.appointments.slice(-1)[0] ?? null;
  const inCall = current?.status === "in_call" && !!joined;

  const camera = useCamera(inCall);
  const integrity = useCallIntegrity(camera.videoRef, inCall);

  const invalidate = () => {
    void qc.invalidateQueries({ queryKey: ["appointments"] });
    void qc.invalidateQueries({ queryKey: ["appointment-slots"] });
    void qc.invalidateQueries({ queryKey: ["verification-status"] });
    void qc.invalidateQueries({ queryKey: ["session"] });
  };

  const book = useMutation({
    mutationFn: (slotStart: string) =>
      api<{ appointment: VerificationAppointment }>("/appointments", {
        method: "POST",
        body: { slotStart },
      }),
    onSuccess: (res) => {
      toast.success(
        t("call.booked", { date: new Date(res.appointment.slotStart).toLocaleString(dateLocale) })
      );
      invalidate();
    },
    onError: (err) =>
      toast.error(err instanceof ApiClientError ? err.message : t("common.somethingWrong")),
  });

  const cancel = useMutation({
    mutationFn: (id: string) => api(`/appointments/${id}/cancel`, { method: "POST", body: {} }),
    onSuccess: () => {
      toast.success(t("call.cancelled"));
      setJoined(null);
      invalidate();
    },
    onError: (err) =>
      toast.error(err instanceof ApiClientError ? err.message : t("common.somethingWrong")),
  });

  const join = useMutation({
    mutationFn: (id: string) => api<JoinPayload>(`/appointments/${id}/join`, { method: "POST", body: {} }),
    onSuccess: (res) => {
      setJoined(res);
      integrity.reset();
      invalidate();
    },
    onError: (err) =>
      toast.error(err instanceof ApiClientError ? err.message : t("common.somethingWrong")),
  });

  const resolveCheck = useMutation({
    mutationFn: (vars: { id: string; type: CallCheckType }) =>
      api<{ appointment: VerificationAppointment }>(`/appointments/${vars.id}/checks`, {
        method: "POST",
        body: { type: vars.type, passed: true },
      }),
    onSuccess: (res) => {
      setJoined((prev) => (prev ? { ...prev, appointment: res.appointment } : prev));
      invalidate();
    },
  });

  const submit = useMutation({
    mutationFn: (id: string) =>
      api<{ appointment: VerificationAppointment }>(`/appointments/${id}/submit`, {
        method: "POST",
        body: { integrity: integrity.reading },
      }),
    onSuccess: (res) => {
      setJoined((prev) => (prev ? { ...prev, appointment: res.appointment } : prev));
      toast.success(t("call.submitted"));
      invalidate();
    },
    onError: (err) =>
      toast.error(err instanceof ApiClientError ? err.message : t("common.somethingWrong")),
  });

  /** Demo-only: plays the officer's side so a walkthrough can finish. */
  const officer = useMutation({
    mutationFn: (vars: { id: string; outcome: "completed" | "failed" }) =>
      api(`/dev/appointments/${vars.id}/decide`, { method: "POST", body: { outcome: vars.outcome } }),
    onSuccess: () => {
      setJoined(null);
      invalidate();
    },
    onError: (err) =>
      toast.error(err instanceof ApiClientError ? err.message : t("common.somethingWrong")),
  });

  if (appointments.isLoading) return <Skeleton className="h-96 w-full rounded-xl" />;

  const appointment = joined?.appointment ?? current;
  const activeCheck = appointment?.checks.find((c) => c.status === "active");
  const allChecksDone = appointment?.checks.every((c) => c.status !== "pending" && c.status !== "active");
  const submitted = !!appointment?.integrity;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("call.title")}</h1>
        <p className="text-muted-foreground text-sm">{t("call.subtitle")}</p>
      </div>

      <Alert>
        <Info className="size-4" />
        <AlertTitle>{t("call.whyTitle")}</AlertTitle>
        <AlertDescription>{t("call.whyBody")}</AlertDescription>
      </Alert>

      {/* ------------------------------------------------- outcome of a past call */}
      {!current && latest && (latest.status === "completed" || latest.status === "failed") && (
        <Alert variant={latest.status === "completed" ? "default" : "destructive"}>
          {latest.status === "completed" ? (
            <CheckCircle2 className="size-4" />
          ) : (
            <XCircle className="size-4" />
          )}
          <AlertTitle>
            {latest.status === "completed" ? t("call.completed") : t("call.failed")}
          </AlertTitle>
          <AlertDescription>{latest.outcomeNote?.[locale]}</AlertDescription>
        </Alert>
      )}

      {/* ------------------------------------------------------------ booking */}
      {!current && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t("call.prepareTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground grid gap-2 text-sm sm:grid-cols-2">
                <li>· {t("call.prepare.aadhaar")}</li>
                <li>· {t("call.prepare.light")}</li>
                <li>· {t("call.prepare.paper")}</li>
                <li>· {t("call.prepare.quiet")}</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CalendarClock className="text-muted-foreground size-4" />
                <CardTitle className="text-base">{t("call.chooseSlot")}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {slots.isLoading ? (
                <Skeleton className="h-32 w-full" />
              ) : (slots.data?.slots ?? []).length === 0 ? (
                <p className="text-muted-foreground text-sm">{t("call.noSlots")}</p>
              ) : (
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {slots.data!.slots.map((slot) => (
                    <Button
                      key={slot.start}
                      variant="outline"
                      className="h-auto justify-start py-2.5"
                      disabled={!slot.available || book.isPending}
                      onClick={() => book.mutate(slot.start)}
                    >
                      <div className="text-left">
                        <p className="text-sm font-medium">
                          {new Date(slot.start).toLocaleDateString(dateLocale, {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                        <p className="text-muted-foreground text-xs tabular-nums">
                          {new Date(slot.start).toLocaleTimeString(dateLocale, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {!slot.available ? ` · ${t("call.slotTaken")}` : ""}
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}

      {/* --------------------------------------------------------- booked slot */}
      {current && !inCall && (
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle className="text-base">
                  {new Date(current.slotStart).toLocaleString(dateLocale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </CardTitle>
                <CardDescription>{t("call.joinCode", { code: current.joinCode })}</CardDescription>
              </div>
              <Badge variant="secondary">{t("status.badge.awaiting_call")}</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button onClick={() => join.mutate(current.id)} disabled={join.isPending}>
              {join.isPending ? <Loader2 className="animate-spin" /> : <Video />}
              {current.status === "in_call" ? t("call.rejoin") : t("call.join")}
            </Button>
            <Button
              variant="ghost"
              onClick={() => cancel.mutate(current.id)}
              disabled={cancel.isPending || current.status === "in_call"}
            >
              <Ban />
              {t("call.cancel")}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ------------------------------------------------------------ in call */}
      {inCall && appointment && (
        <>
          <Alert className="border-amber-400/60 bg-amber-50 text-amber-900 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-200">
            <TriangleAlert className="size-4" />
            <AlertDescription>{t("call.simulatedNotice")}</AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <UserCheck className="text-muted-foreground size-4" />
                <CardTitle className="text-base">{appointment.officerName}</CardTitle>
              </div>
              <CardDescription>{t("call.officer")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg">
                <video
                  ref={camera.videoRef}
                  className="size-full -scale-x-100 object-cover"
                  playsInline
                  muted
                />
                {camera.state !== "ready" && (
                  <div className="text-muted-foreground absolute inset-0 flex items-center justify-center p-4 text-center text-sm">
                    {camera.message ?? t("camera.starting")}
                  </div>
                )}
              </div>

              {activeCheck && (
                <div className="border-primary/40 bg-primary/5 rounded-lg border p-4">
                  <p className="text-muted-foreground text-xs tracking-wide uppercase">
                    {t("call.checkStatus.active")}
                  </p>
                  <p className="mt-1 font-medium">{activeCheck.prompt[locale]}</p>

                  {activeCheck.type === "read_phrase" && (
                    <div className="mt-3 space-y-2">
                      <p className="bg-background rounded border p-3 text-lg">{joined.readPhrase}</p>
                      <Label htmlFor="typed">{t("call.checks.read_phrase")}</Label>
                      {/* Typing the sentence gives a real keystroke-timing sample,
                          which is one of the signals that separates a person from a
                          script. Nothing is scored on the text itself. */}
                      <Input
                        id="typed"
                        value={typed}
                        onChange={(e) => setTyped(e.target.value)}
                        placeholder={joined.readPhrase}
                      />
                    </div>
                  )}

                  <Button
                    className="mt-3"
                    size="sm"
                    onClick={() =>
                      resolveCheck.mutate({ id: appointment.id, type: activeCheck.type })
                    }
                    disabled={resolveCheck.isPending}
                  >
                    {resolveCheck.isPending ? <Loader2 className="animate-spin" /> : <CheckCircle2 />}
                    {t("call.markDone")}
                  </Button>
                </div>
              )}

              <div>
                <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">
                  {t("call.checks.title")}
                </p>
                <ol className="space-y-2">
                  {appointment.checks.map((check) => (
                    <li key={check.type} className="flex items-center gap-3 text-sm">
                      {check.status === "passed" ? (
                        <CheckCircle2 className="text-primary size-4 shrink-0" />
                      ) : check.status === "failed" ? (
                        <XCircle className="text-destructive size-4 shrink-0" />
                      ) : (
                        <span className="bg-border size-4 shrink-0 rounded-full" />
                      )}
                      <span className={check.status === "passed" ? "text-muted-foreground" : ""}>
                        {t(`call.checks.${check.type}`)}
                      </span>
                      <Badge variant="outline" className="ml-auto shrink-0">
                        {t(`call.checkStatus.${check.status}`)}
                      </Badge>
                    </li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Activity className="text-muted-foreground size-4" />
                <CardTitle className="text-base">{t("call.integrityTitle")}</CardTitle>
              </div>
              <CardDescription>{t("call.integrityBody")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Metric icon={Eye} label={t("call.integrity.gaze")} value={integrity.reading.gazeSamples} />
                <Metric icon={Eye} label={t("call.integrity.blink")} value={integrity.reading.blinkCount} />
                <Metric
                  icon={Activity}
                  label={t("call.integrity.head")}
                  value={integrity.reading.headMovementScore}
                />
                <Metric
                  icon={MousePointer2}
                  label={t("call.integrity.mouse")}
                  value={`${integrity.reading.mouseTravel}px`}
                />
                <Metric
                  icon={Keyboard}
                  label={t("call.integrity.keystroke")}
                  value={`${integrity.reading.keystrokeJitterMs}ms`}
                />
              </dl>

              {appointment.integrity && (
                <>
                  <Separator />
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t("call.integrity.score")}</span>
                      <span className="font-semibold tabular-nums">
                        {Math.round(appointment.integrity.livePresenceScore * 100)}%
                      </span>
                    </div>
                    <Progress value={appointment.integrity.livePresenceScore * 100} />
                    {appointment.integrity.flags.length > 0 && (
                      <ul className="text-muted-foreground mt-2 space-y-1 text-xs">
                        {appointment.integrity.flags.map((flag) => (
                          <li key={flag}>· {t(`call.flags.${flag}`, { defaultValue: flag })}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {!submitted ? (
            <Button
              size="lg"
              className="w-full"
              disabled={!allChecksDone || submit.isPending}
              onClick={() => submit.mutate(appointment.id)}
            >
              {submit.isPending ? <Loader2 className="animate-spin" /> : <CheckCircle2 />}
              {t("call.submit")}
            </Button>
          ) : (
            <>
              <Alert>
                <Loader2 className="size-4 animate-spin" />
                <AlertTitle>{t("call.submitted")}</AlertTitle>
                <AlertDescription>{t("call.awaitingOfficer")}</AlertDescription>
              </Alert>

              {/* The officer's own screen, surfaced here purely so a demo can finish.
                  In a deployment this lives in the back office, not the pensioner's app. */}
              <Card className="border-dashed">
                <CardHeader>
                  <CardTitle className="text-base">{t("call.operatorTitle")}</CardTitle>
                  <CardDescription>{t("call.operatorBody")}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => officer.mutate({ id: appointment.id, outcome: "completed" })}
                    disabled={officer.isPending}
                  >
                    {officer.isPending ? <Loader2 className="animate-spin" /> : <UserCheck />}
                    {t("call.operatorApprove")}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => officer.mutate({ id: appointment.id, outcome: "failed" })}
                    disabled={officer.isPending}
                  >
                    <XCircle />
                    {t("call.operatorReject")}
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Eye;
  label: string;
  value: string | number;
}) {
  return (
    <div className="space-y-0.5">
      <dt className="text-muted-foreground flex items-center gap-1.5 text-xs">
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
