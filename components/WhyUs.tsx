"use client";

import { useRef } from "react";
import {
  Workflow,
  Layers,
  Code2,
  Network,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { whyUs } from "@/lib/data";
import { useReveal } from "@/lib/useReveal";
import { useStagger } from "@/lib/useStagger";

const WHY_ICONS: Record<string, LucideIcon> = {
  "We understand the workflow": Workflow,
  "Product mindset": Layers,
  "Engineering first": Code2,
  "Connected systems": Network,
  "Built to evolve": GitBranch,
};

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useStagger(ref);

  return (
    <section ref={ref} id="why-us" className="scroll-mt-20 bg-surface" aria-label="Why work with us">
      <div className="container-x grid gap-8 section-y lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 lg:pr-16">
            <SectionHeader
              label="Why us"
              title="Engineering discipline, product thinking."
            />
            <p
              className="mt-6 max-w-md text-base leading-relaxed text-muted"
              data-reveal
            >
              The habits below aren&apos;t aspirations — they&apos;re how our
              own products get built and maintained.
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {whyUs.map((item) => {
            const Icon = WHY_ICONS[item.title];
            return (
              <div
                key={item.title}
                className="border-t border-line py-6 last:border-b lg:py-10"
                data-stagger
                data-dir="right"
              >
                <h3 className="flex items-center gap-3 text-xl font-medium tracking-tight text-fg sm:text-2xl">
                  {Icon ? (
                    <Icon className="size-5 shrink-0 sm:size-6" strokeWidth={1.5} aria-hidden="true" />
                  ) : null}
                  {item.title}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
