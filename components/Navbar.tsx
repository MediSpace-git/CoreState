"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { nav } from "@/lib/data";
import { gsap, ScrollTrigger, useGSAP, MOTION_OK } from "@/lib/gsap";
import {
  isInPageHash,
  isNavLocked,
  lockNav,
  readActiveSection,
  scrollToSection,
} from "@/lib/scrollToSection";

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ref.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.1 }
        );
      });

      ScrollTrigger.create({
        start: 24,
        end: "max",
        onToggle: (self) => setScrolled(self.isActive),
      });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: () => {
          if (isNavLocked()) return;
          const next = readActiveSection();
          setActive((prev) => (prev === next ? prev : next));
        },
      });
    },
    { scope: ref }
  );

  useEffect(() => {
    const navEl = linksRef.current;
    const mark = markRef.current;
    if (!navEl || !mark) return;

    const current = active
      ? navEl.querySelector<HTMLElement>(`[data-nav-link="${active}"]`)
      : null;

    if (!current) {
      gsap.to(mark, { width: 0, duration: 0.3, ease: "power2.out" });
      return;
    }

    const navBox = navEl.getBoundingClientRect();
    const box = current.getBoundingClientRect();
    gsap.to(mark, {
      x: box.left - navBox.left,
      width: box.width,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [active, scrolled, open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link || link.target === "_blank") return;
      const href = link.getAttribute("href");
      if (!isInPageHash(href)) return;

      event.preventDefault();
      const menuOpen = document.body.style.overflow === "hidden";
      setOpen(false);
      const next = href === "#top" ? null : href;
      lockNav(href);
      setActive(next);
      window.history.pushState(null, "", href);
      window.setTimeout(() => {
        scrollToSection(href, () => {
          setActive(href === "#top" ? null : readActiveSection() ?? next);
        });
      }, menuOpen ? 90 : 0);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <header ref={ref} className="fixed inset-x-0 top-0 z-50">
      <div className="container-x pt-3">
        <div
          data-site-nav
          className={`flex items-center justify-between gap-4 rounded-xs border px-3 transition-[background-color,border-color,height,box-shadow] duration-500 sm:px-4 ${
            open
              ? "h-14 border-transparent bg-transparent"
              : scrolled
                ? "h-14 border-line bg-bg/80 shadow-[0_1px_0_var(--line)] backdrop-blur-md"
                : "h-16 border-line/70 bg-bg/55 backdrop-blur-sm"
          }`}
        >
          <a href="#top" aria-label="CoreState — back to top" className="shrink-0">
            <Logo />
          </a>

          <nav
            ref={linksRef}
            className="relative hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            <span
              ref={markRef}
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 h-px bg-accent"
              style={{ width: 0 }}
            />
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                data-nav-link={item.href}
                className={`relative px-2.5 py-2 text-[12px] tracking-[0.04em] transition-colors duration-300 ${
                  active === item.href ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-9 items-center justify-center rounded-xs border border-line-strong text-fg lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-x-0 top-0 -z-10 h-dvh bg-bg transition-opacity duration-400 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="container-x flex h-full flex-col justify-center pt-20">
          <nav className="flex flex-col" aria-label="Mobile">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                style={{ transitionDelay: open ? `${80 + i * 55}ms` : "0ms" }}
                className={`border-b border-line py-5 text-[1.65rem] font-medium tracking-tight transition-all duration-500 ${
                  active === item.href ? "text-fg" : "text-muted"
                } ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
