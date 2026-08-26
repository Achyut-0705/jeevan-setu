import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Landmark, PlayCircle, Loader2, ShieldOff } from "lucide-react";
import { toast } from "sonner";
import type { AadhaarConsent } from "@jeevansetu/shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { api, ApiClientError } from "@/lib/api";
import { useOnboarding } from "@/features/onboarding/OnboardingProvider";
import { currentLocale } from "@/i18n";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useA11y } from "@/context/A11yContext";
import { setAppLanguage } from "@/i18n";

function SettingRow({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="space-y-0.5">
        <Label htmlFor={id} className="text-base">
          {title}
        </Label>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function SettingsPage() {
  const { t, i18n } = useTranslation();
  const a11y = useA11y();
  const isHindi = i18n.language === "hi";
  const onboarding = useOnboarding();
  const qc = useQueryClient();
  const dateLocale = currentLocale() === "hi" ? "hi-IN" : "en-IN";

  const consent = useQuery({
    queryKey: ["aadhaar-consent"],
    queryFn: () => api<{ consent: AadhaarConsent | null; maskedUid: string | null }>("/aadhaar/consent"),
  });

  const revoke = useMutation({
    mutationFn: () => api("/aadhaar/consent/revoke", { method: "POST", body: {} }),
    onSuccess: () => {
      toast.success(t("aadhaar.consentStatus.revoked"));
      void qc.invalidateQueries({ queryKey: ["aadhaar-consent"] });
      void qc.invalidateQueries({ queryKey: ["enrollment"] });
    },
    onError: (err) =>
      toast.error(err instanceof ApiClientError ? err.message : t("common.somethingWrong")),
  });

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("nav.settings")}</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("common.language")}</CardTitle>
          <CardDescription>{t("a11y.languageHelp")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={!isHindi ? "default" : "outline"}
              onClick={() => setAppLanguage("en")}
              aria-pressed={!isHindi}
            >
              English
            </Button>
            <Button
              variant={isHindi ? "default" : "outline"}
              onClick={() => setAppLanguage("hi")}
              aria-pressed={isHindi}
            >
              हिन्दी
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("a11y.preferences")}</CardTitle>
        </CardHeader>
        <CardContent className="divide-y py-0">
          <SettingRow
            id="dark-mode"
            title={t("a11y.darkMode")}
            description={t("a11y.darkModeHelp")}
          >
            <Switch
              id="dark-mode"
              checked={a11y.theme === "dark"}
              onCheckedChange={(v) => a11y.setTheme(v ? "dark" : "light")}
            />
          </SettingRow>

          <SettingRow
            id="high-contrast"
            title={t("a11y.highContrast")}
            description={t("a11y.highContrastHelp")}
          >
            <Switch
              id="high-contrast"
              checked={a11y.highContrast}
              onCheckedChange={a11y.setHighContrast}
            />
          </SettingRow>

          <SettingRow
            id="reduced-motion"
            title={t("a11y.reducedMotion")}
            description={t("a11y.reducedMotionHelp")}
          >
            <Switch
              id="reduced-motion"
              checked={a11y.reducedMotion}
              onCheckedChange={a11y.setReducedMotion}
            />
          </SettingRow>

          <div className="space-y-3 py-4">
            <div className="space-y-0.5">
              <Label className="text-base">{t("a11y.fontSize")}</Label>
              <p className="text-muted-foreground text-sm">{t("a11y.fontSizeHelp")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 1.15, 1.3, 1.5].map((scale) => (
                <Button
                  key={scale}
                  variant={a11y.fontScale === scale ? "default" : "outline"}
                  size="sm"
                  aria-pressed={a11y.fontScale === scale}
                  onClick={() => a11y.setFontScale(scale)}
                >
                  {scale === 1 ? "A" : `A ×${scale}`}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Landmark className="text-muted-foreground size-4" />
            <CardTitle className="text-lg">{t("aadhaar.consentStatus.title")}</CardTitle>
          </div>
          <CardDescription>{t("aadhaar.consentStatus.help")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {consent.data?.consent ? (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">
                  {t("aadhaar.consentStatus.active", {
                    date: new Date(consent.data.consent.expiresAt).toLocaleDateString(dateLocale),
                  })}
                </Badge>
                {consent.data.maskedUid && <Badge variant="outline">{consent.data.maskedUid}</Badge>}
              </div>
              <ul className="text-muted-foreground space-y-1 text-sm">
                {consent.data.consent.scopes.map((scope) => (
                  <li key={scope}>· {t(`aadhaar.scope.${scope}.label`)}</li>
                ))}
              </ul>
              <Button
                variant="outline"
                size="sm"
                onClick={() => revoke.mutate()}
                disabled={revoke.isPending}
              >
                {revoke.isPending ? <Loader2 className="animate-spin" /> : <ShieldOff />}
                {t("aadhaar.consentStatus.revoke")}
              </Button>
            </>
          ) : (
            <Alert>
              <AlertDescription>{t("aadhaar.consentStatus.none")}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("onboarding.title")}</CardTitle>
          <CardDescription>{t("onboarding.steps.welcome.body")}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* The tour is replayable on demand, not only for a first-time user. */}
          <Button variant="outline" onClick={onboarding.start}>
            <PlayCircle />
            {t("onboarding.restart")}
          </Button>
        </CardContent>
      </Card>

      <Separator />
      <p className="text-muted-foreground text-xs">{t("certificate.disclaimer")}</p>
    </div>
  );
}
