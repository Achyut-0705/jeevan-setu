import * as React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Send, Loader2, CheckCircle2, Video, LifeBuoy } from "lucide-react";
import type { FamilyContact } from "@jeevansetu/shared";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { VerifyStepLayout } from "@/features/verify/VerifyStepLayout";
import { useEnsureSession, useRefreshVerification } from "@/features/verify/useVerification";
import { api, ApiClientError } from "@/lib/api";
import { currentLocale } from "@/i18n";

export function FamilyStepPage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const locale = currentLocale();
  const navigate = useNavigate();
  const { session } = useEnsureSession();
  const refresh = useRefreshVerification();
  const [selected, setSelected] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [link, setLink] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const contacts = useQuery({
    queryKey: ["family-contacts"],
    queryFn: () => api<{ contacts: FamilyContact[] }>("/users/me/family-contacts"),
  });

  React.useEffect(() => {
    const first = contacts.data?.contacts.find((c) => c.canAttest);
    if (first && !selected) setSelected(first.id);
  }, [contacts.data, selected]);

  async function send() {
    if (!session || !selected) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await api<{ link: string }>(
        `/verification/sessions/${session.id}/signals/family-request`,
        { method: "POST", body: { familyContactId: selected } }
      );
      setLink(res.link);
      setSent(true);
      refresh();
    } catch (err) {
      setError(err instanceof ApiClientError ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const list = contacts.data?.contacts ?? [];

  if (sent) {
    return (
      <VerifyStepLayout title={t("verify.family.title")}>
        <Alert>
          <CheckCircle2 className="size-4" />
          <AlertTitle>{t("verify.family.sent")}</AlertTitle>
          {link && (
            <AlertDescription className="break-all">
              <span className="text-muted-foreground text-xs">{t("family.demoLink")}</span>
              <a href={link} className="block underline" target="_blank" rel="noreferrer">
                {link}
              </a>
            </AlertDescription>
          )}
        </Alert>
        <Button className="w-full" onClick={() => navigate("/verify")}>
          {t("common.continue")}
        </Button>
      </VerifyStepLayout>
    );
  }

  return (
    <VerifyStepLayout title={t("verify.family.title")} description={t("verify.family.body")}>
      {list.length === 0 ? (
        <>
          {/* Nobody can be added by hand — the list comes from Aadhaar. Point at the
              routes that do not need an attester instead of offering a dead end. */}
          <Alert>
            <AlertTitle>{t("family.noneOnRecord")}</AlertTitle>
            <AlertDescription>{t("family.noneOnRecordHelp")}</AlertDescription>
          </Alert>
          <Button className="w-full" onClick={() => navigate("/call")}>
            <Video />
            {t("call.book")}
          </Button>
          <Button variant="outline" className="w-full" onClick={() => navigate("/help")}>
            <LifeBuoy />
            {t("reviews.request")}
          </Button>
        </>
      ) : (
        <>
          <fieldset className="space-y-2">
            <legend className="mb-2 text-sm font-medium">{t("verify.family.selectContact")}</legend>
            {list.map((c) => (
              <Label
                key={c.id}
                htmlFor={c.id}
                className="hover:bg-accent/40 flex cursor-pointer items-center gap-3 rounded-lg border p-4 font-normal"
              >
                <input
                  id={c.id}
                  type="radio"
                  name="contact"
                  className="size-4"
                  checked={selected === c.id}
                  disabled={!c.canAttest}
                  onChange={() => setSelected(c.id)}
                />
                <span className="font-medium">{c.name[locale]}</span>
                <span className="text-muted-foreground text-sm">
                  {c.relation} · {c.maskedMobile}
                </span>
              </Label>
            ))}
          </fieldset>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button className="w-full" size="lg" onClick={send} disabled={!selected || submitting}>
            {submitting ? <Loader2 className="animate-spin" /> : <Send />}
            {t("verify.family.send")}
          </Button>
        </>
      )}
    </VerifyStepLayout>
  );
}
