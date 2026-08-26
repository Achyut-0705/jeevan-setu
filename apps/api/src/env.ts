import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8787),
  JWT_SECRET: z.string().min(8).default("dev-jwt-secret-change-me"),
  JWT_REFRESH_SECRET: z.string().min(8).default("dev-refresh-secret-change-me"),
  ENABLE_DEV_TOOLS: z
    .string()
    .default("true")
    .transform((v) => v === "true"),
  /**
   * `sqlite` keeps a file on disk for local dev; `memory` is required on Vercel,
   * where the filesystem is read-only and native modules cannot load. Defaults to
   * memory whenever a Vercel runtime is detected so a deploy never needs the flag.
   */
  PERSIST: z.enum(["sqlite", "memory"]).default(process.env.VERCEL ? "memory" : "sqlite"),
  DATA_DIR: z.string().default("./data"),
  /**
   * Origin used to build certificate verification links and family SMS links.
   * On Vercel this is derived from VERCEL_URL when not set explicitly.
   */
  PUBLIC_BASE_URL: z
    .string()
    .default(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173"),
  HUMAN_MODEL_PATH: z.string().default("https://vladmandic.github.io/human-models/models/"),
  /**
   * `real` runs the face pipeline; `simulate` short-circuits it so a hardware
   * failure on stage cannot block a walkthrough.
   */
  VERIFICATION_MODE: z.enum(["real", "simulate"]).default("real"),
  /**
   * Where face descriptors are computed. On serverless the TensorFlow models are far
   * too large for a function bundle, so the browser extracts the descriptor and the
   * server still does the comparison and all scoring. See services/verification.ts.
   */
  FACE_ENGINE: z.enum(["server", "client"]).default(process.env.VERCEL ? "client" : "server"),
});

export const env = envSchema.parse(process.env);
