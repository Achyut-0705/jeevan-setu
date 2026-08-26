import type { SignalType, User } from "@jeevansetu/shared";
import { cosineSimilarity, textSimilarity } from "@jeevansetu/shared";
import type { FaceAnalysis } from "./humanEngine";

/**
 * The face pipeline weighs hundreds of megabytes and only runs when the server owns
 * it (FACE_ENGINE=server). Importing it lazily keeps it out of the module graph
 * entirely when the browser does the work instead.
 */
async function analyzeFace(jpegDataUrl: string): Promise<FaceAnalysis | null> {
  const engine = await import("./humanEngine");
  return engine.analyzeFace(jpegDataUrl);
}
import { getFaceEnrollment } from "../db/repo";
import { ApiError } from "../middleware/error";

export interface VerificationOutcome {
  /** The calibrated measurement (0..1) handed to the confidence engine. */
  measurement: number;
  raw: Record<string, number | string | boolean>;
}

export class NoFaceDetectedError extends ApiError {
  constructor() {
    super(422, "NO_FACE_DETECTED", "We couldn't find a face in that photo. Try again with more light, or use another method.");
  }
}

export class NotEnrolledError extends ApiError {
  constructor() {
    super(409, "NOT_ENROLLED", "We don't have a reference photo for you yet. Set up Face ID first, or use another method.");
  }
}

/**
 * Real face verification: the server re-runs detection and descriptor extraction on the
 * submitted frame, then compares against the stored enrollment. The client's own score is
 * never trusted — it only drives live camera guidance.
 */
export async function verifyFaceMatch(userId: string, jpegDataUrl: string): Promise<VerificationOutcome> {
  const enrollment = getFaceEnrollment(userId);
  if (!enrollment) throw new NotEnrolledError();

  const analysis = await analyzeFace(jpegDataUrl);
  if (!analysis) throw new NoFaceDetectedError();

  const similarity = cosineSimilarity(analysis.embedding, enrollment.descriptor);

  // Spoofing evidence reduces the effective measurement rather than hard-failing:
  // the engine's job is to degrade confidence, not to dead-end the user.
  const spoofPenalty = penaltyFor(analysis);
  const measurement = Math.max(0, similarity - spoofPenalty);

  return {
    measurement,
    raw: {
      cosineSimilarity: round(similarity),
      liveScore: round(analysis.live),
      antispoofScore: round(analysis.real),
      faceScore: round(analysis.faceScore),
      spoofPenalty: round(spoofPenalty),
      enrollmentSource: enrollment.source,
    },
  };
}

// Kept deliberately mild: these models read a genuine photo of a genuine person as
// only moderately "live", so a heavy penalty would reject real users. Strong spoof
// evidence lowers confidence; it never single-handedly decides the outcome.
function penaltyFor(a: FaceAnalysis): number {
  let penalty = 0;
  if (a.real < 0.35) penalty += 0.1;
  if (a.live < 0.35) penalty += 0.06;
  return penalty;
}

/** Liveness combines the model scores with whether the randomized gesture was actually performed. */
export async function verifyLiveness(
  jpegDataUrl: string,
  challengePassed: boolean,
  gestureConfidence: number
): Promise<VerificationOutcome> {
  const analysis = await analyzeFace(jpegDataUrl);
  if (!analysis) throw new NoFaceDetectedError();

  const modelScore = (analysis.live + analysis.real) / 2;
  const gesture = challengePassed ? clamp01(gestureConfidence) : 0;
  // A static photo can score well on the models but cannot perform the gesture.
  const measurement = challengePassed ? modelScore * 0.5 + gesture * 0.5 : modelScore * 0.35;

  return {
    measurement,
    raw: {
      liveScore: round(analysis.live),
      antispoofScore: round(analysis.real),
      challengePassed,
      gestureConfidence: round(gesture),
    },
  };
}

export function verifyVoicePhrase(transcript: string, expectedPhrase: string): VerificationOutcome {
  const similarity = textSimilarity(transcript, expectedPhrase);
  return {
    measurement: similarity,
    raw: {
      transcript: transcript.slice(0, 200),
      expectedPhrase,
      transcriptSimilarity: round(similarity),
    },
  };
}

/** Fallback when the browser has no speech recognition: score on audio presence only. */
export function verifyVoiceAudioOnly(durationMs: number, peakLevel: number): VerificationOutcome {
  const durationOk = durationMs >= 1200 && durationMs <= 15000 ? 1 : 0.4;
  const measurement = clamp01(durationOk * 0.5 + clamp01(peakLevel) * 0.5) * 0.7;
  return {
    measurement,
    raw: { durationMs, peakLevel: round(peakLevel), mode: "audio_only_fallback" },
  };
}

