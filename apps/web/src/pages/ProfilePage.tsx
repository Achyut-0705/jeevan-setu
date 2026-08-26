import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { ScanFace, CheckCircle2, CircleAlert, Landmark } from "lucide-react";
import type { FamilyContact } from "@jeevansetu/shared";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useFaceEnrollment } from "@/features/verify/useVerification";
import { api } from "@/lib/api";
import { currentLocale } from "@/i18n";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 space-y-0.5">
      <dt className="text-muted-foreground text-xs">{label}</dt>
      <dd className="font-medium break-words">{value}</dd>
    </div>
  );
}

export function ProfilePage() {
  const { t, i18n } = useTranslation();
  void i18n.language;
  const { user } = useAuth();
  const navigate = useNavigate();
  const enrollment = useFaceEnrollment();
  const locale = currentLocale();
  const dateLocale = locale === "hi" ? "hi-IN" : "en-IN";

  const contacts = useQuery({
    queryKey: ["family-contacts"],
    queryFn: () => api<{ contacts: FamilyContact[] }>("/users/me/family-contacts"),
  });

  if (!user) return <Skeleton className="h-96 w-full rounded-xl" />;

  const notEligible = user.pension.status === "not_eligible";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="size-14">
          <AvatarFallback className="text-lg">{user.photoInitials}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{user.name[locale]}</h1>
          <p className="text-muted-foreground text-sm">{t("profile.subtitle")}</p>
        </div>
      </div>

      {/* Personal data has no write path in this app — it is a projection of the
          Aadhaar record, refreshed on every login. Say so, rather than showing a
          disabled edit button. */}
      <Alert>
        <Landmark className="size-4" />
        <AlertDescription>{t("profile.readOnlyNotice")}</AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("profile.personal")}</CardTitle>
          <CardDescription>{t("profile.sourceAadhaar")}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4">
            <Field label={t("profile.name")} value={user.name[locale]} />
            <Field label={t("profile.aadhaarNumber")} value={user.maskedAadhaar} />
            <Field
              label={t("profile.dob")}
              value={new Date(user.dob).toLocaleDateString(dateLocale)}
            />
            <Field label={t("profile.mobile")} value={`+91 ${user.mobile}`} />
            <Field label={t("profile.gender")} value={user.gender} />
            <div className="col-span-2">
              <Field
                label={t("profile.address")}
                value={`${user.address.line1}, ${user.address.district}, ${user.address.state} — ${user.address.pincode}`}
              />
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("profile.pension")}</CardTitle>
        </CardHeader>
        <CardContent>
          {notEligible ? (
            <p className="text-muted-foreground text-sm">
              {user.pension.ineligibleReason?.[locale] ?? t("pension.notEligible")}
            </p>
          ) : (
            <>
              <dl className="grid grid-cols-2 gap-4">
                <Field label={t("profile.passbookNumber")} value={user.pension.passbookNumber} />
                <Field
                  label={t("profile.monthly")}
                  value={`₹${user.pension.monthlyAmount.toLocaleString("en-IN")}`}
                />
                <Field label={t("profile.authority")} value={user.pension.sanctioningAuthority} />
                <Field label={t("profile.agency")} value={user.pension.disbursingAgency} />
              </dl>
              <Separator className="my-4" />
              <dl className="grid grid-cols-2 gap-4">
                <Field label={t("profile.account")} value={user.bank.maskedAccount} />
                <Field label={t("profile.ifsc")} value={user.bank.ifsc} />
                <Field label={t("profile.branch")} value={user.bank.branch} />
              </dl>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-lg">{t("profile.faceId")}</CardTitle>
              <CardDescription>{t("profile.faceIdHelp")}</CardDescription>
            </div>
            {enrollment.data?.enrolled ? (
              <Badge className="shrink-0 gap-1.5">
                <CheckCircle2 className="size-3.5" />
                {t("profile.faceId")}
              </Badge>
            ) : (
              <Badge variant="secondary" className="shrink-0 gap-1.5">
                <CircleAlert className="size-3.5" />
                {t("profile.faceIdMissing")}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {enrollment.data?.enrollment ? (
            <div className="space-y-1 text-sm">
              <p className="text-muted-foreground">
                {t("profile.faceIdEnrolled", {
                  date: new Date(enrollment.data.enrollment.createdAt).toLocaleDateString(dateLocale),
                })}
              </p>
              <p className="text-muted-foreground">
                {t("profile.faceIdAadhaarLinked", { uid: user.maskedAadhaar })}
              </p>
              {enrollment.data.enrollment.aadhaarTxnId && (
                <p className="text-muted-foreground font-mono text-xs">
                  {t("profile.faceIdTxn", { txn: enrollment.data.enrollment.aadhaarTxnId })}
                </p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">{t("profile.faceIdNeedsConsent")}</p>
          )}

          <Button
            variant={enrollment.data?.enrolled ? "outline" : "default"}
            size="sm"
            onClick={() => navigate("/verify/enroll")}
          >
            <ScanFace />
            {enrollment.data?.enrolled ? t("profile.redoFaceId") : t("profile.setupFaceId")}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t("profile.familyContacts")}</CardTitle>
          <CardDescription>{t("profile.familyReadOnly")}</CardDescription>
        </CardHeader>
        <CardContent>
          {(contacts.data?.contacts ?? []).length === 0 ? (
            <p className="text-muted-foreground text-sm">{t("family.noneOnRecord")}</p>
          ) : (
            <ul className="divide-y">
              {contacts.data?.contacts.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{c.name[locale]}</p>
                    <p className="text-muted-foreground text-sm">
                      {c.relation} · {c.maskedMobile}
                    </p>
                  </div>
                  {c.canAttest && (
                    <Badge variant="secondary" className="shrink-0">
                      {t("family.canAttest")}
                    </Badge>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
