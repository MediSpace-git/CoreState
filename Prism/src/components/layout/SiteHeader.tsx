"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, routes, siteConfig } from "@prism/config/content";
import { isActiveNavHref } from "@prism/utils/isActiveNavHref";

const NAV_HREFS = navLinks.map((link) => link.href);

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-[var(--line)] bg-[var(--ink)]/92 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-5 md:px-8">
        <div className="flex items-center gap-3">
          <Link
            href={routes.home}
            className="flex shrink-0 items-center"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src="/brand/prism-logo.png"
              alt={siteConfig.name}
              width={72}
              height={72}
              priority
              className="h-14 w-14 object-contain mix-blend-screen"
            />
          </Link>
          <Link
            href="/"
            className="hidden font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--paper-muted)] transition-colors hover:text-[var(--paper)] sm:inline"
          >
            CoreState
          </Link>
        </div>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = isActiveNavHref(pathname, link.href, NAV_HREFS);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b pb-0.5 text-[13px] tracking-[0.04em] transition-colors ${
                  active
                    ? "border-[var(--signal)] text-[var(--paper)]"
                    : "border-transparent text-[var(--paper-muted)] hover:text-[var(--paper)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center border border-[var(--paper)]/20 text-[var(--paper)]"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-[var(--line)] bg-[var(--ink)] px-5 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm text-[var(--paper-muted)] transition-colors hover:text-[var(--paper)]"
              onClick={() => setOpen(false)}
            >
              CoreState
            </Link>
            {navLinks.map((link) => {
              const active = isActiveNavHref(pathname, link.href, NAV_HREFS);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`text-sm ${active ? "text-[var(--signal)]" : "text-[var(--paper)]"}`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
