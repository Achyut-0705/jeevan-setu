import * as React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { AppShell } from "@/components/layout/AppShell";
import { Skeleton } from "@/components/ui/skeleton";
import { LoginPage } from "@/pages/LoginPage";
import { AadhaarVerifyPage } from "@/pages/aadhaar/AadhaarVerifyPage";
import { AadhaarConsentPage } from "@/pages/aadhaar/AadhaarConsentPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { VerifyPage } from "@/pages/VerifyPage";
import { PensionPage } from "@/pages/PensionPage";
import { ReviewsPage } from "@/pages/ReviewsPage";
import { CallPage } from "@/pages/CallPage";
import { CertificatesPage } from "@/pages/CertificatesPage";
import { CertificatePage } from "@/pages/CertificatePage";
import { CertificateCheckPage } from "@/pages/CertificateCheckPage";
import { FamilyConfirmPage } from "@/pages/FamilyConfirmPage";
import { FamilyPage } from "@/pages/FamilyPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SettingsPage } from "@/pages/SettingsPage";

// Verification steps pull in the ML models, so they load on demand only.
const EnrollPage = React.lazy(() => import("@/pages/verify/EnrollPage").then((m) => ({ default: m.EnrollPage })));
const FaceStepPage = React.lazy(() => import("@/pages/verify/FaceStepPage").then((m) => ({ default: m.FaceStepPage })));
const LivenessStepPage = React.lazy(() => import("@/pages/verify/LivenessStepPage").then((m) => ({ default: m.LivenessStepPage })));
const VoiceStepPage = React.lazy(() => import("@/pages/verify/VoiceStepPage").then((m) => ({ default: m.VoiceStepPage })));
const DocumentStepPage = React.lazy(() => import("@/pages/verify/DocumentStepPage").then((m) => ({ default: m.DocumentStepPage })));
const FamilyStepPage = React.lazy(() => import("@/pages/verify/FamilyStepPage").then((m) => ({ default: m.FamilyStepPage })));

function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <Skeleton className="h-64 w-full max-w-md rounded-xl" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return (
    <AppShell>
      <React.Suspense fallback={<Skeleton className="h-64 w-full rounded-xl" />}>{children}</React.Suspense>
    </AppShell>
  );
}

/** The Aadhaar screens sit outside the app shell — they are a different "site". */
function AadhaarRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const PROTECTED: { path: string; element: React.ReactNode }[] = [
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/verify", element: <VerifyPage /> },
  { path: "/verify/enroll", element: <EnrollPage /> },
  { path: "/verify/face", element: <FaceStepPage /> },
  { path: "/verify/liveness", element: <LivenessStepPage /> },
  { path: "/verify/voice", element: <VoiceStepPage /> },
  { path: "/verify/document", element: <DocumentStepPage /> },
  { path: "/verify/family", element: <FamilyStepPage /> },
  { path: "/pension", element: <PensionPage /> },
  { path: "/call", element: <CallPage /> },
  { path: "/help", element: <ReviewsPage /> },
  { path: "/certificates", element: <CertificatesPage /> },
  { path: "/certificates/:id", element: <CertificatePage /> },
  { path: "/family", element: <FamilyPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/settings", element: <SettingsPage /> },
];

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Mocked Aadhaar portal. Reachable while signed out (login) and signed in
          (registering a Face ID), so it is not wrapped in Protected. */}
      <Route path="/aadhaar/verify" element={<AadhaarRoute><AadhaarVerifyPage /></AadhaarRoute>} />
      <Route path="/aadhaar/consent" element={<AadhaarRoute><AadhaarConsentPage /></AadhaarRoute>} />

      <Route path="/family/confirm/:token" element={<FamilyConfirmPage />} />
      <Route path="/check/:code" element={<CertificateCheckPage />} />

      {PROTECTED.map(({ path, element }) => (
        <Route key={path} path={path} element={<Protected>{element}</Protected>} />
      ))}

      {/* The old ad-hoc video and assisted-review steps are now full destinations. */}
      <Route path="/verify/video" element={<Navigate to="/call" replace />} />
      <Route path="/verify/assisted" element={<Navigate to="/help" replace />} />

      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
