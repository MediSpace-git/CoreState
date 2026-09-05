import { SiteShell } from "@prism/components/layout/SiteShell";
import { PageBreadcrumbs } from "@prism/components/layout/PageBreadcrumbs";
import type { Crumb } from "@/lib/json-ld";

type Props = {
  title: string;
  updated: string;
  crumbs: Crumb[];
  children: React.ReactNode;
};

export function LegalPage({ title, updated, crumbs, children }: Props) {
  return (
    <SiteShell>
      <article className="bg-[var(--ink)] px-5 pt-28 pb-24 md:px-8 md:pt-32">
        <div className="mx-auto max-w-[720px]">
          <PageBreadcrumbs items={crumbs} />
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-semibold text-[var(--paper)]">
            {title}
          </h1>
          <p className="mt-3 text-sm text-[var(--paper-muted)]">Last updated {updated}</p>
          <div className="legal-copy mt-10 space-y-5 text-sm leading-relaxed text-[var(--paper-muted)]">
            {children}
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
