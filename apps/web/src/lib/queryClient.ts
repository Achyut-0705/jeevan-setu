import { QueryClient } from "@tanstack/react-query";
import { ApiClientError } from "./api";

/**
 * How many times a failing request is retried before the error reaches the UI.
 * Three is enough to ride out a cold start or a dropped connection without leaving
 * someone staring at a spinner: with the backoff below the last attempt lands about
 * seven seconds in.
 */
const MAX_RETRIES = 3;

/** Never wait longer than this between attempts, however many have failed. */
const MAX_BACKOFF_MS = 15_000;

/**
 * Whether a failed request is worth repeating.
 *
 * A 4xx is the server saying the request itself is wrong — malformed, unauthorised,
 * or for something that does not exist — and sending it again unchanged produces the
 * same answer while adding load. The two exceptions are the statuses that explicitly
 * mean "not now, try later": 408 and 429. (A 401 is handled a layer down in `api()`,
 * which refreshes the token and replays the request once before it ever fails here.)
 *
 * Everything else — 5xx, a dropped connection, a response that never parsed — is
 * potentially transient, so it is retried.
 */
function shouldRetry(failureCount: number, error: unknown): boolean {
  if (failureCount >= MAX_RETRIES) return false;
  if (error instanceof ApiClientError && error.status >= 400 && error.status < 500) {
    return error.status === 408 || error.status === 429;
  }
  return true;
}

/**
 * Exponential backoff with jitter: roughly 1s, 2s, 4s, doubling each attempt and
 * capped at MAX_BACKOFF_MS.
 *
 * The jitter matters more than it looks. Several components mount at once on the
 * verification screen and fire their requests together, so a fixed delay would line
 * every retry up on the same instant and hit the API in the same synchronised bursts
 * that caused trouble in the first place. Spreading each wait randomly across the
 * upper half of its window breaks that lockstep.
 *
 * When the server said 429 and told us how long to wait, that instruction wins over
 * anything computed here.
 */
function backoffMs(attemptIndex: number, error: unknown): number {
  if (error instanceof ApiClientError && error.retryAfterMs !== null) {
    return Math.min(error.retryAfterMs, MAX_BACKOFF_MS);
  }
  const ceiling = Math.min(1000 * 2 ** attemptIndex, MAX_BACKOFF_MS);
  return Math.round(ceiling * (0.5 + Math.random() / 2));
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      retryDelay: backoffMs,
      refetchOnWindowFocus: false,
      // Coming back from a dead connection is exactly when the cache is most likely
      // to be wrong, so this one stays on.
      refetchOnReconnect: true,
      /**
       * Answers are reused for 30s before a refetch is considered. Screens here read
       * the same few endpoints from several components at once — StatusCard alone is
       * rendered on most pages — and within one window all of those share a single
       * response instead of each issuing its own.
       *
       * Anything that must be fresher says so locally: the verification screen polls
       * every 5s while a session is running, and status every 30s.
       */
      staleTime: 30_000,
      /**
       * Keep unused responses for five minutes so moving between pages and back
       * renders immediately from cache while any refetch happens behind the scenes,
       * rather than dropping the user on a spinner they have already waited through.
       */
      gcTime: 5 * 60_000,
    },
    mutations: {
      /**
       * Deliberately narrower than queries. A mutation that reached the server may
       * have taken effect even though the reply never arrived, so repeating it risks
       * doing the thing twice — booking two appointments, filing two review requests.
       * Only a request the server explicitly refused to process yet (429) is safe to
       * repeat, and then just once.
       */
      retry: (failureCount, error) =>
        failureCount < 1 && error instanceof ApiClientError && error.status === 429,
      retryDelay: backoffMs,
    },
  },
});
