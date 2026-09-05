import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListJsonLd, type Crumb } from "@/lib/json-ld";

export function PageBreadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length < 2) return null;

  return (
    <>
      <JsonLd data={breadcrumbListJsonLd(items)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--paper-muted)]">
          {items.map((item, index) => {
            const last = index === items.length - 1;
            return (
              <li key={`${item.href}-${item.name}`} className="flex items-center gap-2">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {last ? (
                  <span className="text-[var(--paper)]" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-[var(--paper)]"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
