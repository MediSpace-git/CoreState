"use client";

import { Prism } from "@prism/components/effects/prism";
import { heroPrismProps } from "@prism/config/content";

export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[rgb(6,7,10)]"
      aria-hidden="true"
    >
      <Prism {...heroPrismProps} />
      <div className="hero-text-frost" aria-hidden="true">
        <div className="hero-text-frost__blur" />
        <div className="hero-text-frost__wash" />
      </div>
    </div>
  );
}
