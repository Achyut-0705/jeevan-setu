import { z } from "zod";
import { AADHAAR_CONSENT_SCOPES, LOCALES } from "../enums";
import { bilingualTextSchema } from "./user";

/**
 * A MOCKED stand-in for the UIDAI Aadhaar service.
 *
 * Everything in this file models an external system we do not own. In the real world
 * these records live with UIDAI and are reached over an authenticated API after the
 * resident gives consent; here they are seeded in-process. Nothing in this app may
 * write to an Aadhaar record — it is a read-only source of truth for personal data,
 * which is exactly the property the rest of the app is built around.
 */

export const aadhaarAddressSchema = z.object({
  house: z.string(),
  street: z.string(),
  district: z.string(),
  state: z.string(),
  pincode: z.string(),
});
export type AadhaarAddress = z.infer<typeof aadhaarAddressSchema>;

/**
 * Family as UIDAI knows it. Relations come from the resident's own enrolment record,
 * which is why the app cannot let a pensioner invent a new "family member" — an
 * attester who isn't in the Aadhaar record is exactly the fraud vector this closes.
 */
export const aadhaarFamilyMemberSchema = z.object({
  uid: z.string(),
  maskedUid: z.string(),
  name: bilingualTextSchema,
  relation: z.string(),
  dob: z.string(),
  gender: z.enum(["male", "female", "other"]),
  /** Masked in listings; the full number is only used server-side to send the SMS. */
  maskedMobile: z.string(),
  mobile: z.string(),
  /** UIDAI marks a linked mobile as verified; only those may attest. */
  mobileVerified: z.boolean(),
});
export type AadhaarFamilyMember = z.infer<typeof aadhaarFamilyMemberSchema>;

export const aadhaarRecordSchema = z.object({
  uid: z.string(),
  maskedUid: z.string(),
  name: bilingualTextSchema,
  careOf: z.string(),
  dob: z.string(),
  gender: z.enum(["male", "female", "other"]),
  photoInitials: z.string(),
  address: aadhaarAddressSchema,
  registeredMobile: z.string(),
  maskedMobile: z.string(),
  email: z.string().nullable(),
  locale: z.enum(LOCALES),
  family: z.array(aadhaarFamilyMemberSchema),
});
export type AadhaarRecord = z.infer<typeof aadhaarRecordSchema>;

/** What the consent screen shows and what the app is allowed to read afterwards. */
export const aadhaarConsentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  uid: z.string(),
  /** UIDAI-style transaction reference, shown to the user for their records. */
  txnId: z.string(),
  purpose: z.string(),
  scopes: z.array(z.enum(AADHAAR_CONSENT_SCOPES)),
  grantedAt: z.string(),
  expiresAt: z.string(),
  revokedAt: z.string().nullable(),
});
export type AadhaarConsent = z.infer<typeof aadhaarConsentSchema>;

export const aadhaarOtpRequestSchema = z.object({
  /** The mobile number registered with Aadhaar — not any mobile the user owns. */
  mobile: z.string().regex(/^\d{10}$/, "Enter the 10-digit mobile number linked to your Aadhaar"),
});
export type AadhaarOtpRequestInput = z.infer<typeof aadhaarOtpRequestSchema>;

export const aadhaarOtpVerifySchema = z.object({
  txnId: z.string().min(6),
  code: z.string().length(6),
  deviceLabel: z.string().max(120).optional(),
});
export type AadhaarOtpVerifyInput = z.infer<typeof aadhaarOtpVerifySchema>;

export const aadhaarConsentGrantSchema = z.object({
  txnId: z.string().min(6),
  scopes: z.array(z.enum(AADHAAR_CONSENT_SCOPES)).min(1),
  agreed: z.literal(true),
});
export type AadhaarConsentGrantInput = z.infer<typeof aadhaarConsentGrantSchema>;

/**
 * A face template registered against an Aadhaar record. The raw selfie is never kept —
 * only the descriptor — and the enrolment is only valid while its consent is live.
 */
export const aadhaarFaceIdSchema = z.object({
  id: z.string(),
  userId: z.string(),
  uid: z.string(),
  consentId: z.string(),
  txnId: z.string(),
  source: z.enum(["selfie", "document"]),
  quality: z.number(),
  status: z.enum(["pending_consent", "active", "revoked"]),
  createdAt: z.string(),
});
export type AadhaarFaceId = z.infer<typeof aadhaarFaceIdSchema>;
