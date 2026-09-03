"use client";

import { useRef } from "react";
import Image from "next/image";
import { products, type Product } from "@/lib/data";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReveal } from "@/lib/useReveal";

/* ---------------------------------------------------------------- */
/* Product visual — poster when provided, otherwise abstract diagram */
/* ---------------------------------------------------------------- */

function ProductVisual({ product }: { product: Product }) {
  if (product.poster) {
    return (
      <div className="relative h-full overflow-hidden rounded-xs border border-line bg-bg">
        <Image
          src={product.poster}
          alt={`${product.name} poster`}
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover object-center"
          priority={product.name === "Prism"}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full overflow-hidden rounded-xs border border-line bg-bg">
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <span className="text-xs text-muted">{product.name}</span>
      </div>

      <svg
        viewBox="0 0 400 200"
        className="h-[calc(100%-41px)] w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 8 }).map((_, row) =>
          Array.from({ length: 16 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={16 + col * 25}
              cy={20 + row * 23}
              r="1"
              fill="var(--diagram-fill)"
            />
          ))
        )}

        <g stroke="var(--diagram)" strokeWidth="1">
          <path d="M66 66 L191 112 L291 43" fill="none" />
          <path d="M191 112 L316 158" fill="none" />
          <path d="M66 158 L191 112" fill="none" />
        </g>

        <g>
          {[
            { x: 66, y: 66 },
            { x: 291, y: 43 },
            { x: 66, y: 158 },
            { x: 316, y: 158 },
          ].map((n) => (
            <rect
              key={`${n.x}-${n.y}`}
              x={n.x - 5}
              y={n.y - 5}
              width="10"
              height="10"
              fill="var(--surface)"
              stroke="var(--diagram-strong)"
            />
          ))}
          <rect
            x={183}
            y={104}
            width="16"
            height="16"
            fill="var(--accent-soft)"
            stroke="var(--accent)"
          />
          <circle cx="191" cy="112" r="2" fill="var(--accent)" />
        </g>
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Slide content — shared between stage and static fallback          */
/* ---------------------------------------------------------------- */

function opensInNewTab(product: Product) {
  return Boolean(product.newTab || (product.url && /^https?:\/\//.test(product.url)));
}

function SlideText({ product }: { product: Product }) {
  const external = opensInNewTab(product);

  return (
    <>
      <p
        className="section-label"
        data-el
      >
        {product.category}
      </p>

      <h3
        className="mt-4 text-[clamp(2.5rem,1.6rem+2.4vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-fg"
        data-el
      >
        {product.name}
      </h3>

      <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg" data-el>
        {product.description}
      </p>

      <p className="mt-8 text-sm leading-relaxed text-muted" data-el>
        {product.facets.join(" · ")}
      </p>

      <a
        href={product.url ?? "#contact"}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-10 inline-block text-sm font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors duration-300 hover:decoration-fg"
        data-el
      >
        Explore {product.name}
      </a>
    </>
  );
}

/* ---------------------------------------------------------------- */

export default function Products() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const count = products.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const slides = gsap.utils.toArray<HTMLElement>("[data-slide]");
          if (!slides.length) return;

          /* Entrance — plays once when the stage scrolls into view. */
          const first = slides[0];
          const intro = gsap.timeline({
            scrollTrigger: {
              trigger: "[data-stage]",
              start: "top 72%",
              once: true,
            },
            defaults: { ease: "power3.out" },
          });

          intro
            .fromTo(
              "[data-stage-head]",
              { opacity: 0, y: 22 },
              { opacity: 1, y: 0, duration: 0.7 }
            )
            .fromTo(
              first.querySelectorAll("[data-el]"),
              { opacity: 0, y: 36 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 },
              0.1
            )
            .fromTo(
              first.querySelector("[data-visual]"),
              { opacity: 0, y: 48, scale: 0.97 },
              { opacity: 1, y: 0, scale: 1, duration: 0.9 },
              0.3
            );

          if (slides.length < 2) return;

          /* Pinned deck — every product plays through the same stage. */
          gsap.set(slides.slice(1), { autoAlpha: 0 });

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: "[data-stage]",
              start: "top top",
              end: `+=${(slides.length - 1) * 1100}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
            },
          });

          slides.forEach((slide, i) => {
            if (i === slides.length - 1) return;
            const next = slides[i + 1];

            tl.to({}, { duration: 0.35 });

            /* Current product lifts out. */
            tl.to(
              slide.querySelectorAll("[data-el]"),
              {
                y: -42,
                autoAlpha: 0,
                duration: 0.5,
                stagger: 0.04,
              }
            );
            tl.to(
              slide.querySelector("[data-visual]"),
              { y: -64, autoAlpha: 0, scale: 0.96, rotate: -1.5, duration: 0.55 },
              "<0.05"
            );
            tl.set(slide, { autoAlpha: 0 });

            /* Next product rises in. */
            tl.set(next, { autoAlpha: 1 });
            tl.fromTo(
              next.querySelectorAll("[data-el]"),
              { y: 48, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.05 }
            );
            tl.fromTo(
              next.querySelector("[data-visual]"),
              { y: 72, autoAlpha: 0, scale: 0.96, rotate: 1.5 },
              { y: 0, autoAlpha: 1, scale: 1, rotate: 0, duration: 0.6 },
              "<0.08"
            );
          });

          tl.to({}, { duration: 0.4 });

          /* Progress rail tracks the full journey. */
          tl.fromTo(
            "[data-prod-progress]",
            { scaleX: 0 },
            { scaleX: 1, duration: tl.duration(), ease: "none" },
            0
          );
        }
      );
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="products"
      className="scroll-mt-20 bg-surface"
      aria-label="Products"
    >
      {/* ------------------------------------------------------------ */}
      {/* Pinned product stage — desktop, motion allowed                */}
      {/* ------------------------------------------------------------ */}
      <div data-prod-pinned className="hidden lg:block">
        <div
          data-stage
          className="relative flex h-screen flex-col justify-center overflow-hidden bg-surface"
        >
          <div className="container-x relative w-full">
            <div
              data-stage-head
              className="mb-14 flex items-end justify-between gap-8"
            >
              <p className="section-label">
                Products
              </p>
              {count > 1 ? (
                <div className="h-px w-32 bg-line">
                  <div
                    data-prod-progress
                    className="h-full origin-left bg-fg"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>
              ) : null}
            </div>

            {/* Slides — all products share this exact space */}
            <div className="relative">
              {products.map((product, i) => (
                <div
                  key={product.name}
                  data-slide
                  className={
                    i === 0
                      ? "relative grid grid-cols-12 items-center gap-10"
                      : "absolute inset-0 grid grid-cols-12 items-center gap-10"
                  }
                >
                  <div className="col-span-5">
                    <SlideText product={product} />
                  </div>
                  <div className="col-span-7" data-visual>
                    <div className="h-[52vh] max-h-140">
                      <ProductVisual product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Static fallback — small screens or reduced motion             */}
      {/* ------------------------------------------------------------ */}
      <div data-prod-static className="lg:hidden">
        <div className="container-x section-y">
          <p
            className="section-label"
            data-reveal
          >
            Products
          </p>

          <div className="mt-14 space-y-20">
            {products.map((product) => (
              <div key={product.name} data-reveal>
                <div className="mb-8 h-64 sm:h-80">
                  <ProductVisual product={product} />
                </div>
                <SlideText product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
