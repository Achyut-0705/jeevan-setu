import * as React from "react";

interface SpeechRecognitionLike extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
}

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export const speechSupported = () => getRecognitionCtor() !== null;

/**
 * Real speech capture. Where the browser exposes SpeechRecognition (Chrome/Edge) we
 * transcribe what was actually said; elsewhere we still record audio so the server can
 * score presence and duration, which earns less credit but never blocks the user.
 */
export function useSpeech(locale: "en" | "hi") {
  const [listening, setListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [peakLevel, setPeakLevel] = React.useState(0);
  const [durationMs, setDurationMs] = React.useState(0);

  const recognitionRef = React.useRef<SpeechRecognitionLike | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const startedAtRef = React.useRef(0);
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  const stop = React.useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    void audioCtxRef.current?.close().catch(() => undefined);
    audioCtxRef.current = null;
    if (startedAtRef.current) setDurationMs(Date.now() - startedAtRef.current);
    setListening(false);
  }, []);

  const start = React.useCallback(async () => {
    setError(null);
    setTranscript("");
    setPeakLevel(0);
    setDurationMs(0);
    startedAtRef.current = Date.now();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const ctx = new AudioContext();
      audioCtxRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const buf = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteTimeDomainData(buf);
        let peak = 0;
        for (const v of buf) peak = Math.max(peak, Math.abs(v - 128) / 128);
        setPeakLevel((p) => Math.max(p * 0.92, peak));
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      setError("microphone_denied");
      setListening(false);
      return;
    }

    const Ctor = getRecognitionCtor();
    if (Ctor) {
      const rec = new Ctor();
      rec.lang = locale === "hi" ? "hi-IN" : "en-IN";
      rec.continuous = true;
      rec.interimResults = true;
      rec.onresult = (e) => {
        let text = "";
        for (let i = 0; i < e.results.length; i++) {
          const alt = e.results[i]?.[0];
          if (alt) text += `${alt.transcript} `;
        }
        setTranscript(text.trim());
      };
      rec.onerror = (e) => setError(e.error);
      recognitionRef.current = rec;
      rec.start();
    }
    setListening(true);
  }, [locale]);

  React.useEffect(() => stop, [stop]);

  return { start, stop, listening, transcript, error, peakLevel, durationMs, supported: speechSupported() };
}
