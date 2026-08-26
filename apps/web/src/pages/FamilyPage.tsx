import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Users, Landmark, ArrowRight, ShieldCheck, ShieldOff } from "lucide-react";
import type { FamilyContact } from "@jeevansetu/shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { currentLocale } from "@/i18n";

/**
 * Family, read from the Aadhaar record.
 *
 * There is deliberately no way to add a relative here. An attester who is not on the
 * pensioner's Aadhaar record is the obvious way to defraud a life certificate — you
 * would simply ask a friend to vouch for you. Sourcing the list from Aadhaar closes
 * that, and the empty state exists because some people genuinely have nobody on
 * record; they are pointed at the routes that do not need one.
 */
export function FamilyPage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const { user } = useAuth();
  const navigate = useNavigate();
  const locale = currentLocale();

  const contacts = useQuery({
    queryKey: ["family-contacts"],
    queryFn: () => api<{ contacts: FamilyContact[] }>("/users/me/family-contacts"),
  });

  const list = contacts.data?.contacts ?? [];

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("nav.family")}</h1>
        <p className="text-muted-foreground text-sm">{t("verify.family.body")}</p>
      </div>

      <Alert>
        <Landmark className="size-4" />
        <AlertDescription>{t("profile.familyReadOnly")}</AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("profile.familyContacts")}</CardTitle>
          <CardDescription>
            {t("profile.sourceAadhaar")}
            {user ? ` · ${user.maskedAadhaar}` : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contacts.isLoading ? (
            <Skeleton className="h-24 w-full" />
          ) : list.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Users className="text-muted-foreground size-9" />
              <p className="font-medium">{t("family.noneOnRecord")}</p>
              <p className="text-muted-foreground max-w-sm text-sm">
                {t("family.noneOnRecordHelp")}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <Button size="sm" onClick={() => navigate("/verify")}>
                  {t("dashboard.startVerification")}
                  <ArrowRight />
                </Button>
                <Button size="sm" variant="outline" onClick={() => navigate("/call")}>
                  {t("call.book")}
                </Button>
              </div>
            </div>
          ) : (
            <ul className="divide-y">
              {list.map((c) => (
                <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.name[locale]}</p>
                    <p className="text-muted-foreground text-sm">
                      {c.relation} · {c.maskedMobile}
                    </p>
                    <p className="text-muted-foreground text-xs">{c.maskedUid}</p>
                  </div>
                  {c.canAttest ? (
                    <Badge variant="secondary" className="gap-1.5">
                      <ShieldCheck className="size-3.5" />
                      {t("family.canAttest")}
                    </Badge>
                  ) : (
                    <div className="text-right">
                      <Badge variant="outline" className="gap-1.5">
                        <ShieldOff className="size-3.5" />
                        {t("family.cannotAttest")}
                      </Badge>
                      <p className="text-muted-foreground mt-1 max-w-[16rem] text-xs">
                        {t("family.cannotAttestHelp")}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {list.some((c) => c.canAttest) && (
        <Button onClick={() => navigate("/verify/family")}>
          {t("action.family_confirmation")}
          <ArrowRight />
        </Button>
      )}
    </div>
  );
}
