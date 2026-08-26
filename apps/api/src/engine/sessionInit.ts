import { nanoid } from "nanoid";
import type { User, VerificationSession } from "@jeevansetu/shared";
import { insertSession } from "../db/repo";
import { trustedDevicesTable, certificatesTable } from "../db/repo";
import { recordSignalEvent } from "./scoring";
import {
  mockLocationConsistency,
  mockPensionRecordMatch,
} from "../mocks/signalMocks";

const SESSION_TTL_DAYS = 7;

export function startVerificationSession(user: User, deviceFingerprint: string | null): VerificationSession {
  const now = new Date();
  let session: VerificationSession = {
    id: `ses_${nanoid(10)}`,
    userId: user.id,
    status: "active",
    startedAt: now.toISOString(),
    completedAt: null,
    expiresAt: new Date(now.getTime() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString(),
    currentScore: 0,
    currentTier: "started",
    categorySubtotals: { otp: 0, biometric: 0, social: 0, documentary: 0, passive: 0 },
    completedSignals: [],
    locale: user.locale,
    certificateId: null,
  };
  insertSession(session);

  // Automatic / passive signals awarded immediately on session start.
  ({ session } = recordSignalEvent({
    session,
    signal: "phone_otp",
    similarity: 1,
    raw: { verifiedVia: "otp" },
  }));

  const devices = trustedDevicesTable.findBy("userId", user.id);
  const matchedDevice = deviceFingerprint ? devices.find((d) => d.fingerprint === deviceFingerprint) : undefined;
  if (matchedDevice?.isTrusted) {
    ({ session } = recordSignalEvent({
      session,
      signal: "trusted_device",
      similarity: 1,
      raw: { deviceId: matchedDevice.id },
    }));
  }

  const loc = mockPensionRecordMatch(`${user.id}:pension`);
  ({ session } = recordSignalEvent({ session, signal: "pension_record_match", similarity: loc.similarity, raw: loc.raw }));

  const locConsistency = mockLocationConsistency(`${user.id}:location`);
  ({ session } = recordSignalEvent({
    session,
    signal: "location_consistency",
    similarity: locConsistency.similarity,
    raw: locConsistency.raw,
  }));

  const priorCertificates = certificatesTable.findBy("userId", user.id);
  if (priorCertificates.length > 0) {
    ({ session } = recordSignalEvent({
      session,
      signal: "continuity_history",
      similarity: 0.9,
      raw: { priorCertificateCount: priorCertificates.length },
    }));
  }

  return session;
}
