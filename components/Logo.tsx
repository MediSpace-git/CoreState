export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="20"
          height="20"
          stroke="currentColor"
          strokeOpacity="0.35"
        />
        <rect x="4" y="4" width="6" height="6" fill="currentColor" fillOpacity="0.85" />
        <rect x="12" y="12" width="6" height="6" fill="var(--accent)" />
        <path
          d="M10 7h5M7 10v5"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      </svg>
      <span className="font-[family-name:var(--font-display-face)] text-[16px] font-medium tracking-[-0.02em] text-fg">
        CoreState
      </span>
    </span>
  );
}
