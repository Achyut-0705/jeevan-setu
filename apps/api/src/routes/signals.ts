import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { nanoid } from "nanoid";
import type { AuthedVars } from "../middleware/auth";
import {
  familyContactsTable,
  getMockControl,
  insertFamilyConfirmation,
  sessionsTable,
  usersTable,
} from "../db/repo";
import { ApiError } from "../middleware/error";
import { recordSignalEvent } from "../engine/scoring";
import {
  livenessFromClientReading,
  verifyDocument,
  verifyFaceMatch,
  verifyFaceMatchFromDescriptor,
  verifyLiveness,
  verifyVoiceAudioOnly,
  verifyVoicePhrase,
  type VerificationOutcome,
} from "../services/verification";
import { mockFaceMatch, mockLiveness, mockVoicePhrase, mockDocumentOcr } from "../mocks/signalMocks";
import { sendMockSms } from "../mocks/sms";
import { attesterMobile } from "../services/aadhaar";
import { env } from "../env";
import { VOICE_PHRASES } from "../services/phrases";

export const signalRoutes = new Hono<{ Variables: AuthedVars }>();

const jpegSchema = z.string().min(64).max(8_000_000);

/** A face reading extracted in the browser — see services/verification.ts. */
const clientReadingSchema = z.object({
  descriptor: z.array(z.number()).min(64).max(4096),
  faceScore: z.number().min(0).max(1),
  live: z.number().min(0).max(1),
  real: z.number().min(0).max(1),
});

function ownedActiveSession(userId: string, sessionId: string) {
  const session = sessionsTable.getById(sessionId);
  if (!session || session.userId !== userId) {
    throw new ApiError(404, "SESSION_NOT_FOUND", "Verification session not found.");
  }
  if (session.status !== "active") {
    throw new ApiError(409, "SESSION_NOT_ACTIVE", "This verification session is no longer active.");
  }
  return session;
}

/** Demo escape hatch: a hardware failure on stage must never block the walkthrough. */
function simulating(userId: string): boolean {
  if (env.VERIFICATION_MODE === "simulate") return true;
  return getMockControl(userId)?.overrides.simulate === "strong";
}

function attemptKey(sessionId: string, signal: string) {
  return `${sessionId}:${signal}:${Date.now()}:${nanoid(4)}`;
}

/* ------------------------------------------------------------- face match */

const faceSchema = z
  .object({ image: jpegSchema.optional(), reading: clientReadingSchema.optional() })
  .refine((v) => !!v.image || !!v.reading, { message: "Provide an image or a face reading" });

signalRoutes.post("/face-match", zValidator("json", faceSchema), async (c) => {
  const session = ownedActiveSession(c.get("userId"), c.req.param("id")!);
  const body = c.req.valid("json");

  let outcome: VerificationOutcome;
  if (simulating(session.userId)) {
    const m = mockFaceMatch(attemptKey(session.id, "face_match"), getMockControl(session.userId)?.overrides.face_match);
    outcome = { measurement: m.similarity, raw: { ...m.raw, mode: "simulated" } };
  } else if (body.reading) {
    outcome = verifyFaceMatchFromDescriptor(session.userId, body.reading);
  } else {
    outcome = await verifyFaceMatch(session.userId, body.image!);
  }

  const { event } = recordSignalEvent({
    session,
    signal: "face_match",
    similarity: outcome.measurement,
    raw: outcome.raw,
  });
  return c.json({ event });
});

/* ---------------------------------------------------------------- liveness */

const LIVENESS_CHALLENGES = ["blink", "turn_left", "turn_right", "smile"] as const;

signalRoutes.get("/liveness/challenge", async (c) => {
  const challenge = LIVENESS_CHALLENGES[Math.floor(Math.random() * LIVENESS_CHALLENGES.length)]!;
  return c.json({ challenge, timeoutMs: 15000 });
});

const livenessSchema = z
  .object({
    image: jpegSchema.optional(),
    reading: clientReadingSchema.optional(),
    challenge: z.enum(LIVENESS_CHALLENGES),
    challengePassed: z.boolean(),
    gestureConfidence: z.number().min(0).max(1),
  })
  .refine((v) => !!v.image || !!v.reading, { message: "Provide an image or a face reading" });

signalRoutes.post("/liveness", zValidator("json", livenessSchema), async (c) => {
  const session = ownedActiveSession(c.get("userId"), c.req.param("id")!);
  const body = c.req.valid("json");

  let outcome: VerificationOutcome;
  if (simulating(session.userId)) {
    const m = mockLiveness(attemptKey(session.id, "liveness"), getMockControl(session.userId)?.overrides.liveness_challenge);
    outcome = { measurement: m.similarity, raw: { ...m.raw, mode: "simulated" } };
  } else if (body.reading) {
    outcome = livenessFromClientReading(body.reading, body.challengePassed, body.gestureConfidence);
  } else {
    outcome = await verifyLiveness(body.image!, body.challengePassed, body.gestureConfidence);
  }
  outcome.raw.challenge = body.challenge;

  const { event } = recordSignalEvent({
    session,
    signal: "liveness_challenge",
    similarity: outcome.measurement,
    raw: outcome.raw,
  });
  return c.json({ event });
});

