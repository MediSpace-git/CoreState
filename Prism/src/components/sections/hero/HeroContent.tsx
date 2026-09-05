import { heroContent } from "@prism/config/content";

export function HeroContent() {
  const { headline, description } = heroContent;

  return (
    <div className="hero-copy-panel relative z-10 mx-auto w-full max-w-[1200px] shrink-0 px-5 pb-7 pt-2 md:px-8 lg:absolute lg:inset-0 lg:flex lg:h-full lg:flex-col lg:justify-center lg:pb-8 lg:pt-14">
      <div className="relative max-w-2xl">
        <div className="hero-copy-halo" aria-hidden="true" />
        <h1
          id="hero-heading"
          className="hero-headline font-[family-name:var(--font-display)] text-[clamp(1.7rem,7vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-[var(--paper)] lg:[text-shadow:0_2px_28px_rgba(6,7,10,0.75)]"
        >
          {headline}
        </h1>
        <p className="hero-copy mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--paper)]/92 sm:mt-4 md:text-base lg:[text-shadow:0_1px_18px_rgba(6,7,10,0.8)]">
          {description}
        </p>
      </div>
    </div>
  );
}
