import { SiteShell } from "@prism/components/layout/SiteShell";
import { PageBreadcrumbs } from "@prism/components/layout/PageBreadcrumbs";
import { DemoRequestForm } from "@prism/features/demo/DemoRequestForm";
import { demoPage } from "@prism/config/content";
import { prismCrumbs } from "@/lib/json-ld";

export function DemoPage() {
  return (
    <SiteShell>
      <section className="bg-[var(--ink)] px-5 pt-28 pb-24 md:px-8 md:pt-32">
        <div className="mx-auto max-w-[800px]">
          <PageBreadcrumbs items={[...prismCrumbs.requestDemo]} />
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal)] uppercase">
            {demoPage.hero.eyebrow}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--paper)]">
            {demoPage.hero.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--paper-muted)]">
            {demoPage.hero.body}
          </p>
          <DemoRequestForm />
        </div>
      </section>
    </SiteShell>
  );
}
