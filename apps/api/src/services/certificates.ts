import { nanoid } from "nanoid";
import type { Certificate, User, VerificationSession } from "@jeevansetu/shared";
import { resolveTier } from "@jeevansetu/shared";
import { insertCertificate, sessionsTable } from "../db/repo";
import { ApiError } from "../middleware/error";
import { hasCompletedCall } from "./appointments";

/**
 * Issues a life certificate for a session.
 *
 * Two gates, in order:
 *   1. Confidence must reach the provisional tier at all.
 *   2. A FULL certificate additionally requires a verification call completed by an
 *      officer. Automated signals alone can keep a pension flowing on a provisional
 *      certificate, but the annual, 12-month certificate is a human's decision.
 *
 * The provisional fallback matters: a pensioner whose payments have stopped gets
 * relief immediately, rather than waiting days for a call slot.
 */
export function issueCertificateForSession(session: VerificationSession, user: User): Certificate {
  if (user.pension.status === "not_eligible") {
    throw new ApiError(
      409,
      "NOT_ELIGIBLE",
      "No pension account is linked to this Aadhaar number, so no life certificate is required."
    );
  }

  const tierDef = resolveTier(session.currentScore);
  if (!tierDef.issuesCertificate) {
    throw new ApiError(
      409,
      "NOT_ELIGIBLE_YET",
      "Your confidence score isn't high enough yet to issue a certificate. Keep going — you're building toward it."
    );
  }

  const callDone = hasCompletedCall(user.id, session.id);
  const kind: Certificate["kind"] = tierDef.tier === "verified" && callDone ? "full" : "provisional";
  const validityDays = kind === "full" ? 365 : 30;

  const now = new Date();
  const validUntil = new Date(now.getTime() + validityDays * 24 * 60 * 60 * 1000);

  const certificate: Certificate = {
    id: `cert_${nanoid(8)}`,
    userId: user.id,
    sessionId: session.id,
    kind,
    certificateNumber: `JS-${now.getFullYear()}-${nanoid(6).toUpperCase()}`,
    verificationCode: nanoid(10).toUpperCase(),
    confidenceScore: session.currentScore,
    tier: tierDef.tier,
    signalsUsed: session.completedSignals,
    issuedAt: now.toISOString(),
    validFrom: now.toISOString(),
    validUntil: validUntil.toISOString(),
    status: "active",
    aiSummary: null,
  };
  insertCertificate(certificate);

  // A provisional certificate leaves the session open: the pensioner still has a
  // verification call to complete before the full one can be issued.
  const updatedSession: VerificationSession =
    kind === "full"
      ? { ...session, status: "completed", completedAt: now.toISOString(), certificateId: certificate.id }
      : { ...session, certificateId: certificate.id };
  sessionsTable.update(session.id, updatedSession);

  return certificate;
}

/** Why a full certificate is not available yet, in words the pensioner can act on. */
export function fullCertificateBlocker(session: VerificationSession, user: User): string | null {
  const tierDef = resolveTier(session.currentScore);
  if (!tierDef.issuesCertificate) return "score";
  if (tierDef.tier !== "verified") return "score";
  if (!hasCompletedCall(user.id, session.id)) return "call";
  return null;
}
