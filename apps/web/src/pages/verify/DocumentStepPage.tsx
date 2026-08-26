import * as React from "react";
import { useTranslation } from "react-i18next";
import { FileText, Loader2, Upload } from "lucide-react";
import type { ConfidenceEvent } from "@jeevansetu/shared";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { VerifyStepLayout } from "@/features/verify/VerifyStepLayout";
import { SignalResult } from "@/features/verify/SignalResult";
import { useEnsureSession, useRefreshVerification } from "@/features/verify/useVerification";
import { api, ApiClientError } from "@/lib/api";
import { currentLocale } from "@/i18n";

export function DocumentStepPage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const { session } = useEnsureSession();
  const refresh = useRefreshVerification();
  const fileRef = React.useRef<HTMLInputElement>(null);

  const [preview, setPreview] = React.useState<string | null>(null);
  const [ocrText, setOcrText] = React.useState("");
  const [ocrConfidence, setOcrConfidence] = React.useState(0);
  const [reading, setReading] = React.useState(false);
  const [readProgress, setReadProgress] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const [event, setEvent] = React.useState<ConfidenceEvent | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setOcrText("");
    setPreview(URL.createObjectURL(file));
    setReading(true);
    setReadProgress(0);

    try {
      // Real OCR in the browser — Tesseract is loaded only when a document is chosen.
      const { createWorker } = await import("tesseract.js");
      const worker = await createWorker(["eng", "hin"], undefined, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") setReadProgress(Math.round(m.progress * 100));
        },
      });
      const { data } = await worker.recognize(file);
      await worker.terminate();
      setOcrText(data.text ?? "");
      setOcrConfidence(data.confidence ?? 0);
      if (!data.text?.trim()) setError(t("document.noText"));
    } catch {
      setError(t("document.noText"));
    } finally {
      setReading(false);
    }
  }

  async function submit() {
    if (!session || !ocrText.trim()) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await api<{ event: ConfidenceEvent }>(
        `/verification/sessions/${session.id}/signals/document`,
        { method: "POST", body: { ocrText, ocrConfidence } }
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
      <VerifyStepLayout title={t("document.title")}>
        <SignalResult event={event} />
      </VerifyStepLayout>
    );
  }

  return (
    <VerifyStepLayout title={t("document.title")} description={t("document.intro")}>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={onFile}
      />

      {preview && (
        <img src={preview} alt="" className="max-h-64 w-full rounded-lg border object-contain" />
      )}

      <Button variant="outline" className="w-full" onClick={() => fileRef.current?.click()}>
        <Upload />
        {t("document.choose")}
      </Button>

      {reading && (
        <div className="space-y-2">
          <Progress value={readProgress} className="h-2" />
          <p className="text-muted-foreground text-center text-sm">{t("document.reading")}</p>
        </div>
      )}

      {ocrText && (
        <div className="rounded-lg border p-3">
          <p className="text-muted-foreground text-xs">{t("document.found")}</p>
          <pre className="mt-1 max-h-32 overflow-auto text-sm whitespace-pre-wrap">
            {ocrText.slice(0, 500)}
          </pre>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        className="w-full"
        size="lg"
        onClick={submit}
        disabled={!ocrText.trim() || submitting || reading}
      >
        {submitting ? <Loader2 className="animate-spin" /> : <FileText />}
        {t("document.submit")}
      </Button>
    </VerifyStepLayout>
  );
}
