import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Camera, Loader2, ShieldAlert } from "lucide-react";
import type { ConfidenceEvent } from "@jeevansetu/shared";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { VerifyStepLayout } from "@/features/verify/VerifyStepLayout";
import { SignalResult } from "@/features/verify/SignalResult";
import { FaceCamera, type FaceCameraHandle, type Guidance } from "@/features/verify/FaceCamera";
import { useEnsureSession, useFaceEnrollment, useRefreshVerification } from "@/features/verify/useVerification";
import { api, ApiClientError } from "@/lib/api";
import { buildFacePayload } from "@/features/verify/facePayload";

export function FaceStepPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { session } = useEnsureSession();
  const enrollment = useFaceEnrollment();
  const refresh = useRefreshVerification();
  const cameraRef = React.useRef<FaceCameraHandle>(null);

  const [guidance, setGuidance] = React.useState<Guidance>("loading");
  const [submitting, setSubmitting] = React.useState(false);
  const [event, setEvent] = React.useState<ConfidenceEvent | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const notEnrolled = enrollment.isSuccess && !enrollment.data.enrolled;

  async function capture() {
    const image = cameraRef.current?.capture();
    if (!image || !session) return;
    setSubmitting(true);
    setError(null);
    try {
      const body = await buildFacePayload(image, enrollment.data?.faceEngine ?? "server");
      const res = await api<{ event: ConfidenceEvent }>(
        `/verification/sessions/${session.id}/signals/face-match`,
        { method: "POST", body }
      );
      setEvent(res.event);
      refresh();
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : t("camera.blocked"));
    } finally {
      setSubmitting(false);
    }
  }

  if (event) {
    return (
      <VerifyStepLayout title={t("verify.faceMatch.title")}>
        <SignalResult event={event} />
      </VerifyStepLayout>
    );
  }

  if (notEnrolled) {
    return (
      <VerifyStepLayout title={t("verify.faceMatch.title")} description={t("verify.faceMatch.body")}>
        <Alert>
          <ShieldAlert className="size-4" />
          <AlertTitle>{t("profile.faceIdMissing")}</AlertTitle>
          <AlertDescription>{t("profile.faceIdHelp")}</AlertDescription>
        </Alert>
        <Button className="w-full" onClick={() => navigate("/verify/enroll")}>
          {t("profile.setupFaceId")}
        </Button>
      </VerifyStepLayout>
    );
  }

  return (
    <VerifyStepLayout title={t("verify.faceMatch.title")} description={t("verify.faceMatch.body")}>
      <FaceCamera ref={cameraRef} onReading={(_r, g) => setGuidance(g)} />

      {error && (
        <Alert variant="destructive">
          <ShieldAlert className="size-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        className="w-full"
        size="lg"
        disabled={guidance !== "ready" || submitting || !session}
        onClick={capture}
      >
        {submitting ? <Loader2 className="animate-spin" /> : <Camera />}
        {submitting ? t("enroll.processing") : t("verify.faceMatch.capture")}
      </Button>
    </VerifyStepLayout>
  );
}
