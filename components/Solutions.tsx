"use client";

import { useRef } from "react";
import {
  Activity,
  Zap,
  Users,
  Database,
  LineChart,
  Handshake,
  Boxes,
  ListChecks,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { solutions } from "@/lib/data";
import { useReveal } from "@/lib/useReveal";
import { useStagger } from "@/lib/useStagger";

const SOLUTION_ICONS: Record<string, LucideIcon> = {
  Operations: Activity,
  Automation: Zap,
  Workforce: Users,
  "Data Management": Database,
  "Business Intelligence": LineChart,
  "Customer Management": Handshake,
  "Asset Management": Boxes,
  "Workflow Management": ListChecks,
};

export default function Solutions() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useStagger(ref);

  return (
    <section
      ref={ref}
      id="solutions"
      className="scroll-mt-20"
      aria-label="Solutions"
    >
      <div className="container-x section-y">
        <SectionHeader
          label="Solutions"
          title="Software that fits the workflow."
          lead="The problems we solve most often. Each one starts with how the work actually happens — then the software follows."
        />

        <div className="mt-16 grid sm:grid-cols-2">
          {solutions.map((solution) => {
            const Icon = SOLUTION_ICONS[solution.name];
            return (
              <article
                key={solution.name}
                data-stagger
                data-dir="clip"
                className="border-t border-line py-8 pr-8 last:border-b sm:[&:nth-last-child(2)]:border-b"
              >
                <h3 className="flex items-center gap-3 text-2xl font-medium tracking-tight text-fg">
                  {Icon ? (
                    <Icon
                      className="size-5 shrink-0 text-current sm:size-6"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  ) : null}
                  {solution.name}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                  {solution.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
