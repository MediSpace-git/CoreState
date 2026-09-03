export type PrismAnimationType = "rotate" | "hover" | "3drotate";
export type PrismQuality = "low" | "medium" | "high";

export type PrismOffset = {
  x?: number;
  y?: number;
};

export type PrismProps = {
  height?: number;
  baseWidth?: number;
  animationType?: PrismAnimationType;
  glow?: number;
  offset?: PrismOffset;
  noise?: number;
  transparent?: boolean;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  hoverStrength?: number;
  inertia?: number;
  bloom?: number;
  suspendWhenOffscreen?: boolean;
  timeScale?: number;
  lightMode?: boolean;
  quality?: PrismQuality;
  maxFps?: number;
  pauseWhenScrolling?: boolean;
};
