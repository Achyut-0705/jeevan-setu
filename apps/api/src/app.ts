import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { healthRoutes } from "./routes/health";
import { aadhaarRoutes } from "./routes/aadhaar";
import { authRoutes } from "./routes/auth";
import { userRoutes } from "./routes/users";
import { sessionRoutes } from "./routes/sessions";
import { statusRoutes } from "./routes/status";
import { familyRoutes } from "./routes/family";
import { certificateRoutes } from "./routes/certificates";
import { reviewRoutes } from "./routes/reviews";
import { appointmentRoutes } from "./routes/appointments";
import { devRoutes } from "./routes/dev";
import { enrollmentRoutes } from "./routes/enrollment";
import { handleError } from "./middleware/error";
import { ensureSeeded } from "./db/seed";
import { flushToShared, hydrateFromShared } from "./db/sharedState";

const app = new Hono();

app.use("*", logger());

/**
 * Load the shared demo state before the request and publish it afterwards, so that
 * state created on one serverless instance is visible to every other one. No-op
 * outside Vercel's memory driver. See db/sharedState.ts for what this does and does
 * not guarantee.
 *
 * Re-seeding after the hydrate matters: an instance whose store was just replaced by
 * a snapshot from a different seed version — or that came up with nothing to load —
 * still has to end up with the four personas present before any route reads them.
 */
app.use("*", async (c, next) => {
  await hydrateFromShared();
  ensureSeeded();
  try {
    await next();
  } finally {
    await flushToShared();
  }
});
app.use(
  "/api/*",
  cors({
    origin: (origin) => origin ?? "*",
    credentials: true,
  })
);

app.onError(handleError);

/**
 * Endpoints whose response is the same for everybody and changes only when the code
 * does: the demo persona directory and the health probe. Everything else in this API
 * is either personal or a live verification state.
 */
const PUBLIC_CACHEABLE = new Set(["/api/health", "/api/aadhaar/directory"]);

/**
 * Say explicitly how each response may be cached, rather than leaving it to defaults.
 *
 * The two public reads above get a short shared cache window: the login screen asks
 * for the directory on every visit, and the answer is identical for every visitor, so
 * serving repeats from the edge saves a function invocation. `stale-while-revalidate`
 * means a caller never waits on the refresh.
 *
 * Everything else is `private, no-store`. These responses carry someone's name, date
 * of birth, address, pension payments and verification progress; that must not sit in
 * a shared cache, and on a device the pensioner may be borrowing it should not linger
 * in the browser's disk cache either. The client still caches in memory for the
 * window that lib/queryClient.ts sets, which is where the deduplication actually
 * matters — no-store constrains the HTTP layer, not React Query's own store.
 */
app.use("/api/*", async (c, next) => {
  await next();
  if (c.res.headers.has("Cache-Control")) return;
  const cacheable = c.req.method === "GET" && PUBLIC_CACHEABLE.has(new URL(c.req.url).pathname);
  c.res.headers.set(
    "Cache-Control",
    cacheable ? "public, max-age=60, stale-while-revalidate=300" : "private, no-store"
  );
});

app.route("/api/health", healthRoutes);
// The mocked UIDAI service: login, consent, family and face-authentication all
// originate here, because that is where personal data lives. See routes/aadhaar.ts.
app.route("/api/aadhaar", aadhaarRoutes);
app.route("/api/auth", authRoutes);
app.route("/api/users", userRoutes);
app.route("/api/verification/status", statusRoutes);
app.route("/api/verification/sessions", sessionRoutes);
app.route("/api/family", familyRoutes);
app.route("/api/certificates", certificateRoutes);
app.route("/api/reviews", reviewRoutes);
app.route("/api/appointments", appointmentRoutes);
app.route("/api/enrollment", enrollmentRoutes);
app.route("/api/dev", devRoutes);

export type AppType = typeof app;
export default app;
