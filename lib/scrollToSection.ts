import { gsap, REDUCED } from "@/lib/gsap";
import { nav } from "@/lib/data";

const NAV_GAP = 16;

let lock: string | null = null;

function offsetY() {
  const bar = document.querySelector<HTMLElement>("[data-site-nav]");
  return (bar?.getBoundingClientRect().bottom ?? 72) + NAV_GAP;
}

export function hashFromHref(href: string) {
  const index = href.indexOf("#");
  return index >= 0 ? href.slice(index) : "";
}

export function lockNav(hash: string | null) {
  lock = hash;
}

export function isNavLocked() {
  return lock;
}

/** Which nav section currently sits under the bar. */
export function readActiveSection(): string | null {
  const line = offsetY() + 8;
  let current: string | null = null;

  for (const item of nav) {
    const hash = hashFromHref(item.href);
    if (!hash) continue;
    const el = document.querySelector<HTMLElement>(hash);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= line) current = hash;
  }

  return current;
}

/** Ease the window to an in-page section instead of jumping. */
export function scrollToSection(hash: string, onSettled?: () => void) {
  if (!hash || hash === "#") return;

  const reduce =
    typeof window !== "undefined" && window.matchMedia(REDUCED).matches;

  const finish = () => {
    lock = null;
    onSettled?.();
  };

  lock = hash;

  if (hash === "#top") {
    gsap.to(window, {
      duration: reduce ? 0 : gsap.utils.clamp(0.7, 1.55, window.scrollY / 2200),
      ease: "power2.inOut",
      overwrite: "auto",
      scrollTo: { y: 0, autoKill: true },
      onComplete: finish,
      onInterrupt: finish,
    });
    return;
  }

  const el = document.querySelector<HTMLElement>(hash);
  if (!el) {
    finish();
    return;
  }

  const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - offsetY());
  const distance = Math.abs(y - window.scrollY);

  gsap.to(window, {
    duration: reduce ? 0 : gsap.utils.clamp(0.75, 1.7, distance / 1600),
    ease: "power2.inOut",
    overwrite: "auto",
    scrollTo: { y, autoKill: true },
    onComplete: finish,
    onInterrupt: finish,
  });
}

export function isHomePath(pathname = window.location.pathname) {
  return pathname === "/";
}

/** In-page hash on the homepage, including `/#section` form. */
export function isInPageHash(href: string | null): href is string {
  if (!href) return false;
  const hash = hashFromHref(href);
  if (!hash || hash.length < 2) return false;
  return href.startsWith("#") || href.startsWith("/#");
}
