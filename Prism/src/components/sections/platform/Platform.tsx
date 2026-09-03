"use client";

import { useRef } from "react";
import { platformContent } from "@prism/config/content";
import { useSectionTimeline } from "@prism/lib/gsap/useSectionTimeline";

export function Platform() {
  const root = useRef<HTMLElement>(null);

  useSectionTimeline({
    scope: root,
    animation: ({ gsap, root: el }) => {
      const q = gsap.utils.selector(el);
      gsap.from(q("[data-a]"), {
        scrollTrigger: { trigger: el, start: "top center" },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.55,
      });
    },
  });

  return (
    <section
      ref={root}
      id={platformContent.id}
      className="bg-[var(--ink)] px-5 text-[var(--paper)] md:px-8"
    >
      <div className="section-inner">
        <div data-a className="max-w-2xl">
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal)] uppercase">
            {platformContent.kicker}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.65rem,3vw,2.4rem)] font-semibold tracking-[-0.03em]">
            {platformContent.title}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--paper-muted)]">{platformContent.body}</p>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {platformContent.items.map((item) => (
            <li key={item.title} data-a className="border-t border-[var(--line)] pt-5">
              <h3 className="font-[family-name:var(--font-display)] text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--paper-muted)]">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
