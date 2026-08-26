import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import type { Certificate, User } from "@jeevansetu/shared";
import type { AuthedVars } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";
import { certificatesTable, findCertificateByCode, sessionsTable, usersTable } from "../db/repo";
import { ApiError } from "../middleware/error";
import { issueCertificateForSession } from "../services/certificates";
import { certificateFileName, certificateVerifyUrl, renderCertificatePdf } from "../services/pdf";
import { verifyAccessToken } from "../services/tokens";

export const certificateRoutes = new Hono<{ Variables: AuthedVars }>();

const issueSchema = z.object({ sessionId: z.string() });

/**
 * The payload every certificate surface renders from — the app's certificate page,
 * the shared verification page and the PDF all read these same fields, so what a
 * pensioner sees on screen is what comes out of the printer.
 */
function certificateView(certificate: Certificate, user: User, full: boolean) {
  const expired = new Date(certificate.validUntil) < new Date();
  const shared = {
    certificateNumber: certificate.certificateNumber,
    verificationCode: certificate.verificationCode,
    verifyUrl: certificateVerifyUrl(certificate),
    kind: certificate.kind,
    tier: certificate.tier,
    confidenceScore: certificate.confidenceScore,
    signalsUsed: certificate.signalsUsed,
    issuedAt: certificate.issuedAt,
    validFrom: certificate.validFrom,
    validUntil: certificate.validUntil,
    status: expired ? ("expired" as const) : certificate.status,
    valid: certificate.status === "active" && !expired,
  };

  if (!full) {
    // A verifier needs to know the certificate is genuine and whose it is — not the
    // holder's full identity. Enough to match against a document in front of them,
    // no more.
    return {
      ...shared,
      redacted: true,
      holder: {
        name: { en: maskName(user.name.en), hi: maskName(user.name.hi) },
        maskedAadhaar: user.maskedAadhaar,
        district: user.address.district,
        state: user.address.state,
      },
    };
  }

  return {
    ...shared,
    redacted: false,
    holder: {
      name: user.name,
      maskedAadhaar: user.maskedAadhaar,
      dob: user.dob,
      passbookNumber: user.pension.passbookNumber,
      disbursingAgency: user.pension.disbursingAgency,
      sanctioningAuthority: user.pension.sanctioningAuthority,
      maskedAccount: user.bank.maskedAccount,
      district: user.address.district,
      state: user.address.state,
    },
  };
}

/** "Ram Prasad Sharma" -> "Ram P. S." — recognisable to someone who knows them. */
function maskName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]!;
  return [parts[0], ...parts.slice(1).map((p) => `${p[0]}.`)].join(" ");
}

certificateRoutes.post("/issue", requireAuth, zValidator("json", issueSchema), async (c) => {
  const userId = c.get("userId");
  const session = sessionsTable.getById(c.req.valid("json").sessionId);
  if (!session || session.userId !== userId) {
    throw new ApiError(404, "SESSION_NOT_FOUND", "Session not found.");
  }
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");

  const certificate = issueCertificateForSession(session, user);
  return c.json({ certificate, view: certificateView(certificate, user, true) }, 201);
});

/** Owner only. A certificate carries enough personal data to be worth protecting. */
certificateRoutes.get("/:id", requireAuth, async (c) => {
  const certificate = certificatesTable.getById(c.req.param("id")!);
  if (!certificate || certificate.userId !== c.get("userId")) {
    throw new ApiError(404, "NOT_FOUND", "Certificate not found.");
  }
  const user = usersTable.getById(certificate.userId)!;
  return c.json({ certificate, view: certificateView(certificate, user, true) });
});

certificateRoutes.get("/:id/download", requireAuth, async (c) => {
  const certificate = certificatesTable.getById(c.req.param("id")!);
  if (!certificate || certificate.userId !== c.get("userId")) {
    throw new ApiError(404, "NOT_FOUND", "Certificate not found.");
  }
  const user = usersTable.getById(certificate.userId)!;
  const pdf = await renderCertificatePdf(certificate, user);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${certificateFileName(certificate, user)}"`,
      // Lets the browser read the filename back off a fetch()-driven download.
      "Access-Control-Expose-Headers": "Content-Disposition",
    },
  });
});

/**
 * The shared verification link.
 *
 * Renders the certificate itself rather than a bare valid/invalid answer, so a bank
 * clerk or a family member sees the document they were sent. Personal details are
 * masked for everyone except the holder: if the request carries the owner's access
 * token, the full certificate is returned; otherwise a redacted one is.
 */
certificateRoutes.get("/verify/:code", async (c) => {
  const certificate = findCertificateByCode(c.req.param("code")!);
  if (!certificate) {
    return c.json({ found: false, valid: false, reason: "not_found" as const }, 404);
  }
  const user = usersTable.getById(certificate.userId);
  if (!user) {
    return c.json({ found: false, valid: false, reason: "not_found" as const }, 404);
  }

  let isOwner = false;
  const header = c.req.header("authorization");
  if (header?.startsWith("Bearer ")) {
    try {
      isOwner = verifyAccessToken(header.slice(7)).sub === certificate.userId;
    } catch {
      isOwner = false;
    }
  }

  const view = certificateView(certificate, user, isOwner);
  return c.json({ found: true, valid: view.valid, isOwner, certificate: view });
});
