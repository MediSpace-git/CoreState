"use client";

import { useRef } from "react";
import {
  Cloud,
  Database,
  Layers,
  Plug,
  Server,
  Shield,
  Smartphone,
  SquareCode,
  Terminal,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { technology } from "@/lib/data";
import { useReveal } from "@/lib/useReveal";
import { useStagger } from "@/lib/useStagger";

const PRINCIPLES: { text: string; icon: LucideIcon }[] = [
  {
    text: "Modern, well-understood architectures over fashionable ones",
    icon: Layers,
  },
  {
    text: "API-driven platforms that other systems can build on",
    icon: Plug,
  },
  {
    text: "Secure data handling as a design constraint, not a patch",
    icon: Shield,
  },
  {
    text: "Cloud-ready deployments that scale without rewrites",
    icon: Cloud,
  },
  {
    text: "Automation and integrations that remove manual glue work",
    icon: Workflow,
  },
];

const LAYER_ICONS: Record<string, LucideIcon> = {
  Frontend: SquareCode,
  Backend: Server,
  Mobile: Smartphone,
  Database: Database,
  Cloud: Cloud,
  Infrastructure: Terminal,
};

export default function Technology() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  useStagger(ref);

  return (
    <section
      ref={ref}
      id="technology"
      className="scroll-mt-20"
      aria-label="Technology"
    >
      <div className="container-x grid gap-8 section-y lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pr-16">
          <SectionHeader
            label="Technology"
            title="Engineering that scales with the business."
          />
          <p
            className="mt-6 max-w-md text-base leading-relaxed text-muted"
            data-reveal
          >
            Technology choices are made for the decade, not the demo. We favor
            boring reliability where it matters and invest complexity only
            where the business gets something back for it.
          </p>

          <ul className="mt-10 max-w-md">
            {PRINCIPLES.map(({ text, icon: Icon }) => (
              <li
                key={text}
                data-stagger
                data-dir="left"
                className="flex items-start gap-3 border-t border-line py-4 text-sm leading-relaxed text-muted last:border-b"
              >
                <Icon
                  className="mt-0.5 size-4 shrink-0 text-current"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="border-t border-line">
            {technology.map((row) => {
              const Icon = LAYER_ICONS[row.layer];
              return (
                <div
                  key={row.layer}
                  data-stagger
                  data-dir="right"
                  className="grid gap-2 border-b border-line py-8 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-8"
                >
                  <h3 className="flex items-center gap-2.5 text-base font-medium tracking-tight text-fg">
                    {Icon ? (
                      <Icon
                        className="size-4 shrink-0 text-current sm:size-5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    ) : null}
                    {row.layer}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {row.approach}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
