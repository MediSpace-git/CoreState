import "./Logo.css";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`cs-logo${className ? ` ${className}` : ""}`}
      role="img"
      aria-label="CoreState AI"
    >
      <img
        src="/brand/corestateLogoLight.png"
        alt=""
        className="cs-logo-img cs-logo-img--light"
        width={650}
        height={179}
      />
      <img
        src="/brand/corestateLogoDark.png"
        alt=""
        className="cs-logo-img cs-logo-img--dark"
        width={582}
        height={160}
      />
    </span>
  );
}
