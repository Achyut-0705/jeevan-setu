import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Award, ArrowRight } from "lucide-react";
import type { Certificate, VerificationSession } from "@jeevansetu/shared";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { currentLocale } from "@/i18n";

export function CertificatesPage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const navigate = useNavigate();
  const dateLocale = currentLocale() === "hi" ? "hi-IN" : "en-IN";

  const timeline = useQuery({
    queryKey: ["timeline"],
    queryFn: () =>
      api<{ sessions: VerificationSession[]; certificates: Certificate[] }>("/users/me/timeline"),
  });

  const certificates = [...(timeline.data?.certificates ?? [])].sort((a, b) =>
    a.issuedAt < b.issuedAt ? 1 : -1
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">{t("nav.certificates")}</h1>

      {timeline.isLoading ? (
        <Skeleton className="h-40 w-full rounded-xl" />
      ) : certificates.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
            <Award className="text-muted-foreground size-10" />
            <p className="text-muted-foreground">{t("dashboard.noHistory")}</p>
            <Button onClick={() => navigate("/verify")}>{t("dashboard.startVerification")}</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {certificates.map((c) => {
            const expired = c.status !== "active" || new Date(c.validUntil) <= new Date();
            return (
              <Card key={c.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-base">{c.certificateNumber}</CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {t("certificate.issuedOn", {
                          date: new Date(c.issuedAt).toLocaleDateString(dateLocale),
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={expired ? "secondary" : "default"}>
                        {t(`certificate.${c.kind}`)}
                      </Badge>
                      <Badge variant="outline">{c.confidenceScore}%</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/certificates/${c.id}`)}>
                    {t("common.continue")}
                    <ArrowRight />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
