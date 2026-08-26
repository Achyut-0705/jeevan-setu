import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import {
  CALL_CHECK_TYPES,
  callIntegritySchema,
  scheduleAppointmentSchema,
} from "@jeevansetu/shared";
import type { AuthedVars } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";
import { appointmentsForUser, findActiveSessionForUser, usersTable } from "../db/repo";
import { ApiError } from "../middleware/error";
import { startVerificationSession } from "../engine/sessionInit";
import {
  cancelAppointment,
  joinAppointment,
  listSlots,
  loadAppointment,
  resolveCheck,
  scheduleAppointment,
  submitCallEvidence,
} from "../services/appointments";
import { VOICE_PHRASES } from "../services/phrases";

export const appointmentRoutes = new Hono<{ Variables: AuthedVars }>();
appointmentRoutes.use("*", requireAuth);

appointmentRoutes.get("/slots", async (c) => {
  return c.json({ slots: listSlots(c.get("userId")) });
});

appointmentRoutes.get("/", async (c) => {
  return c.json({ appointments: appointmentsForUser(c.get("userId")) });
});

appointmentRoutes.post("/", zValidator("json", scheduleAppointmentSchema), async (c) => {
  const userId = c.get("userId");
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  if (user.pension.status === "not_eligible") {
    throw new ApiError(
      409,
      "NOT_ELIGIBLE",
      "No pension account is linked to this Aadhaar number, so no verification call is needed."
    );
  }

  const session =
    findActiveSessionForUser(userId) ??
    startVerificationSession(user, c.req.header("x-device-fingerprint") ?? null);

  const appointment = scheduleAppointment(session, c.req.valid("json").slotStart);
  return c.json({ appointment }, 201);
});

appointmentRoutes.get("/:id", async (c) => {
  return c.json({ appointment: loadAppointment(c.get("userId"), c.req.param("id")!) });
});

appointmentRoutes.post("/:id/cancel", async (c) => {
  return c.json({ appointment: cancelAppointment(c.get("userId"), c.req.param("id")!) });
});

appointmentRoutes.post("/:id/join", async (c) => {
  const userId = c.get("userId");
  const appointment = joinAppointment(userId, c.req.param("id")!);
  const user = usersTable.getById(userId);
  const phrases = VOICE_PHRASES[user?.locale ?? "en"];

  return c.json({
    appointment,
    /** The sentence the officer asks the pensioner to read during the call. */
    readPhrase: phrases[Math.floor(Math.random() * phrases.length)],
    officerScript: {
      greeting: {
        en: "Hello, thank you for joining. I will ask you to do a few short things so I can confirm it is really you.",
        hi: "नमस्ते, शामिल होने के लिए धन्यवाद। मैं आपसे कुछ छोटे कार्य कराऊँगा ताकि पुष्टि हो सके कि यह वास्तव में आप हैं।",
      },
    },
  });
});

const checkSchema = z.object({
  type: z.enum(CALL_CHECK_TYPES),
  passed: z.boolean(),
  note: z.string().max(300).nullable().optional(),
});

appointmentRoutes.post("/:id/checks", zValidator("json", checkSchema), async (c) => {
  const { type, passed, note } = c.req.valid("json");
  const appointment = resolveCheck(c.get("userId"), c.req.param("id")!, type, passed, note ?? null);
  return c.json({ appointment });
});

/**
 * The pensioner's side of the call is done. This deliberately does not complete the
 * appointment — the officer's decision does, and the response says so.
 */
appointmentRoutes.post(
  "/:id/submit",
  zValidator(
    "json",
    z.object({ integrity: callIntegritySchema.omit({ livePresenceScore: true, flags: true }) })
  ),
  async (c) => {
    const appointment = submitCallEvidence(
      c.get("userId"),
      c.req.param("id")!,
      c.req.valid("json").integrity
    );
    return c.json({
      appointment,
      awaitingOfficer: true,
      message: {
        en: "Thank you. The verification officer is reviewing what you showed on the call and will confirm shortly.",
        hi: "धन्यवाद। सत्यापन अधिकारी कॉल पर दिखाई गई जानकारी की समीक्षा कर रहे हैं और शीघ्र पुष्टि करेंगे।",
      },
    });
  }
);
