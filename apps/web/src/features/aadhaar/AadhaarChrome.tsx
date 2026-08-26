import * as React from "react";
import { useTranslation } from "react-i18next";
import { Landmark, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

/**
 * Deliberately different chrome from the rest of the app.
 *
 * When a pensioner is asked for an OTP, they should be able to see at a glance that
 * they have left JeevanSetu and are on the Aadhaar site — that visible boundary is
 * the thing that makes "never type your OTP into a third-party app" teachable. The
 * banner also states plainly that this is a simulation, so nobody mistakes it for
 * the real UIDAI portal.
 */
export function AadhaarChrome({
  children,
  step,
  totalSteps,
}: {
  children: React.ReactNode;
  step: number;
  totalSteps: number;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-[#F4F6FA] dark:bg-[#0E1420]">
      <header className="border-b border-[#C9D4E8] bg-white dark:border-[#22304A] dark:bg-[#131C2C]">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-[#B23A48] text-white">
            <Landmark className="size-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#1B2B4B] dark:text-[#DCE6F7]">
              {t("aadhaar.authorityName")}
            </p>
            <p className="text-xs text-[#5A6B8C] dark:text-[#8C9DBE]">{t("aadhaar.authoritySub")}</p>
          </div>
          <span className="ml-auto shrink-0 text-xs text-[#5A6B8C] tabular-nums dark:text-[#8C9DBE]">
            {t("aadhaar.stepCounter", { step, total: totalSteps })}
          </span>
        </div>
      </header>

      <div className="mx-auto w-full max-w-2xl flex-1 space-y-4 px-4 py-6">
        <Alert className="border-amber-400/60 bg-amber-50 text-amber-900 dark:border-amber-500/40 dark:bg-amber-950/40 dark:text-amber-200">
          <TriangleAlert className="size-4" />
          <AlertDescription>{t("aadhaar.simulationNotice")}</AlertDescription>
        </Alert>
        {children}
      </div>

      <footer className="border-t border-[#C9D4E8] px-4 py-4 text-center dark:border-[#22304A]">
        <p className="text-xs text-[#5A6B8C] dark:text-[#8C9DBE]">{t("aadhaar.footer")}</p>
      </footer>
    </div>
  );
}
