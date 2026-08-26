import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { XCircle, HeartHandshake, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { api } from "@/lib/api";
import { CertificateDocument, type CertificateView } from "@/features/certificate/CertificateDocument";

interface CheckResult {
  found: boolean;
  valid: boolean;
  isOwner: boolean;
  certificate?: CertificateView;
}

/**
 * The link printed on the certificate and encoded in its QR code.
 *
 * It renders the certificate itself rather than a bare valid/invalid answer, so the
 * person holding the link sees the document they were sent. Personal details are
 * redacted server-side for anyone who is not the holder — the API decides that from
 * the access token, not this page.
 */
export function CertificateCheckPage() {
  const { code } = useParams<{ code: string }>();
  const { t, i18n } = useTranslation();
  void i18n.language;

  const query = useQuery({
    queryKey: ["certificate-check", code],
    queryFn: () => api<CheckResult>(`/certificates/verify/${code}`),
    enabled: !!code,
    retry: false,
  });

  return (
    <div className="bg-muted/30 min-h-screen">
      <header className="flex items-center gap-3 px-4 py-4">
        <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg">
          <HeartHandshake className="size-5" />
        </div>
        <div className="min-w-0">
          <p className="truncate font-semibold">{t("common.appName")}</p>
          <p className="text-muted-foreground text-xs">{t("certificate.checkTitle")}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl space-y-4 px-4 pb-16">
        {query.isLoading && <Skeleton className="h-[32rem] w-full rounded-xl" />}

        {(query.isError || (query.data && !query.data.found)) && (
          <Card>
            <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
              <XCircle className="text-destructive size-14" aria-hidden="true" />
              <p className="text-xl font-semibold">{t("certificate.notFound")}</p>
              <p className="text-muted-foreground max-w-sm text-sm">
                {t("certificate.notFoundHelp")}
              </p>
              <Link to="/dashboard" className="text-primary text-sm hover:underline">
                {t("certificate.backToDashboard")}
              </Link>
            </CardContent>
          </Card>
        )}

        {query.data?.found && query.data.certificate && (
          <>
            {query.data.isOwner && (
              <Alert>
                <UserCheck className="size-4" />
                <AlertDescription>{t("certificate.ownerNotice")}</AlertDescription>
              </Alert>
            )}
            <CertificateDocument view={query.data.certificate} />
          </>
        )}
      </main>
    </div>
  );
}
