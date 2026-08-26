import * as React from "react";

type ThemeMode = "light" | "dark" | "system";

interface A11yState {
  fontScale: number;
  highContrast: boolean;
  reducedMotion: boolean;
  theme: ThemeMode;
}

interface A11yContextValue extends A11yState {
  setFontScale: (v: number) => void;
  setHighContrast: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
  setTheme: (v: ThemeMode) => void;
}

const STORAGE_KEY = "jeevansetu.a11y";
const A11yContext = React.createContext<A11yContextValue | null>(null);

function loadInitial(): A11yState {
  const fallback: A11yState = {
    fontScale: 1,
    highContrast: false,
    reducedMotion: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
    theme: "system",
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...fallback, ...(JSON.parse(raw) as Partial<A11yState>) } : fallback;
  } catch {
    return fallback;
  }
}

function resolveDark(theme: ThemeMode): boolean {
  if (theme === "dark") return true;
  if (theme === "light") return false;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
}

export function A11yProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<A11yState>(loadInitial);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage may be unavailable in private mode; preferences just won't persist
    }
    const root = document.documentElement;
    root.style.setProperty("--font-scale", String(state.fontScale));
    root.classList.toggle("high-contrast", state.highContrast);
    root.classList.toggle("reduce-motion", state.reducedMotion);
    root.classList.toggle("dark", resolveDark(state.theme));
  }, [state]);

  React.useEffect(() => {
    if (state.theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => document.documentElement.classList.toggle("dark", mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [state.theme]);

  const value: A11yContextValue = {
    ...state,
    setFontScale: (fontScale) => setState((s) => ({ ...s, fontScale })),
    setHighContrast: (highContrast) => setState((s) => ({ ...s, highContrast })),
    setReducedMotion: (reducedMotion) => setState((s) => ({ ...s, reducedMotion })),
    setTheme: (theme) => setState((s) => ({ ...s, theme })),
  };

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

export function useA11y() {
  const ctx = React.useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used within A11yProvider");
  return ctx;
}
