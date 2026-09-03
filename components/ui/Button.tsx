import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Props = {
  href: string;
  variant?: "primary" | "outline";
  external?: boolean;
  children: ReactNode;
  className?: string;
};

export default function Button({
  href,
  variant = "primary",
  external = false,
  children,
  className = "",
}: Props) {
  const base =
    "group inline-flex h-12 items-center gap-2.5 rounded-[2px] px-6 text-sm font-medium tracking-tight transition-colors duration-300";
  const styles =
    variant === "primary"
      ? "bg-fg text-bg hover:bg-accent hover:text-invert"
      : "border border-line-strong text-fg hover:border-accent/60 hover:text-accent";
  const Arrow = external ? ArrowUpRight : ArrowRight;

  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Arrow
        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px"
        aria-hidden="true"
      />
    </a>
  );
}
