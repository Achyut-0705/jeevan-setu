import { nanoid } from "nanoid";
import type { AadhaarConsent, Certificate, User } from "@jeevansetu/shared";
import {
  aadhaarConsentsTable,
  insertCertificate,
  insertDevice,
  usersTable,
} from "./repo";
import { getMeta, persistDriver, resetDatabase, setMeta } from "./store";
import { AADHAAR_RECORDS } from "../mocks/aadhaar";
import {
  AADHAAR_DEMO_OTP,
  DEFAULT_CONSENT_SCOPES,
  syncFamilyFromAadhaar,
  syncPensionHistory,
  upsertUserFromAadhaar,
} from "../services/aadhaar";

export const SEED_VERSION = "2026-08-25.2-aadhaar";
export const DEMO_OTP = AADHAAR_DEMO_OTP;

/**
 * Four demo personas, one per situation a pensioner can actually be in. Each one
 * exists to make a different part of the product legible in a walkthrough, so the
 * set is deliberately small — eight lookalike accounts taught nobody anything.
 */
interface PersonaSpec {
  uid: string;
  /** Short label shown on the login screen so a demo can pick the right story. */
  scenario: { en: string; hi: string };
  trustedDevice: boolean;
  faceEnrolled: boolean;
  onboardingDone: boolean;
  certificate: { issuedDaysAgo: number; validityDays: number; score: number } | null;
}

export const PERSONAS: PersonaSpec[] = [
  {
    // Everything done, plenty of runway. The "nothing is wrong" baseline.
    uid: "784239015566",
    scenario: {
      en: "Fully verified — pension paid, renewal not due for months",
      hi: "पूर्ण सत्यापित — पेंशन जारी, नवीनीकरण अभी दूर",
    },
    trustedDevice: true,
    faceEnrolled: true,
    onboardingDone: true,
    certificate: { issuedDaysAgo: 94, validityDays: 365, score: 96 },
  },
  {
    // The deadline case: still being paid, but the clock is visibly running out.
    uid: "552177348890",
    scenario: {
      en: "Renewal due in 11 days — pension still being paid",
      hi: "11 दिनों में नवीनीकरण देय — पेंशन अभी जारी है",
    },
    trustedDevice: false,
    faceEnrolled: true,
    onboardingDone: false,
    certificate: { issuedDaysAgo: 354, validityDays: 365, score: 91 },
  },
  {
    // The reason this product exists: payments already stopped, nobody to vouch.
    uid: "669044123378",
    scenario: {
      en: "Pension stopped 3 months ago — certificate expired, no family on record",
      hi: "3 महीने से पेंशन बंद — प्रमाण पत्र समाप्त, रिकॉर्ड में कोई परिवार नहीं",
    },
    trustedDevice: false,
    faceEnrolled: false,
    onboardingDone: false,
    certificate: { issuedDaysAgo: 461, validityDays: 365, score: 88 },
  },
  {
    // Not a pensioner at all. The app has to say so instead of starting a journey.
    uid: "331288765401",
    scenario: {
      en: "Not eligible — 25 years old, no pension account linked",
      hi: "पात्र नहीं — आयु 25 वर्ष, कोई पेंशन खाता नहीं",
    },
    trustedDevice: false,
    faceEnrolled: false,
    onboardingDone: false,
    certificate: null,
  },
];

function buildCertificate(user: User, spec: NonNullable<PersonaSpec["certificate"]>): Certificate {
  const issuedAt = new Date(Date.now() - spec.issuedDaysAgo * 24 * 60 * 60 * 1000);
  const validUntil = new Date(issuedAt.getTime() + spec.validityDays * 24 * 60 * 60 * 1000);
  const expired = validUntil < new Date();

  return {
    id: `cert_${nanoid(8)}`,
    userId: user.id,
    sessionId: `ses_seed_${nanoid(6)}`,
    kind: "full",
    certificateNumber: `JS-${issuedAt.getFullYear()}-${nanoid(6).toUpperCase()}`,
    verificationCode: nanoid(10).toUpperCase(),
    confidenceScore: spec.score,
    tier: "verified",
    signalsUsed: ["phone_otp", "face_match", "liveness_challenge", "video_verification"],
    issuedAt: issuedAt.toISOString(),
    validFrom: issuedAt.toISOString(),
    validUntil: validUntil.toISOString(),
    status: expired ? "expired" : "active",
    aiSummary: null,
  };
}

export function ensureSeeded() {
  if (getMeta("seedVersion") === SEED_VERSION) return;

  resetDatabase();
  const now = new Date();

  for (const persona of PERSONAS) {
    const record = AADHAAR_RECORDS.find((r) => r.uid === persona.uid);
    if (!record) throw new Error(`Seed persona references unknown Aadhaar uid ${persona.uid}`);

    // Users are built the same way a real login builds them — by projecting the
    // Aadhaar record — so the seeded state and the live path cannot drift apart.
    const user = upsertUserFromAadhaar(record, now);

    const consent: AadhaarConsent = {
      id: `consent_${nanoid(10)}`,
      userId: user.id,
      uid: record.uid,
      txnId: `SEED${nanoid(10).toUpperCase()}`,
      purpose: "Digital life certificate issuance and periodic identity verification",
      scopes: DEFAULT_CONSENT_SCOPES,
      grantedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      revokedAt: null,
    };
    aadhaarConsentsTable.insert(consent, { userId: user.id, uid: record.uid });

    if (persona.onboardingDone) {
      usersTable.update(user.id, {
        ...user,
        prefs: { ...user.prefs, onboardingCompletedAt: now.toISOString() },
      });
    }

    syncFamilyFromAadhaar(user, record, now);
    syncPensionHistory(user, now);

    if (persona.trustedDevice) {
      insertDevice({
        id: `dev_${nanoid(8)}`,
        userId: user.id,
        fingerprint: `seed-device-${user.id}`,
        label: "Family tablet (seeded)",
        firstSeenAt: now.toISOString(),
        lastSeenAt: now.toISOString(),
        isTrusted: true,
      });
    }

    if (persona.certificate) insertCertificate(buildCertificate(user, persona.certificate));
  }

  setMeta("seedVersion", SEED_VERSION);
  // eslint-disable-next-line no-console
  console.log(
    `[seed] ${PERSONAS.length} demo personas ready (${SEED_VERSION}, store=${persistDriver}). Aadhaar OTP: ${DEMO_OTP}`
  );
}

/**
 * Face enrolment is NOT seeded: a face template only exists once the pensioner has
 * gone through Aadhaar consent for face authentication, and pretending otherwise
 * would hide the very step this flow is meant to demonstrate. `faceEnrolled` on a
 * persona documents the intended demo state; the operator completes it on screen.
 */
export function personaForUid(uid: string): PersonaSpec | null {
  return PERSONAS.find((p) => p.uid === uid) ?? null;
}
