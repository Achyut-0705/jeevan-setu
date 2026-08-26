import * as React from "react";
import { useTranslation } from "react-i18next";
import { Loader2, ScanFace, CheckCircle2 } from "lucide-react";
import type { ConfidenceEvent } from "@jeevansetu/shared";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { VerifyStepLayout } from "@/features/verify/VerifyStepLayout";
import { SignalResult } from "@/features/verify/SignalResult";
import { FaceCamera, type FaceCameraHandle } from "@/features/verify/FaceCamera";
import { useEnsureSession, useRefreshVerification } from "@/features/verify/useVerification";
import { api, ApiClientError } from "@/lib/api";
import { buildFacePayload } from "@/features/verify/facePayload";
import { useFaceEnrollment } from "@/features/verify/useVerification";
import type { FrameReading } from "@/lib/human";

type Challenge = "blink" | "turn_left" | "turn_right" | "smile";
type Phase = "idle" | "watching" | "passed" | "submitting" | "timeout";

const WINDOW_MS = 15000;

/** Real gesture detection from the live face mesh — a static photo cannot satisfy these. */
function detect(challenge: Challenge, r: FrameReading, state: { blinks: number; wasClosed: boolean }) {
  switch (challenge) {
    case "blink": {
      const closed = r.eyesOpen < 0.35;
      if (closed && !state.wasClosed) state.blinks += 1;
      state.wasClosed = closed;
      return { done: state.blinks >= 2, confidence: Math.min(1, state.blinks / 2) };
    }
    case "turn_left":
      return { done: r.yaw > 0.28, confidence: Math.min(1, Math.max(0, r.yaw) / 0.35) };
    case "turn_right":
      return { done: r.yaw < -0.28, confidence: Math.min(1, Math.max(0, -r.yaw) / 0.35) };
    case "smile":
      return { done: r.smile > 0.6, confidence: Math.min(1, r.smile / 0.6) };
  }
}

export function LivenessStepPage() {
  const { t } = useTranslation();
  const { session } = useEnsureSession();
  const refresh = useRefreshVerification();
  const enrollment = useFaceEnrollment();
  const faceEngine = enrollment.data?.faceEngine ?? "server";
  const cameraRef = React.useRef<FaceCameraHandle>(null);

  const [challenge, setChallenge] = React.useState<Challenge>("blink");
  const [phase, setPhase] = React.useState<Phase>("idle");
  const [progress, setProgress] = React.useState(0);
  const [event, setEvent] = React.useState<ConfidenceEvent | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const gestureState = React.useRef({ blinks: 0, wasClosed: false });
  const startedAt = React.useRef(0);
  const phaseRef = React.useRef<Phase>("idle");
  phaseRef.current = phase;

  React.useEffect(() => {
    if (!session) return;
    api<{ challenge: Challenge }>(`/verification/sessions/${session.id}/signals/liveness/challenge`)
      .then((r) => setChallenge(r.challenge))
      .catch(() => setChallenge("blink"));
  }, [session]);

  const submit = React.useCallback(
    async (passed: boolean, confidence: number) => {
      const image = cameraRef.current?.capture();
      if (!image || !session) return;
      setPhase("submitting");
      try {
        const facePayload = await buildFacePayload(image, faceEngine);
        const res = await api<{ event: ConfidenceEvent }>(
          `/verification/sessions/${session.id}/signals/liveness`,
          {
            method: "POST",
            body: {
              ...facePayload,
              challenge,
              challengePassed: passed,
              gestureConfidence: confidence,
            },
          }
        );
        setEvent(res.event);
        refresh();
      } catch (err) {
        setError(err instanceof ApiClientError ? err.message : "Something went wrong");
        setPhase("idle");
      }
    },
    [challenge, session, refresh, faceEngine]
  );

  function onReading(r: FrameReading) {
    if (phaseRef.current !== "watching") return;
    const elapsed = Date.now() - startedAt.current;
    setProgress(Math.min(100, (elapsed / WINDOW_MS) * 100));

    const { done, confidence } = detect(challenge, r, gestureState.current);
    if (done) {
      setPhase("passed");
      void submit(true, Math.max(confidence, 0.75));
      return;
    }
    if (elapsed > WINDOW_MS) {
      setPhase("timeout");
      void submit(false, confidence);
    }
  }

  function start() {
    gestureState.current = { blinks: 0, wasClosed: false };
    startedAt.current = Date.now();
    setProgress(0);
    setError(null);
    setPhase("watching");
  }

  if (event) {
    return (
      <VerifyStepLayout title={t("liveness.title")}>
        <SignalResult event={event} />
      </VerifyStepLayout>
    );
  }

  return (
    <VerifyStepLayout title={t("liveness.title")} description={t("liveness.intro")}>
      <FaceCamera
        ref={cameraRef}
        onReading={onReading}
        overlay={
          phase === "watching" ? (
            <div className="absolute inset-x-0 top-0 bg-black/70 p-4 text-center">
              <p className="text-lg font-semibold text-white">
                {t(`liveness.instruction.${challenge}`)}
              </p>
            </div>
          ) : phase === "passed" || phase === "submitting" ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <div className="flex flex-col items-center gap-2 text-white">
                <CheckCircle2 className="size-12" />
                <p className="text-lg font-semibold">{t("liveness.detected")}</p>
              </div>
            </div>
          ) : null
        }
      />

      {phase === "watching" && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-muted-foreground text-center text-sm">{t("liveness.watching")}</p>
        </div>
      )}

      {phase === "timeout" && (
        <Alert>
          <AlertDescription>{t("liveness.timeout")}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {(phase === "idle" || phase === "timeout") && (
        <Button className="w-full" size="lg" onClick={start} disabled={!session}>
          <ScanFace />
          {t("liveness.start")}
        </Button>
      )}

      {phase === "submitting" && (
        <Button className="w-full" size="lg" disabled>
          <Loader2 className="animate-spin" />
          {t("enroll.processing")}
        </Button>
      )}
    </VerifyStepLayout>
  );
}
