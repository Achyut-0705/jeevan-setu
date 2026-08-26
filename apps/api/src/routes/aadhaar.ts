import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import {
  aadhaarConsentGrantSchema,
  aadhaarOtpRequestSchema,
  aadhaarOtpVerifySchema,
} from "@jeevansetu/shared";
import { nanoid } from "nanoid";
import type { AuthedVars } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";
import { rateLimit } from "../middleware/rateLimit";
import { ApiError } from "../middleware/error";
import {
  AADHAAR_DEMO_OTP,
  DEFAULT_CONSENT_SCOPES,
  grantConsentAndSync,
  liveConsentFor,
  startAadhaarAuth,
  syncFamilyFromAadhaar,
  syncPensionHistory,
  upsertUserFromAadhaar,
  verifyAadhaarOtp,
} from "../services/aadhaar";
import { AADHAAR_RECORDS, findAadhaarByUid } from "../mocks/aadhaar";
import { PENSION_PROFILES } from "../mocks/pensionRegistry";
import { PERSONAS } from "../db/seed";
import {
  aadhaarConsentsTable,
  aadhaarTxnsTable,
  findDeviceByFingerprint,
  insertDevice,
  revokeFaceEnrollmentsForConsent,
  usersTable,
} from "../db/repo";
import { issueTokenPair } from "../services/tokens";

/**
 * Routes that stand in for the UIDAI Aadhaar portal.
 *
 * These deliberately live under their own prefix and are presented in the UI as a
 * separate, external site the user is sent to and comes back from — because that is
 * what happens in reality, and because it makes the trust boundary visible: the
 * pensioner types their OTP into "Aadhaar", not into JeevanSetu.
 */
export const aadhaarRoutes = new Hono<{ Variables: AuthedVars }>();

/* ---------------------------------------------------------------- directory */

/**
 * The demo persona directory. Public on purpose: after logging out the user must
 * still see which numbers exist, otherwise the only way back in is to already know
 * a valid Aadhaar-registered number.
 */
