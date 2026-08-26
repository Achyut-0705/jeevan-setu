import * as React from "react";
import { useTranslation } from "react-i18next";
import { Camera, Loader2, CameraOff } from "lucide-react";
import { useCamera } from "@/hooks/useCamera";
import {
  loadHuman,
  readFrame,
  captureJpeg,
  type FrameReading,
} from "@/lib/human";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export type Guidance =
  | "loading"
  | "no_face"
  | "multiple_faces"
  | "too_far"
  | "off_centre"
  | "too_dark"
  | "hold_still"
  | "ready";

export interface FaceCameraHandle {
  capture: () => string | null;
}

interface FaceCameraProps {
  onReading?: (reading: FrameReading, guidance: Guidance) => void;
  /** Overlay content, e.g. the current liveness instruction. */
  overlay?: React.ReactNode;
  className?: string;
}

function guidanceFor(r: FrameReading): Guidance {
  if (r.faceCount === 0) return "no_face";
  if (r.faceCount > 1) return "multiple_faces";
  if (r.coverage < 0.035) return "too_far";
  if (r.offCentre > 0.45) return "off_centre";
  if (r.faceScore < 0.6) return "too_dark";
  return "ready";
}

export const FaceCamera = React.forwardRef<FaceCameraHandle, FaceCameraProps>(
  function FaceCamera({ onReading, overlay, className }, ref) {
    const { t } = useTranslation();
    const { videoRef, state, message } = useCamera(true);
    const [modelsReady, setModelsReady] = React.useState(false);
    const [guidance, setGuidance] = React.useState<Guidance>("loading");
    const rafRef = React.useRef<number | null>(null);
    const onReadingRef = React.useRef(onReading);
    onReadingRef.current = onReading;

    React.useImperativeHandle(ref, () => ({
      capture: () =>
        videoRef.current && state === "ready"
          ? captureJpeg(videoRef.current)
          : null,
    }));

    React.useEffect(() => {
      if (state !== "ready") return;
      let cancelled = false;
      let human: Awaited<ReturnType<typeof loadHuman>> | null = null;

      async function run() {
        human = await loadHuman();
        if (cancelled) return;
        setModelsReady(true);

        const loop = async () => {
          const video = videoRef.current;
          if (cancelled || !video || !human || video.readyState < 2) {
            rafRef.current = requestAnimationFrame(() => void loop());
            return;
          }
          const result = await human.detect(video);
          if (cancelled) return;
          const reading = readFrame(
            result,
            video.videoWidth,
            video.videoHeight,
          );
          const g = guidanceFor(reading);
          setGuidance(g);
          onReadingRef.current?.(reading, g);
          rafRef.current = requestAnimationFrame(() => void loop());
        };
        void loop();
      }

      void run();
      return () => {
        cancelled = true;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [state, videoRef]);

    const blocked =
      state === "denied" || state === "unsupported" || state === "error";

    return (
      <div className={cn("space-y-3", className)}>
        <div className="bg-muted relative aspect-[4/3] w-full overflow-hidden rounded-xl border">
          <video
            ref={videoRef}
            playsInline
            muted
            className={cn(
              "size-full object-cover [transform:scaleX(-1)]",
              state !== "ready" && "invisible",
            )}
          />

          {state === "starting" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Loader2 className="text-muted-foreground size-8 animate-spin" />
              <p className="text-muted-foreground text-sm">
                {t("camera.starting")}
              </p>
            </div>
          )}

          {blocked && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <CameraOff className="text-muted-foreground size-10" />
              <p className="text-muted-foreground text-sm">
                {message ?? t("camera.blocked")}
              </p>
            </div>
          )}

          {state === "ready" && (
            <>
              {/* Framing guide — a real target the detector measures against. */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-x-[18%] inset-y-[10%] rounded-[50%] border-4 transition-colors",
                  guidance === "ready" ? "border-chart-2" : "border-white/70",
                )}
              />
              {!modelsReady && (
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/60 p-3 text-white">
                  <Loader2 className="size-4 animate-spin" />
                  <span className="text-sm">{t("camera.loadingModels")}</span>
                </div>
              )}
              {modelsReady && (
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-3 text-center text-sm font-medium text-white">
                  {t(`camera.guidance.${guidance}`)}
                </div>
              )}
              {overlay}
            </>
          )}

          {state === "idle" && <Skeleton className="size-full" />}
        </div>

        {blocked && (
          <Alert>
            <Camera className="size-4" />
            <AlertTitle>{t("camera.blockedTitle")}</AlertTitle>
            <AlertDescription>{t("camera.blockedBody")}</AlertDescription>
          </Alert>
        )}
      </div>
    );
  },
);
