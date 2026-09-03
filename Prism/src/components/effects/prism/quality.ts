export type PrismQuality = "low" | "medium" | "high";

export type PrismQualityProfile = {
  renderScale: number;
  raySteps: number;
  maxFps: number;
  maxDpr: number;
};

export const PRISM_QUALITY_PROFILES: Record<PrismQuality, PrismQualityProfile> = {
  low: { renderScale: 0.45, raySteps: 56, maxFps: 24, maxDpr: 1 },
  medium: { renderScale: 0.58, raySteps: 72, maxFps: 28, maxDpr: 1 },
  high: { renderScale: 0.78, raySteps: 90, maxFps: 30, maxDpr: 1.25 },
};

export function resolvePrismQuality(
  quality: PrismQuality | undefined,
  reducedMotion: boolean,
): PrismQualityProfile {
  const base = PRISM_QUALITY_PROFILES[quality ?? "medium"];
  if (!reducedMotion) return base;
  return {
    renderScale: Math.min(base.renderScale, PRISM_QUALITY_PROFILES.low.renderScale),
    raySteps: Math.min(base.raySteps, PRISM_QUALITY_PROFILES.low.raySteps),
    maxFps: Math.min(base.maxFps, 20),
    maxDpr: 1,
  };
}
