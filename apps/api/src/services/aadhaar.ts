import crypto from "node:crypto";
import { nanoid } from "nanoid";
import type {
  AadhaarConsent,
  AadhaarConsentScope,
  AadhaarRecord,
  FamilyContact,
  User,
} from "@jeevansetu/shared";
import {
  aadhaarConsentsTable,
  aadhaarTxnsTable,
  familyContactsTable,
  findUserByAadhaarUid,
  insertUser,
  pensionTransactionsTable,
  usersTable,
} from "../db/repo";
import { canAttest, findAadhaarByMobile, findAadhaarByUid, maskUid } from "../mocks/aadhaar";
import { PENSION_PROFILES, buildPensionInfo, buildPensionTransactions } from "../mocks/pensionRegistry";
import { ApiError } from "../middleware/error";

/**
 * Client for the mocked Aadhaar service.
 *
 * The flow mirrors a real Aadhaar-based eKYC: start a transaction against the
 * registered mobile, verify an OTP delivered by UIDAI (not by us), then obtain
 * explicit, scoped consent before any personal data is read. Only after consent do
 * we hold a local projection of the record — and that projection is refreshed from
 * Aadhaar on every login rather than edited here.
 */

/** Fixed for the prototype so a demo never waits on an SMS. Shown on screen. */
export const AADHAAR_DEMO_OTP = "123456";

const OTP_TTL_MS = 5 * 60_000;
const CONSENT_VALIDITY_DAYS = 365;

export const DEFAULT_CONSENT_SCOPES: AadhaarConsentScope[] = [
  "demographics",
  "address",
  "family",
  "photo",
  "face_authentication",
];

export interface AadhaarTxn {
  id: string;
  mobile: string;
  uid: string;
  codeHash: string;
  /** Surfaced in the mocked UIDAI screen so the demo is self-contained. */
  demoCode: string;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  expiresAt: string;
  otpVerifiedAt: string | null;
  consentGrantedAt: string | null;
}

function hash(value: string) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

/* -------------------------------------------------------------- auth txns */

export class AadhaarNotFoundError extends ApiError {
  constructor() {
    super(
      404,
      "AADHAAR_MOBILE_NOT_FOUND",
      "That number is not registered with any Aadhaar record we hold. Please enter the mobile number linked to your Aadhaar."
    );
  }
}

/**
 * Step 1 — begin an Aadhaar transaction for a mobile number.
 * Fails loudly when the number is not Aadhaar-linked: an unknown number is a
 * meaningful, actionable error, not an unexpected one.
 */
export function startAadhaarAuth(mobile: string) {
  const record = findAadhaarByMobile(mobile);
  if (!record) throw new AadhaarNotFoundError();

  const now = new Date();
  const txn: AadhaarTxn = {
    id: `aadhaar_txn_${nanoid(12)}`,
    mobile,
    uid: record.uid,
    codeHash: hash(AADHAAR_DEMO_OTP),
    demoCode: AADHAAR_DEMO_OTP,
    attempts: 0,
    maxAttempts: 5,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + OTP_TTL_MS).toISOString(),
    otpVerifiedAt: null,
    consentGrantedAt: null,
  };
  aadhaarTxnsTable.insert(txn, { mobile });

  return {
    txnId: txn.id,
    maskedUid: record.maskedUid,
    maskedMobile: record.maskedMobile,
    holderName: record.name,
    expiresInSeconds: OTP_TTL_MS / 1000,
    demoCode: AADHAAR_DEMO_OTP,
  };
}

function loadTxn(txnId: string): AadhaarTxn {
  const txn = aadhaarTxnsTable.getById(txnId);
  if (!txn) {
    throw new ApiError(404, "AADHAAR_TXN_NOT_FOUND", "This Aadhaar session has ended. Please start again.");
  }
  return txn;
}

/** Step 2 — verify the OTP UIDAI "sent" to the registered mobile. */
export function verifyAadhaarOtp(txnId: string, code: string) {
  const txn = loadTxn(txnId);

  if (new Date(txn.expiresAt) < new Date()) {
    throw new ApiError(400, "AADHAAR_OTP_EXPIRED", "That code has expired. Please request a new one.");
  }
  if (txn.attempts >= txn.maxAttempts) {
    throw new ApiError(429, "AADHAAR_OTP_LOCKED", "Too many incorrect attempts. Please start again.");
  }
  if (hash(code) !== txn.codeHash) {
    aadhaarTxnsTable.update(txn.id, { ...txn, attempts: txn.attempts + 1 });
    throw new ApiError(
      400,
      "AADHAAR_OTP_INCORRECT",
      `That code doesn't match. You have ${txn.maxAttempts - txn.attempts - 1} attempts left.`
    );
  }

  const verified: AadhaarTxn = { ...txn, otpVerifiedAt: new Date().toISOString() };
  aadhaarTxnsTable.update(txn.id, verified);

  const record = findAadhaarByUid(txn.uid)!;
  const existing = findUserByAadhaarUid(record.uid);

  return {
    txn: verified,
    record,
    /** A returning user with live consent skips the consent screen. */
    requiresConsent: !existing || !hasLiveConsent(existing.id),
  };
}

/* ----------------------------------------------------------------- consent */

export function hasLiveConsent(userId: string): boolean {
  const now = new Date();
  return aadhaarConsentsTable
    .findBy("userId", userId)
    .some((c) => !c.revokedAt && new Date(c.expiresAt) > now);
}

