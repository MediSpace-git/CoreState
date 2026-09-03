"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  HeartPulse,
  MonitorCog,
  FlaskConical,
  MapPinned,
  Building2,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { industries } from "@/lib/data";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";
import { useStagger } from "@/lib/useStagger";

type Industry = (typeof industries)[number];

const INDUSTRY_ICONS: Record<string, LucideIcon> = {
  Healthcare: HeartPulse,
  "Medical Equipment": MonitorCog,
  "Diagnostics & Laboratories": FlaskConical,
  "Field-Service Businesses": MapPinned,
  "Enterprise Operations": Building2,
};

function Brief({
  industry,
  heading = true,
}: {
  industry: Industry;
  heading?: boolean;
}) {
  const Icon = INDUSTRY_ICONS[industry.name];

  return (
    <>
      {heading ? (
        <h3 className="flex items-center gap-3 text-[1.65rem] font-semibold leading-[1.15] tracking-tight text-fg">
          {Icon ? (
            <Icon className="size-6 shrink-0 text-current" strokeWidth={1.5} aria-hidden="true" />
          ) : null}
          {industry.name}
        </h3>
      ) : null}
      <p
        className={`max-w-[34ch] text-[15px] leading-relaxed text-muted ${
          heading ? "mt-4" : ""
        }`}
      >
        {industry.note}
      </p>
      <ul className="mt-8 space-y-2.5" aria-label="Typical concerns">
        {industry.signals.map((signal) => (
          <li key={signal} data-signal className="text-[15px] leading-snug text-fg">
            {signal}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Industries() {
  const ref = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useReveal(ref);
  useStagger(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const panel = panelRef.current;
        if (!panel) return;

        gsap.fromTo(
          panel,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
        );
      });
    },
    { scope: ref, dependencies: [active] }
  );

  const current = industries[active];

  function focusItem(index: number) {
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>("button");
    buttons?.[index]?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = industries.length - 1;
    let next = index;

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      next = index === last ? 0 : index + 1;
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      next = index === 0 ? last : index - 1;
    } else if (event.key === "Home") {
      next = 0;
    } else if (event.key === "End") {
      next = last;
    } else {
      return;
    }

    event.preventDefault();
    setActive(next);
    focusItem(next);
  }

  return (
    <section
      ref={ref}
      id="industries"
      className="scroll-mt-20 bg-surface"
      aria-label="Industries"
    >
      <div className="container-x section-y">
        <SectionHeader
          label="Industries"
          title="Where we operate."
          lead="Our experience is concentrated in operationally demanding environments — places where software has to reflect how physical work actually gets done."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div ref={listRef} className="pr-8 sm:pr-12 lg:col-span-6 lg:pr-16" data-reveal>
            <div role="list" aria-label="Industries">
              {industries.map((industry, i) => {
                const selected = active === i;
                const Icon = INDUSTRY_ICONS[industry.name];
                return (
                  <div
                    key={industry.name}
                    role="listitem"
                    className="border-t border-line last:border-b"
                    data-stagger
                  >
                    <button
                      type="button"
                      aria-current={selected ? "true" : undefined}
                      aria-controls="industry-brief"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      onKeyDown={(event) => onKeyDown(event, i)}
                      className={`flex w-full items-center gap-3 py-6 text-left text-xl font-medium tracking-tight transition-colors duration-300 sm:gap-4 sm:text-2xl ${
                        selected ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {Icon ? (
                        <Icon
                          className="size-5 shrink-0 text-current sm:size-6"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      ) : null}
                      {industry.name}
                    </button>

                    <div hidden={!selected} className="pb-6 lg:hidden">
                      {selected ? <Brief industry={industry} heading={false} /> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div
              id="industry-brief"
              aria-live="polite"
              className="sticky top-28 min-h-[22rem] rounded-xs border border-line bg-bg p-8 lg:p-10"
            >
              <div ref={panelRef}>
                <Brief industry={current} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
