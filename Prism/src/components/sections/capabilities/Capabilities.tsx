"use client";

import Link from "next/link";
import { useRef } from "react";
import { capabilitiesContent } from "@prism/config/content";
import { useSectionTimeline } from "@prism/lib/gsap/useSectionTimeline";

export function Capabilities() {
  const root = useRef<HTMLElement>(null);

  useSectionTimeline({
    scope: root,
    animation: ({ gsap, root: el }) => {
      const q = gsap.utils.selector(el);
      gsap.from(q("[data-a]"), {
        scrollTrigger: { trigger: el, start: "top center" },
        y: 26,
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
      id={capabilitiesContent.id}
      className="bg-[var(--stone)] px-5 text-[var(--ink)] md:px-8"
    >
      <div className="section-inner">
        <div data-a>
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal-deep)] uppercase">
            {capabilitiesContent.kicker}
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.7rem,3vw,2.6rem)] font-semibold tracking-[-0.03em]">
            {capabilitiesContent.title}
          </h2>
        </div>
        <ul className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {capabilitiesContent.items.map((item, index) => (
            <li key={item.title} data-a className="border-t border-[var(--ink)]/15 pt-5">
              <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--ink-faint)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{item.body}</p>
              <Link
                href={item.href}
                className="mt-4 inline-block text-sm font-medium text-[var(--signal-deep)]"
              >
                Learn more
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
