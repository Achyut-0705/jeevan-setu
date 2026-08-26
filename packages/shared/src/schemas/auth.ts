import { z } from "zod";

export const requestOtpSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/, "Enter a 10-digit mobile number"),
});
export type RequestOtpInput = z.infer<typeof requestOtpSchema>;

export const verifyOtpSchema = z.object({
  mobile: z.string().regex(/^\d{10}$/),
  code: z.string().length(6),
  deviceLabel: z.string().max(120).optional(),
});
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;

export const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});
export type RefreshInput = z.infer<typeof refreshSchema>;

export const authTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
});
export type AuthTokens = z.infer<typeof authTokensSchema>;
