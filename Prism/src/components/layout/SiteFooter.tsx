import Link from "next/link";
import { companyContact, footerNav, siteConfig } from "@prism/config/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--ink)] px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-lg text-[var(--paper)]">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-sm text-sm text-[var(--paper-muted)]">
            {siteConfig.company}. Field operations for equipment-service teams.
          </p>
          <p className="mt-4 text-sm text-[var(--paper-muted)]">{companyContact.address}</p>
        </div>
        <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
          {footerNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--paper-muted)] transition-colors hover:text-[var(--paper)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-[1400px] border-t border-[var(--line)] pt-6 text-[12px] text-[var(--paper-muted)]">
        {siteConfig.company} · {siteConfig.name} · {companyContact.region}
      </div>
    </footer>
  );
}
