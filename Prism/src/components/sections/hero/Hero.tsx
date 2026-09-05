import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate flex h-full w-full flex-col bg-[var(--hero-surface)]"
    >
      <div
        data-hero-visual
        className="relative min-h-0 w-full flex-1 lg:absolute lg:inset-0 lg:flex-none"
      >
        <HeroBackground />
      </div>
      <HeroContent />
    </section>
  );
}
