export interface TourStep {
  /** i18n key suffix under `onboarding.steps`. */
  key: string;
  /** `data-tour` attribute of the element to highlight. Null = centred, no spotlight. */
  target: string | null;
  /** Route to be on before this step can point at anything. */
  route?: string;
}

/**
 * The guided tour, in the order a pensioner actually meets these things.
 *
 * Each step answers three questions — what to do, why it matters, and what happens
 * next — because a tour that only labels the furniture teaches nothing. Steps are
 * anchored to real elements by `data-tour`; if an anchor is missing (a narrow screen
 * where the sidebar is a drawer, say) the step degrades to a centred card rather
 * than pointing at nothing.
 */
export const TOUR_STEPS: TourStep[] = [
  { key: "welcome", target: null, route: "/dashboard" },
  { key: "status", target: "status-card", route: "/dashboard" },
  { key: "pension", target: "pension-card", route: "/dashboard" },
  { key: "verify", target: "nav-verify" },
  { key: "call", target: "nav-call" },
  { key: "help", target: "help-button", route: "/dashboard" },
];
