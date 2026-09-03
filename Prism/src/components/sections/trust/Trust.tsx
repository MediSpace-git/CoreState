"use client";

import { useRef } from "react";
import { trustContent } from "@prism/config/content";
import { useSectionTimeline } from "@prism/lib/gsap/useSectionTimeline";

export function Trust() {
  const root = useRef<HTMLElement>(null);

  useSectionTimeline({
    scope: root,
    animation: ({ gsap, root: el }) => {
      const q = gsap.utils.selector(el);
      gsap
        .timeline({
          scrollTrigger: {
            trigger: el,
            start: "top center",
            toggleActions: "play none none reverse",
          },
        })
        .from(q("[data-a='head']"), { y: 24, opacity: 0, duration: 0.6 }, 0)
        .from(q("[data-a='card']"), { y: 28, opacity: 0, stagger: 0.1, duration: 0.55 }, 0.12);
    },
  });

  return (
    <section ref={root} id={trustContent.id} className="bg-[var(--ink)] px-5 md:px-8">
      <div className="section-inner">
        <div data-a="head" className="max-w-2xl">
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal)] uppercase">
            {trustContent.kicker}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-[var(--paper)]">
            {trustContent.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--paper-muted)] md:text-[15px]">
            {trustContent.body}
          </p>
        </div>
        <div className="mt-10 grid gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
          {trustContent.models.map((model) => (
            <article key={model.title} data-a="card" className="bg-[var(--ink-elevated)] p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg text-[var(--paper)]">
                {model.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--paper-muted)]">{model.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
