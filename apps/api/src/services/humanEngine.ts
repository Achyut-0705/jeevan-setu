import { createRequire } from "node:module";
import path from "node:path";
import { env } from "../env";

// Resolved from the working directory so this module parses as either ESM or CJS.
const require = createRequire(path.join(process.cwd(), "noop.cjs"));

export interface FaceAnalysis {
  embedding: number[];
  /** Human's liveness model: probability the input is a live capture rather than a replay. */
  live: number;
  /** Human's anti-spoof model: probability the face is real rather than a photo-of-a-photo. */
  real: number;
  faceScore: number;
  box: [number, number, number, number];
}

interface HumanResultFace {
  embedding?: number[];
  live?: number;
  real?: number;
  faceScore?: number;
  box?: number[];
}

// Human's package exports map uses non-standard keys that Node won't resolve, and its
// default "node" condition pulls in @tensorflow/tfjs-node (a native build). Resolving the
// node-wasm bundle by path keeps us on pure WASM — no compiler needed on Windows or Fly.io.
function loadHumanConstructor() {
  const distDir = path.dirname(require.resolve("@vladmandic/human"));
  const wasm = require("@tensorflow/tfjs-backend-wasm");
  const wasmDir = path.dirname(require.resolve("@tensorflow/tfjs-backend-wasm")) + path.sep;
  wasm.setWasmPaths(wasmDir);
  const mod = require(path.join(distDir, "human.node-wasm.js"));
  return { Human: mod.Human, wasmDir };
}

type HumanInstance = {
  load: () => Promise<void>;
  detect: (input: unknown, config?: unknown) => Promise<{ face: HumanResultFace[] }>;
  tf: { tensor3d: (d: unknown, s: number[], t: string) => unknown; dispose: (t: unknown) => void; ready: () => Promise<void> };
};

let instance: HumanInstance | null = null;
let loading: Promise<HumanInstance> | null = null;

async function getHuman(): Promise<HumanInstance> {
  if (instance) return instance;
  if (loading) return loading;

  loading = (async () => {
    const { Human, wasmDir } = loadHumanConstructor();
    const human: HumanInstance = new Human({
      backend: "wasm",
      wasmPath: wasmDir,
      modelBasePath: env.HUMAN_MODEL_PATH,
      cacheSensitivity: 0,
      face: {
        enabled: true,
        detector: { enabled: true, maxDetected: 1 },
        mesh: { enabled: true },
        description: { enabled: true },
        antispoof: { enabled: true },
        liveness: { enabled: true },
        iris: { enabled: false },
        emotion: { enabled: false },
      },
      body: { enabled: false },
      hand: { enabled: false },
      object: { enabled: false },
      gesture: { enabled: false },
      filter: { enabled: false },
    });
    await human.load();
    await human.tf.ready();
    // eslint-disable-next-line no-console
    console.log("[human] face models loaded (wasm backend)");
    instance = human;
    return human;
  })();

  return loading;
}

/** Warm the models at boot so the first verification isn't slow. */
export async function warmUpHuman(): Promise<boolean> {
  try {
    await getHuman();
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[human] model load failed — face verification will report unavailable:", (err as Error).message);
    return false;
  }
}

function decodeJpeg(dataUrl: string): { data: Uint8Array; width: number; height: number } {
  const jpeg = require("jpeg-js");
  const base64 = dataUrl.includes(",") ? dataUrl.slice(dataUrl.indexOf(",") + 1) : dataUrl;
  const buf = Buffer.from(base64, "base64");
  const raw = jpeg.decode(buf, { useTArray: true, formatAsRGBA: false });
  return { data: raw.data as Uint8Array, width: raw.width as number, height: raw.height as number };
}

/**
 * Runs face detection + descriptor extraction on a submitted JPEG frame.
 * The server does this itself rather than trusting a client-reported score.
 */
export async function analyzeFace(jpegDataUrl: string): Promise<FaceAnalysis | null> {
  const human = await getHuman();
  const { data, width, height } = decodeJpeg(jpegDataUrl);
  const tensor = human.tf.tensor3d(data, [height, width, 3], "float32");
  try {
    const result = await human.detect(tensor, { face: { enabled: true } });
    const face = result.face[0];
    if (!face?.embedding || face.embedding.length === 0) return null;
    return {
      embedding: face.embedding,
      live: face.live ?? 0,
      real: face.real ?? 0,
      faceScore: face.faceScore ?? 0,
      box: (face.box ?? [0, 0, 0, 0]) as [number, number, number, number],
    };
  } finally {
    human.tf.dispose(tensor);
  }
}

export function isHumanReady(): boolean {
  return instance !== null;
}
