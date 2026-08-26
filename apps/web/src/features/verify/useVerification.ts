import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ConfidenceEvent, NextBestAction, VerificationSession } from "@jeevansetu/shared";
import { api } from "@/lib/api";

export function useActiveSession() {
  return useQuery({
    queryKey: ["session", "active"],
    queryFn: () => api<{ session: VerificationSession | null }>("/verification/sessions/active"),
  });
}

/**
 * Returns the active verification session, starting one if there isn't one yet.
 * Creation lives here (not in a page) so deep-linking straight to a step — or
 * refreshing on one — still works.
 */
export function useEnsureSession() {
  const qc = useQueryClient();
  const active = useActiveSession();
  const create = useMutation({
    mutationFn: () => api<{ session: VerificationSession }>("/verification/sessions", { method: "POST" }),
    onSuccess: (data) => {
      qc.setQueryData(["session", "active"], { session: data.session });
      void qc.invalidateQueries({ queryKey: ["session"] });
    },
  });

  const session = active.data?.session ?? create.data?.session ?? null;
  const shouldCreate = active.isSuccess && !active.data?.session && !create.isPending && !create.isSuccess;

  React.useEffect(() => {
    if (shouldCreate) create.mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldCreate]);

  return { session, isLoading: active.isLoading || create.isPending, create };
}

export function useSessionEvents(sessionId: string | undefined) {
  return useQuery({
    queryKey: ["session", sessionId, "events"],
    queryFn: () => api<{ events: ConfidenceEvent[] }>(`/verification/sessions/${sessionId}/events`),
    enabled: !!sessionId,
    refetchInterval: 5000,
  });
}

export function useNextActions(sessionId: string | undefined) {
  return useQuery({
    queryKey: ["session", sessionId, "next-actions"],
    queryFn: () => api<{ actions: NextBestAction[] }>(`/verification/sessions/${sessionId}/next-actions`),
    enabled: !!sessionId,
    refetchInterval: 5000,
  });
}

export function useFaceEnrollment() {
  return useQuery({
    queryKey: ["enrollment", "face"],
    queryFn: () =>
      api<{
        enrolled: boolean;
        engineReady: boolean;
        /** Where face descriptors are extracted in this deployment. */
        faceEngine: "server" | "client";
        enrollment: {
          source: string;
          quality: number;
          createdAt: string;
          aadhaarTxnId: string;
          maskedAadhaar: string | null;
        } | null;
      }>("/enrollment/face"),
  });
}

export function useRefreshVerification() {
  const qc = useQueryClient();
  return () => {
    void qc.invalidateQueries({ queryKey: ["session"] });
    void qc.invalidateQueries({ queryKey: ["timeline"] });
    void qc.invalidateQueries({ queryKey: ["enrollment"] });
  };
}
