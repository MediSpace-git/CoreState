"use client";

import { useRef } from "react";
import { ProductStage } from "@prism/components/product/ProductMockups";
import { useSectionTimeline } from "@prism/lib/gsap/useSectionTimeline";

export function ProductPreview() {
  const root = useRef<HTMLElement>(null);

  useSectionTimeline({
    scope: root,
    animation: ({ gsap, root: el }) => {
      const q = gsap.utils.selector(el);
      gsap.from(q("[data-a]"), {
        scrollTrigger: { trigger: el, start: "top center" },
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
      });
    },
  });

  return (
    <section
      ref={root}
      id="product-preview"
      aria-label="Product preview"
      className="bg-[var(--ink)] px-5 text-[var(--paper)] md:px-8"
    >
      <div className="section-inner">
        <p
          data-a
          className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[var(--signal)] uppercase"
        >
          The product
        </p>
        <div data-a className="mt-6 h-[min(520px,calc(100dvh-9rem))] min-h-0 w-full">
          <ProductStage compact />
        </div>
      </div>
    </section>
  );
}
