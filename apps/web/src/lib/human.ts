import type { Human as HumanType, Result as HumanResult } from "@vladmandic/human";

const MODEL_BASE = "https://vladmandic.github.io/human-models/models/";

let humanPromise: Promise<HumanType> | null = null;

/**
 * Human is several megabytes of models — loaded lazily so it never touches the
 * dashboard bundle, and only when the user actually opens a camera step.
 */
export function loadHuman(): Promise<HumanType> {
  if (humanPromise) return humanPromise;
  humanPromise = (async () => {
    const { Human } = await import("@vladmandic/human");
    const human = new Human({
      modelBasePath: MODEL_BASE,
      cacheSensitivity: 0,
      face: {
        enabled: true,
        detector: { enabled: true, maxDetected: 1, rotation: false },
        mesh: { enabled: true },
        description: { enabled: true },
        antispoof: { enabled: true },
        liveness: { enabled: true },
        iris: { enabled: true },
        emotion: { enabled: true },
      },
      body: { enabled: false },
      hand: { enabled: false },
      object: { enabled: false },
      gesture: { enabled: true },
      filter: { enabled: true, equalization: false },
    });
    await human.load();
    await human.warmup();
    return human;
  })();
  return humanPromise;
}

export type { HumanResult };

export interface FrameReading {
  faceCount: number;
  faceScore: number;
  live: number;
  real: number;
  /** Distance of the face centre from the frame centre, 0 = perfectly centred. */
  offCentre: number;
  /** Fraction of the frame the face occupies — used to prompt "come closer". */
  coverage: number;
  gestures: string[];
  eyesOpen: number;
  yaw: number;
  smile: number;
}

export function readFrame(result: HumanResult, width: number, height: number): FrameReading {
  const face = result.face?.[0];
  const gestures = (result.gesture ?? [])
    .map((g) => ("gesture" in g ? String(g.gesture) : ""))
    .filter(Boolean);

  if (!face || !face.box) {
    return { faceCount: 0, faceScore: 0, live: 0, real: 0, offCentre: 1, coverage: 0, gestures, eyesOpen: 0, yaw: 0, smile: 0 };
  }

  const [bx, by, bw, bh] = face.box;
  const cx = bx + bw / 2;
  const cy = by + bh / 2;
  const offCentre = Math.min(
    1,
    Math.hypot((cx - width / 2) / (width / 2), (cy - height / 2) / (height / 2))
  );
  const coverage = (bw * bh) / (width * height);

  const smileEmotion = (face.emotion ?? []).find((e) => e.emotion === "happy")?.score ?? 0;
  const yaw = face.rotation?.angle?.yaw ?? 0;
  const eyesOpen = estimateEyesOpen(face);

  return {
    faceCount: result.face.length,
    faceScore: face.faceScore ?? face.score ?? 0,
    live: face.live ?? 0,
    real: face.real ?? 0,
    offCentre,
    coverage,
    gestures,
    eyesOpen,
    yaw,
    smile: smileEmotion,
  };
}

/** Eye-aperture ratio from the face mesh, used for real blink detection. */
function estimateEyesOpen(face: HumanResult["face"][number]): number {
  const mesh = face.mesh;
  if (!mesh || mesh.length < 400) return 1;
  const lidGap = (upper: number, lower: number, left: number, right: number) => {
    const u = mesh[upper];
    const l = mesh[lower];
    const a = mesh[left];
    const b = mesh[right];
    if (!u || !l || !a || !b) return 1;
    const vertical = Math.abs((u[1] as number) - (l[1] as number));
    const horizontal = Math.abs((a[0] as number) - (b[0] as number)) || 1;
    return vertical / horizontal;
  };
  const leftRatio = lidGap(159, 145, 33, 133);
  const rightRatio = lidGap(386, 374, 362, 263);
  // ~0.28 open, ~0.10 closed for this mesh topology.
  const avg = (leftRatio + rightRatio) / 2;
  return Math.max(0, Math.min(1, (avg - 0.1) / 0.18));
}

export function captureJpeg(video: HTMLVideoElement, maxWidth = 640): string {
  const scale = Math.min(1, maxWidth / video.videoWidth);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.92);
}

export function captureImageElementJpeg(img: HTMLImageElement, maxWidth = 800): string {
  const scale = Math.min(1, maxWidth / img.naturalWidth);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(img.naturalWidth * scale);
  canvas.height = Math.round(img.naturalHeight * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not available");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.92);
}

export interface ClientFaceReading {
  descriptor: number[];
  faceScore: number;
  live: number;
  real: number;
}

/**
 * Extracts a face descriptor in the browser.
 *
 * Used when the API runs with FACE_ENGINE=client — on serverless the TensorFlow
 * models are far too large for a function bundle, so the browser produces the
 * descriptor and the server still performs the comparison and all scoring. The
 * client never reports a match result of its own.
 */
export async function describeJpeg(dataUrl: string): Promise<ClientFaceReading | null> {
  const human = await loadHuman();
  const img = new Image();
  img.src = dataUrl;
  await img.decode();

  const result = await human.detect(img);
  const face = result.face?.[0];
  if (!face?.embedding || face.embedding.length === 0) return null;

  return {
    descriptor: face.embedding,
    faceScore: face.faceScore ?? face.score ?? 0,
    live: face.live ?? 0,
    real: face.real ?? 0,
  };
}
