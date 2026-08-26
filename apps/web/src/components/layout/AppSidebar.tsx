import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard,
  ShieldCheck,
  Award,
  Users,
  UserRound,
  Settings,
  HeartHandshake,
  Wallet,
  LifeBuoy,
  Video,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./NavUser";

const NAV = [
  { to: "/dashboard", labelKey: "nav.dashboard", icon: LayoutDashboard, tour: "nav-dashboard" },
  { to: "/verify", labelKey: "nav.verify", icon: ShieldCheck, tour: "nav-verify" },
  { to: "/pension", labelKey: "nav.pension", icon: Wallet, tour: "nav-pension" },
  { to: "/certificates", labelKey: "nav.certificates", icon: Award, tour: "nav-certificates" },
  { to: "/call", labelKey: "nav.appointments", icon: Video, tour: "nav-call" },
  { to: "/family", labelKey: "nav.family", icon: Users, tour: "nav-family" },
  { to: "/help", labelKey: "nav.reviews", icon: LifeBuoy, tour: "nav-help" },
] as const;

const ACCOUNT_NAV = [
  { to: "/profile", labelKey: "nav.profile", icon: UserRound },
  { to: "/settings", labelKey: "nav.settings", icon: Settings },
] as const;

export function AppSidebar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isActive = (to: string) => pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* When the rail collapses to icon width the button becomes a 32px box.
                The mark must not shrink with it, and the wordmark has to leave
                entirely — otherwise the flex row squeezes the logo off-centre. */}
            <SidebarMenuButton
              size="lg"
              asChild
              className="group-data-[collapsible=icon]:justify-center"
            >
              <NavLink to="/dashboard">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 shrink-0 items-center justify-center rounded-lg">
                  <HeartHandshake className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">{t("common.appName")}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {t("common.tagline")}
                  </span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.main")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.to)}
                    tooltip={t(item.labelKey)}
                    data-tour={item.tour}
                  >
                    <NavLink to={item.to}>
                      <item.icon />
                      <span>{t(item.labelKey)}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("nav.account")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ACCOUNT_NAV.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={isActive(item.to)} tooltip={t(item.labelKey)}>
                    <NavLink to={item.to}>
                      <item.icon />
                      <span>{t(item.labelKey)}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
