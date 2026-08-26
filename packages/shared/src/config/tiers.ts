import type { Tier } from "../enums";

export interface TierDefinition {
  tier: Tier;
  min: number;
  max: number;
  labelKey: string;
  descriptionKey: string;
  issuesCertificate: boolean;
  certificateValidityDays: number | null;
}

export const TIER_DEFINITIONS: TierDefinition[] = [
  {
    tier: "started",
    min: 0,
    max: 39,
    labelKey: "tier.started.label",
    descriptionKey: "tier.started.description",
    issuesCertificate: false,
    certificateValidityDays: null,
  },
  {
    tier: "building",
    min: 40,
    max: 69,
    labelKey: "tier.building.label",
    descriptionKey: "tier.building.description",
    issuesCertificate: false,
    certificateValidityDays: null,
  },
  {
    tier: "provisional",
    min: 70,
    max: 89,
    labelKey: "tier.provisional.label",
    descriptionKey: "tier.provisional.description",
    issuesCertificate: true,
    certificateValidityDays: 30,
  },
  {
    tier: "verified",
    min: 90,
    max: 100,
    labelKey: "tier.verified.label",
    descriptionKey: "tier.verified.description",
    issuesCertificate: true,
    certificateValidityDays: 365,
  },
];

export function resolveTier(score: number): TierDefinition {
  const clamped = Math.max(0, Math.min(100, score));
  const found = TIER_DEFINITIONS.find((t) => clamped >= t.min && clamped <= t.max);
  return found ?? TIER_DEFINITIONS[0]!;
}
