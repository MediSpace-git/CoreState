"use client";

import { useRef } from "react";
import HeroVisual from "@/components/HeroVisual";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";

const HEADLINE_LINES = ["We build software", "for the way businesses", "actually work."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
            "[data-hero-line]",
            { yPercent: 110 },
            { yPercent: 0, duration: 1, stagger: 0.11, ease: "power4.out" },
            0.3
          )
          .fromTo(
            "[data-hero-copy]",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.8
          );
      });

      mm.add(REDUCED, () => {
        gsap.set("[data-hero-line], [data-hero-copy]", {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="top" className="relative" aria-label="Introduction">
      <div
        data-hero-stage
        className="flex h-svh max-h-250 min-h-0 flex-col overflow-hidden pt-24 lg:min-h-150 lg:justify-center lg:pt-28"
      >
        <div className="container-x relative grid min-h-0 w-full flex-1 grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h1 className="text-hero font-semibold leading-[1.04] tracking-tight text-fg">
              {HEADLINE_LINES.map((line) => (
                <span key={line} className="block overflow-hidden pb-1 -mb-1">
                  <span className="block" data-hero-line>
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-lg"
              data-hero-copy
              style={{ opacity: 0 }}
            >
              CoreState designs and builds software products and digital
              solutions that connect people, processes, data, and operations.
            </p>
          </div>

          <div className="min-h-0 lg:col-span-6">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
