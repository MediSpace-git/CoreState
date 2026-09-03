"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";

const LAYERS = [
  { id: "interfaces", label: "Interfaces", sub: "Web · Mobile", z: 128, top: "10%" },
  { id: "applications", label: "Applications", sub: "Products · Portals", z: 64, top: "27%" },
  { id: "services", label: "APIs & Services", sub: "Business logic", z: 0, top: "44%" },
  { id: "data", label: "Data", sub: "Records · Events", z: -64, top: "61%" },
  { id: "operations", label: "Operations", sub: "People · Process", z: -128, top: "78%" },
] as const;

type LayerId = (typeof LAYERS)[number]["id"];

const GRID =
  "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)";

const LAST = LAYERS.length - 1;

function applyActive(root: HTMLElement, index: number) {
  const layers = root.querySelectorAll<HTMLElement>("[data-layer]");
  const legends = root.querySelectorAll<HTMLElement>("[data-legend]");

  layers.forEach((el, j) => {
    const on = j === index;
    el.classList.toggle("is-active", on);
    el.style.backgroundImage = on ? "none" : GRID;
  });
  legends.forEach((el, j) => {
    const on = j === index;
    el.classList.toggle("is-active", on);
    el.classList.toggle("is-in", j <= index);

    const copy = el.querySelector<HTMLElement>("[data-legend-copy]");
    const dot = el.querySelector<HTMLElement>("[data-legend-dot]");
    gsap.to(dot, {
      scale: on ? 1.45 : 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
    if (copy) {
      gsap.set(copy, { scale: 1, x: 0 });
    }
  });
}

function LayerFace({ id, label, sub }: { id: LayerId; label: string; sub: string }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden p-5">
      <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-faint">{label}</p>
      <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.16em] text-faint/80">{sub}</p>
      <div className="flex flex-1 items-center justify-center">
        {id === "interfaces" ? (
          <div className="flex items-end gap-2.5">
            <div className="h-16 w-18 rounded-xs border border-line-strong bg-raised/80 p-1.5">
              <div className="mb-1 flex gap-0.5">
                <span className="size-1 rounded-full bg-faint" />
                <span className="size-1 rounded-full bg-faint" />
              </div>
              <div className="h-1.5 w-3/4 rounded-full bg-line-strong" />
              <div className="mt-1.5 h-1 w-1/2 rounded-full bg-line" />
            </div>
            <div className="h-[4.4rem] w-8 rounded-xs border border-line-strong bg-raised/80 p-1">
              <div className="mx-auto h-1 w-3 rounded-full bg-faint" />
              <div className="mt-1.5 h-1 w-full rounded-full bg-line-strong" />
              <div className="mt-1 h-1 w-2/3 rounded-full bg-line" />
            </div>
          </div>
        ) : null}

        {id === "applications" ? (
          <div className="flex h-20 w-30 overflow-hidden rounded-xs border border-line-strong bg-raised/70">
            <div className="flex w-6 flex-col gap-1.5 border-r border-line p-1.5">
              <span className="h-1 w-full rounded-full bg-accent/70" />
              <span className="h-1 w-3/4 rounded-full bg-line-strong" />
              <span className="h-1 w-full rounded-full bg-line-strong" />
              <span className="h-1 w-2/3 rounded-full bg-line-strong" />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-1.5 p-2">
              <span className="h-1.5 w-4/5 rounded-full bg-accent/40" />
              <span className="h-1.5 w-full rounded-full bg-line-strong" />
              <span className="h-1.5 w-3/5 rounded-full bg-line-strong" />
            </div>
          </div>
        ) : null}

        {id === "services" ? (
          <svg viewBox="0 0 120 64" className="h-16 w-30" aria-hidden="true">
            <line x1="28" y1="32" x2="52" y2="18" stroke="var(--diagram-strong)" strokeWidth="1" />
            <line x1="28" y1="32" x2="52" y2="46" stroke="var(--diagram-strong)" strokeWidth="1" />
            <line x1="68" y1="18" x2="92" y2="32" stroke="var(--diagram-strong)" strokeWidth="1" />
            <line x1="68" y1="46" x2="92" y2="32" stroke="var(--diagram-strong)" strokeWidth="1" />
            <rect x="16" y="24" width="16" height="16" fill="var(--raised)" stroke="var(--accent)" strokeWidth="1.2" />
            <rect x="52" y="10" width="16" height="16" fill="var(--raised)" stroke="var(--diagram-strong)" />
            <rect x="52" y="38" width="16" height="16" fill="var(--raised)" stroke="var(--diagram-strong)" />
            <rect x="88" y="24" width="16" height="16" fill="var(--raised)" stroke="var(--diagram-strong)" />
          </svg>
        ) : null}

        {id === "data" ? (
          <div className="w-30 space-y-1.5">
            <div className="flex gap-1">
              <span className="h-1.5 w-8 rounded-full bg-accent/50" />
              <span className="h-1.5 flex-1 rounded-full bg-line-strong" />
            </div>
            {[0.9, 0.7, 0.85, 0.55].map((w) => (
              <div key={w} className="flex gap-1">
                <span className="h-1.5 w-8 rounded-full bg-line-strong" />
                <span
                  className="h-1.5 rounded-full bg-line"
                  style={{ width: `${w * 100}%` }}
                />
              </div>
            ))}
          </div>
        ) : null}

        {id === "operations" ? (
          <div className="flex items-center gap-2">
            {["People", "Work", "View"].map((node, i) => (
              <div key={node} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className={`size-3 rounded-full border ${
                      i === 1 ? "border-accent bg-accent/40" : "border-line-strong bg-raised"
                    }`}
                  />
                  <span className="font-mono text-[6px] uppercase tracking-[0.12em] text-faint">
                    {node}
                  </span>
                </div>
                {i < 2 ? <span className="mb-3 h-px w-4 bg-line-strong" /> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      const cards = gsap.utils.toArray<HTMLElement>("[data-layer]", root);

      const finalState = () => {
        gsap.set(cards, {
          y: 0,
          z: (i: number) => LAYERS[i].z,
          opacity: 1,
        });
        gsap.set("[data-legend]", { opacity: 1, x: 0 });
      };

      mm.add(MOTION_OK, () => {
        gsap.set(".stack", { rotationX: 55, rotationZ: -45 });
        gsap.set(cards, {
          y: 160,
          opacity: 0,
          z: (i: number) => LAYERS[i].z,
        });
        applyActive(root, 0);

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          "[data-axis]",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.9, transformOrigin: "top center" },
          0.4
        )
          .fromTo(
            "[data-legend]",
            { opacity: 0, x: 10 },
            { opacity: 1, x: 0, duration: 0.7, stagger: 0.08 },
            0.7
          )
          .to(
            cards[0],
            { y: 0, opacity: 1, duration: 1.05, ease: "power2.out" },
            0.85
          );

        gsap.to(".stack", {
          rotationZ: -42,
          duration: 9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        });

        gsap.fromTo(
          "[data-pulse]",
          { top: "6%", opacity: 0 },
          {
            top: "88%",
            opacity: 1,
            duration: 3.2,
            repeat: -1,
            repeatDelay: 1.6,
            ease: "none",
            delay: 2.2,
          }
        );

        gsap.fromTo(
          "[data-scan]",
          { xPercent: -110 },
          {
            xPercent: 110,
            duration: 2.8,
            repeat: -1,
            repeatDelay: 2.4,
            ease: "sine.inOut",
            delay: 2.6,
          }
        );
      });

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const stage = document.querySelector<HTMLElement>("[data-hero-stage]");
          if (!stage) return;

          let current = 0;
          applyActive(root, 0);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: `+=${LAST * 420}`,
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
              snap: {
                snapTo: (value) => Math.round(value * LAST) / LAST,
                duration: 0.28,
                ease: "power1.inOut",
              },
              onUpdate: (self) => {
                const next = Math.round(self.progress * LAST);
                if (next === current) return;
                current = next;
                applyActive(root, next);
              },
            },
          });

          for (let i = 1; i <= LAST; i++) {
            tl.to(cards[i], {
              y: 0,
              opacity: 1,
              duration: 1,
              ease: "power2.out",
            });
          }

          const st = tl.scrollTrigger;
          const legends = root.querySelectorAll<HTMLElement>("[data-legend]");
          const onClick = (event: Event) => {
            if (!st) return;
            const button = event.currentTarget as HTMLElement;
            const i = Number(button.dataset.index);
            if (Number.isNaN(i)) return;
            const y = st.start + (st.end - st.start) * (i / LAST);
            window.scrollTo({ top: y, behavior: "smooth" });
          };
          legends.forEach((el) => el.addEventListener("click", onClick));

          return () => {
            legends.forEach((el) => el.removeEventListener("click", onClick));
          };
        }
      );

      mm.add(REDUCED, () => {
        gsap.set(".stack", { rotationX: 55, rotationZ: -45 });
        finalState();
        gsap.set("[data-axis]", { scaleY: 1 });
        gsap.set("[data-pulse]", { opacity: 0 });
        applyActive(root, 1);
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-square w-full max-w-[min(100%,42rem)] select-none"
      role="img"
      aria-label="Diagram of a layered software platform. Cards rise into the stack as you scroll: interfaces, applications, APIs and services, data, and operations."
    >
      <div
        data-axis
        className="absolute left-1/2 top-[8%] h-[84%] w-px -translate-x-1/2 bg-linear-to-b from-transparent via-line-strong to-transparent"
        aria-hidden="true"
      />
      <div
        data-pulse
        className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-accent opacity-0 shadow-[0_0_12px_var(--accent)]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ perspective: "1300px" }}
        aria-hidden="true"
      >
        <div
          className="stack relative size-[clamp(13.5rem,22vw,30rem)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {LAYERS.map((layer, i) => (
            <div
              key={layer.id}
              data-layer
              className={`absolute inset-0 rounded-xs border border-line-strong bg-surface/90 [&.is-active]:border-accent/50 [&.is-active]:bg-accent-soft${i === 0 ? " is-active" : ""}`}
              style={{
                backgroundImage: i === 0 ? "none" : GRID,
                backgroundSize: "28px 28px",
              }}
            >
              <LayerFace id={layer.id} label={layer.label} sub={layer.sub} />
              <div
                data-scan
                className="pointer-events-none absolute inset-y-0 w-24 bg-linear-to-r from-transparent via-accent/15 to-transparent opacity-0 in-[.is-active]:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        {LAYERS.map((layer, i) => (
          <button
            key={layer.id}
            type="button"
            data-legend
            data-index={i}
            className={`group absolute right-0 flex w-44 cursor-pointer items-center gap-2.5 text-left opacity-0${i === 0 ? " is-active is-in" : ""}`}
            style={{ top: layer.top }}
          >
            <span
              data-legend-line
              className="h-px w-8 shrink-0 bg-line-strong transition-colors duration-300 group-[.is-active]:bg-accent"
            />
            <span
              data-legend-dot
              className="size-1.5 shrink-0 rounded-full bg-faint transition-colors duration-300 group-[.is-active]:bg-accent group-[.is-active]:shadow-[0_0_10px_var(--accent)]"
            />
            <span data-legend-copy className="min-w-0 flex-1">
              <span className="block truncate font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted transition-[color,font-weight,letter-spacing] duration-300 group-[.is-in]:text-fg/70 group-[.is-active]:font-bold group-[.is-active]:tracking-[0.1em] group-[.is-active]:text-fg">
                {layer.label}
              </span>
              <span className="mt-0.5 block truncate font-mono text-[9px] uppercase tracking-[0.14em] text-faint transition-colors duration-300 group-[.is-active]:text-muted">
                {layer.sub}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
