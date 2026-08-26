import { useQuery } from "@tanstack/react-query";
import type {
  PensionTransaction,
  VerificationAppointment,
  VerificationStatusDetail,
} from "@jeevansetu/shared";
import { api } from "@/lib/api";

export interface ReviewEligibility {
  canRequest: boolean;
  reason: "ok" | "already_open" | "cooldown";
  openRequest: { ticketNumber: string; id: string } | null;
  nextAllowedAt: string | null;
  cooldownDays: number;
}

export interface StatusPayload {
  status: VerificationStatusDetail;
  reviewEligibility: ReviewEligibility;
  appointment: VerificationAppointment | null;
}

/** The single source every screen reads for "where does my certificate stand?". */
export function useVerificationStatus() {
  return useQuery({
    queryKey: ["verification-status"],
    queryFn: () => api<StatusPayload>("/verification/status"),
    refetchInterval: 30_000,
  });
}

export interface PensionHistory {
  transactions: PensionTransaction[];
  summary: {
    status: "active" | "stopped" | "not_eligible";
    monthlyAmount: number;
    lastCreditedAt: string | null;
    nextRenewalDueAt: string | null;
    monthsUnpaid: number;
    withheldAmount: number;
    creditedCount: number;
  };
}

export function usePensionHistory() {
  return useQuery({
    queryKey: ["pension-history"],
    queryFn: () => api<PensionHistory>("/users/me/pension/history"),
  });
}
