"use client";

import { useSyncExternalStore } from "react";
import { Prism } from "@prism/components/effects/prism";
import { heroPrismProps } from "@prism/config/content";

const PHONE = "(max-width: 767px)";

function subscribePhone(onChange: () => void) {
  const media = window.matchMedia(PHONE);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getPhone() {
  return window.matchMedia(PHONE).matches;
}

export function HeroBackground() {
  const phone = useSyncExternalStore(subscribePhone, getPhone, () => false);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[rgb(6,7,10)]"
      aria-hidden="true"
    >
      <Prism
        {...heroPrismProps}
        {...(phone
          ? { scale: 2.7, offset: { x: 0, y: 18 }, quality: "low" as const }
          : {})}
      />
      <div className="hero-text-frost" aria-hidden="true">
        <div className="hero-text-frost__blur" />
        <div className="hero-text-frost__wash" />
      </div>
    </div>
  );
}
