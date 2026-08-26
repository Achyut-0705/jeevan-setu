export const SIGNAL_TYPES = [
  "phone_otp",
  "trusted_device",
  "location_consistency",
  "pension_record_match",
  "face_match",
  "liveness_challenge",
  "voice_phrase",
  "document_upload",
  "family_confirmation",
  "video_verification",
  "manual_review",
  "continuity_history",
] as const;
export type SignalType = (typeof SIGNAL_TYPES)[number];

export const SIGNAL_CATEGORIES = [
  "otp",
  "biometric",
  "social",
  "documentary",
  "passive",
] as const;
export type SignalCategory = (typeof SIGNAL_CATEGORIES)[number];

export const TIERS = ["started", "building", "provisional", "verified"] as const;
export type Tier = (typeof TIERS)[number];

export const SESSION_STATUSES = ["active", "completed", "abandoned", "expired"] as const;
export type SessionStatus = (typeof SESSION_STATUSES)[number];

export const EVENT_STATUSES = [
  "awarded",
  "partial",
  "no_credit",
  "capped",
  "expired",
  "revoked",
] as const;
export type EventStatus = (typeof EVENT_STATUSES)[number];

export const LOCALES = ["en", "hi"] as const;
export type Locale = (typeof LOCALES)[number];

export const CERTIFICATE_KINDS = ["provisional", "full"] as const;
export type CertificateKind = (typeof CERTIFICATE_KINDS)[number];

export const CERTIFICATE_STATUSES = ["active", "expired", "superseded"] as const;
export type CertificateStatus = (typeof CERTIFICATE_STATUSES)[number];

export const MOCK_OUTCOMES = ["strong", "weak", "fail", "timeout"] as const;
export type MockOutcome = (typeof MOCK_OUTCOMES)[number];

export const FAMILY_CONFIRMATION_STATUSES = [
  "pending",
  "confirmed",
  "declined",
  "expired",
] as const;
export type FamilyConfirmationStatus = (typeof FAMILY_CONFIRMATION_STATUSES)[number];

export const MANUAL_REVIEW_STATUSES = ["queued", "in_review", "approved", "more_info"] as const;
export type ManualReviewStatus = (typeof MANUAL_REVIEW_STATUSES)[number];

/**
 * The user-facing state of the whole life-certificate journey. This is what the
 * pensioner is told ("where do I stand?"), as opposed to the internal signal-by-signal
 * scoring. Deliberately separate from Tier so we can say "rejected" or "awaiting a
 * human" without pretending the score alone decided it.
 */
export const VERIFICATION_STATUSES = [
  /** The person is not drawing a pension, so no life certificate is due at all. */
  "not_required",
  "not_started",
  "in_progress",
  "awaiting_review",
  "awaiting_call",
  "completed",
  "rejected",
  "expired",
] as const;
export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

/** Lifecycle of a request for a human to look at the case. No step here is automatic. */
export const ASSISTED_REVIEW_STATUSES = [
  "submitted",
  "in_review",
  "approved",
  "rejected",
  "more_info_needed",
  "cancelled",
] as const;
export type AssistedReviewStatus = (typeof ASSISTED_REVIEW_STATUSES)[number];

export const APPOINTMENT_STATUSES = [
  "scheduled",
  "in_call",
  "completed",
  "failed",
  "cancelled",
  "no_show",
] as const;
export type AppointmentStatus = (typeof APPOINTMENT_STATUSES)[number];

/** Actions a verification officer asks the pensioner to perform during a live call. */
export const CALL_CHECK_TYPES = [
  "show_aadhaar",
  "show_pan",
  "sign_on_camera",
  "read_phrase",
  "turn_head",
] as const;
export type CallCheckType = (typeof CALL_CHECK_TYPES)[number];

export const CALL_CHECK_STATUSES = ["pending", "active", "passed", "failed"] as const;
export type CallCheckStatus = (typeof CALL_CHECK_STATUSES)[number];

export const PENSION_STATUSES = ["active", "stopped", "not_eligible"] as const;
export type PensionStatus = (typeof PENSION_STATUSES)[number];

/** Settlement rails used by the disbursing agency, shown on the pension history. */
export const TRANSACTION_MODES = ["NEFT", "RTGS", "IMPS", "UPI"] as const;
export type TransactionMode = (typeof TRANSACTION_MODES)[number];

export const AADHAAR_CONSENT_SCOPES = [
  "demographics",
  "address",
  "family",
  "photo",
  "face_authentication",
] as const;
export type AadhaarConsentScope = (typeof AADHAAR_CONSENT_SCOPES)[number];
