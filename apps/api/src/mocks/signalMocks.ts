import type { MockOutcome } from "@jeevansetu/shared";
import { seededFloat } from "./prng";

/** Maps a forced outcome (from the demo control panel) or natural randomness to a raw quality 0..1. */
function outcomeToRange(outcome: MockOutcome | undefined): [number, number] {
  switch (outcome) {
    case "strong":
      return [0.88, 0.99];
    case "weak":
      return [0.35, 0.55];
    case "fail":
      return [0.0, 0.15];
    case "timeout":
      return [0.0, 0.0];
    default:
      // Natural distribution: mostly good, occasionally weak — elderly users, imperfect lighting/mics.
      return [0.55, 0.95];
  }
}

export interface MockSignalResult {
  similarity: number;
  raw: Record<string, number | string | boolean>;
}

export function mockFaceMatch(key: string, forced?: MockOutcome): MockSignalResult {
  const [min, max] = outcomeToRange(forced);
  const similarity = seededFloat(key, min, max);
  return {
    similarity,
    raw: {
      similarity: Number(similarity.toFixed(3)),
      blurScore: Number(seededFloat(key + ":blur", 0.1, 0.6).toFixed(2)),
      lightingScore: Number(seededFloat(key + ":light", 0.3, 0.9).toFixed(2)),
    },
  };
}

export function mockLiveness(key: string, forced?: MockOutcome): MockSignalResult {
  const [min, max] = outcomeToRange(forced);
  const challenges = ["blink twice", "turn head left", "smile"] as const;
  const idx = Math.floor(seededFloat(key + ":challenge", 0, challenges.length));
  const similarity = seededFloat(key, min, max);
  return {
    similarity,
    raw: { challenge: challenges[idx] ?? "blink twice", passScore: Number(similarity.toFixed(3)) },
  };
}

export function mockVoicePhrase(key: string, forced?: MockOutcome): MockSignalResult {
  const [min, max] = outcomeToRange(forced);
  const similarity = seededFloat(key, min, max);
  return {
    similarity,
    raw: { phraseMatchScore: Number(similarity.toFixed(3)), backgroundNoise: Number(seededFloat(key + ":noise", 0, 0.4).toFixed(2)) },
  };
}

export function mockDocumentOcr(key: string, forced?: MockOutcome): MockSignalResult {
  const [min, max] = outcomeToRange(forced);
  const similarity = seededFloat(key, min, max);
  return {
    similarity,
    raw: { fieldsExtracted: Math.round(similarity * 6), fieldsExpected: 6 },
  };
}

export function mockPensionRecordMatch(key: string): MockSignalResult {
  const similarity = seededFloat(key, 0.85, 1);
  return { similarity, raw: { matched: true } };
}

export function mockLocationConsistency(key: string): MockSignalResult {
  const similarity = seededFloat(key, 0.7, 1);
  return { similarity, raw: { withinExpectedDistrict: similarity > 0.6 } };
}

export function mockVideoVerification(key: string, forced?: MockOutcome): MockSignalResult {
  const [min, max] = outcomeToRange(forced);
  const similarity = seededFloat(key, min, max);
  return {
    similarity,
    raw: {
      transcriptConfidence: Number(similarity.toFixed(3)),
      agentName: "Verification Assistant Priya (mock)",
    },
  };
}
