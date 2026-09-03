"use client";

import { useRef } from "react";
import { workflowContent } from "@prism/config/content";
import { useSectionTimeline } from "@prism/lib/gsap/useSectionTimeline";

export function Workflow() {
  const root = useRef<HTMLElement>(null);

  useSectionTimeline({
    scope: root,
    animation: ({ gsap, root: el }) => {
      const q = gsap.utils.selector(el);
      gsap.from(q("[data-a]"), {
        scrollTrigger: { trigger: el, start: "top center" },
        y: 22,
        opacity: 0,
        stagger: 0.1,
        duration: 0.55,
        ease: "power3.out",
      });
    },
  });

  return (
    <section
      ref={root}
      id={workflowContent.id}
      className="bg-[var(--ink)] px-5 text-[var(--paper)] md:px-8"
    >
      <div className="section-inner">
        <div data-a className="max-w-xl">
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal)] uppercase">
            {workflowContent.kicker}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.65rem,3vw,2.5rem)] font-semibold tracking-[-0.03em]">
            {workflowContent.title}
          </h2>
        </div>
        <ol className="mt-10 grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-4">
          {workflowContent.steps.map((step, index) => (
            <li key={step.title} data-a className="bg-[var(--ink-elevated)] p-5 md:p-6">
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--signal)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--paper-muted)]">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
