import WordReveal from "@/components/WordReveal";

type Props = {
  label: string;
  title: string;
  lead?: string;
  className?: string;
};

export default function SectionHeader({
  label,
  title,
  lead,
  className = "",
}: Props) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <p className="section-label mb-6" data-reveal>
        {label}
      </p>
      <WordReveal
        text={title}
        className="text-h2 font-semibold leading-[1.08] tracking-tight text-fg"
        delay={0.08}
      />
      {lead ? (
        <p
          className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          data-reveal
          data-delay="0.16"
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
