import type { AadhaarConsentScope } from "@jeevansetu/shared";
import type { AadhaarPreview, AadhaarStart } from "@/context/AuthContext";

const KEY = "jeevansetu.aadhaarTxn";

export interface StashedTxn extends AadhaarStart {
  mobile: string;
  /** Which journey sent the user to Aadhaar — where to return them afterwards. */
  purpose: "login" | "face_id";
  /** Filled in after the OTP step, so the consent screen can show real values. */
  preview?: AadhaarPreview;
  scopes?: AadhaarConsentScope[];
}

/**
 * The Aadhaar transaction lives in sessionStorage rather than router state so a
 * refresh part-way through the (mocked) Aadhaar screens does not dead-end the user.
 * It is cleared as soon as the journey finishes or is abandoned.
 */
export function stashAadhaarTxn(txn: StashedTxn) {
  sessionStorage.setItem(KEY, JSON.stringify(txn));
}

export function readAadhaarTxn(): StashedTxn | null {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StashedTxn;
  } catch {
    sessionStorage.removeItem(KEY);
    return null;
  }
}

export function clearAadhaarTxn() {
  sessionStorage.removeItem(KEY);
}
