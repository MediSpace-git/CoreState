"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP, EASE, MOTION_OK, REDUCED } from "@/lib/gsap";

/**
 * Choreographs `[data-stagger]` children as they enter the viewport.
 * Optional `data-dir="left" | "right" | "clip"` changes the motion so
 * neighboring sections don't all use the same fade-up.
 */
export function useStagger(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-stagger]");
        if (!items.length) return;

        items.forEach((el) => {
          const dir = el.dataset.dir;
          if (dir === "left") gsap.set(el, { opacity: 0, x: -32, y: 0 });
          else if (dir === "right") gsap.set(el, { opacity: 0, x: 32, y: 0 });
          else if (dir === "clip") gsap.set(el, { opacity: 1, clipPath: "inset(0 0 100% 0)" });
          else gsap.set(el, { opacity: 0, y: 36 });
        });

        ScrollTrigger.batch(items, {
          start: "top 90%",
          once: true,
          interval: 0.14,
          batchMax: 4,
          onEnter: (batch) => {
            (batch as HTMLElement[]).forEach((el, i) => {
              const dir = el.dataset.dir;
              gsap.to(el, {
                opacity: 1,
                x: 0,
                y: 0,
                clipPath: dir === "clip" ? "inset(0 0 0% 0)" : undefined,
                duration: 0.8,
                delay: i * 0.1,
                ease: EASE,
                overwrite: true,
              });
            });
          },
        });
      });

      mm.add(REDUCED, () => {
        gsap.set(gsap.utils.toArray<HTMLElement>("[data-stagger]"), {
          opacity: 1,
          x: 0,
          y: 0,
          clipPath: "none",
        });
      });
    },
    { scope }
  );
}
