const KEY = "jeevansetu.faceConsent";

export interface FaceConsentTicket {
  consentId: string;
  txnId: string;
  expiresAt: string;
}

/**
 * Carries the Aadhaar face-authentication consent from the consent screen to the
 * enrolment capture. The API rejects any enrolment that does not quote a live
 * consent, so this is the only way a face template can be registered.
 */
export function stashFaceConsent(ticket: FaceConsentTicket) {
  sessionStorage.setItem(KEY, JSON.stringify(ticket));
}

export function readFaceConsent(): FaceConsentTicket | null {
  const raw = sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    const ticket = JSON.parse(raw) as FaceConsentTicket;
    if (new Date(ticket.expiresAt) < new Date()) {
      sessionStorage.removeItem(KEY);
      return null;
    }
    return ticket;
  } catch {
    sessionStorage.removeItem(KEY);
    return null;
  }
}

export function clearFaceConsent() {
  sessionStorage.removeItem(KEY);
}
