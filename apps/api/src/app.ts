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

const app = new Hono();

app.use("*", logger());
app.use(
  "/api/*",
  cors({
    origin: (origin) => origin ?? "*",
    credentials: true,
  })
);

app.onError(handleError);

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
