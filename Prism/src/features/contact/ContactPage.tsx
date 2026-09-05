import Link from "next/link";
import { SiteShell } from "@prism/components/layout/SiteShell";
import { PageBreadcrumbs } from "@prism/components/layout/PageBreadcrumbs";
import { companyContact, routes, siteConfig } from "@prism/config/content";
import { JsonLd } from "@/components/JsonLd";
import { mediVastOrganizationJsonLd, prismCrumbs } from "@/lib/json-ld";

export function ContactPage() {
  return (
    <SiteShell>
      <JsonLd data={mediVastOrganizationJsonLd()} />
      <section className="bg-[var(--ink)] px-5 pt-28 pb-24 md:px-8 md:pt-32">
        <div className="mx-auto max-w-[720px]">
          <PageBreadcrumbs items={[...prismCrumbs.contact]} />
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal)] uppercase">
            Contact
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] font-semibold text-[var(--paper)]">
            Talk to {siteConfig.company}
          </h1>
          <p className="mt-5 text-[var(--paper-muted)]">
            Prism is the field-operations product from {siteConfig.company}. Use these details to
            request a walkthrough or ask about a tenant.
          </p>
          <dl className="mt-10 space-y-6 text-sm">
            <div>
              <dt className="text-[var(--paper-muted)]">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${companyContact.email}`} className="text-[var(--paper)] underline">
                  {companyContact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--paper-muted)]">Phone</dt>
              <dd className="mt-1">
                <a href={companyContact.phoneHref} className="text-[var(--paper)]">
                  {companyContact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-[var(--paper-muted)]">Office</dt>
              <dd className="mt-1 text-[var(--paper)]">{companyContact.address}</dd>
            </div>
          </dl>
          <Link
            href={routes.requestDemo}
            className="mt-10 inline-flex h-12 items-center bg-[var(--signal)] px-7 text-sm font-semibold text-[var(--ink)]"
          >
            Request a demo
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
