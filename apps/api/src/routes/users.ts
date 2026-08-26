import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { updatePreferencesSchema } from "@jeevansetu/shared";
import type { AuthedVars } from "../middleware/auth";
import { requireAuth } from "../middleware/auth";
import {
  certificatesForUser,
  familyContactsTable,
  pensionHistoryForUser,
  sessionsTable,
  trustedDevicesTable,
  usersTable,
} from "../db/repo";
import { ApiError } from "../middleware/error";
import { syncFamilyFromAadhaar, syncPensionHistory } from "../services/aadhaar";

export const userRoutes = new Hono<{ Variables: AuthedVars }>();
userRoutes.use("*", requireAuth);

function loadUser(userId: string) {
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  return user;
}

userRoutes.get("/me", async (c) => {
  return c.json({ user: loadUser(c.get("userId")) });
});

/**
 * Preferences are the only user-writable data in the app. Name, date of birth,
 * address and family all come from Aadhaar and have no write path by design —
 * see services/aadhaar.ts.
 */
userRoutes.patch("/me/preferences", zValidator("json", updatePreferencesSchema), async (c) => {
  const user = loadUser(c.get("userId"));
  const patch = c.req.valid("json");
  const updated = {
    ...user,
    locale: patch.locale ?? user.locale,
    prefs: { ...user.prefs, ...patch },
  };
  usersTable.update(user.id, updated);
  return c.json({ user: updated });
});

userRoutes.get("/me/timeline", async (c) => {
  const userId = c.get("userId");
  return c.json({
    sessions: sessionsTable.findBy("userId", userId),
    certificates: certificatesForUser(userId),
  });
});

/** Pension disbursement statement — date, amount, masked account, UTR, rail. */
userRoutes.get("/me/pension/history", async (c) => {
  const user = loadUser(c.get("userId"));
  let rows = pensionHistoryForUser(user.id);
  if (rows.length === 0 && user.pension.status !== "not_eligible") {
    // The statement mirrors an external registry; rebuild it if this process has
    // never seen it (a cold start on serverless, for instance).
    rows = syncPensionHistory(user);
  }
  const credited = rows.filter((r) => r.status === "credited");
  return c.json({
    transactions: rows,
    summary: {
      status: user.pension.status,
      monthlyAmount: user.pension.monthlyAmount,
      lastCreditedAt: user.pension.lastCreditedAt,
      nextRenewalDueAt: user.pension.nextRenewalDueAt,
      monthsUnpaid: user.pension.monthsUnpaid,
      withheldAmount: rows
        .filter((r) => r.status === "on_hold")
        .reduce((sum, r) => sum + r.amount, 0),
      creditedCount: credited.length,
    },
  });
});

/**
 * Read-only. Family comes from the Aadhaar record, so there is no POST, PATCH or
 * DELETE here — a pensioner cannot add an attester who does not exist in Aadhaar.
 */
userRoutes.get("/me/family-contacts", async (c) => {
  const user = loadUser(c.get("userId"));
  let contacts = familyContactsTable.findBy("userId", user.id);
  if (contacts.length === 0) contacts = syncFamilyFromAadhaar(user);
  return c.json({ contacts, source: "aadhaar", readOnly: true });
});

userRoutes.get("/me/devices", async (c) => {
  return c.json({ devices: trustedDevicesTable.findBy("userId", c.get("userId")) });
});

userRoutes.post("/me/devices/trust", async (c) => {
  const fingerprint = c.req.header("x-device-fingerprint");
  if (!fingerprint) throw new ApiError(400, "MISSING_DEVICE", "No device fingerprint provided.");
  const device = trustedDevicesTable
    .findBy("userId", c.get("userId"))
    .find((d) => d.fingerprint === fingerprint);
  if (!device) throw new ApiError(404, "NOT_FOUND", "Device not found.");
  const updated = { ...device, isTrusted: true, lastSeenAt: new Date().toISOString() };
  trustedDevicesTable.update(device.id, updated);
  return c.json({ device: updated });
});
