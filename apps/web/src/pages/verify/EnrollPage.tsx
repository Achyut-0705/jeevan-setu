import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Camera, CheckCircle2, IdCard, Loader2, Upload, ShieldCheck, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { VerifyStepLayout } from "@/features/verify/VerifyStepLayout";
import { FaceCamera, type FaceCameraHandle, type Guidance } from "@/features/verify/FaceCamera";
import { useFaceEnrollment, useRefreshVerification } from "@/features/verify/useVerification";
import { api, ApiClientError } from "@/lib/api";
import { captureImageElementJpeg, describeJpeg } from "@/lib/human";
import { clearFaceConsent, readFaceConsent } from "@/features/aadhaar/faceConsentStore";
import { stashAadhaarTxn } from "@/features/aadhaar/txnStore";
import type { AadhaarStart } from "@/context/AuthContext";

type Mode = "consent" | "choose" | "selfie" | "done";

/**
 * Registering a Face ID.
 *
 * A face template here is not "a selfie we kept" — it is an identity registered
 * against the holder's Aadhaar record, so the journey starts on the Aadhaar service
 * with an OTP and an explicit face-authentication consent. The API refuses any
 * enrolment that does not quote a live consent, so this page cannot shortcut it.
 */
export function EnrollPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const refresh = useRefreshVerification();
  const enrollment = useFaceEnrollment();
  const cameraRef = React.useRef<FaceCameraHandle>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const consent = React.useMemo(() => readFaceConsent(), []);
  const [mode, setMode] = React.useState<Mode>(consent ? "choose" : "consent");
  const [guidance, setGuidance] = React.useState<Guidance>("loading");
  const [submitting, setSubmitting] = React.useState(false);
  const [startingAadhaar, setStartingAadhaar] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const engine = useQuery({
    queryKey: ["enrollment", "face"],
    queryFn: () => api<{ faceEngine: "server" | "client" }>("/enrollment/face"),
  });

  /** Sends the user to the mocked Aadhaar portal to authenticate and consent. */
  async function beginAadhaarConsent() {
    setStartingAadhaar(true);
    setError(null);
    try {
      const started = await api<AadhaarStart>("/aadhaar/face/start", { method: "POST", body: {} });
      stashAadhaarTxn({ ...started, mobile: "", purpose: "face_id" });
      navigate("/aadhaar/verify");
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : t("common.somethingWrong"));
      setStartingAadhaar(false);
    }
  }

  async function enroll(image: string, source: "selfie" | "document") {
    if (!consent) {
      setMode("consent");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const body: Record<string, unknown> = {
        source,
        consentId: consent.consentId,
        txnId: consent.txnId,
      };

      if (engine.data?.faceEngine === "client") {
        // The browser owns the model in this deployment; post the descriptor only.
        const reading = await describeJpeg(image);
        if (!reading) throw new ApiClientError(422, "NO_FACE", t("enroll.noFace"));
        body.reading = reading;
      } else {
        body.image = image;
      }

      await api("/enrollment/face", { method: "POST", body });
      clearFaceConsent();
      refresh();
      setMode("done");
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : t("enroll.noFace"));
    } finally {
      setSubmitting(false);
    }
  }

  function captureSelfie() {
    const image = cameraRef.current?.capture();
    if (image) void enroll(image, "selfie");
  }

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      try {
        void enroll(captureImageElementJpeg(img), "document");
      } finally {
        URL.revokeObjectURL(img.src);
      }
    };
    img.onerror = () => setError(t("enroll.noFace"));
    img.src = URL.createObjectURL(file);
  }

  if (engine.isLoading) return <Skeleton className="h-80 w-full rounded-xl" />;

  /* ------------------------------------------------------ Aadhaar consent gate */
  if (mode === "consent") {
    return (
      <VerifyStepLayout title={t("enroll.title")} description={t("enroll.intro")}>
        <Alert>
          <Landmark className="size-4" />
          <AlertTitle>{t("aadhaar.faceConsentTitle")}</AlertTitle>
          <AlertDescription>{t("profile.faceIdNeedsConsent")}</AlertDescription>
        </Alert>

        {enrollment.data?.enrolled && (
          <Alert>
            <CheckCircle2 className="size-4" />
            <AlertDescription>
              {t("profile.faceIdAadhaarLinked", {
                uid: enrollment.data.enrollment?.maskedAadhaar ?? "",
              })}
            </AlertDescription>
          </Alert>
        )}

        <Button
          size="lg"
          className="w-full"
          onClick={beginAadhaarConsent}
          disabled={startingAadhaar}
        >
          {startingAadhaar ? <Loader2 className="animate-spin" /> : <Landmark />}
          {t("auth.continueToAadhaar")}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </VerifyStepLayout>
    );
  }

  if (mode === "done") {
    return (
      <VerifyStepLayout title={t("enroll.title")}>
        <Alert>
          <CheckCircle2 className="size-4" />
          <AlertTitle>{t("enroll.success")}</AlertTitle>
          <AlertDescription>{t("enroll.successBody")}</AlertDescription>
        </Alert>
        <Button className="w-full" onClick={() => navigate("/verify/face")}>
          {t("action.face_match")}
        </Button>
      </VerifyStepLayout>
    );
  }

  return (
    <VerifyStepLayout title={t("enroll.title")} description={t("enroll.intro")}>
      <Alert>
        <ShieldCheck className="size-4" />
        <AlertDescription>
          {t("profile.faceIdTxn", { txn: consent?.txnId ?? "" })}
        </AlertDescription>
      </Alert>

      {mode === "choose" && (
        <div className="grid gap-3">
          <Card
            role="button"
            tabIndex={0}
            className="hover:bg-accent/40 cursor-pointer transition-colors"
            onClick={() => setMode("selfie")}
            onKeyDown={(e) => e.key === "Enter" && setMode("selfie")}
          >
            <CardHeader>
              <div className="flex items-start gap-3">
                <Camera className="mt-1 size-5 shrink-0" />
                <div>
                  <CardTitle className="text-base">{t("enroll.selfieTitle")}</CardTitle>
                  <CardDescription>{t("enroll.selfieBody")}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card
            role="button"
            tabIndex={0}
            className="hover:bg-accent/40 cursor-pointer transition-colors"
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
          >
            <CardHeader>
              <div className="flex items-start gap-3">
                <IdCard className="mt-1 size-5 shrink-0" />
                <div>
                  <CardTitle className="text-base">{t("enroll.documentTitle")}</CardTitle>
                  <CardDescription>{t("enroll.documentBody")}</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Alert>
            <ShieldCheck className="size-4" />
            <AlertDescription>{t("enroll.privacy")}</AlertDescription>
          </Alert>
        </div>
      )}

      {mode === "selfie" && (
        <>
          <FaceCamera ref={cameraRef} onReading={(_r, g) => setGuidance(g)} />
          <Button
            className="w-full"
            size="lg"
            disabled={guidance !== "ready" || submitting}
            onClick={captureSelfie}
          >
            {submitting ? <Loader2 className="animate-spin" /> : <Camera />}
            {submitting ? t("enroll.processing") : t("enroll.capture")}
          </Button>
        </>
      )}

      {submitting && mode === "choose" && (
        <div className="text-muted-foreground flex items-center justify-center gap-2 py-4">
          <Loader2 className="size-4 animate-spin" />
          {t("enroll.processing")}
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={onFile} />

      {mode === "choose" && (
        <Button variant="outline" className="w-full" onClick={() => fileRef.current?.click()}>
          <Upload />
          {t("enroll.chooseFile")}
        </Button>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </VerifyStepLayout>
  );
}
