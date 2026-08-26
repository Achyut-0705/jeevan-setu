import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function VerifyStepLayout({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <Button variant="ghost" size="sm" className="-ml-2" onClick={() => navigate("/verify")}>
        <ArrowLeft />
        {t("common.back")}
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>

      {footer}

      {/* Never a dead end: every step offers a way out. */}
      <Button variant="outline" className="w-full" onClick={() => navigate("/verify")}>
        <Shuffle />
        {t("common.tryAnotherWay")}
      </Button>
    </div>
  );
}
