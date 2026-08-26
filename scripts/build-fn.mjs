import { build } from "esbuild";

/**
 * Bundles vercel-entry.ts into api/index.js — see vercel-entry.ts for why this has
 * to be a real bundle rather than a raw TS file Vercel transpiles per-file.
 *
 * This deliberately is NOT named api/[...path].js. Declaring that exact bracketed
 * filename as a literal key in vercel.json's "functions" object (needed to set
 * excludeFiles/includeFiles/maxDuration) stops Vercel from parsing it as a
 * catch-all route: it builds the function fine, but only ever routes single-
 * segment /api/* paths to it (multi-segment paths 404 before reaching the
 * function), and the auto-injected query param comes through literally named
 * "...path" instead of "path" — both signs the bracket syntax isn't being
 * interpreted as a dynamic segment in that context. Using a plain filename plus
 * an explicit rewrite in vercel.json ("/api/:match*" -> "/api") sidesteps that
 * entirely; our Hono app already routes off the raw request path, not Vercel's
 * synthesized query param, so nothing else has to change.
 *
 * The banner defines a real `require` via createRequire so esbuild's CJS-interop
 * shim can satisfy `require("buffer")`-style calls buried in bundled CJS
 * dependencies (jsonwebtoken -> jws -> safe-buffer); esbuild's ESM output has no
 * ambient `require` otherwise, and throws "Dynamic require of ... is not
 * supported" the first time one of those calls runs.
 */
await build({
  entryPoints: ["vercel-entry.ts"],
  outfile: "api/index.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "node20",
  external: [
    "better-sqlite3",
    "@tensorflow/tfjs",
    "@tensorflow/tfjs-backend-wasm",
    "@vladmandic/human",
    "pdfkit",
  ],
  banner: {
    js: "import { createRequire as __createRequireForEsbuildCjsInterop } from 'module'; const require = __createRequireForEsbuildCjsInterop(import.meta.url);",
  },
});
