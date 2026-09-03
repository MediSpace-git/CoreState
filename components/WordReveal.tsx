"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, REDUCED, EASE } from "@/lib/gsap";

type Props = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

export default function WordReveal({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.trim().split(/\s+/);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const units = gsap.utils.toArray<HTMLElement>("[data-word]");
        if (!units.length) return;

        gsap.fromTo(
          units,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.72,
            stagger: 0.045,
            delay,
            ease: EASE,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      mm.add(REDUCED, () => {
        gsap.set("[data-word]", { yPercent: 0 });
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-baseline">
          <span className="inline-block" data-word>
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
