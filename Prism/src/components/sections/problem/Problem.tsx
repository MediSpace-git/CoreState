"use client";

import { useRef } from "react";
import { problemContent } from "@prism/config/content";
import { useSectionTimeline } from "@prism/lib/gsap/useSectionTimeline";

export function Problem() {
  const root = useRef<HTMLElement>(null);

  useSectionTimeline({
    scope: root,
    animation: ({ gsap, root: el }) => {
      const q = gsap.utils.selector(el);
      gsap.from(q("[data-a]"), {
        scrollTrigger: { trigger: el, start: "top center" },
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
      });
    },
  });

  return (
    <section
      ref={root}
      id={problemContent.id}
      className="bg-[var(--stone)] px-5 text-[var(--ink)] md:px-8"
    >
      <div className="section-inner">
        <p
          data-a
          className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal-deep)] uppercase"
        >
          {problemContent.kicker}
        </p>
        <h2
          data-a
          className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(1.7rem,3vw,2.5rem)] font-semibold tracking-[-0.03em]"
        >
          {problemContent.title}
        </h2>
        <p data-a className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--ink-soft)]">
          {problemContent.body}
        </p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {problemContent.points.map((point) => (
            <li key={point.title} data-a className="border-t border-[var(--ink)]/15 pt-5">
              <h3 className="font-[family-name:var(--font-display)] text-xl">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{point.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
