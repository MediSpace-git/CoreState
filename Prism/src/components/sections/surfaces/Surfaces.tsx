"use client";

import { useRef } from "react";
import { surfacesContent } from "@prism/config/content";
import { useSectionTimeline } from "@prism/lib/gsap/useSectionTimeline";

export function Surfaces() {
  const root = useRef<HTMLElement>(null);

  useSectionTimeline({
    scope: root,
    animation: ({ gsap, root: el }) => {
      const q = gsap.utils.selector(el);
      gsap.from(q("[data-a]"), {
        scrollTrigger: { trigger: el, start: "top center" },
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.65,
        ease: "power3.out",
      });
    },
  });

  return (
    <section
      ref={root}
      id={surfacesContent.id}
      className="bg-[var(--ink)] px-5 text-[var(--paper)] md:px-8"
    >
      <div className="section-inner">
        <div data-a className="max-w-xl">
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal)] uppercase">
            {surfacesContent.kicker}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.65rem,3vw,2.5rem)] font-semibold tracking-[-0.03em]">
            {surfacesContent.title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article data-a className="border border-[var(--line)] bg-[var(--ink-elevated)] p-6 md:p-7">
            <p className="text-[12px] text-[var(--paper-muted)]">{surfacesContent.mobile.audience}</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl">
              {surfacesContent.mobile.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {surfacesContent.mobile.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-[var(--line)] pb-3 text-sm text-[var(--paper-muted)] last:border-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article data-a className="border border-[var(--line)] bg-[var(--ink-elevated)] p-6 md:p-7">
            <p className="text-[12px] text-[var(--paper-muted)]">{surfacesContent.admin.audience}</p>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl">
              {surfacesContent.admin.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {surfacesContent.admin.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-[var(--line)] pb-3 text-sm text-[var(--paper-muted)] last:border-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
