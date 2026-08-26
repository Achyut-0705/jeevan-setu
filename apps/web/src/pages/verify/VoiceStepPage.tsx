import * as React from "react";
import { useTranslation } from "react-i18next";
import { Mic, Square, Loader2, Info } from "lucide-react";
import type { ConfidenceEvent } from "@jeevansetu/shared";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { VerifyStepLayout } from "@/features/verify/VerifyStepLayout";
import { SignalResult } from "@/features/verify/SignalResult";
import { useEnsureSession, useRefreshVerification } from "@/features/verify/useVerification";
import { useSpeech } from "@/hooks/useSpeech";
import { api, ApiClientError } from "@/lib/api";
import { currentLocale } from "@/i18n";

export function VoiceStepPage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const { session } = useEnsureSession();
  const refresh = useRefreshVerification();
  const locale = currentLocale();
  const speech = useSpeech(locale);

  const [phrase, setPhrase] = React.useState("");
  const [event, setEvent] = React.useState<ConfidenceEvent | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!session) return;
    api<{ phrase: string }>(`/verification/sessions/${session.id}/signals/voice/phrase`)
      .then((r) => setPhrase(r.phrase))
      .catch(() => setPhrase(""));
  }, [session]);

  async function submit() {
    if (!session) return;
    speech.stop();
    setSubmitting(true);
    setError(null);
    try {
      const res = await api<{ event: ConfidenceEvent }>(
        `/verification/sessions/${session.id}/signals/voice`,
        {
          method: "POST",
          body: {
            expectedPhrase: phrase,
            transcript: speech.transcript || undefined,
            durationMs: speech.durationMs,
            peakLevel: speech.peakLevel,
          },
        }
      );
      setEvent(res.event);
      refresh();
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (event) {
    return (
      <VerifyStepLayout title={t("voice.title")}>
        <SignalResult event={event} />
      </VerifyStepLayout>
    );
  }

  return (
    <VerifyStepLayout title={t("voice.title")} description={t("voice.intro")}>
      <blockquote className="bg-muted rounded-lg border-l-4 p-4 text-lg font-medium">
        {phrase || "…"}
      </blockquote>

      {!speech.supported && (
        <Alert>
          <Info className="size-4" />
          <AlertDescription>{t("voice.noSpeech")}</AlertDescription>
        </Alert>
      )}

      {speech.error === "microphone_denied" && (
        <Alert variant="destructive">
          <AlertDescription>{t("voice.micDenied")}</AlertDescription>
        </Alert>
      )}

      {speech.listening && (
        <div className="space-y-2">
          <Progress value={Math.min(100, speech.peakLevel * 160)} className="h-2" />
          <p className="text-muted-foreground text-center text-sm">{t("voice.listening")}</p>
        </div>
      )}

      {speech.transcript && (
        <div className="rounded-lg border p-3">
          <p className="text-muted-foreground text-xs">{t("voice.heard")}</p>
          <p className="font-medium">{speech.transcript}</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-2 sm:flex-row">
        {!speech.listening ? (
          <Button className="flex-1" size="lg" onClick={() => void speech.start()} disabled={!phrase}>
            <Mic />
            {t("voice.record")}
          </Button>
        ) : (
          <Button className="flex-1" size="lg" variant="secondary" onClick={speech.stop}>
            <Square />
            {t("voice.stop")}
          </Button>
        )}
        <Button
          className="flex-1"
          size="lg"
          onClick={submit}
          disabled={submitting || (!speech.transcript && speech.durationMs === 0)}
        >
          {submitting ? <Loader2 className="animate-spin" /> : null}
          {t("voice.submit")}
        </Button>
      </div>
    </VerifyStepLayout>
  );
}
