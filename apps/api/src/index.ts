import { serve } from "@hono/node-server";
import { env } from "./env";
import { ensureSeeded } from "./db/seed";
import app from "./app";

ensureSeeded();

// Load face models up front so the first real verification isn't slow. Skipped when
// the browser owns the face pipeline (FACE_ENGINE=client), where the server never
// needs TensorFlow at all.
if (env.FACE_ENGINE === "server") {
  void import("./services/humanEngine").then((engine) => engine.warmUpHuman());
}

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  // eslint-disable-next-line no-console
  console.log(`[jeevansetu-api] listening on http://localhost:${info.port}`);
});
