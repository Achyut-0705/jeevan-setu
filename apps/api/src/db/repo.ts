import type {
  AadhaarConsent,
  AssistedReviewRequest,
  Certificate,
  ConfidenceEvent,
  FamilyConfirmationRequest,
  FamilyContact,
  MockOutcome,
  PensionTransaction,
  User,
  VerificationAppointment,
  VerificationSession,
} from "@jeevansetu/shared";
import type { AadhaarTxn } from "../services/aadhaar";
import { Table } from "./store";

export interface OtpChallenge {
  id: string;
  mobile: string;
  codeHash: string;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  expiresAt: string;
  consumedAt: string | null;
  plainCodeForDemo: string;
}

export interface RefreshTokenRecord {
  id: string;
  userId: string;
  tokenHash: string;
  deviceId: string | null;
  expiresAt: string;
  revokedAt: string | null;
}

export interface TrustedDevice {
  id: string;
  userId: string;
  fingerprint: string;
  label: string;
  firstSeenAt: string;
  lastSeenAt: string;
  isTrusted: boolean;
}

export interface OutboxMessage {
  id: string;
  userId: string;
  channel: "sms" | "whatsapp" | "ivr";
  toMobile: string;
  body: { en: string; hi: string };
  relatedTo: { type: string; id: string };
  sentAt: string;
}

export interface MockControl {
  id: string; // = userId
  userId: string;
  overrides: Partial<Record<string, MockOutcome>>;
  latencyMs: number;
  updatedAt: string;
}

export interface FaceEnrollment {
  id: string;
  userId: string;
  /** 1024-d embedding from @vladmandic/human. Raw images are never stored. */
  descriptor: number[];
  source: "selfie" | "document";
  quality: number;
  /** The Aadhaar consent this template was registered under. */
  consentId: string;
  aadhaarUid: string;
  /** UIDAI transaction reference, quotable by the user. */
  txnId: string;
  status: "active" | "revoked";
  createdAt: string;
}

export const usersTable = new Table<User>("users");
export const aadhaarConsentsTable = new Table<AadhaarConsent>("aadhaar_consents");
export const aadhaarTxnsTable = new Table<AadhaarTxn>("aadhaar_txns");
export const familyContactsTable = new Table<FamilyContact>("family_contacts");
export const pensionTransactionsTable = new Table<PensionTransaction>("pension_transactions");
export const trustedDevicesTable = new Table<TrustedDevice>("trusted_devices");
export const otpChallengesTable = new Table<OtpChallenge>("otp_challenges");
export const refreshTokensTable = new Table<RefreshTokenRecord>("refresh_tokens");
export const sessionsTable = new Table<VerificationSession>("verification_sessions");
export const eventsTable = new Table<ConfidenceEvent>("confidence_events");
export const certificatesTable = new Table<Certificate>("certificates");
export const familyConfirmationsTable = new Table<FamilyConfirmationRequest>("family_confirmations");
export const outboxTable = new Table<OutboxMessage>("outbox");
export const assistedReviewsTable = new Table<AssistedReviewRequest>("assisted_reviews");
export const appointmentsTable = new Table<VerificationAppointment>("appointments");
export const faceEnrollmentsTable = new Table<FaceEnrollment>("face_enrollments");
export const mockControlsTable = new Table<MockControl>("mock_controls");

export function insertUser(u: User) {
  usersTable.insert(u, { mobile: u.mobile, aadhaarUid: u.aadhaarUid });
}
export function findUserByMobile(mobile: string): User | null {
  return usersTable.findOneBy("mobile", mobile);
}
export function findUserByAadhaarUid(uid: string): User | null {
  return usersTable.findOneBy("aadhaarUid", uid);
}

export function insertOtp(o: OtpChallenge) {
  otpChallengesTable.insert(o, { mobile: o.mobile });
}
export function latestOtpForMobile(mobile: string): OtpChallenge | null {
  const all = otpChallengesTable.findBy("mobile", mobile);
  return all.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))[0] ?? null;
}

export function insertRefreshToken(t: RefreshTokenRecord) {
  refreshTokensTable.insert(t, { userId: t.userId, tokenHash: t.tokenHash });
}
export function findRefreshTokenByHash(hash: string): RefreshTokenRecord | null {
  return refreshTokensTable.findOneBy("tokenHash", hash);
}

