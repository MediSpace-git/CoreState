"use client";

import { useRef } from "react";
import Image from "next/image";
import { products, type Product } from "@/lib/data";
import { gsap, useGSAP, MOTION_OK } from "@/lib/gsap";
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
      <p className="section-label" data-el>
        {product.category}
      </p>

      <h3
        className="mt-2 font-semibold leading-[1.02] tracking-tight text-fg text-[clamp(1.75rem,7vw,2.35rem)] lg:mt-4 lg:text-[clamp(2.5rem,1.6rem+2.4vw,4.5rem)]"
        data-el
      >
        {product.name}
      </h3>

      <p
        className="mt-3 max-w-md text-sm leading-relaxed text-muted lg:mt-6 lg:text-lg"
        data-el
      >
        {product.description}
      </p>

      <p className="mt-4 text-xs leading-relaxed text-muted lg:mt-8 lg:text-sm" data-el>
        {product.facets.join(" · ")}
      </p>

      <a
        href={product.url ?? "#contact"}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-5 inline-block text-sm font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors duration-300 hover:decoration-fg lg:mt-10"
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

      mm.add(MOTION_OK, () => {
          const desktop = window.matchMedia("(min-width: 1024px)").matches;
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
              { opacity: 0, y: desktop ? 36 : 20 },
              { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 },
              0.1
            )
            .fromTo(
              first.querySelector("[data-visual]"),
              { opacity: 0, y: desktop ? 48 : 28, scale: 0.97 },
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
              end: `+=${(slides.length - 1) * (desktop ? 1100 : 720)}`,
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
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
      <div data-prod-pinned>
        <div
          data-stage
          className="relative flex h-svh flex-col justify-center overflow-hidden bg-surface pt-16 lg:pt-0"
        >
          <div className="container-x relative w-full">
            <div
              data-stage-head
              className="mb-6 flex items-end justify-between gap-8 lg:mb-14"
            >
              <p className="section-label">
                Products
              </p>
              {count > 1 ? (
                <div className="h-px w-24 bg-line lg:w-32">
                  <div
                    data-prod-progress
                    className="h-full origin-left bg-fg"
                    style={{ transform: "scaleX(0)" }}
                  />
                </div>
              ) : null}
            </div>

            <div className="relative">
              {products.map((product, i) => (
                <div
                  key={product.name}
                  data-slide
                  className={
                    i === 0
                      ? "relative grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10"
                      : "absolute inset-0 grid grid-cols-1 items-center gap-5 lg:grid-cols-12 lg:gap-10"
                  }
                >
                  <div className="order-2 lg:order-1 lg:col-span-5">
                    <SlideText product={product} />
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-7" data-visual>
                    <div className="h-[22vh] max-h-44 lg:h-[52vh] lg:max-h-140">
                      <ProductVisual product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-prod-static className="hidden">
        <div className="container-x section-y">
          <p className="section-label" data-reveal>
            Products
          </p>

          <div className="mt-10 space-y-14 lg:mt-14 lg:space-y-20">
            {products.map((product) => (
              <div key={product.name} data-reveal>
                <div className="mb-6 h-52 lg:mb-8 lg:h-80">
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
