"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { PrismProps } from "./types";

export type { PrismAnimationType, PrismOffset, PrismProps, PrismQuality } from "./types";

/**
 * Client-only Prism (WebGL / ogl). SSR is disabled to avoid canvas hydration issues.
 */
export const Prism = dynamic(() => import("./Prism"), {
  ssr: false,
  loading: () => <div className="prism-container" aria-hidden="true" />,
}) as ComponentType<PrismProps>;
