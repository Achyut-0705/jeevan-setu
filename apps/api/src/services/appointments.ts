import { nanoid } from "nanoid";
import type {
  AppointmentSlot,
  CallCheck,
  CallCheckType,
  CallIntegrity,
  VerificationAppointment,
  VerificationSession,
} from "@jeevansetu/shared";
import { appointmentsForUser, appointmentsTable, insertAppointment } from "../db/repo";
import { ApiError } from "../middleware/error";
import { recordSignalEvent } from "../engine/scoring";

/**
 * Scheduled online verification — the final gate before a full life certificate.
 *
 * Modelled on video-KYC as banks actually run it: the pensioner books a slot, joins
 * a call with a verification officer, and is asked to do a few things on camera
 * (hold up an ID, sign, read a phrase aloud) while the browser records behavioural
 * evidence that a live human is present. The officer, not the software, decides.
 *
 * In this prototype the officer is simulated and every screen says so. What is real:
 * the booking, the check sequence, the behavioural measurements, the evidence trail,
 * and the fact that no full certificate is issued until the call is marked verified.
 */

const DAY_MS = 24 * 60 * 60 * 1000;
const SLOT_MINUTES = 20;
/** 10:00, 12:00, 15:00 and 17:00 local, over the next working week. */
const SLOT_HOURS = [10, 12, 15, 17];
const SLOT_DAYS = 5;

export function listSlots(userId: string, now = new Date()): AppointmentSlot[] {
  const taken = new Set(
    appointmentsForUser(userId)
      .filter((a) => a.status === "scheduled" || a.status === "in_call")
      .map((a) => a.slotStart)
  );

  const slots: AppointmentSlot[] = [];
  for (let d = 0; d < SLOT_DAYS; d += 1) {
    const day = new Date(now.getTime() + d * DAY_MS);
    for (const hour of SLOT_HOURS) {
      const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 0, 0);
      // A slot must be far enough out that the pensioner can actually get to it.
      if (start.getTime() < now.getTime() + 60 * 60 * 1000) continue;
      const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1000);
      slots.push({
        start: start.toISOString(),
        end: end.toISOString(),
        available: !taken.has(start.toISOString()),
      });
    }
  }
  return slots;
}

const CHECK_SEQUENCE: { type: CallCheckType; prompt: { en: string; hi: string } }[] = [
  {
    type: "show_aadhaar",
    prompt: {
      en: "Please hold your Aadhaar card up to the camera, with the photo side facing me.",
      hi: "कृपया अपना आधार कार्ड कैमरे के सामने रखें, फोटो वाला हिस्सा मेरी ओर।",
    },
  },
  {
    type: "turn_head",
    prompt: {
      en: "Now please turn your head slowly to the left, then back to the centre.",
      hi: "अब कृपया अपना सिर धीरे-धीरे बाईं ओर घुमाएँ, फिर वापस बीच में लाएँ।",
    },
  },
  {
    type: "read_phrase",
    prompt: {
      en: "Please read the sentence shown on your screen out loud.",
      hi: "कृपया अपनी स्क्रीन पर दिखाया गया वाक्य ज़ोर से पढ़ें।",
    },
  },
  {
    type: "sign_on_camera",
    prompt: {
      en: "Please sign your name on a piece of paper and hold it up to the camera.",
      hi: "कृपया कागज़ पर अपना नाम लिखें और उसे कैमरे के सामने दिखाएँ।",
    },
  },
];

function freshChecks(): CallCheck[] {
  return CHECK_SEQUENCE.map((c, i) => ({
    type: c.type,
    status: i === 0 ? ("active" as const) : ("pending" as const),
    prompt: c.prompt,
    completedAt: null,
    note: null,
  }));
}

