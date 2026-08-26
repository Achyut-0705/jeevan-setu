import type { PensionInfo, PensionTransaction, TransactionMode } from "@jeevansetu/shared";

/**
 * MOCK PENSION DISBURSEMENT REGISTRY.
 *
 * A second external system, separate from Aadhaar on purpose: Aadhaar knows who you
 * are, the pension registry knows what you are owed. It is keyed by Aadhaar UID,
 * which is how the two are joined in the real world.
 *
 * Personas are chosen so a demo can walk the four states that actually matter:
 *   - renewal comfortably in the future (nothing is wrong, show the happy path)
 *   - renewal due within days (the deadline that makes people panic)
 *   - payments already stopped for months (the situation the product exists for)
 *   - not eligible at all (the app must say so plainly instead of leading them on)
 */

export interface PensionProfile {
  passbookNumber: string;
  sanctioningAuthority: string;
  disbursingAgency: string;
  monthlyAmount: number;
  status: PensionInfo["status"];
  bank: { maskedAccount: string; ifsc: string; branch: string };
  /** Months of credits to generate, most recent first. */
  paidMonths: number;
  /** Months at the end of the run that were withheld rather than credited. */
  withheldMonths: number;
  /** Days from today until the life certificate lapses. Negative means overdue. */
  renewalDueInDays: number | null;
  ineligibleReason: PensionInfo["ineligibleReason"];
}

const MODES: TransactionMode[] = ["NEFT", "RTGS", "IMPS", "UPI"];

export const PENSION_PROFILES: Record<string, PensionProfile> = {
  // Ram Prasad Sharma — everything in order, renewed recently.
  "784239015566": {
    passbookNumber: "UP-PPO-4471902",
    sanctioningAuthority: "Directorate of Pension, Uttar Pradesh (mock)",
    disbursingAgency: "State Bank of Bharat — Pension Cell (mock)",
    monthlyAmount: 9200,
    status: "active",
    bank: { maskedAccount: "XXXX XXXX 8841", ifsc: "SBBM0004471", branch: "Gomti Nagar, Lucknow" },
    paidMonths: 14,
    withheldMonths: 0,
    renewalDueInDays: 271,
    ineligibleReason: null,
  },
  // Kamla Devi — paid up to date, but the certificate lapses in under a fortnight.
  "552177348890": {
    passbookNumber: "BR-PPO-2298641",
    sanctioningAuthority: "Bihar Pension Directorate (mock)",
    disbursingAgency: "Demo Public Bank — Patna Regional (mock)",
    monthlyAmount: 7500,
    status: "active",
    bank: { maskedAccount: "XXXX XXXX 3092", ifsc: "DPBM0002298", branch: "Kankarbagh, Patna" },
    paidMonths: 12,
    withheldMonths: 0,
    renewalDueInDays: 11,
    ineligibleReason: null,
  },
  // George Mathew — certificate expired, three months of payments withheld since.
  "669044123378": {
    passbookNumber: "KL-PPO-7730155",
    sanctioningAuthority: "Kerala Treasury Pension Wing (mock)",
    disbursingAgency: "Demo Public Bank — Ernakulam (mock)",
    monthlyAmount: 12400,
    status: "stopped",
    bank: { maskedAccount: "XXXX XXXX 5517", ifsc: "DPBM0007730", branch: "Panampilly Nagar, Kochi" },
    paidMonths: 11,
    withheldMonths: 3,
    renewalDueInDays: -96,
    ineligibleReason: null,
  },
  // Aarav Menon — 25 years old, drawing no pension. The app must not pretend otherwise.
  "331288765401": {
    passbookNumber: "—",
    sanctioningAuthority: "—",
    disbursingAgency: "—",
    monthlyAmount: 0,
    status: "not_eligible",
    bank: { maskedAccount: "—", ifsc: "—", branch: "—" },
    paidMonths: 0,
    withheldMonths: 0,
    renewalDueInDays: null,
    ineligibleReason: {
      en: "No pension account is linked to this Aadhaar number. A life certificate is only needed once you are drawing a pension.",
      hi: "इस आधार संख्या से कोई पेंशन खाता नहीं जुड़ा है। जीवन प्रमाण पत्र तभी आवश्यक है जब आप पेंशन प्राप्त कर रहे हों।",
    },
  },
};

function addDays(base: Date, days: number): Date {
  return new Date(base.getTime() + days * 24 * 60 * 60 * 1000);
}

/** Deterministic per-user pseudo-random so a reseed produces the same statement. */
function seededInt(seed: string, index: number, max: number): number {
  let h = 2166136261;
  const s = `${seed}:${index}`;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % max;
}

export function buildPensionInfo(uid: string, now = new Date()): PensionInfo {
  const p = PENSION_PROFILES[uid];
  if (!p) throw new Error(`No pension profile for uid ${uid}`);

  const lastCreditedAt =
    p.paidMonths === 0
      ? null
      : monthlyDate(now, p.withheldMonths === 0 ? 0 : p.withheldMonths).toISOString();

  return {
    passbookNumber: p.passbookNumber,
    sanctioningAuthority: p.sanctioningAuthority,
    disbursingAgency: p.disbursingAgency,
    monthlyAmount: p.monthlyAmount,
    status: p.status,
    lastCreditedAt,
    nextRenewalDueAt: p.renewalDueInDays === null ? null : addDays(now, p.renewalDueInDays).toISOString(),
    monthsUnpaid: p.withheldMonths,
    ineligibleReason: p.ineligibleReason,
  };
}

/** Pension is credited on the 1st of each month; `back` counts months backwards. */
function monthlyDate(now: Date, back: number): Date {
  const d = new Date(now.getFullYear(), now.getMonth() - back, 1, 10, 30, 0);
  return d;
}

/**
 * Builds the disbursement statement: newest first, withheld months at the top for
 * the persona whose payments have stopped, so the reason is the first thing seen.
 */
export function buildPensionTransactions(uid: string, userId: string, now = new Date()): PensionTransaction[] {
  const p = PENSION_PROFILES[uid];
  if (!p) return [];

  const rows: PensionTransaction[] = [];
  const total = p.paidMonths + p.withheldMonths;

  for (let i = 0; i < total; i += 1) {
    const withheld = i < p.withheldMonths;
    const date = monthlyDate(now, i);
    const mode = MODES[seededInt(uid, i, MODES.length)]!;
    const serial = String(seededInt(uid, i + 100, 900000) + 100000);

    rows.push({
      id: `ptx_${uid.slice(-4)}_${i}`,
      userId,
      date: date.toISOString(),
      amount: p.monthlyAmount,
      maskedAccount: p.bank.maskedAccount,
      // Real UTR references are 16 characters and carry the bank code and date.
      transactionId: `${mode === "UPI" ? "UPI" : "UTR"}${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${serial}`,
      mode,
      status: withheld ? "on_hold" : "credited",
      remark: withheld
        ? {
            en: "Payment withheld — life certificate expired. Complete your verification to release this amount.",
            hi: "भुगतान रोका गया — जीवन प्रमाण पत्र समाप्त हो गया है। यह राशि जारी करने के लिए अपना सत्यापन पूरा करें।",
          }
        : null,
    });
  }

  return rows;
}
