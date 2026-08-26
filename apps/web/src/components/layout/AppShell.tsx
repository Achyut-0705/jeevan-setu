import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "./AppSidebar";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

const SEGMENT_LABEL: Record<string, string> = {
  dashboard: "nav.dashboard",
  verify: "nav.verify",
  certificates: "nav.certificates",
  family: "nav.family",
  profile: "nav.profile",
  settings: "nav.settings",
  face: "signal.face_match.label",
  liveness: "signal.liveness_challenge.label",
  voice: "signal.voice_phrase.label",
  document: "signal.document_upload.label",
  video: "signal.video_verification.label",
  assisted: "signal.manual_review.label",
  review: "verify.review.title",
  enroll: "enroll.title",
  pension: "nav.pension",
  call: "call.title",
  help: "reviews.title",
  aadhaar: "aadhaar.authoritySub",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const segments = pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, i) => ({
    seg,
    href: `/${segments.slice(0, i + 1).join("/")}`,
    label: SEGMENT_LABEL[seg] ? t(SEGMENT_LABEL[seg]) : seg,
    isLast: i === segments.length - 1,
  }));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 !h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {crumbs.map((c) => (
                <React.Fragment key={c.href}>
                  <BreadcrumbItem>
                    {c.isLast ? (
                      <BreadcrumbPage>{c.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link to={c.href}>{c.label}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!c.isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