export function liveConsentFor(userId: string): AadhaarConsent | null {
  const now = new Date();
  return (
    aadhaarConsentsTable
      .findBy("userId", userId)
      .filter((c) => !c.revokedAt && new Date(c.expiresAt) > now)
      .sort((a, b) => (a.grantedAt < b.grantedAt ? 1 : -1))[0] ?? null
  );
}

/**
 * Step 3 — the resident agrees to share the listed fields. Only now is a local user
 * record created or refreshed. Without this, the app holds no personal data at all.
 */
export function grantConsentAndSync(txnId: string, scopes: AadhaarConsentScope[]) {
  const txn = loadTxn(txnId);
  if (!txn.otpVerifiedAt) {
    throw new ApiError(403, "AADHAAR_OTP_REQUIRED", "Please verify the Aadhaar OTP before giving consent.");
  }

  const record = findAadhaarByUid(txn.uid);
  if (!record) throw new AadhaarNotFoundError();

  const user = upsertUserFromAadhaar(record);

  const now = new Date();
  const consent: AadhaarConsent = {
    id: `consent_${nanoid(10)}`,
    userId: user.id,
    uid: record.uid,
    txnId: txn.id,
    purpose: "Digital life certificate issuance and periodic identity verification",
    scopes,
    grantedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CONSENT_VALIDITY_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    revokedAt: null,
  };
  aadhaarConsentsTable.insert(consent, { userId: user.id, uid: record.uid });

  aadhaarTxnsTable.update(txn.id, { ...txn, consentGrantedAt: now.toISOString() });

  syncFamilyFromAadhaar(user, record);
  syncPensionHistory(user);

  return { user, consent };
}

/* -------------------------------------------------------------- projection */

/**
 * Projects an Aadhaar record (plus the pension registry) onto the local user row.
 * Called on first consent and again on every login, so a change at the source
 * propagates without anyone editing anything here.
 */
export function upsertUserFromAadhaar(record: AadhaarRecord, now = new Date()): User {
  const existing = findUserByAadhaarUid(record.uid);
  const pension = buildPensionInfo(record.uid, now);
  const profileBank = pensionBankFor(record.uid);

  const projected: User = {
    id: existing?.id ?? `usr_${nanoid(10)}`,
    mobile: record.registeredMobile,
    aadhaarUid: record.uid,
    maskedAadhaar: maskUid(record.uid),
    aadhaarVerifiedAt: now.toISOString(),
    name: record.name,
    dob: record.dob,
    gender: record.gender,
    photoInitials: record.photoInitials,
    address: {
      line1: `${record.address.house}, ${record.address.street}`,
      district: record.address.district,
      state: record.address.state,
      pincode: record.address.pincode,
    },
    // Language is the one field the pensioner owns; keep their choice over Aadhaar's.
    locale: existing?.locale ?? record.locale,
    pension,
    bank: profileBank,
    prefs: existing?.prefs ?? {
      fontScale: 1,
      highContrast: false,
      reducedMotion: false,
      preferredChannel: "sms",
      onboardingCompletedAt: null,
    },
    createdAt: existing?.createdAt ?? now.toISOString(),
    lastLoginAt: existing?.lastLoginAt ?? null,
    isDemo: true,
  };

  if (existing) usersTable.update(existing.id, projected);
  else insertUser(projected);

  return projected;
}

// Kept alongside the pension profile rather than Aadhaar — the bank knows the
// account number, UIDAI does not.
function pensionBankFor(uid: string) {
  return PENSION_PROFILES[uid]!.bank;
}

/**
 * Rewrites the local family list from the Aadhaar record. This is a replace, not a
 * merge: anything not in the Aadhaar record must not survive, which is what makes
 * "family cannot be added by hand" true rather than merely unexposed in the UI.
 */
export function syncFamilyFromAadhaar(user: User, record?: AadhaarRecord, now = new Date()): FamilyContact[] {
  const source = record ?? findAadhaarByUid(user.aadhaarUid);
  if (!source) return [];

  for (const old of familyContactsTable.findBy("userId", user.id)) {
    familyContactsTable.deleteById(old.id);
  }

  const contacts: FamilyContact[] = source.family.map((m) => ({
    id: `fam_${m.uid.slice(-8)}`,
    userId: user.id,
    maskedUid: m.maskedUid,
    name: m.name,
    relation: m.relation,
    maskedMobile: m.maskedMobile,
    isVerified: m.mobileVerified,
    canAttest: canAttest(m, now),
    source: "aadhaar" as const,
    fetchedAt: now.toISOString(),
  }));

  for (const c of contacts) familyContactsTable.insert(c, { userId: user.id });
  return contacts;
}

/** Mirrors the disbursement statement locally so the history page has data to show. */
export function syncPensionHistory(user: User, now = new Date()) {
  for (const old of pensionTransactionsTable.findBy("userId", user.id)) {
    pensionTransactionsTable.deleteById(old.id);
  }
  const rows = buildPensionTransactions(user.aadhaarUid, user.id, now);
  for (const r of rows) pensionTransactionsTable.insert(r, { userId: user.id });
  return rows;
}

/**
 * The real mobile number for a relative, used only to send an attestation SMS.
 * Never returned to the browser — the UI only ever sees the masked form.
 */
export function attesterMobile(user: User, familyContactId: string): string | null {
  const record = findAadhaarByUid(user.aadhaarUid);
  if (!record) return null;
  const member = record.family.find((m) => `fam_${m.uid.slice(-8)}` === familyContactId);
  return member?.mobile ?? null;
}
