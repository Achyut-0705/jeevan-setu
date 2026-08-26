import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Loader2, CircleAlert, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AadhaarChrome } from "@/features/aadhaar/AadhaarChrome";
import { clearAadhaarTxn, readAadhaarTxn, stashAadhaarTxn } from "@/features/aadhaar/txnStore";
import { useAuth, type AadhaarVerifyResult } from "@/context/AuthContext";
import { api, ApiClientError } from "@/lib/api";
import { currentLocale } from "@/i18n";

/**
 * Step 1 on the (mocked) Aadhaar portal: the OTP Aadhaar sent to the registered
 * mobile. Note that JeevanSetu never sees this code — it is posted to the Aadhaar
 * endpoints, which is why this screen is styled as a different site entirely.
 */
export function AadhaarVerifyPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { verifyAadhaarOtp, completeLogin } = useAuth();
  const locale = currentLocale();

  const txn = React.useMemo(() => readAadhaarTxn(), []);
  const [code, setCode] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // A refresh after the transaction was cleared, or a direct visit: send them back
    // rather than showing an OTP box that cannot work.
    if (!txn) navigate("/login", { replace: true });
  }, [txn, navigate]);

  if (!txn) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!txn) return;
    setError(null);
    setSubmitting(true);

    try {
      if (txn.purpose === "face_id") {
        await api("/aadhaar/face/otp/verify", { method: "POST", body: { txnId: txn.txnId, code } });
        stashAadhaarTxn({ ...txn });
        navigate("/aadhaar/consent");
        return;
      }

      const result: AadhaarVerifyResult = await verifyAadhaarOtp(txn.txnId, code);
      if (result.requiresConsent) {
        stashAadhaarTxn({ ...txn, preview: result.preview, scopes: result.scopes });
        navigate("/aadhaar/consent");
      } else {
        // Consent is already on file from an earlier visit — complete and return.
        await completeLogin(txn.txnId);
        clearAadhaarTxn();
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : t("auth.errors.generic"));
    } finally {
      setSubmitting(false);
    }
  }

  function abandon() {
    clearAadhaarTxn();
    navigate("/login", { replace: true });
  }

  return (
    <AadhaarChrome step={1} totalSteps={2}>
      <Card>
        <CardHeader>
          <CardTitle>{t("aadhaar.otpTitle")}</CardTitle>
          <CardDescription>
            {t("aadhaar.otpSubtitle", { mobile: txn.maskedMobile, uid: txn.maskedUid })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg border p-3 text-sm">
            <p className="text-muted-foreground text-xs">{t("aadhaar.requestingEntity")}</p>
            <p className="font-medium">{t("common.appName")}</p>
            <p className="text-muted-foreground mt-2 text-xs">{t("aadhaar.holder")}</p>
            <p className="font-medium">{txn.holderName[locale]}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="otp">{t("aadhaar.otpLabel")}</Label>
              <Input
                id="otp"
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus
                maxLength={6}
                value={code}
                aria-invalid={!!error}
                onChange={(e) => {
                  setCode(e.target.value.replace(/\D/g, ""));
                  if (error) setError(null);
                }}
                className="text-center text-xl tracking-[0.4em] tabular-nums"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <CircleAlert className="size-4" />
                <AlertTitle>{t("aadhaar.errors.title")}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert>
              <AlertDescription>{t("auth.demoOtp", { code: txn.demoCode })}</AlertDescription>
            </Alert>

            <Button type="submit" size="lg" className="w-full" disabled={submitting || code.length !== 6}>
              {submitting ? <Loader2 className="animate-spin" /> : null}
              {t("aadhaar.verifyOtp")}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={abandon}>
              <RotateCcw />
              {t("aadhaar.cancelAndReturn")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </AadhaarChrome>
  );
}
