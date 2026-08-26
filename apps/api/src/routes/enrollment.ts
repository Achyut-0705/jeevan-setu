import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { nanoid } from "nanoid";
import type { AuthedVars } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";
import {
  aadhaarConsentsTable,
  getFaceEnrollment,
  saveFaceEnrollment,
  usersTable,
} from "../db/repo";
import {
  buildEnrollmentDescriptor,
  enrollmentFromClientReading,
} from "../services/verification";
import { isHumanReady } from "../services/humanEngine";
import { ApiError } from "../middleware/error";
import { env } from "../env";

export const enrollmentRoutes = new Hono<{ Variables: AuthedVars }>();
enrollmentRoutes.use("*", requireAuth);

const clientReadingSchema = z.object({
  descriptor: z.array(z.number()).min(64).max(4096),
  faceScore: z.number().min(0).max(1),
  live: z.number().min(0).max(1),
  real: z.number().min(0).max(1),
});

/**
 * A capture arrives either as an image (server extracts the descriptor) or as a
 * descriptor already extracted in the browser. Which one is expected depends on
 * FACE_ENGINE — see env.ts.
 */
const enrollSchema = z
  .object({
    image: z.string().min(64).max(8_000_000).optional(),
    reading: clientReadingSchema.optional(),
    source: z.enum(["selfie", "document"]),
    /** Both issued by the mocked Aadhaar face-authentication consent step. */
    consentId: z.string().min(6),
    txnId: z.string().min(6),
  })
  .refine((v) => !!v.image || !!v.reading, {
    message: "Provide either an image or a client face reading",
  });

enrollmentRoutes.get("/face", async (c) => {
  const userId = c.get("userId");
  const enrollment = getFaceEnrollment(userId);
  return c.json({
    enrolled: !!enrollment,
    engineReady: env.FACE_ENGINE === "client" ? true : isHumanReady(),
    faceEngine: env.FACE_ENGINE,
    enrollment: enrollment
      ? {
          source: enrollment.source,
          quality: enrollment.quality,
          createdAt: enrollment.createdAt,
          /** Shown on the profile so the user can see it is Aadhaar-backed. */
          aadhaarTxnId: enrollment.txnId,
          maskedAadhaar: usersTable.getById(userId)?.maskedAadhaar ?? null,
        }
      : null,
  });
});

/**
 * Registers a face template.
 *
 * Gated on a live Aadhaar face-authentication consent: without one, no template is
 * stored at all. That is the whole point of the flow — a Face ID in this app means
 * "verified against Aadhaar with the holder's consent", not "a selfie we kept".
 */
enrollmentRoutes.post("/face", zValidator("json", enrollSchema), async (c) => {
  const userId = c.get("userId");
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");

  const { image, reading, source, consentId, txnId } = c.req.valid("json");

  const consent = aadhaarConsentsTable.getById(consentId);
  if (!consent || consent.userId !== userId || consent.revokedAt) {
    throw new ApiError(
      403,
      "AADHAAR_CONSENT_REQUIRED",
      "Face ID must be registered through Aadhaar. Please complete the Aadhaar consent step first."
    );
  }
  if (new Date(consent.expiresAt) < new Date()) {
    throw new ApiError(403, "AADHAAR_CONSENT_EXPIRED", "That Aadhaar consent has expired. Please give consent again.");
  }
  if (!consent.scopes.includes("face_authentication")) {
    throw new ApiError(403, "AADHAAR_SCOPE_MISSING", "This Aadhaar consent does not cover face authentication.");
  }
  if (consent.txnId !== txnId) {
    throw new ApiError(403, "AADHAAR_TXN_MISMATCH", "This capture does not match the Aadhaar consent transaction.");
  }

  const analysis = reading
    ? enrollmentFromClientReading(reading)
    : await buildEnrollmentDescriptor(image!);

  saveFaceEnrollment({
    id: `enr_${nanoid(8)}`,
    userId,
    descriptor: analysis.embedding,
    source,
    quality: analysis.faceScore,
    consentId: consent.id,
    aadhaarUid: user.aadhaarUid,
    txnId: consent.txnId,
    status: "active",
    createdAt: new Date().toISOString(),
  });

  return c.json({
    enrolled: true,
    quality: Math.round(analysis.faceScore * 100) / 100,
    liveScore: Math.round(analysis.live * 100) / 100,
    antispoofScore: Math.round(analysis.real * 100) / 100,
    source,
    aadhaarTxnId: consent.txnId,
    maskedAadhaar: user.maskedAadhaar,
  });
});
