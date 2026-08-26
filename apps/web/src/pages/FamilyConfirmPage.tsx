import * as React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";
import { HeartHandshake, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { api } from "@/lib/api";

interface ConfirmationPreview {
  request: { status: string };
  pensioner: { name: { en: string; hi: string }; photoInitials: string; district: string };
  contact: { name: string; relation: string };
  expired: boolean;
}

export function FamilyConfirmPage() {
  const { token } = useParams<{ token: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as "en" | "hi";
  const [statement, setStatement] = React.useState("");
  const [result, setResult] = React.useState<"confirmed" | "declined" | null>(null);

  const preview = useQuery({
    queryKey: ["family-confirmation", token],
    queryFn: () => api<ConfirmationPreview>(`/family/confirmations/${token}`, { auth: false }),
    enabled: !!token,
  });

  const respond = useMutation({
    mutationFn: (action: "confirm" | "decline") =>
      api(`/family/confirmations/${token}/respond`, { method: "POST", body: { action, statement }, auth: false }),
    onSuccess: (_data, action) => setResult(action === "confirm" ? "confirmed" : "declined"),
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-end p-4">
        <LanguageToggle />
      </div>
      <div className="container flex max-w-md flex-col items-center gap-6 px-4 pb-16 pt-4 text-center">
        <div className="rounded-full bg-primary/10 p-4 text-primary">
          <HeartHandshake className="h-10 w-10" aria-hidden="true" />
        </div>

        {preview.isLoading && <p className="text-lg text-muted-foreground">{t("common.loading")}</p>}

        {preview.data && !result && (
          <Card className="w-full text-left">
            <CardHeader>
              <CardTitle>{t("family.confirmTitle")}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {preview.data.expired ? (
                <p className="text-lg text-destructive">{t("family.expired")}</p>
              ) : (
                <>
                  <p className="text-lg">{t("family.confirmBody", { name: preview.data.pensioner.name[lang] })}</p>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="statement">{t("family.statementLabel")}</Label>
                    <textarea
                      id="statement"
                      value={statement}
                      onChange={(e) => setStatement(e.target.value)}
                      className="min-h-24 rounded-xl border-2 border-input bg-background p-3 text-lg"
                    />
                  </div>
                  <Button size="lg" onClick={() => respond.mutate("confirm")} disabled={respond.isPending}>
                    {t("family.confirmButton", { name: preview.data.pensioner.name[lang] })}
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => respond.mutate("decline")} disabled={respond.isPending}>
                    {t("family.declineButton")}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {result === "confirmed" && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="h-16 w-16 text-success" aria-hidden="true" />
            <p className="text-xl font-bold text-success">{t("family.thankYou")}</p>
          </div>
        )}
        {result === "declined" && (
          <div className="flex flex-col items-center gap-3">
            <XCircle className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
            <p className="text-xl font-bold">{t("family.declined")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
