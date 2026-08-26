import type { SignalType } from "../enums";

/**
 * Maps a raw verification measurement onto the engine's 0..1 quality scale.
 * Each signal reports a different kind of number (cosine similarity between face
 * embeddings, a transcript match ratio, an OCR field-match ratio), so each needs
 * its own meaningful range rather than one global threshold.
 *
 * Calibrated against real @vladmandic/human embeddings: different people land
 * ~0.20-0.40 cosine, the same person across dissimilar photos ~0.55-0.65, and the
 * same person captured live twice ~0.75-0.90. The floor sits above the impostor
 * band so a stranger earns nothing, while a hard-but-genuine match still earns
 * partial credit rather than being turned away.
 */
export interface SignalCalibration {
  /** At or below this, the measurement earns no credit. */
  floor: number;
  /** At or above this, the measurement earns full credit. */
  ceiling: number;
}

export const SIGNAL_CALIBRATION: Record<SignalType, SignalCalibration> = {
  face_match: { floor: 0.42, ceiling: 0.75 },
  liveness_challenge: { floor: 0.35, ceiling: 0.85 },
  voice_phrase: { floor: 0.4, ceiling: 0.85 },
  document_upload: { floor: 0.3, ceiling: 0.85 },
  video_verification: { floor: 0.4, ceiling: 0.85 },
  family_confirmation: { floor: 0.5, ceiling: 0.95 },
  manual_review: { floor: 0.5, ceiling: 0.95 },
  phone_otp: { floor: 0.5, ceiling: 1 },
  trusted_device: { floor: 0.5, ceiling: 1 },
  location_consistency: { floor: 0.45, ceiling: 0.92 },
  pension_record_match: { floor: 0.45, ceiling: 0.92 },
  continuity_history: { floor: 0.45, ceiling: 0.92 },
};

export function qualityFor(signal: SignalType, measurement: number): number {
  const { floor, ceiling } = SIGNAL_CALIBRATION[signal];
  if (measurement <= floor) return 0;
  if (measurement >= ceiling) return 1;
  return (measurement - floor) / (ceiling - floor);
}

/** Face embeddings are compared with cosine similarity — Human's built-in
 * metric compresses same/different people into the same narrow band. */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i] as number;
    const y = b[i] as number;
    dot += x * y;
    normA += x * x;
    normB += y * y;
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/** Normalized Levenshtein similarity, used for spoken-phrase and OCR text matching. */
export function textSimilarity(a: string, b: string): number {
  const s = a.trim().toLowerCase().replace(/\s+/g, " ");
  const t = b.trim().toLowerCase().replace(/\s+/g, " ");
  if (!s || !t) return 0;
  if (s === t) return 1;
  const m = s.length;
  const n = t.length;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let cur = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      cur[j] = Math.min((cur[j - 1] as number) + 1, (prev[j] as number) + 1, (prev[j - 1] as number) + cost);
    }
    [prev, cur] = [cur, prev];
  }
  const distance = prev[n] as number;
  return 1 - distance / Math.max(m, n);
}
