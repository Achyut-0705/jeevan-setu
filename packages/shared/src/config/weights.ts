import type { SignalCategory, SignalType } from "../enums";

export interface SignalDefinition {
  signal: SignalType;
  category: SignalCategory;
  weight: number;
  effort: "none" | "low" | "medium" | "high";
  labelKey: string;
  descriptionKey: string;
  /** Whether the signal is awarded automatically when a session starts. */
  automatic: boolean;
}

export const SIGNAL_DEFINITIONS: SignalDefinition[] = [
  { signal: "phone_otp", category: "otp", weight: 20, effort: "low", labelKey: "signal.phone_otp.label", descriptionKey: "signal.phone_otp.description", automatic: true },
  { signal: "trusted_device", category: "passive", weight: 8, effort: "none", labelKey: "signal.trusted_device.label", descriptionKey: "signal.trusted_device.description", automatic: true },
  { signal: "location_consistency", category: "passive", weight: 5, effort: "none", labelKey: "signal.location_consistency.label", descriptionKey: "signal.location_consistency.description", automatic: true },
  { signal: "continuity_history", category: "passive", weight: 5, effort: "none", labelKey: "signal.continuity_history.label", descriptionKey: "signal.continuity_history.description", automatic: true },
  { signal: "pension_record_match", category: "documentary", weight: 10, effort: "low", labelKey: "signal.pension_record_match.label", descriptionKey: "signal.pension_record_match.description", automatic: true },
  { signal: "face_match", category: "biometric", weight: 25, effort: "medium", labelKey: "signal.face_match.label", descriptionKey: "signal.face_match.description", automatic: false },
  { signal: "liveness_challenge", category: "biometric", weight: 15, effort: "medium", labelKey: "signal.liveness_challenge.label", descriptionKey: "signal.liveness_challenge.description", automatic: false },
  { signal: "voice_phrase", category: "biometric", weight: 12, effort: "medium", labelKey: "signal.voice_phrase.label", descriptionKey: "signal.voice_phrase.description", automatic: false },
  { signal: "document_upload", category: "documentary", weight: 10, effort: "medium", labelKey: "signal.document_upload.label", descriptionKey: "signal.document_upload.description", automatic: false },
  { signal: "family_confirmation", category: "social", weight: 18, effort: "low", labelKey: "signal.family_confirmation.label", descriptionKey: "signal.family_confirmation.description", automatic: false },
  { signal: "video_verification", category: "social", weight: 30, effort: "high", labelKey: "signal.video_verification.label", descriptionKey: "signal.video_verification.description", automatic: false },
  { signal: "manual_review", category: "social", weight: 40, effort: "high", labelKey: "signal.manual_review.label", descriptionKey: "signal.manual_review.description", automatic: false },
];

export function getSignalDefinition(signal: SignalType): SignalDefinition {
  const def = SIGNAL_DEFINITIONS.find((s) => s.signal === signal);
  if (!def) throw new Error(`Unknown signal: ${signal}`);
  return def;
}

/** Category caps force diversity across the fallback chain instead of maxing one signal. */
export const CATEGORY_CAPS: Record<SignalCategory, number | null> = {
  otp: 20,
  biometric: 45,
  social: 40,
  documentary: 25,
  passive: 15,
};

export const RETRY_DECAY_FACTOR = 0.85;
export const RETRY_DECAY_FLOOR = 0.5;
export const MAX_SCORE = 100;

export function retryDecay(attemptIndex: number): number {
  if (attemptIndex <= 1) return 1;
  return Math.max(RETRY_DECAY_FLOOR, Math.pow(RETRY_DECAY_FACTOR, attemptIndex - 1));
}