/** OCR text from the pension document is matched against the user's real profile fields. */
export function verifyDocument(ocrText: string, user: User): VerificationOutcome {
  const haystack = ocrText.toLowerCase().replace(/\s+/g, " ");
  const checks: { field: string; hit: boolean }[] = [];

  const passbook = user.pension.passbookNumber.toLowerCase();
  checks.push({
    field: "passbookNumber",
    hit: haystack.includes(passbook) || bestTokenSimilarity(haystack, passbook) > 0.85,
  });

  const nameParts = user.name.en.toLowerCase().split(/\s+/).filter((p) => p.length > 2);
  const nameHits = nameParts.filter((p) => haystack.includes(p) || bestTokenSimilarity(haystack, p) > 0.85);
  checks.push({ field: "name", hit: nameHits.length >= Math.ceil(nameParts.length / 2) });

  checks.push({ field: "district", hit: haystack.includes(user.address.district.toLowerCase()) });
  checks.push({ field: "bank", hit: haystack.includes(user.bank.ifsc.toLowerCase()) || haystack.includes("pension") });

  const hits = checks.filter((c) => c.hit).length;
  const measurement = hits / checks.length;

  return {
    measurement,
    raw: {
      fieldsMatched: hits,
      fieldsChecked: checks.length,
      matchedFields: checks.filter((c) => c.hit).map((c) => c.field).join(",") || "none",
      textLength: ocrText.length,
    },
  };
}

function bestTokenSimilarity(haystack: string, needle: string): number {
  let best = 0;
  for (const token of haystack.split(" ")) {
    if (Math.abs(token.length - needle.length) > 3) continue;
    best = Math.max(best, textSimilarity(token, needle));
    if (best === 1) break;
  }
  return best;
}

export async function buildEnrollmentDescriptor(jpegDataUrl: string): Promise<FaceAnalysis> {
  const analysis = await analyzeFace(jpegDataUrl);
  if (!analysis) throw new NoFaceDetectedError();
  return analysis;
}

export const REAL_SIGNALS: SignalType[] = [
  "face_match",
  "liveness_challenge",
  "voice_phrase",
  "document_upload",
];

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}
function round(v: number) {
  return Math.round(v * 1000) / 1000;
}

/* ------------------------------------------------- client-side face pipeline */

/**
 * A face reading produced in the browser rather than on the server.
 *
 * On serverless the TensorFlow models are far too large to ship inside a function
 * bundle, so the browser runs the same @vladmandic/human pipeline and posts the
 * resulting descriptor. The server still owns the decision: it holds the enrolled
 * template, computes the similarity and applies the calibration and scoring — the
 * client never reports its own match result.
 *
 * This is a genuine reduction in assurance and is recorded as such: `engine:
 * "client"` lands in the event's raw payload, so any certificate issued from these
 * signals carries the provenance of the measurement with it.
 */
export interface ClientFaceReading {
  descriptor: number[];
  faceScore: number;
  live: number;
  real: number;
}

/** Human descriptors are 1024-d; anything else is a malformed or forged payload. */
const DESCRIPTOR_LENGTH = 1024;

function assertDescriptor(descriptor: number[]) {
  if (descriptor.length !== DESCRIPTOR_LENGTH || descriptor.some((n) => !Number.isFinite(n))) {
    throw new ApiError(
      422,
      "BAD_DESCRIPTOR",
      "We could not read that face capture. Please try again, or use another method."
    );
  }
}

export function verifyFaceMatchFromDescriptor(
  userId: string,
  reading: ClientFaceReading
): VerificationOutcome {
  const enrollment = getFaceEnrollment(userId);
  if (!enrollment) throw new NotEnrolledError();
  assertDescriptor(reading.descriptor);

  const similarity = cosineSimilarity(reading.descriptor, enrollment.descriptor);
  const spoofPenalty = penaltyFor({
    embedding: reading.descriptor,
    faceScore: reading.faceScore,
    live: reading.live,
    real: reading.real,
    box: [0, 0, 0, 0],
  });
  const measurement = Math.max(0, similarity - spoofPenalty);

  return {
    measurement,
    raw: {
      cosineSimilarity: round(similarity),
      liveScore: round(reading.live),
      antispoofScore: round(reading.real),
      faceScore: round(reading.faceScore),
      spoofPenalty: round(spoofPenalty),
      enrollmentSource: enrollment.source,
      engine: "client",
    },
  };
}

export function livenessFromClientReading(
  reading: ClientFaceReading,
  challengePassed: boolean,
  gestureConfidence: number
): VerificationOutcome {
  const modelScore = (reading.live + reading.real) / 2;
  const gesture = challengePassed ? clamp01(gestureConfidence) : 0;
  const measurement = challengePassed ? modelScore * 0.5 + gesture * 0.5 : modelScore * 0.35;
  return {
    measurement,
    raw: {
      liveScore: round(reading.live),
      antispoofScore: round(reading.real),
      challengePassed,
      gestureConfidence: round(gesture),
      engine: "client",
    },
  };
}

export function enrollmentFromClientReading(reading: ClientFaceReading): FaceAnalysis {
  assertDescriptor(reading.descriptor);
  if (reading.faceScore < 0.4) throw new NoFaceDetectedError();
  return {
    embedding: reading.descriptor,
    faceScore: reading.faceScore,
    live: reading.live,
    real: reading.real,
    box: [0, 0, 0, 0],
  };
}
