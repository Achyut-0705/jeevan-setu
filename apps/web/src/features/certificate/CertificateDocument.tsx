import * as React from "react";
import { useTranslation } from "react-i18next";
import { Award, CheckCircle2, XCircle, EyeOff } from "lucide-react";
import type { BilingualText, CertificateKind, SignalType, Tier } from "@jeevansetu/shared";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { QrCode } from "./QrCode";
import { currentLocale } from "@/i18n";

/**
 * The certificate itself.
 *
 * One component renders the holder's own view and the shared verification view, and
 * it mirrors the PDF field for field and in the same order — including the
 * verification block, where the human-readable code sits above the QR and the URL
 * below it. A pensioner who downloads the PDF and a clerk who opens the link are
 * looking at the same document.
 */

export interface CertificateView {
  certificateNumber: string;
  verificationCode: string;
  verifyUrl: string;
  kind: CertificateKind;
  tier: Tier;
  confidenceScore: number;
  signalsUsed: SignalType[];
  issuedAt: string;
  validFrom: string;
  validUntil: string;
  status: string;
  valid: boolean;
  redacted: boolean;
  holder: {
    name: BilingualText;
    maskedAadhaar: string;
    district: string;
    state: string;
    dob?: string;
    passbookNumber?: string;
    disbursingAgency?: string;
    sanctioningAuthority?: string;
    maskedAccount?: string;
  };
}

export function CertificateDocument({ view }: { view: CertificateView }) {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const locale = currentLocale();
  const dateLocale = locale === "hi" ? "hi-IN" : "en-IN";
  const fmt = (iso: string) => new Date(iso).toLocaleDateString(dateLocale);

  return (
    <div className="bg-card overflow-hidden rounded-xl border">
      {/* Header — matches the green band at the top of the PDF. */}
      <div className="bg-primary text-primary-foreground flex items-start gap-3 p-6">
        <Award className="mt-0.5 size-8 shrink-0" />
        <div className="min-w-0">
          <p className="text-lg font-semibold">{t("certificate.title")}</p>
          <p className="text-primary-foreground/80 text-sm">{t(`certificate.${view.kind}`)}</p>
          <p className="text-primary-foreground/70 mt-1 text-xs">{t("certificate.disclaimer")}</p>
        </div>
      </div>

      <div className="space-y-6 p-6">
        <div className="flex flex-wrap items-center gap-2">
          {view.valid ? (
            <Badge className="gap-1.5">
              <CheckCircle2 className="size-3.5" />
              {t("certificate.validNotice")}
            </Badge>
          ) : (
            <Badge variant="destructive" className="gap-1.5">
              <XCircle className="size-3.5" />
              {t("certificate.expiredNotice")}
            </Badge>
          )}
          <Badge variant="outline">{view.confidenceScore}%</Badge>
          <Badge variant="secondary">{t(`tier.${view.tier}.label`)}</Badge>
        </div>

        <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
          {/* Details, in PDF order */}
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Field label="Certificate No." value={view.certificateNumber} />
            <Field label={t("certificate.holder")} value={view.holder.name[locale]} />
            <Field label={t("certificate.aadhaarNumber")} value={view.holder.maskedAadhaar} />
            {view.holder.passbookNumber && (
              <Field label={t("certificate.passbookNumber")} value={view.holder.passbookNumber} />
            )}
            {view.holder.dob && <Field label={t("profile.dob")} value={fmt(view.holder.dob)} />}
            {view.holder.disbursingAgency && (
              <div className="col-span-2">
                <Field label={t("certificate.agency")} value={view.holder.disbursingAgency} />
              </div>
            )}
            {view.holder.maskedAccount && (
              <Field label={t("certificate.account")} value={view.holder.maskedAccount} />
            )}
            <Field
              label={t("profile.address")}
              value={`${view.holder.district}, ${view.holder.state}`}
            />
            <Field label={t("certificate.issuedOnLabel")} value={fmt(view.issuedAt)} />
            <Field label={t("certificate.validUntilLabel")} value={fmt(view.validUntil)} />
          </dl>

          {/* Verification block — code, then QR, then URL. Same order as the PDF. */}
          <div className="mx-auto w-full max-w-[13rem] text-center sm:mx-0">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">
              {t("certificate.verificationCode")}
            </p>
            <p className="mt-1 font-mono text-lg font-semibold tracking-widest">
              {view.verificationCode}
            </p>
            <div className="bg-background mt-3 inline-flex rounded-lg border p-2">
              <QrCode value={view.verifyUrl} size={132} />
            </div>
            <p className="text-muted-foreground mt-3 text-xs">{t("certificate.verifyAt")}</p>
            <a
              href={view.verifyUrl}
              className="text-primary text-xs break-all hover:underline"
              rel="noreferrer"
            >
              {view.verifyUrl}
            </a>
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-muted-foreground mb-2 text-xs tracking-wide uppercase">
            {t("certificate.methodsUsed")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {view.signalsUsed.map((s) => (
              <Badge key={s} variant="secondary">
                {t(`signal.${s}.label`)}
              </Badge>
            ))}
          </div>
        </div>

        {view.redacted && (
          <Alert>
            <EyeOff className="size-4" />
            <AlertDescription>{t("certificate.redactedNotice")}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 space-y-0.5">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="font-medium break-words">{value}</dd>
    </div>
  );
}
