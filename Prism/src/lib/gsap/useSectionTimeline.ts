"use client";

import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";
import { gsap, registerGsap } from "@prism/lib/gsap/register";

type Scope = RefObject<HTMLElement | null>;

type Options = {
  scope: Scope;
  animation: (ctx: { gsap: typeof gsap; root: HTMLElement }) => void;
};

/**
 * Section-scoped GSAP setup with MatchMedia + reduced-motion bailout.
 */
export function useSectionTimeline({ scope, animation }: Options) {
  useGSAP(
    () => {
      registerGsap();
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        animation({ gsap, root });
      });

      return () => mm.revert();
    },
    { scope },
  );
}
