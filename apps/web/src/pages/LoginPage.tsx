import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { HeartHandshake, Loader2, ArrowRight, ShieldCheck, CircleAlert, IdCard } from "lucide-react";
import type { BilingualText } from "@jeevansetu/shared";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { api, ApiClientError } from "@/lib/api";
import { currentLocale } from "@/i18n";
import { stashAadhaarTxn } from "@/features/aadhaar/txnStore";

interface DirectoryEntry {
  maskedUid: string;
  name: BilingualText;
  registeredMobile: string;
  maskedMobile: string;
  age: number;
  district: string;
  state: string;
  scenario: BilingualText;
  pensionStatus: "active" | "stopped" | "not_eligible";
  eligible: boolean;
}

export function LoginPage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const { startAadhaarAuth, user } = useAuth();
  const navigate = useNavigate();
  const locale = currentLocale();

  const [mobile, setMobile] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  // Inline, not a toast: this is a correction to the field the user just filled in.
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (user) navigate("/dashboard", { replace: true });
  }, [user, navigate]);

  /**
   * The demo directory is public, so it is still here after a logout. Previously
   * this list came from a dev-only endpoint that needed a session, which left a
   * logged-out user with no way of knowing which numbers exist.
   */
  const directory = useQuery({
    queryKey: ["aadhaar-directory"],
    queryFn: () => api<{ entries: DirectoryEntry[]; demoOtp: string }>("/aadhaar/directory", { auth: false }),
    staleTime: 5 * 60 * 1000,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^\d{10}$/.test(mobile)) {
      setError(t("auth.errors.format"));
      return;
    }

    setSubmitting(true);
    try {
      const started = await startAadhaarAuth(mobile);
      stashAadhaarTxn({ ...started, mobile, purpose: "login" });
      // Off to the (mocked) Aadhaar portal — the OTP is entered there, not here.
      navigate("/aadhaar/verify");
    } catch (err) {
      if (err instanceof ApiClientError) setError(err.message);
      else setError(t("auth.errors.generic"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-muted/30 flex min-h-screen flex-col">
      <div className="flex justify-end gap-2 p-4">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <div className="mx-auto w-full max-w-md flex-1 space-y-6 px-4 pb-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="bg-primary text-primary-foreground flex size-12 items-center justify-center rounded-xl">
            <HeartHandshake className="size-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{t("common.appName")}</h1>
            <p className="text-muted-foreground text-sm">{t("common.tagline")}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("auth.title")}</CardTitle>
            <CardDescription>{t("auth.subtitle")}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="mobile">{t("auth.mobileLabel")}</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm tabular-nums">+91</span>
                  <Input
                    id="mobile"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder={t("auth.mobilePlaceholder")}
                    value={mobile}
                    maxLength={10}
                    aria-invalid={!!error}
                    aria-describedby="mobile-help mobile-error"
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, ""));
                      if (error) setError(null);
                    }}
                    className="tabular-nums"
                  />
                </div>
                <p id="mobile-help" className="text-muted-foreground text-xs">
                  {t("auth.mobileHelp")}
                </p>
              </div>

              {error && (
                <Alert variant="destructive" id="mobile-error">
                  <CircleAlert className="size-4" />
                  <AlertTitle>{t("auth.errors.title")}</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Alert>
                <ShieldCheck className="size-4" />
                <AlertDescription>{t("auth.redirectNotice")}</AlertDescription>
              </Alert>

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="animate-spin" /> : null}
                {t("auth.continueToAadhaar")}
                <ArrowRight />
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("auth.demoUsersTitle")}</CardTitle>
            <CardDescription>{t("auth.demoHint")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {directory.isLoading && <Skeleton className="h-40 w-full rounded-lg" />}

            {directory.isError && (
              <Alert variant="destructive">
                <CircleAlert className="size-4" />
                <AlertDescription>{t("auth.errors.directory")}</AlertDescription>
              </Alert>
            )}

            {directory.data?.entries.map((entry) => (
              <button
                key={entry.maskedUid}
                type="button"
                className="hover:bg-accent focus-visible:ring-ring w-full rounded-lg border p-3 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none"
                onClick={() => {
                  setMobile(entry.registeredMobile);
                  setError(null);
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{entry.name[locale]}</p>
                    <p className="text-muted-foreground text-xs">
                      {t("auth.demoAge", { age: entry.age })} · {entry.district}
                    </p>
                  </div>
                  <Badge variant={entry.eligible ? "secondary" : "outline"} className="shrink-0">
                    {t(`auth.pensionStatus.${entry.pensionStatus}`)}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-2 text-xs">{entry.scenario[locale]}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs font-medium tabular-nums">
                  <IdCard className="size-3.5" />
                  {entry.registeredMobile}
                  <span className="text-muted-foreground font-normal">· {entry.maskedUid}</span>
                </p>
              </button>
            ))}

            {directory.data && (
              <Alert className="mt-3">
                <AlertDescription>
                  {t("auth.demoOtp", { code: directory.data.demoOtp })}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
