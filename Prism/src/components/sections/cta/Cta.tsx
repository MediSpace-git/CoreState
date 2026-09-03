"use client";

import Link from "next/link";
import { useRef } from "react";
import { ctaContent } from "@prism/config/content";
import { useSectionTimeline } from "@prism/lib/gsap/useSectionTimeline";

export function Cta() {
  const root = useRef<HTMLElement>(null);

  useSectionTimeline({
    scope: root,
    animation: ({ gsap, root: el }) => {
      const q = gsap.utils.selector(el);
      gsap
        .timeline({ scrollTrigger: { trigger: el, start: "top center" } })
        .from(q("[data-a='kicker']"), { y: 16, opacity: 0, duration: 0.4 })
        .from(q("[data-a='title']"), { y: 24, opacity: 0, duration: 0.55 }, 0.05)
        .from(q("[data-a='sub']"), { y: 16, opacity: 0, duration: 0.45 }, 0.12)
        .from(q("[data-a='cta']"), { y: 12, opacity: 0, duration: 0.4 }, 0.18);
    },
  });

  return (
    <section ref={root} id={ctaContent.id} className="bg-[var(--stone)] px-5 text-[var(--ink)] md:px-8">
      <div className="section-inner section-inner--narrow text-center">
        <p
          data-a="kicker"
          className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal-deep)] uppercase"
        >
          {ctaContent.kicker}
        </p>
        <h2
          data-a="title"
          className="mt-5 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.4vw,2.85rem)] font-semibold leading-[1.1] tracking-[-0.035em]"
        >
          {ctaContent.title}
        </h2>
        <p data-a="sub" className="mt-4 text-[var(--ink-soft)]">
          {ctaContent.subtitle}
        </p>
        <Link
          data-a="cta"
          href={ctaContent.cta.href}
          className="mt-10 inline-flex h-12 items-center justify-center bg-[var(--ink)] px-8 text-sm font-semibold tracking-[0.04em] text-[var(--paper)] transition-opacity hover:opacity-90"
        >
          {ctaContent.cta.label}
        </Link>
      </div>
    </section>
  );
}
