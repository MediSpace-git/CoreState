const CONSOLE_NAV = [
  { label: "Overview", active: true },
  { label: "Attendance", active: false },
  { label: "Location", active: false },
  { label: "Machine fleet", active: false },
  { label: "Customer leads", active: false },
  { label: "Expense claims", active: false },
] as const;

const CONSOLE_TILES = [
  {
    kicker: "Assets",
    title: "Contract health",
    tags: ["AMC / CMC coverage", "PM due and overdue"],
  },
  {
    kicker: "Workforce",
    title: "Live locations",
    tags: ["Engineers on duty", "Map + timeline"],
  },
  {
    kicker: "Field sales",
    title: "Sales leads",
    tags: ["New → Won pipeline", "Quote review"],
  },
  {
    kicker: "Operations",
    title: "Field performance",
    tags: ["Visits and services", "Attendance hours"],
  },
] as const;

const PHONE_ACTIONS = [
  { label: "My tasks", hint: "Assigned jobs" },
  { label: "Self-visit", hint: "Check in at site" },
  { label: "My leads", hint: "Pipeline on the route" },
  { label: "Expenses", hint: "Claim from the field" },
] as const;

export function ConsoleMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex h-full flex-col overflow-hidden border border-[var(--line)] bg-[var(--ink-elevated)] ${compact ? "min-h-0" : "min-h-[28rem]"}`}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-[var(--line)] px-4 py-2.5">
        <span className="size-1.5 rounded-full bg-[var(--paper)]/25" />
        <span className="size-1.5 rounded-full bg-[var(--paper)]/25" />
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] text-[var(--paper-muted)] uppercase">
          Prism console
        </span>
      </div>
      <div className="flex flex-wrap gap-2 border-b border-[var(--line)] px-4 py-3">
        {CONSOLE_NAV.map((item) => (
          <span
            key={item.label}
            className={`whitespace-nowrap px-2.5 py-1 text-[11px] ${
              item.active
                ? "bg-[var(--signal)] text-[var(--ink)]"
                : "text-[var(--paper-muted)]"
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-3 p-4">
        {CONSOLE_TILES.map((tile) => (
          <article
            key={tile.title}
            className="flex min-h-0 min-w-0 flex-col justify-center border border-[var(--line)] bg-[var(--ink)] px-4 py-4"
          >
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.14em] text-[var(--signal)] uppercase">
              {tile.kicker}
            </p>
            <h3 className="mt-1.5 text-[15px] leading-snug text-[var(--paper)]">{tile.title}</h3>
            <div className="mt-3 flex flex-col gap-1.5">
              {tile.tags.map((tag) => (
                <p
                  key={tag}
                  className="border-l border-[var(--signal)]/50 pl-2 text-[12px] leading-snug text-[var(--paper-muted)]"
                >
                  {tag}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function PhoneMockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex h-full w-full max-w-[260px] flex-col overflow-hidden border border-[var(--line)] bg-[var(--ink-elevated)] ${compact ? "min-h-0" : "min-h-[28rem]"}`}
      aria-hidden="true"
    >
      <div className="px-4 pt-4 pb-2">
        <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.16em] text-[var(--signal)] uppercase">
          Prism
        </p>
        <p className="mt-1 text-[15px] text-[var(--paper)]">Today</p>
      </div>
      <div className="mx-4 mb-2 flex flex-col items-center border border-[var(--line)] bg-[var(--ink)] px-4 py-4">
        <span className="flex size-14 items-center justify-center rounded-full border border-[var(--signal)] text-[10px] text-[var(--signal)]">
          Hold
        </span>
        <p className="mt-2 text-[13px] text-[var(--paper)]">Attendance</p>
        <p className="mt-0.5 text-[11px] text-[var(--paper-muted)]">Hold to punch in</p>
      </div>
      <ul className="flex min-h-0 flex-1 flex-col justify-evenly px-2 pb-2">
        {PHONE_ACTIONS.map((item) => (
          <li
            key={item.label}
            className="mx-2 border-b border-[var(--line)] px-2 py-2 last:border-0"
          >
            <p className="text-[13px] text-[var(--paper)]">{item.label}</p>
            <p className="mt-0.5 text-[11px] text-[var(--paper-muted)]">{item.hint}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProductStage({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`mx-auto grid h-full w-full max-w-[1100px] grid-cols-1 items-stretch gap-6 md:grid-cols-[minmax(0,1fr)_260px] ${compact ? "min-h-0" : "min-h-[28rem]"}`}
    >
      <ConsoleMockup compact={compact} />
      <div className="mx-auto h-full w-full max-w-[260px] md:mx-0">
        <PhoneMockup compact={compact} />
      </div>
    </div>
  );
}
