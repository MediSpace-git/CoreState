import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate h-full w-full bg-[var(--hero-surface)]"
    >
      <HeroBackground />
      <HeroContent />
    </section>
  );
}
