import { build } from "esbuild";

/**
 * Bundles vercel-entry.ts into api/[...path].js — see vercel-entry.ts for why this
 * has to be a real bundle rather than a raw TS file Vercel transpiles per-file.
 *
 * The banner defines a real `require` via createRequire so esbuild's CJS-interop
 * shim can satisfy `require("buffer")`-style calls buried in bundled CJS
 * dependencies (jsonwebtoken -> jws -> safe-buffer); esbuild's ESM output has no
 * ambient `require` otherwise, and throws "Dynamic require of ... is not
 * supported" the first time one of those calls runs.
 */
await build({
  entryPoints: ["vercel-entry.ts"],
  outfile: "api/[...path].js",
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
