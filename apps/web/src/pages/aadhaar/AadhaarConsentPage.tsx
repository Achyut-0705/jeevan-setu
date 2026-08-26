import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Loader2, CircleAlert, ShieldCheck, ScanFace, X } from "lucide-react";
import type { AadhaarConsentScope } from "@jeevansetu/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { AadhaarChrome } from "@/features/aadhaar/AadhaarChrome";
import { clearAadhaarTxn, readAadhaarTxn } from "@/features/aadhaar/txnStore";
import { stashFaceConsent } from "@/features/aadhaar/faceConsentStore";
import { useAuth } from "@/context/AuthContext";
import { api, ApiClientError } from "@/lib/api";
import { currentLocale } from "@/i18n";

const FACE_SCOPES: AadhaarConsentScope[] = ["face_authentication", "photo"];

/**
 * Step 2 on the (mocked) Aadhaar portal: informed consent.
 *
 * The screen lists the actual values about to be shared rather than field names,
 * because "we will share your address" and seeing your own address are different
 * things to agree to. Declining is a first-class button, not a back link.
 */
export function AadhaarConsentPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { grantConsent } = useAuth();
  const locale = currentLocale();

  const txn = React.useMemo(() => readAadhaarTxn(), []);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!txn) navigate("/login", { replace: true });
  }, [txn, navigate]);

  if (!txn) return null;

  const isFace = txn.purpose === "face_id";
  const scopes = isFace ? FACE_SCOPES : (txn.scopes ?? []);

  async function handleAgree() {
    if (!txn) return;
    setError(null);
    setSubmitting(true);
    try {
      if (isFace) {
        const res = await api<{ consentId: string; txnId: string; expiresAt: string }>(
          "/aadhaar/face/consent",
          { method: "POST", body: { txnId: txn.txnId, agreed: true } }
        );
        // The enrolment endpoint will only accept a capture quoting this pair.
        stashFaceConsent(res);
        clearAadhaarTxn();
        navigate("/verify/enroll", { replace: true });
      } else {
        await grantConsent(txn.txnId, scopes);
        clearAadhaarTxn();
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : t("auth.errors.generic"));
    } finally {
      setSubmitting(false);
    }
  }

  function decline() {
    clearAadhaarTxn();
    navigate(isFace ? "/profile" : "/login", { replace: true });
  }

  const preview = txn.preview;

  return (
    <AadhaarChrome step={2} totalSteps={2}>
      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
              {isFace ? <ScanFace className="size-5" /> : <ShieldCheck className="size-5" />}
            </div>
            <div>
              <CardTitle>{isFace ? t("aadhaar.faceConsentTitle") : t("aadhaar.consentTitle")}</CardTitle>
              <CardDescription>
                {isFace ? t("aadhaar.faceConsentBody") : t("aadhaar.consentBody")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              {t("aadhaar.purposeLabel")}
            </p>
            <p className="text-sm">
              {isFace ? t("aadhaar.facePurpose") : t("aadhaar.loginPurpose")}
            </p>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
              {t("aadhaar.willShareLabel")}
            </p>
            <ul className="space-y-2 text-sm">
              {scopes.map((scope) => (
                <li key={scope} className="flex items-start gap-2">
                  <ShieldCheck className="text-primary mt-0.5 size-4 shrink-0" />
                  <div>
                    <p className="font-medium">{t(`aadhaar.scope.${scope}.label`)}</p>
                    <p className="text-muted-foreground text-xs">
                      {t(`aadhaar.scope.${scope}.help`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {preview && !isFace && (
            <>
              <Separator />
              <div>
                <p className="text-muted-foreground mb-2 text-xs font-medium tracking-wide uppercase">
                  {t("aadhaar.previewLabel")}
                </p>
                <dl className="bg-muted/50 grid grid-cols-2 gap-3 rounded-lg border p-3 text-sm">
                  <Field label={t("profile.name")} value={preview.name[locale]} />
                  <Field label={t("aadhaar.uidLabel")} value={preview.maskedUid} />
                  <Field
                    label={t("profile.dob")}
                    value={new Date(preview.dob).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN")}
                  />
                  <Field label={t("profile.mobile")} value={preview.maskedMobile} />
                  <div className="col-span-2">
                    <Field
                      label={t("profile.address")}
                      value={`${preview.address.house}, ${preview.address.street}, ${preview.address.district}, ${preview.address.state} — ${preview.address.pincode}`}
                    />
                  </div>
                  <div className="col-span-2">
                    <Field
                      label={t("aadhaar.familyLabel")}
                      value={t("aadhaar.familyCount", { count: preview.familyCount })}
                    />
                  </div>
                </dl>
              </div>
            </>
          )}

          {error && (
            <Alert variant="destructive">
              <CircleAlert className="size-4" />
              <AlertTitle>{t("aadhaar.errors.title")}</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Alert>
            <AlertDescription>{t("aadhaar.withdrawNotice")}</AlertDescription>
          </Alert>

          <div className="flex flex-col gap-2 sm:flex-row-reverse">
            <Button size="lg" className="sm:flex-1" onClick={handleAgree} disabled={submitting}>
              {submitting ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
              {t("aadhaar.agree")}
            </Button>
            <Button size="lg" variant="outline" className="sm:flex-1" onClick={decline} disabled={submitting}>
              <X />
              {t("aadhaar.decline")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </AadhaarChrome>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
