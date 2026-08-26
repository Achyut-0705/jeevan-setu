import { z } from "zod";
import {
  APPOINTMENT_STATUSES,
  CALL_CHECK_STATUSES,
  CALL_CHECK_TYPES,
} from "../enums";
import { bilingualTextSchema } from "./user";

/**
 * Scheduled online verification — the same shape as a bank's video-KYC call.
 *
 * The pensioner books a slot, joins a call with a verification officer, and is asked
 * to perform a few actions on camera. Only the officer marking the call verified
 * completes the life certificate. In this prototype the officer is simulated and the
 * UI says so; the flow, the gating and the evidence trail are real.
 */

export const callCheckSchema = z.object({
  type: z.enum(CALL_CHECK_TYPES),
  status: z.enum(CALL_CHECK_STATUSES),
  prompt: bilingualTextSchema,
  /** Set once the officer (or the simulation) resolves the step. */
  completedAt: z.string().nullable(),
  note: z.string().nullable(),
});
export type CallCheck = z.infer<typeof callCheckSchema>;

/**
 * Behavioural evidence gathered while the call runs. Real video-KYC systems use this
 * to tell a live human from a replay or an automated agent; here we collect genuine
 * browser signals and show the pensioner exactly what was measured.
 */
export const callIntegritySchema = z.object({
  /** Distinct gaze positions seen — a still image yields almost none. */
  gazeSamples: z.number(),
  /** Off-screen glances; a script driving the page produces zero. */
  gazeAwayEvents: z.number(),
  /** Mouse path length in pixels; bots jump, humans drift. */
  mouseTravel: z.number(),
  /** Variance in inter-keystroke timing; machine input is unnaturally regular. */
  keystrokeJitterMs: z.number(),
  blinkCount: z.number(),
  headMovementScore: z.number(),
  /** 0..1 — how confident we are that a live person was present. */
  livePresenceScore: z.number(),
  flags: z.array(z.string()),
});
export type CallIntegrity = z.infer<typeof callIntegritySchema>;

export const verificationAppointmentSchema = z.object({
  id: z.string(),
  userId: z.string(),
  sessionId: z.string(),
  status: z.enum(APPOINTMENT_STATUSES),
  slotStart: z.string(),
  slotEnd: z.string(),
  /** Quoted to the pensioner so they can rejoin the same call. */
  joinCode: z.string(),
  officerName: z.string().nullable(),
  checks: z.array(callCheckSchema),
  integrity: callIntegritySchema.nullable(),
  createdAt: z.string(),
  startedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
  outcomeNote: bilingualTextSchema.nullable(),
});
export type VerificationAppointment = z.infer<typeof verificationAppointmentSchema>;

export const scheduleAppointmentSchema = z.object({
  slotStart: z.string(),
});
export type ScheduleAppointmentInput = z.infer<typeof scheduleAppointmentSchema>;

export const completeAppointmentSchema = z.object({
  integrity: callIntegritySchema,
});
export type CompleteAppointmentInput = z.infer<typeof completeAppointmentSchema>;

export const appointmentSlotSchema = z.object({
  start: z.string(),
  end: z.string(),
  available: z.boolean(),
});
export type AppointmentSlot = z.infer<typeof appointmentSlotSchema>;
