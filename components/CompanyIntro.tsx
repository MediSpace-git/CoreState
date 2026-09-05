"use client";

import { useRef } from "react";
import SectionHeader from "@/components/SectionHeader";
import { useReveal } from "@/lib/useReveal";
import { useStagger } from "@/lib/useStagger";

const SHIFTS = [
  { from: "Fragmented systems", to: "One coherent platform" },
  { from: "Manual processes", to: "Automated workflows" },
  { from: "Disconnected teams", to: "Shared operational truth" },
];

export default function CompanyIntro() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useStagger(ref);

  return (
    <section
      ref={ref}
      id="company"
      className="scroll-mt-20 bg-surface"
      aria-label="Company"
    >
      <div className="container-x grid gap-8 section-y lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pr-16">
          <SectionHeader
            label="Company"
            title="Software built around real business problems."
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-lg leading-relaxed text-fg/90" data-reveal>
            Most businesses don&apos;t run on one system. They run on
            spreadsheets, legacy tools, inboxes, and workarounds — processes
            held together by the people who know them best.
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted" data-reveal>
            Every business has its own way of working. We build software around
            those realities — not around generic templates. We study how a
            business actually operates, then design products and systems that
            bring its people, data, and operations into one coherent whole.{" "}
            <a href="/prism" className="text-fg underline underline-offset-4">
              Prism
            </a>{" "}
            is the field-operations product for equipment-service teams.
          </p>

          <div className="mt-8 lg:mt-12">
            {SHIFTS.map((shift) => (
              <p
                key={shift.from}
                data-stagger
                className="border-t border-line py-5 text-base last:border-b"
              >
                <span className="text-muted">{shift.from}</span>
                <span className="section-label mx-3 text-faint">
                  becomes
                </span>
                <span className="text-fg">{shift.to}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
