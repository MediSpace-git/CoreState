"use client";

import { useRef } from "react";
import {
  Search,
  PenLine,
  Hammer,
  Rocket,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { process } from "@/lib/data";
import { gsap, useGSAP, MOTION_OK, REDUCED, EASE } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";

const PROCESS_ICONS: Record<string, LucideIcon> = {
  Understand: Search,
  Design: PenLine,
  Build: Hammer,
  Deploy: Rocket,
  Evolve: RefreshCw,
};

export default function Process() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-proc-step]");
        gsap.set(steps, { opacity: 0, x: -28 });
        gsap.set("[data-proc-rail]", { scaleX: 0 });

        const tl = gsap.timeline({
          defaults: { ease: EASE },
          scrollTrigger: {
            trigger: "[data-proc-track]",
            start: "top 82%",
            once: true,
          },
        });

        tl.to("[data-proc-rail]", {
          scaleX: 1,
          duration: 1.15,
          ease: "power2.inOut",
        });
        tl.to(
          steps,
          { opacity: 1, x: 0, duration: 0.75, stagger: 0.09 },
          0.15
        );
      });

      mm.add(REDUCED, () => {
        gsap.set("[data-proc-step]", { opacity: 1, x: 0 });
        gsap.set("[data-proc-rail]", { scaleX: 1 });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} id="process" className="scroll-mt-20" aria-label="Process">
      <div className="container-x section-y">
        <SectionHeader
          label="Process"
          title="A process built for clarity."
          lead="No mystery phases. Five steps, each with a clear output, repeated as the product evolves."
        />

        <div data-proc-track className="relative mt-16 sm:mt-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-5 right-[10%] left-[10%] hidden h-px bg-line lg:block"
          >
            <div
              data-proc-rail
              className="h-full origin-left bg-fg/50"
            />
          </div>

          <ol className="relative ml-1 border-l border-line pl-10 lg:ml-0 lg:grid lg:grid-cols-5 lg:border-l-0 lg:pl-0">
            {process.map((item) => {
              const Icon = PROCESS_ICONS[item.title];
              return (
                <li
                  key={item.title}
                  data-proc-step
                  className="relative pb-12 last:pb-0 lg:px-5 lg:pb-0 lg:text-center"
                >
                  <span className="absolute -left-14 top-0 z-10 flex size-8 items-center justify-center rounded-xs border border-line bg-bg text-current lg:static lg:mx-auto lg:mb-7 lg:size-10">
                    {Icon ? (
                      <Icon
                        className="size-4 lg:size-5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    ) : null}
                  </span>

                  <p className="font-mono text-[11px] tracking-[0.16em] text-faint">
                    {item.step}
                  </p>
                  <h3 className="mt-2 text-xl font-medium tracking-tight text-fg">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted lg:mx-auto">
                    {item.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
