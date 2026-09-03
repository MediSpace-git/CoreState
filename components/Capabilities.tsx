"use client";

import { useRef } from "react";
import {
  AppWindow,
  Boxes,
  Network,
  Smartphone,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { capabilities } from "@/lib/data";
import { useReveal } from "@/lib/useReveal";
import { useStagger } from "@/lib/useStagger";

const ICONS: Record<string, LucideIcon> = {
  Boxes,
  Wrench,
  AppWindow,
  Smartphone,
  Network,
  Workflow,
};

export default function Capabilities() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useStagger(ref);

  return (
    <section ref={ref} id="capabilities" className="scroll-mt-20" aria-label="What we do">
      <div className="container-x section-y">
        <SectionHeader
          label="What we do"
          title="From idea to production."
          lead="We take on the full lifecycle of a software product — research, design, engineering, deployment, and the years of evolution that follow."
        />

        <div className="mt-16 grid gap-x-20 gap-y-12 sm:grid-cols-2">
          {capabilities.map((cap, i) => {
            const Icon = ICONS[cap.icon];
            return (
              <article
                key={cap.title}
                className="max-w-md"
                data-stagger
                data-dir={i % 2 === 0 ? "left" : "right"}
              >
                <h3 className="flex items-center gap-3 text-xl font-medium tracking-tight text-fg sm:text-2xl">
                  {Icon ? (
                    <Icon
                      className="size-5 shrink-0 text-current sm:size-6"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  ) : null}
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {cap.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
