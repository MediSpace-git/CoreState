import Link from "next/link";
import { SiteShell } from "@prism/components/layout/SiteShell";
import { ProductStage } from "@prism/components/product/ProductMockups";
import { productOverview, routes } from "@prism/config/content";

export function ProductOverviewPage() {
  return (
    <SiteShell>
      <section className="bg-[var(--ink)] px-5 pt-28 pb-16 md:px-8 md:pt-32">
        <div className="mx-auto max-w-[800px]">
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal)] uppercase">
            {productOverview.hero.eyebrow}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--paper)]">
            {productOverview.hero.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--paper-muted)]">
            {productOverview.hero.body}
          </p>
        </div>
      </section>

      <section className="bg-[var(--stone)] px-5 py-20 text-[var(--ink)] md:px-8">
        <div className="mx-auto grid max-w-[1100px] gap-8 sm:grid-cols-2">
          {productOverview.pillars.map((pillar) => (
            <Link
              key={pillar.href}
              href={pillar.href}
              className="border-t border-[var(--ink)]/15 pt-5 transition-opacity hover:opacity-80"
            >
              <h2 className="font-[family-name:var(--font-display)] text-2xl">{pillar.title}</h2>
              <p className="mt-2 text-sm text-[var(--ink-soft)]">{pillar.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ink)] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1100px]">
          <ProductStage />
        </div>
        <div className="mx-auto mt-12 max-w-[1100px]">
          <Link
            href={routes.requestDemo}
            className="inline-flex h-12 items-center bg-[var(--signal)] px-7 text-sm font-semibold text-[var(--ink)]"
          >
            Request a demo
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
