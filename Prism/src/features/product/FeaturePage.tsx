import Link from "next/link";
import { SiteShell } from "@prism/components/layout/SiteShell";
import { routes } from "@prism/config/content";

type Feature = {
  title: string;
  body: string;
};

type Hero = {
  eyebrow: string;
  title: string;
  body: string;
};

type Props = {
  hero: Hero;
  features: readonly Feature[];
  workflow: readonly string[];
  note?: string;
};

export function FeaturePage({ hero, features, workflow, note }: Props) {
  return (
    <SiteShell>
      <section className="bg-[var(--ink)] px-5 pt-28 pb-16 md:px-8 md:pt-32">
        <div className="mx-auto max-w-[800px]">
          <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.22em] text-[var(--signal)] uppercase">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--paper)]">
            {hero.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--paper-muted)]">{hero.body}</p>
        </div>
      </section>

      <section className="bg-[var(--stone)] px-5 py-20 text-[var(--ink)] md:px-8">
        <div className="mx-auto grid max-w-[1100px] gap-10 sm:grid-cols-2">
          {features.map((feature) => (
            <article key={feature.title} className="border-t border-[var(--ink)]/15 pt-5">
              <h2 className="font-[family-name:var(--font-display)] text-xl">{feature.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[var(--ink)] px-5 py-20 md:px-8">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--paper)]">
            Workflow
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {workflow.map((step, index) => (
              <li key={step} className="border border-[var(--line)] bg-[var(--ink-elevated)] p-5">
                <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--signal)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-sm text-[var(--paper-muted)]">{step}</p>
              </li>
            ))}
          </ol>
          {note ? (
            <p className="mt-8 max-w-2xl text-sm text-[var(--paper-muted)]">{note}</p>
          ) : null}
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
