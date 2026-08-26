import * as React from "react";
import { loadHuman, readFrame } from "@/lib/human";

export interface IntegrityReading {
  gazeSamples: number;
  gazeAwayEvents: number;
  mouseTravel: number;
  keystrokeJitterMs: number;
  blinkCount: number;
  headMovementScore: number;
}

const EMPTY: IntegrityReading = {
  gazeSamples: 0,
  gazeAwayEvents: 0,
  mouseTravel: 0,
  keystrokeJitterMs: 0,
  blinkCount: 0,
  headMovementScore: 0,
};

const BLINK_CLOSED = 0.35;
const BLINK_OPEN = 0.6;
/** Yaw is bucketed so a fixed stare registers one sample, not hundreds. */
const GAZE_BUCKET_DEGREES = 6;

/**
 * Behavioural evidence that a live person is on the call.
 *
 * Everything measured here is real browser input: pointer geometry, keystroke
 * timing, and face-mesh readings from the camera. No video or image leaves the
 * device — only the six aggregate numbers below are posted, and the server turns
 * them into a presence score it shows back to the user.
 *
 * These signals are corroborating, not conclusive. A quiet, still, mouse-less user
 * is not a bot; that is precisely why the officer still decides.
 */
export function useCallIntegrity(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  active: boolean
) {
  const [reading, setReading] = React.useState<IntegrityReading>(EMPTY);

  // Live accumulators kept in a ref so the animation loop never re-renders on
  // every frame — React state is updated on a slow interval instead.
  const acc = React.useRef({
    mouseTravel: 0,
    lastPoint: null as { x: number; y: number } | null,
    keyTimes: [] as number[],
    blinkCount: 0,
    eyesWereClosed: false,
    gazeBuckets: new Set<string>(),
    gazeAwayEvents: 0,
    wasAway: false,
    yawSamples: [] as number[],
  });

  /* ------------------------------------------------- pointer and keyboard */

  React.useEffect(() => {
    if (!active) return;
    const a = acc.current;

    function onMove(e: MouseEvent) {
      const point = { x: e.clientX, y: e.clientY };
      if (a.lastPoint) {
        a.mouseTravel += Math.hypot(point.x - a.lastPoint.x, point.y - a.lastPoint.y);
      }
      a.lastPoint = point;
    }
    function onKey() {
      a.keyTimes.push(performance.now());
      if (a.keyTimes.length > 200) a.keyTimes.shift();
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  /* ------------------------------------------------------ face-mesh signals */

  React.useEffect(() => {
    if (!active) return;
    let cancelled = false;
    let raf = 0;

    void (async () => {
      let human;
      try {
        human = await loadHuman();
      } catch {
        // No models, no face signals — the pointer and keyboard terms still count.
        return;
      }
      if (cancelled) return;

      const tick = async () => {
        const video = videoRef.current;
        if (!cancelled && video && video.readyState >= 2 && video.videoWidth > 0) {
          try {
            const result = await human.detect(video);
            const frame = readFrame(result, video.videoWidth, video.videoHeight);
            const a = acc.current;

            if (frame.faceCount > 0) {
              // Blink: a full closed -> open transition, not just a low reading.
              if (frame.eyesOpen < BLINK_CLOSED) a.eyesWereClosed = true;
              else if (frame.eyesOpen > BLINK_OPEN && a.eyesWereClosed) {
                a.eyesWereClosed = false;
                a.blinkCount += 1;
              }

              a.gazeBuckets.add(String(Math.round(frame.yaw / GAZE_BUCKET_DEGREES)));
              a.yawSamples.push(frame.yaw);
              if (a.yawSamples.length > 300) a.yawSamples.shift();

              const away = frame.offCentre > 0.45;
              if (away && !a.wasAway) a.gazeAwayEvents += 1;
              a.wasAway = away;
            }
          } catch {
            /* a dropped frame is not worth reporting */
          }
        }
        if (!cancelled) raf = window.setTimeout(tick, 220) as unknown as number;
      };

      void tick();
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(raf);
    };
  }, [active, videoRef]);

  /* ------------------------------------------------------------- publish */

  React.useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      const a = acc.current;
      setReading({
        gazeSamples: a.gazeBuckets.size,
        gazeAwayEvents: a.gazeAwayEvents,
        mouseTravel: Math.round(a.mouseTravel),
        keystrokeJitterMs: Math.round(stdDevOfIntervals(a.keyTimes)),
        blinkCount: a.blinkCount,
        headMovementScore: Math.round(stdDev(a.yawSamples) * 100) / 100,
      });
    }, 800);
    return () => window.clearInterval(id);
  }, [active]);

  const reset = React.useCallback(() => {
    acc.current = {
      mouseTravel: 0,
      lastPoint: null,
      keyTimes: [],
      blinkCount: 0,
      eyesWereClosed: false,
      gazeBuckets: new Set<string>(),
      gazeAwayEvents: 0,
      wasAway: false,
      yawSamples: [],
    };
    setReading(EMPTY);
  }, []);

  return { reading, reset };
}

/** Spread of gaps between keypresses. Human typing is irregular; scripts are not. */
function stdDevOfIntervals(times: number[]): number {
  if (times.length < 3) return 0;
  const gaps: number[] = [];
  for (let i = 1; i < times.length; i += 1) {
    const gap = times[i]! - times[i - 1]!;
    // Ignore long pauses for thought — they say nothing about input mechanics.
    if (gap < 2000) gaps.push(gap);
  }
  return stdDev(gaps);
}

function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance);
}