export function insertDevice(d: TrustedDevice) {
  trustedDevicesTable.insert(d, { userId: d.userId, fingerprint: d.fingerprint });
}
export function findDeviceByFingerprint(userId: string, fingerprint: string): TrustedDevice | null {
  return (
    trustedDevicesTable.findBy("userId", userId).find((d) => d.fingerprint === fingerprint) ?? null
  );
}

export function insertSession(s: VerificationSession) {
  sessionsTable.insert(s, { userId: s.userId, status: s.status });
}
export function findActiveSessionForUser(userId: string): VerificationSession | null {
  return sessionsTable.findBy("userId", userId).find((s) => s.status === "active") ?? null;
}

export function insertEvent(e: ConfidenceEvent) {
  eventsTable.insert(e, { sessionId: e.sessionId, seq: e.seq });
}
export function eventsForSession(sessionId: string): ConfidenceEvent[] {
  return eventsTable.findBy("sessionId", sessionId).sort((a, b) => a.seq - b.seq);
}

export function insertCertificate(c: Certificate) {
  certificatesTable.insert(c, {
    userId: c.userId,
    sessionId: c.sessionId,
    verificationCode: c.verificationCode,
  });
}
export function findCertificateByCode(code: string): Certificate | null {
  return certificatesTable.findOneBy("verificationCode", code);
}
export function certificatesForUser(userId: string): Certificate[] {
  return certificatesTable.findBy("userId", userId).sort((a, b) => (a.issuedAt < b.issuedAt ? 1 : -1));
}

export function insertFamilyConfirmation(f: FamilyConfirmationRequest) {
  familyConfirmationsTable.insert(f, { token: f.token, sessionId: f.sessionId });
}
export function findFamilyConfirmationByToken(token: string): FamilyConfirmationRequest | null {
  return familyConfirmationsTable.findOneBy("token", token);
}

export function insertOutbox(m: OutboxMessage) {
  outboxTable.insert(m, { userId: m.userId });
}

export function getMockControl(userId: string): MockControl | null {
  return mockControlsTable.getById(userId);
}
export function upsertMockControl(c: MockControl) {
  if (mockControlsTable.getById(c.userId)) mockControlsTable.update(c.userId, c);
  else mockControlsTable.insert(c);
}

/* ------------------------------------------------------------ assisted review */

export function insertAssistedReview(r: AssistedReviewRequest) {
  assistedReviewsTable.insert(r, {
    userId: r.userId,
    sessionId: r.sessionId,
    ticketNumber: r.ticketNumber,
  });
}
export function reviewsForUser(userId: string): AssistedReviewRequest[] {
  return assistedReviewsTable
    .findBy("userId", userId)
    .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
}

/* --------------------------------------------------------------- appointments */

export function insertAppointment(a: VerificationAppointment) {
  appointmentsTable.insert(a, { userId: a.userId, sessionId: a.sessionId });
}
export function appointmentsForUser(userId: string): VerificationAppointment[] {
  return appointmentsTable
    .findBy("userId", userId)
    .sort((a, b) => (a.slotStart < b.slotStart ? 1 : -1));
}

/* ----------------------------------------------------------------- face IDs */

export function getFaceEnrollment(userId: string): FaceEnrollment | null {
  return (
    faceEnrollmentsTable
      .findBy("userId", userId)
      .filter((e) => e.status === "active")
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))[0] ?? null
  );
}

export function saveFaceEnrollment(enrollment: FaceEnrollment) {
  for (const old of faceEnrollmentsTable.findBy("userId", enrollment.userId)) {
    faceEnrollmentsTable.deleteById(old.id);
  }
  faceEnrollmentsTable.insert(enrollment, { userId: enrollment.userId });
}

/** Face templates are only valid while their Aadhaar consent is. */
export function revokeFaceEnrollmentsForConsent(consentId: string) {
  for (const e of faceEnrollmentsTable.all()) {
    if (e.consentId === consentId && e.status === "active") {
      faceEnrollmentsTable.update(e.id, { ...e, status: "revoked" });
    }
  }
}

export function pensionHistoryForUser(userId: string): PensionTransaction[] {
  return pensionTransactionsTable
    .findBy("userId", userId)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
