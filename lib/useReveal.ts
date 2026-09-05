"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, EASE, REDUCED, MOTION_OK } from "@/lib/gsap";

/**
 * Animates every `[data-reveal]` descendant of the scope when it enters
 * the viewport. Optional attributes:
 *   data-delay="0.1"  — extra delay in seconds
 * Falls back to a simple visible state when reduced motion is preferred.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        const els = gsap.utils.toArray<HTMLElement>("[data-reveal]");
        els.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: desktop ? 26 : 16 },
            {
              opacity: 1,
              y: 0,
              duration: desktop ? 0.9 : 0.65,
              ease: EASE,
              delay: parseFloat(el.dataset.delay ?? "0"),
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
      });

      mm.add(REDUCED, () => {
        gsap.set(gsap.utils.toArray<HTMLElement>("[data-reveal]"), {
          opacity: 1,
          y: 0,
        });
      });
    },
    { scope }
  );
}
