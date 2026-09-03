import { heroContent } from "@prism/config/content";

export function HeroContent() {
  const { headline, description } = heroContent;

  return (
    <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[1200px] flex-col justify-center px-5 pb-8 pt-14 md:px-8">
      <div className="relative max-w-2xl">
        <div className="hero-copy-halo" aria-hidden="true" />
        <h1
          id="hero-heading"
          className="hero-headline font-[family-name:var(--font-display)] text-[clamp(1.85rem,4.5vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--paper)] [text-shadow:0_2px_28px_rgba(6,7,10,0.75)]"
        >
          {headline}
        </h1>
        <p className="hero-copy mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--paper)]/92 md:text-base [text-shadow:0_1px_18px_rgba(6,7,10,0.8)]">
          {description}
        </p>
      </div>
    </div>
  );
}
