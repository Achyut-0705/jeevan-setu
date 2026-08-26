import { z } from "zod";
import { EVENT_STATUSES, SIGNAL_CATEGORIES, SIGNAL_TYPES, TIERS } from "../enums";
import { bilingualTextSchema } from "./user";

export const riskFlagSchema = z.object({
  code: z.string(),
  severity: z.enum(["low", "medium", "high"]),
});

export const nextBestActionSchema = z.object({
  signal: z.enum(SIGNAL_TYPES),
  estimatedPoints: z.number(),
  effort: z.enum(["none", "low", "medium", "high", "assisted"]),
  labelKey: z.string(),
  reason: z.string().optional(),
  isRetry: z.boolean().optional(),
  alwaysAvailable: z.boolean().optional(),
});
export type NextBestAction = z.infer<typeof nextBestActionSchema>;

export const categorySubtotalsSchema = z.object({
  otp: z.number(),
  biometric: z.number(),
  social: z.number(),
  documentary: z.number(),
  passive: z.number(),
});
export type CategorySubtotals = z.infer<typeof categorySubtotalsSchema>;

export const confidenceEventSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  userId: z.string(),
  seq: z.number(),
  signal: z.enum(SIGNAL_TYPES),
  category: z.enum(SIGNAL_CATEGORIES),
  attemptIndex: z.number(),
  status: z.enum(EVENT_STATUSES),
  raw: z.record(z.string(), z.union([z.number(), z.string(), z.boolean()])),
  quality: z.number(),
  weight: z.number(),
  retryDecay: z.number(),
  rawPoints: z.number(),
  cappedPoints: z.number(),
  capReason: z.string().nullable(),
  scoreBefore: z.number(),
  scoreAfter: z.number(),
  tierBefore: z.enum(TIERS),
  tierAfter: z.enum(TIERS),
  categorySubtotals: categorySubtotalsSchema,
  riskFlags: z.array(riskFlagSchema),
  narrative: z.object({
    en: z.object({ title: z.string(), body: z.string(), tone: z.string() }),
    hi: z.object({ title: z.string(), body: z.string(), tone: z.string() }),
  }),
  nextBestActions: z.array(nextBestActionSchema),
  createdAt: z.string(),
});
export type ConfidenceEvent = z.infer<typeof confidenceEventSchema>;

export const verificationSessionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  status: z.enum(["active", "completed", "abandoned", "expired"]),
  startedAt: z.string(),
  completedAt: z.string().nullable(),
  expiresAt: z.string(),
  currentScore: z.number(),
  currentTier: z.enum(TIERS),
  categorySubtotals: categorySubtotalsSchema,
  completedSignals: z.array(z.enum(SIGNAL_TYPES)),
  locale: z.enum(["en", "hi"]),
  certificateId: z.string().nullable(),
});
export type VerificationSession = z.infer<typeof verificationSessionSchema>;

export const submitSignalSchema = z.object({
  raw: z.record(z.string(), z.union([z.number(), z.string(), z.boolean()])).default({}),
});
export type SubmitSignalInput = z.infer<typeof submitSignalSchema>;
