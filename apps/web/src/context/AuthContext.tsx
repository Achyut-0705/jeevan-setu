import * as React from "react";
import type { AadhaarConsentScope, BilingualText, User } from "@jeevansetu/shared";
import { api, getTokens, setTokens, type AuthTokens } from "@/lib/api";
import { applyProfileLanguage } from "@/i18n";

/**
 * Identity in this app is established against the (mocked) Aadhaar service, never
 * locally. The three steps below mirror that: start a transaction against the
 * Aadhaar-registered mobile, verify the OTP Aadhaar sent, then — on a first visit —
 * consent to what JeevanSetu may read. Only the last step returns app tokens.
 */

export interface AadhaarStart {
  txnId: string;
  maskedUid: string;
  maskedMobile: string;
  holderName: BilingualText;
  expiresInSeconds: number;
  demoCode: string;
}

export interface AadhaarPreview {
  maskedUid: string;
  name: BilingualText;
  dob: string;
  gender: string;
  careOf: string;
  address: { house: string; street: string; district: string; state: string; pincode: string };
  maskedMobile: string;
  familyCount: number;
}

export interface AadhaarVerifyResult {
  verified: boolean;
  requiresConsent: boolean;
  txnId: string;
  preview: AadhaarPreview;
  scopes: AadhaarConsentScope[];
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  startAadhaarAuth: (mobile: string) => Promise<AadhaarStart>;
  verifyAadhaarOtp: (txnId: string, code: string) => Promise<AadhaarVerifyResult>;
  grantConsent: (txnId: string, scopes: AadhaarConsentScope[]) => Promise<void>;
  completeLogin: (txnId: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  const loadUser = React.useCallback(async () => {
    if (!getTokens()) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const data = await api<{ user: User }>("/users/me");
      setUser(data.user);
      applyProfileLanguage(data.user.locale);
    } catch {
      setTokens(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadUser();
  }, [loadUser]);

  const startAadhaarAuth = async (mobile: string) =>
    api<AadhaarStart>("/aadhaar/auth/start", { method: "POST", body: { mobile }, auth: false });

  const verifyAadhaarOtp = async (txnId: string, code: string) =>
    api<AadhaarVerifyResult>("/aadhaar/auth/otp/verify", {
      method: "POST",
      body: { txnId, code },
      auth: false,
    });

  const grantConsent = async (txnId: string, scopes: AadhaarConsentScope[]) => {
    const res = await api<{ tokens: AuthTokens; user: User }>("/aadhaar/auth/consent", {
      method: "POST",
      body: { txnId, scopes, agreed: true },
      auth: false,
    });
    setTokens(res.tokens);
    await loadUser();
  };

  const completeLogin = async (txnId: string) => {
    const res = await api<{ tokens: AuthTokens; user: User }>("/aadhaar/auth/complete", {
      method: "POST",
      body: { txnId },
      auth: false,
    });
    setTokens(res.tokens);
    await loadUser();
  };

  const logout = async () => {
    // Revoke server-side first so a logout on a borrowed device is real, but never
    // let a failed call strand the user in a signed-in shell.
    try {
      await api("/auth/logout", { method: "POST" });
    } catch {
      /* ignore — the local session is cleared regardless */
    }
    setTokens(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        startAadhaarAuth,
        verifyAadhaarOtp,
        grantConsent,
        completeLogin,
        logout,
        refreshUser: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