/* ------------------------------------------------------------------- voice */

signalRoutes.get("/voice/phrase", async (c) => {
  const session = sessionsTable.getById(c.req.param("id")!);
  const locale = session?.locale ?? "en";
  const list = VOICE_PHRASES[locale];
  const phrase = list[Math.floor(Math.random() * list.length)]!;
  return c.json({ phrase, locale });
});

const voiceSchema = z.object({
  expectedPhrase: z.string().min(3),
  transcript: z.string().optional(),
  durationMs: z.number().min(0).optional(),
  peakLevel: z.number().min(0).max(1).optional(),
});

signalRoutes.post("/voice", zValidator("json", voiceSchema), async (c) => {
  const session = ownedActiveSession(c.get("userId"), c.req.param("id")!);
  const body = c.req.valid("json");
  let outcome: VerificationOutcome;
  if (simulating(session.userId)) {
    const m = mockVoicePhrase(attemptKey(session.id, "voice"), getMockControl(session.userId)?.overrides.voice_phrase);
    outcome = { measurement: m.similarity, raw: { ...m.raw, mode: "simulated" } };
  } else if (body.transcript && body.transcript.trim().length > 0) {
    outcome = verifyVoicePhrase(body.transcript, body.expectedPhrase);
  } else {
    // Browser has no speech recognition — fall back to audio presence, worth less credit.
    outcome = verifyVoiceAudioOnly(body.durationMs ?? 0, body.peakLevel ?? 0);
  }
  const { event } = recordSignalEvent({
    session,
    signal: "voice_phrase",
    similarity: outcome.measurement,
    raw: outcome.raw,
  });
  return c.json({ event });
});

/* ---------------------------------------------------------------- document */

const documentSchema = z.object({
  ocrText: z.string().max(20000),
  ocrConfidence: z.number().min(0).max(100).optional(),
});

signalRoutes.post("/document", zValidator("json", documentSchema), async (c) => {
  const session = ownedActiveSession(c.get("userId"), c.req.param("id")!);
  const user = usersTable.getById(session.userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  const body = c.req.valid("json");
  let outcome: VerificationOutcome;
  if (simulating(session.userId)) {
    const m = mockDocumentOcr(attemptKey(session.id, "document"), getMockControl(session.userId)?.overrides.document_upload);
    outcome = { measurement: m.similarity, raw: { ...m.raw, mode: "simulated" } };
  } else {
    outcome = verifyDocument(body.ocrText, user);
    if (body.ocrConfidence !== undefined) outcome.raw.ocrConfidence = Math.round(body.ocrConfidence);
  }
  const { event } = recordSignalEvent({
    session,
    signal: "document_upload",
    similarity: outcome.measurement,
    raw: outcome.raw,
  });
  return c.json({ event });
});

/* ------------------------------------------------------------------ family */

const familyRequestSchema = z.object({ familyContactId: z.string().min(1) });

signalRoutes.post("/family-request", zValidator("json", familyRequestSchema), async (c) => {
  const session = ownedActiveSession(c.get("userId"), c.req.param("id")!);
  const { familyContactId } = c.req.valid("json");

  const contact = familyContactsTable.getById(familyContactId);
  if (!contact || contact.userId !== session.userId) {
    throw new ApiError(404, "NOT_FOUND", "That family member is not on your Aadhaar record.");
  }
  if (!contact.canAttest) {
    throw new ApiError(
      409,
      "CANNOT_ATTEST",
      "This relative cannot confirm your identity: Aadhaar does not have a verified mobile number for them."
    );
  }

  const user = usersTable.getById(session.userId)!;
  // The real number lives in the Aadhaar record and never reaches the browser.
  const mobile = attesterMobile(user, contact.id);
  if (!mobile) {
    throw new ApiError(409, "NO_MOBILE", "Aadhaar has no mobile number on file for this relative.");
  }

  const token = nanoid(24);
  const request = {
    id: `fcr_${nanoid(8)}`,
    sessionId: session.id,
    userId: session.userId,
    familyContactId: contact.id,
    token,
    status: "pending" as const,
    sentAt: new Date().toISOString(),
    respondedAt: null,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
  insertFamilyConfirmation(request);

  const link = `${env.PUBLIC_BASE_URL}/family/confirm/${token}`;
  sendMockSms(
    session.userId,
    mobile,
    {
      en: `${user.name.en} needs your help confirming their pension life certificate on JeevanSetu. Open: ${link}`,
      hi: `${user.name.hi} को अपने पेंशन जीवन प्रमाण पत्र की पुष्टि के लिए आपकी मदद चाहिए। खोलें: ${link}`,
    },
    { type: "family_confirmation", id: request.id }
  );

  return c.json({ request, link, sentTo: contact.maskedMobile });
});
