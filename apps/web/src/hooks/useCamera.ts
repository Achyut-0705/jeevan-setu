import * as React from "react";

export type CameraState = "idle" | "starting" | "ready" | "denied" | "unsupported" | "error";

export function useCamera(active: boolean) {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const [state, setState] = React.useState<CameraState>("idle");
  const [message, setMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!active) return;
    let cancelled = false;

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) {
        setState("unsupported");
        setMessage(
          window.isSecureContext
            ? "This browser can't open the camera."
            : "The camera needs a secure connection (https or localhost)."
        );
        return;
      }
      setState("starting");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play().catch(() => undefined);
        }
        setState("ready");
        setMessage(null);
      } catch (err) {
        if (cancelled) return;
        const name = (err as Error).name;
        if (name === "NotAllowedError" || name === "SecurityError") {
          setState("denied");
          setMessage("Camera permission was blocked. You can allow it, or use another method.");
        } else if (name === "NotFoundError" || name === "OverconstrainedError") {
          setState("error");
          setMessage("No camera found on this device.");
        } else {
          setState("error");
          setMessage((err as Error).message);
        }
      }
    }

    void start();
    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [active]);

  return { videoRef, state, message };
}
