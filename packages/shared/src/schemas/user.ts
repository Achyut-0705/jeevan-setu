import { z } from "zod";
import { LOCALES, PENSION_STATUSES, TRANSACTION_MODES } from "../enums";

export const bilingualTextSchema = z.object({
  en: z.string(),
  hi: z.string(),
});
export type BilingualText = z.infer<typeof bilingualTextSchema>;

export const addressSchema = z.object({
  line1: z.string(),
  district: z.string(),
  state: z.string(),
  pincode: z.string(),
});

export const pensionInfoSchema = z.object({
  /** The number printed on the pensioner's passbook. Replaces the old "pension ID". */
  passbookNumber: z.string(),
  sanctioningAuthority: z.string(),
  disbursingAgency: z.string(),
  monthlyAmount: z.number(),
  status: z.enum(PENSION_STATUSES),
  lastCreditedAt: z.string().nullable(),
  /** When the current life certificate lapses and disbursement would stop. */
  nextRenewalDueAt: z.string().nullable(),
  /** Consecutive months with no credit — drives the "pension stopped" messaging. */
  monthsUnpaid: z.number(),
  /** Set when status is not_eligible, e.g. below the qualifying age. */
  ineligibleReason: bilingualTextSchema.nullable(),
});
export type PensionInfo = z.infer<typeof pensionInfoSchema>;

/** One disbursement line, as it would appear on a bank statement. */
export const pensionTransactionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  /** Value date of the credit. */
  date: z.string(),
  amount: z.number(),
  /** Never store or transmit a full account number to the client. */
  maskedAccount: z.string(),
  transactionId: z.string(),
  mode: z.enum(TRANSACTION_MODES),
  status: z.enum(["credited", "failed", "on_hold"]),
  /** Present when a payment was withheld — e.g. life certificate expired. */
  remark: bilingualTextSchema.nullable(),
});
export type PensionTransaction = z.infer<typeof pensionTransactionSchema>;

export const bankInfoSchema = z.object({
  maskedAccount: z.string(),
  ifsc: z.string(),
  branch: z.string(),
});

export const userPrefsSchema = z.object({
  fontScale: z.number().min(1).max(1.6).default(1),
  highContrast: z.boolean().default(false),
  reducedMotion: z.boolean().default(false),
  preferredChannel: z.enum(["sms", "whatsapp", "ivr"]).default("sms"),
  /** Cleared when the user replays the guided tour from Settings. */
  onboardingCompletedAt: z.string().nullable().default(null),
});

export const userSchema = z.object({
  id: z.string(),
  mobile: z.string(),
  /**
   * Personal fields below are PROJECTIONS of the mock Aadhaar record, refreshed on
   * login. They are never edited in this app — Aadhaar is the only writer. See
   * apps/api/src/services/aadhaar.ts.
   */
  aadhaarUid: z.string(),
  maskedAadhaar: z.string(),
  aadhaarVerifiedAt: z.string().nullable(),
  name: bilingualTextSchema,
  dob: z.string(),
  gender: z.enum(["male", "female", "other"]),
  photoInitials: z.string(),
  address: addressSchema,
  locale: z.enum(LOCALES),
  pension: pensionInfoSchema,
  bank: bankInfoSchema,
  prefs: userPrefsSchema,
  createdAt: z.string(),
  lastLoginAt: z.string().nullable(),
  isDemo: z.boolean(),
});
export type User = z.infer<typeof userSchema>;

/** Only preferences are user-writable. Personal details come from Aadhaar. */
export const updatePreferencesSchema = userPrefsSchema.partial().extend({
  locale: z.enum(LOCALES).optional(),
});
export type UpdatePreferencesInput = z.infer<typeof updatePreferencesSchema>;

/**
 * A family member the pensioner may ask to attest. Always derived from the Aadhaar
 * record — there is no create/update/delete path, by design.
 */
export const familyContactSchema = z.object({
  id: z.string(),
  userId: z.string(),
  /** The relative's own Aadhaar UID, masked for display. */
  maskedUid: z.string(),
  name: bilingualTextSchema,
  relation: z.string(),
  maskedMobile: z.string(),
  /** True when UIDAI has a verified mobile on file for them. */
  isVerified: z.boolean(),
  /** Only verified adults in the Aadhaar record may attest. */
  canAttest: z.boolean(),
  source: z.literal("aadhaar"),
  fetchedAt: z.string(),
});
export type FamilyContact = z.infer<typeof familyContactSchema>;