aadhaarRoutes.get("/directory", (c) => {
  const now = new Date();
  const entries = PERSONAS.map((persona) => {
    const record = findAadhaarByUid(persona.uid)!;
    const profile = PENSION_PROFILES[persona.uid]!;
    const age = Math.floor(
      (now.getTime() - new Date(record.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );
    return {
      maskedUid: record.maskedUid,
      name: record.name,
      /** The Aadhaar-registered mobile — this is what the user must type to log in. */
      registeredMobile: record.registeredMobile,
      maskedMobile: record.maskedMobile,
      age,
      district: record.address.district,
      state: record.address.state,
      scenario: persona.scenario,
      pensionStatus: profile.status,
      eligible: profile.status !== "not_eligible",
    };
  });
  return c.json({ entries, demoOtp: AADHAAR_DEMO_OTP });
});

/* --------------------------------------------------------------------- auth */

aadhaarRoutes.post(
  "/auth/start",
  rateLimit((c) => `aadhaar:${c.req.header("x-forwarded-for") ?? "local"}`, 8, 60_000),
  zValidator("json", aadhaarOtpRequestSchema),
  async (c) => {
    const { mobile } = c.req.valid("json");
    return c.json(startAadhaarAuth(mobile));
  }
);

aadhaarRoutes.post("/auth/otp/verify", zValidator("json", aadhaarOtpVerifySchema), async (c) => {
  const { txnId, code } = c.req.valid("json");
  const { record, requiresConsent } = verifyAadhaarOtp(txnId, code);
  return c.json({
    verified: true,
    requiresConsent,
    txnId,
    // A preview of exactly what the app is about to receive, so the consent screen
    // can show the real values rather than a vague list of field names.
    preview: {
      maskedUid: record.maskedUid,
      name: record.name,
      dob: record.dob,
      gender: record.gender,
      careOf: record.careOf,
      address: record.address,
      maskedMobile: record.maskedMobile,
      familyCount: record.family.length,
    },
    scopes: DEFAULT_CONSENT_SCOPES,
  });
});

/** Consent is the moment a local user record may exist at all. */
aadhaarRoutes.post("/auth/consent", zValidator("json", aadhaarConsentGrantSchema), async (c) => {
  const { txnId, scopes } = c.req.valid("json");
  const { user, consent } = grantConsentAndSync(txnId, scopes);

  const fingerprint = c.req.header("x-device-fingerprint") ?? `unlabeled-${nanoid(6)}`;
  let device = findDeviceByFingerprint(user.id, fingerprint);
  if (!device) {
    device = {
      id: `dev_${nanoid(8)}`,
      userId: user.id,
      fingerprint,
      label: "This device",
      firstSeenAt: new Date().toISOString(),
      lastSeenAt: new Date().toISOString(),
      isTrusted: false,
    };
    insertDevice(device);
  }

  const refreshed = { ...user, lastLoginAt: new Date().toISOString() };
  usersTable.update(user.id, refreshed);

  return c.json({
    tokens: issueTokenPair(user.id, user.mobile, device.id),
    user: refreshed,
    consent,
  });
});

/**
 * Returning user with consent already on file: skip the consent screen but still
 * re-project the Aadhaar record, so a change at the source lands on this login.
 */
aadhaarRoutes.post(
  "/auth/complete",
  zValidator("json", z.object({ txnId: z.string().min(6) })),
  async (c) => {
    const { txnId } = c.req.valid("json");
    const txn = aadhaarTxnsTable.getById(txnId);
    if (!txn) throw new ApiError(404, "AADHAAR_TXN_NOT_FOUND", "This Aadhaar session has ended. Please start again.");
    if (!txn.otpVerifiedAt) {
      throw new ApiError(403, "AADHAAR_OTP_REQUIRED", "Please verify the Aadhaar OTP first.");
    }

    const record = findAadhaarByUid(txn.uid);
    if (!record) throw new ApiError(404, "AADHAAR_MOBILE_NOT_FOUND", "Aadhaar record not found.");

    const user = upsertUserFromAadhaar(record);
    if (!liveConsentFor(user.id)) {
      throw new ApiError(403, "AADHAAR_CONSENT_REQUIRED", "Please give consent to continue.");
    }

    syncFamilyFromAadhaar(user, record);
    syncPensionHistory(user);

    const fingerprint = c.req.header("x-device-fingerprint") ?? `unlabeled-${nanoid(6)}`;
    let device = findDeviceByFingerprint(user.id, fingerprint);
    if (!device) {
      device = {
        id: `dev_${nanoid(8)}`,
        userId: user.id,
        fingerprint,
        label: "This device",
        firstSeenAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        isTrusted: false,
      };
      insertDevice(device);
    }

    const refreshed = { ...user, lastLoginAt: new Date().toISOString() };
    usersTable.update(user.id, refreshed);

    return c.json({ tokens: issueTokenPair(user.id, user.mobile, device.id), user: refreshed });
  }
);

/* ------------------------------------------------------------------ consent */

aadhaarRoutes.get("/consent", requireAuth, async (c) => {
  const userId = c.get("userId");
  const consent = liveConsentFor(userId);
  const user = usersTable.getById(userId);
  return c.json({
    consent,
    maskedUid: user?.maskedAadhaar ?? null,
    availableScopes: DEFAULT_CONSENT_SCOPES,
  });
});

aadhaarRoutes.post("/consent/revoke", requireAuth, async (c) => {
  const consent = liveConsentFor(c.get("userId"));
  if (!consent) throw new ApiError(404, "NOT_FOUND", "There is no active Aadhaar consent to withdraw.");
  const revoked = { ...consent, revokedAt: new Date().toISOString() };
  aadhaarConsentsTable.update(consent.id, revoked);
  // A face template registered under a withdrawn consent must stop being usable.
  revokeFaceEnrollmentsForConsent(consent.id);
  return c.json({ consent: revoked });
});

/* --------------------------------------------------- face authentication (1) */

/**
 * Registering a face template is an Aadhaar-authenticated act, not a local one.
 * The user re-authenticates against their Aadhaar-registered mobile and gives a
 * separate, explicit consent for face authentication before any template is stored.
 */
aadhaarRoutes.post("/face/start", requireAuth, async (c) => {
  const user = usersTable.getById(c.get("userId"));
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  const started = startAadhaarAuth(user.mobile);
  return c.json({ ...started, purpose: "face_authentication" });
});

aadhaarRoutes.post(
  "/face/otp/verify",
  requireAuth,
  zValidator("json", z.object({ txnId: z.string().min(6), code: z.string().length(6) })),
  async (c) => {
    const { txnId, code } = c.req.valid("json");
    const { record } = verifyAadhaarOtp(txnId, code);
    return c.json({ verified: true, txnId, maskedUid: record.maskedUid, name: record.name });
  }
);

aadhaarRoutes.post(
  "/face/consent",
  requireAuth,
  zValidator("json", z.object({ txnId: z.string().min(6), agreed: z.literal(true) })),
  async (c) => {
    const userId = c.get("userId");
    const user = usersTable.getById(userId);
    if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");

    const { txnId } = c.req.valid("json");
    const txn = aadhaarTxnsTable.getById(txnId);
    if (!txn || !txn.otpVerifiedAt) {
      throw new ApiError(403, "AADHAAR_OTP_REQUIRED", "Please verify the Aadhaar OTP before giving consent.");
    }
    if (txn.uid !== user.aadhaarUid) {
      throw new ApiError(403, "AADHAAR_MISMATCH", "This Aadhaar session belongs to a different person.");
    }

    const now = new Date();
    const consent = {
      id: `consent_${nanoid(10)}`,
      userId,
      uid: user.aadhaarUid,
      txnId: txn.id,
      purpose: "Face authentication for life certificate verification",
      scopes: ["face_authentication" as const, "photo" as const],
      grantedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      revokedAt: null,
    };
    aadhaarConsentsTable.insert(consent, { userId, uid: user.aadhaarUid });
    aadhaarTxnsTable.update(txn.id, { ...txn, consentGrantedAt: now.toISOString() });

    // The enrolment endpoint will only accept a capture quoting this pair.
    return c.json({ consentId: consent.id, txnId: txn.id, expiresAt: consent.expiresAt });
  }
);

/* -------------------------------------------------------------------- family */

/** Family, straight from the Aadhaar record. Read-only by construction. */
aadhaarRoutes.get("/family", requireAuth, async (c) => {
  const user = usersTable.getById(c.get("userId"));
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  const contacts = syncFamilyFromAadhaar(user);
  return c.json({
    contacts,
    source: "aadhaar",
    maskedUid: user.maskedAadhaar,
    note: "Family members are read from your Aadhaar record and cannot be added here.",
  });
});

/** Exposed so the demo can show what the "external" registry actually holds. */
aadhaarRoutes.get("/records", (c) => {
  return c.json({
    records: AADHAAR_RECORDS.map((r) => ({
      maskedUid: r.maskedUid,
      name: r.name,
      dob: r.dob,
      gender: r.gender,
      district: r.address.district,
      state: r.address.state,
      maskedMobile: r.maskedMobile,
      family: r.family.map((m) => ({
        maskedUid: m.maskedUid,
        name: m.name,
        relation: m.relation,
        mobileVerified: m.mobileVerified,
      })),
    })),
  });
});