export function scheduleAppointment(
  session: VerificationSession,
  slotStart: string,
  now = new Date()
): VerificationAppointment {
  const start = new Date(slotStart);
  if (Number.isNaN(start.getTime())) {
    throw new ApiError(422, "BAD_SLOT", "That appointment time could not be read.");
  }
  if (start.getTime() < now.getTime()) {
    throw new ApiError(409, "SLOT_IN_PAST", "That slot has already passed. Please choose another time.");
  }

  const existing = appointmentsForUser(session.userId).find(
    (a) => a.status === "scheduled" || a.status === "in_call"
  );
  if (existing) {
    throw new ApiError(
      409,
      "APPOINTMENT_EXISTS",
      "You already have a verification call booked. Please cancel it before booking another."
    );
  }

  const appointment: VerificationAppointment = {
    id: `apt_${nanoid(10)}`,
    userId: session.userId,
    sessionId: session.id,
    status: "scheduled",
    slotStart: start.toISOString(),
    slotEnd: new Date(start.getTime() + SLOT_MINUTES * 60 * 1000).toISOString(),
    joinCode: nanoid(8).toUpperCase(),
    officerName: null,
    checks: freshChecks(),
    integrity: null,
    createdAt: now.toISOString(),
    startedAt: null,
    completedAt: null,
    outcomeNote: null,
  };

  insertAppointment(appointment);
  return appointment;
}

export function loadAppointment(userId: string, id: string): VerificationAppointment {
  const appointment = appointmentsTable.getById(id);
  if (!appointment || appointment.userId !== userId) {
    throw new ApiError(404, "NOT_FOUND", "We could not find that verification call.");
  }
  return appointment;
}

export function cancelAppointment(userId: string, id: string, now = new Date()) {
  const appointment = loadAppointment(userId, id);
  if (appointment.status !== "scheduled") {
    throw new ApiError(409, "NOT_CANCELLABLE", "This call can no longer be cancelled.");
  }
  const updated = { ...appointment, status: "cancelled" as const, completedAt: now.toISOString() };
  appointmentsTable.update(appointment.id, updated);
  return updated;
}

export function joinAppointment(userId: string, id: string, now = new Date()) {
  const appointment = loadAppointment(userId, id);
  if (appointment.status === "completed") return appointment;
  if (appointment.status !== "scheduled" && appointment.status !== "in_call") {
    throw new ApiError(409, "NOT_JOINABLE", "This call is no longer open.");
  }

  const updated: VerificationAppointment = {
    ...appointment,
    status: "in_call",
    startedAt: appointment.startedAt ?? now.toISOString(),
    officerName: appointment.officerName ?? "Officer R. Nair (simulated)",
    checks: appointment.startedAt ? appointment.checks : freshChecks(),
  };
  appointmentsTable.update(appointment.id, updated);
  return updated;
}

/** Advances the officer's script one step. */
export function resolveCheck(
  userId: string,
  id: string,
  type: CallCheckType,
  passed: boolean,
  note: string | null,
  now = new Date()
) {
  const appointment = loadAppointment(userId, id);
  if (appointment.status !== "in_call") {
    throw new ApiError(409, "NOT_IN_CALL", "This call is not currently running.");
  }

  const checks = appointment.checks.map((c) =>
    c.type === type
      ? { ...c, status: passed ? ("passed" as const) : ("failed" as const), completedAt: now.toISOString(), note }
      : c
  );
  const nextPending = checks.find((c) => c.status === "pending");
  if (nextPending) nextPending.status = "active";

  const updated = { ...appointment, checks };
  appointmentsTable.update(appointment.id, updated);
  return updated;
}

/**
 * Turns raw browser behaviour into a live-presence score.
 *
 * Each term answers "would an automated agent produce this?". A replayed video has
 * no mouse path; a script has perfectly regular keystroke timing; a still photo
 * never blinks and never moves its head. None of these is conclusive on its own,
 * which is why they are combined and why the officer still decides.
 */
export function scoreIntegrity(raw: Omit<CallIntegrity, "livePresenceScore" | "flags">): CallIntegrity {
  const flags: string[] = [];

  const gaze = Math.min(1, raw.gazeSamples / 40);
  if (raw.gazeSamples < 8) flags.push("low_gaze_variation");

  const mouse = Math.min(1, raw.mouseTravel / 2500);
  if (raw.mouseTravel < 150) flags.push("no_pointer_movement");

  // Human typing varies by tens of milliseconds; synthetic input barely varies.
  const jitter = Math.min(1, raw.keystrokeJitterMs / 90);
  if (raw.keystrokeJitterMs > 0 && raw.keystrokeJitterMs < 12) flags.push("machine_like_keystrokes");

  const blink = Math.min(1, raw.blinkCount / 6);
  if (raw.blinkCount === 0) flags.push("no_blink_detected");

  const head = Math.min(1, raw.headMovementScore);
  if (raw.headMovementScore < 0.05) flags.push("static_head_pose");

  const livePresenceScore =
    gaze * 0.25 + mouse * 0.15 + jitter * 0.15 + blink * 0.25 + head * 0.2;

  return {
    ...raw,
    livePresenceScore: Math.round(livePresenceScore * 1000) / 1000,
    flags,
  };
}

