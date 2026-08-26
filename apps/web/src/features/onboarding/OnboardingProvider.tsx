import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { TOUR_STEPS } from "./steps";
import { TourOverlay } from "./TourOverlay";

interface OnboardingContextValue {
  /** Start (or restart) the guided tour from step one. */
  start: () => void;
  stop: () => void;
  running: boolean;
  stepIndex: number;
  totalSteps: number;
}

const OnboardingContext = React.createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [running, setRunning] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  // Guards the auto-start so it fires once per session, not on every render or
  // every navigation back to the dashboard.
  const autoStarted = React.useRef(false);

  const start = React.useCallback(() => {
    setStepIndex(0);
    setRunning(true);
    if (TOUR_STEPS[0]?.route && pathname !== TOUR_STEPS[0].route) {
      navigate(TOUR_STEPS[0].route);
    }
  }, [navigate, pathname]);

  /** Records completion so a returning user is not shown the tour again. */
  const finish = React.useCallback(async () => {
    setRunning(false);
    try {
      await api("/users/me/preferences", {
        method: "PATCH",
        body: { onboardingCompletedAt: new Date().toISOString() },
      });
      await refreshUser();
    } catch {
      // Not worth interrupting anyone over — the tour simply may reappear.
    }
  }, [refreshUser]);

  const stop = React.useCallback(() => {
    void finish();
  }, [finish]);

  // A pensioner who has never seen the tour gets it automatically, once, and only
  // on the dashboard where its first anchors live.
  React.useEffect(() => {
    if (autoStarted.current) return;
    if (!user || user.prefs.onboardingCompletedAt) return;
    if (pathname !== "/dashboard") return;
    autoStarted.current = true;
    // Let the dashboard paint before measuring anything.
    const id = window.setTimeout(() => start(), 600);
    return () => window.clearTimeout(id);
  }, [user, pathname, start]);

  const goTo = React.useCallback(
    (index: number) => {
      const step = TOUR_STEPS[index];
      if (!step) return;
      if (step.route && pathname !== step.route) navigate(step.route);
      setStepIndex(index);
    },
    [navigate, pathname]
  );

  const value = React.useMemo(
    () => ({ start, stop, running, stepIndex, totalSteps: TOUR_STEPS.length }),
    [start, stop, running, stepIndex]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
      {running && (
        <TourOverlay
          stepIndex={stepIndex}
          onNext={() => (stepIndex + 1 < TOUR_STEPS.length ? goTo(stepIndex + 1) : void finish())}
          onBack={() => goTo(Math.max(0, stepIndex - 1))}
          onSkip={() => void finish()}
        />
      )}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = React.useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