/**
 * The pensioner's side is finished. The call now waits on the officer — this does
 * NOT complete the verification, and the UI says as much.
 */
export function submitCallEvidence(
  userId: string,
  id: string,
  rawIntegrity: Omit<CallIntegrity, "livePresenceScore" | "flags">,
  now = new Date()
) {
  const appointment = loadAppointment(userId, id);
  if (appointment.status !== "in_call") {
    throw new ApiError(409, "NOT_IN_CALL", "This call is not currently running.");
  }
  const integrity = scoreIntegrity(rawIntegrity);
  const updated = { ...appointment, integrity, startedAt: appointment.startedAt ?? now.toISOString() };
  appointmentsTable.update(appointment.id, updated);
  return updated;
}

/**
 * The officer's decision. This is the only path that completes a verification call,
 * and therefore the only path to a full certificate.
 */
export function officerDecision(
  appointmentId: string,
  outcome: "completed" | "failed" | "no_show",
  session: VerificationSession | null,
  officerName = "Officer R. Nair (simulated)",
  now = new Date()
): VerificationAppointment {
  const appointment = appointmentsTable.getById(appointmentId);
  if (!appointment) throw new ApiError(404, "NOT_FOUND", "Verification call not found.");

  let updated: VerificationAppointment = {
    ...appointment,
    status: outcome,
    officerName,
    completedAt: now.toISOString(),
    outcomeNote:
      outcome === "completed"
        ? {
            en: "I have seen you on the call and confirmed your documents. Your life certificate can now be issued.",
            hi: "मैंने आपको कॉल पर देखा और आपके दस्तावेज़ों की पुष्टि की। अब आपका जीवन प्रमाण पत्र जारी किया जा सकता है।",
          }
        : outcome === "no_show"
          ? {
              en: "You did not join this call. You can book another slot whenever you are ready.",
              hi: "आप इस कॉल में शामिल नहीं हुए। आप जब तैयार हों, दूसरा समय बुक कर सकते हैं।",
            }
          : {
              en: "We could not complete the verification on this call. Please book another slot, and keep your Aadhaar card with you.",
              hi: "हम इस कॉल पर सत्यापन पूरा नहीं कर सके। कृपया दूसरा समय बुक करें और अपना आधार कार्ड साथ रखें।",
            },
  };

  if (outcome === "completed" && session) {
    // The measurement is the officer's confirmation, tempered by the behavioural
    // evidence gathered during the call.
    const presence = appointment.integrity?.livePresenceScore ?? 0.7;
    const { event } = recordSignalEvent({
      session,
      signal: "video_verification",
      similarity: Math.max(0.75, Math.min(0.98, 0.75 + presence * 0.23)),
      raw: {
        channel: "scheduled_call",
        officerConfirmed: true,
        livePresenceScore: presence,
        integrityFlags: appointment.integrity?.flags.join(",") || "none",
        checksPassed: appointment.checks.filter((c) => c.status === "passed").length,
      },
    });
    updated = { ...updated, id: appointment.id };
    void event;
  }

  appointmentsTable.update(appointment.id, updated);
  return updated;
}

/** True once a call has been completed by an officer for this session. */
export function hasCompletedCall(userId: string, sessionId: string): boolean {
  return appointmentsForUser(userId).some(
    (a) => a.sessionId === sessionId && a.status === "completed"
  );
}

export function activeAppointment(userId: string): VerificationAppointment | null {
  return (
    appointmentsForUser(userId).find((a) => a.status === "scheduled" || a.status === "in_call") ?? null
  );
}
