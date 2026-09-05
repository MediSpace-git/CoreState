"use client";

import { useRef } from "react";
import {
  ClipboardList,
  Contact,
  FileDown,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Table2,
  type LucideIcon,
} from "lucide-react";
import { ecosystemPhases } from "@/lib/data";
import { gsap, useGSAP, MOTION_OK, REDUCED } from "@/lib/gsap";

/* ---------------------------------------------------------------- */
/* Diagram geometry (viewBox 720 × 560)                              */
/* ---------------------------------------------------------------- */

const CENTER = { x: 360, y: 280 };

const TOOLS: { name: string; icon: LucideIcon }[] = [
  { name: "Spreadsheets", icon: Table2 },
  { name: "Email", icon: Mail },
  { name: "Legacy CRM", icon: Contact },
  { name: "Paper forms", icon: FileText },
  { name: "Phone calls", icon: Phone },
  { name: "CSV exports", icon: FileDown },
  { name: "Chat threads", icon: MessageSquare },
  { name: "Manual reports", icon: ClipboardList },
];

/** Final, orderly ring positions around the platform hub. */
const RING: [number, number][] = [
  [592, 280],
  [524, 158],
  [360, 108],
  [196, 158],
  [128, 280],
  [196, 402],
  [360, 452],
  [524, 402],
];

/** Chaotic starting positions for the fragmented phase. */
const SCATTER: [number, number][] = [
  [614, 200],
  [462, 76],
  [268, 58],
  [118, 128],
  [76, 330],
  [232, 486],
  [452, 508],
  [636, 442],
];

const SCATTER_ROT = [-7, 5, -4, 8, -6, 4, -9, 6];

/** Where each spoke line meets the hub boundary. */
function spokeEnd([x, y]: [number, number]): [number, number] {
  const dx = CENTER.x - x;
  const dy = CENTER.y - y;
  const len = Math.hypot(dx, dy);
  const stop = 92; // distance from center where the hub boundary sits
  return [CENTER.x - (dx / len) * stop, CENTER.y - (dy / len) * stop];
}

/** Start of each spoke, just outside the tool box. */
function spokeStart([x, y]: [number, number]): [number, number] {
  const dx = CENTER.x - x;
  const dy = CENTER.y - y;
  const len = Math.hypot(dx, dy);
  const gap = 60;
  return [x + (dx / len) * gap, y + (dy / len) * gap];
}

/* ---------------------------------------------------------------- */

export default function Ecosystem() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
          const desktop = window.matchMedia("(min-width: 1024px)").matches;
          const boxes = gsap.utils.toArray<SVGGElement>("[data-box]");
          const texts = gsap.utils.toArray<HTMLElement>("[data-phase-text]");
          const dots = gsap.utils.toArray<HTMLElement>("[data-phase-dot]");
          const spokes = gsap.utils.toArray<SVGLineElement>("[data-spoke]");
          const bars = gsap.utils.toArray<SVGRectElement>("[data-bar]");

          // Initial state: fragmented.
          boxes.forEach((box, i) => {
            gsap.set(box, {
              x: SCATTER[i][0] - RING[i][0],
              y: SCATTER[i][1] - RING[i][1],
              rotation: SCATTER_ROT[i],
              transformOrigin: "50% 50%",
            });
          });
          gsap.set(texts.slice(1), { autoAlpha: 0, y: 16 });
          gsap.set(dots.slice(1), { opacity: 0.35 });
          gsap.set("[data-hub]", { autoAlpha: 0, scale: 0.82, transformOrigin: "50% 50%" });
          gsap.set("[data-app]", { autoAlpha: 0, scale: 0.94, transformOrigin: "50% 50%" });
          gsap.set("[data-metrics]", { autoAlpha: 0, x: desktop ? 36 : 20 });
          gsap.set(spokes, { drawSVG: "0%" });
          gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: "[data-pin]",
              start: "top top",
              end: desktop ? "+=2800" : "+=2000",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          const swapText = (from: number, to: number) => {
            tl.to(texts[from], { autoAlpha: 0, y: -16, duration: 0.4 });
            tl.fromTo(
              texts[to],
              { autoAlpha: 0, y: 16 },
              { autoAlpha: 1, y: 0, duration: 0.4 },
              "<0.15"
            );
            tl.to(dots[from], { opacity: 0.35, duration: 0.3 }, "<");
            tl.to(dots[to], { opacity: 1, duration: 0.3 }, "<");
          };

          /* Phase 1 hold */
          tl.to({}, { duration: 0.5 });

          /* -> Phase 2: fragments connect into a system */
          swapText(0, 1);
          tl.to("[data-broken]", { autoAlpha: 0, duration: 0.4 }, "<");
          tl.to(
            boxes,
            { x: 0, y: 0, rotation: 0, duration: 1.1, stagger: 0.05 },
            "<"
          );
          tl.to("[data-hub]", { autoAlpha: 1, scale: 1, duration: 0.6 }, "-=0.45");
          tl.to(spokes, { drawSVG: "100%", duration: 0.55, stagger: 0.04 }, "<0.1");
          tl.to({}, { duration: 0.6 });

          /* -> Phase 3: the system becomes real software */
          swapText(1, 2);
          tl.to(
            ["[data-boxes]", "[data-spokes]"],
            { autoAlpha: 0, duration: 0.5 },
            "<"
          );
          tl.to("[data-hub]", { autoAlpha: 0, scale: 1.12, duration: 0.5 }, "<");
          tl.to("[data-app]", { autoAlpha: 1, scale: 1, duration: 0.7 }, "<0.2");
          tl.to({}, { duration: 0.6 });

          /* -> Phase 4: live operational visibility */
          swapText(2, 3);
          tl.to("[data-app]", { x: desktop ? -76 : -28, duration: 0.6 }, "<");
          tl.to("[data-metrics]", { autoAlpha: 1, x: 0, duration: 0.6 }, "<0.2");
          tl.to(bars, { scaleY: 1, duration: 0.5, stagger: 0.07 }, "<0.25");
          tl.fromTo(
            "[data-spark]",
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 0.7, ease: "power1.inOut" },
            "<"
          );
          tl.to({}, { duration: 0.8 });

          /* Progress rail tied to the whole timeline */
          tl.fromTo(
            "[data-progress]",
            { scaleY: 0 },
            { scaleY: 1, duration: tl.duration(), ease: "none" },
            0
          );
        }
      );

      mm.add(REDUCED, () => {
        gsap.set("[data-eco-phase]", { opacity: 1, y: 0 });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="bg-surface" aria-label="How one system replaces fragmented tools">
      {/* ------------------------------------------------------------ */}
      {/* Pinned scroll experience — desktop, motion allowed            */}
      {/* ------------------------------------------------------------ */}
      <div data-eco-pinned>
        <div data-pin className="flex h-svh items-center overflow-hidden bg-surface pt-16 lg:pt-0">
          <div className="container-x grid h-full w-full grid-cols-1 items-center gap-4 lg:grid-cols-12 lg:gap-8">
            {/* Left: narrative */}
            <div className="lg:col-span-4">
              <p className="section-label mb-0">
                The shift
              </p>
              <h2 className="text-h2 mt-3 font-semibold leading-[1.1] tracking-tight text-fg lg:mt-6">
                One system, end to end.
              </h2>

              <div className="mt-5 flex gap-4 lg:mt-10 lg:gap-6">
                <div className="relative w-px self-stretch bg-line" aria-hidden="true">
                  <span
                    data-progress
                    className="absolute inset-0 origin-top bg-fg/50"
                  />
                </div>
                <ol className="flex flex-wrap gap-x-4 gap-y-2 lg:block lg:space-y-4">
                  {ecosystemPhases.map((phase) => (
                    <li
                      key={phase.id}
                      data-phase-dot
                      className="text-xs text-fg lg:text-sm"
                    >
                      {phase.label}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Stacked phase descriptions */}
              <div className="relative mt-5 h-28 lg:mt-12 lg:h-44">
                {ecosystemPhases.map((phase) => (
                  <div
                    key={phase.id}
                    data-phase-text
                    className="absolute inset-0"
                  >
                    <h3 className="text-base font-semibold tracking-tight text-fg lg:text-xl">
                      {phase.title}
                    </h3>
                    <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted lg:mt-3 lg:text-sm">
                      {phase.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: evolving diagram */}
            <div className="min-h-0 lg:col-span-8">
              <svg
                viewBox="0 0 720 560"
                className="h-auto max-h-[38svh] w-full lg:max-h-none"
                aria-hidden="true"
                fontFamily="var(--font-mono-face), monospace"
              >
                {/* Broken, dashed connections of the fragmented phase */}
                <g
                  data-broken
                  stroke="var(--diagram)"
                  strokeWidth="1"
                  strokeDasharray="3 9"
                >
                  <line x1={SCATTER[1][0]} y1={SCATTER[1][1]} x2={SCATTER[2][0]} y2={SCATTER[2][1]} />
                  <line x1={SCATTER[3][0]} y1={SCATTER[3][1]} x2={SCATTER[4][0]} y2={SCATTER[4][1]} />
                  <line x1={SCATTER[5][0]} y1={SCATTER[5][1]} x2={SCATTER[6][0]} y2={SCATTER[6][1]} />
                  <line x1={SCATTER[0][0]} y1={SCATTER[0][1]} x2={SCATTER[7][0]} y2={SCATTER[7][1]} />
                </g>

                {/* Spokes into the hub */}
                <g data-spokes stroke="var(--diagram-strong)" strokeWidth="1">
                  {RING.map((point, i) => {
                    const [x1, y1] = spokeStart(point);
                    const [x2, y2] = spokeEnd(point);
                    return (
                      <line
                        key={i}
                        data-spoke
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                      />
                    );
                  })}
                </g>

                {/* Tool boxes */}
                <g data-boxes>
                  {RING.map(([x, y], i) => {
                    const Icon = TOOLS[i].icon;
                    return (
                      <g key={TOOLS[i].name} transform={`translate(${x}, ${y})`}>
                        <g data-box>
                          <rect
                            x="-50"
                            y="-28"
                            width="100"
                            height="56"
                            rx="2"
                            fill="var(--surface)"
                            stroke="var(--diagram-strong)"
                          />
                          <g transform="translate(-7, -18)">
                            <Icon
                              width={14}
                              height={14}
                              strokeWidth={1.75}
                              color="var(--muted)"
                              aria-hidden="true"
                            />
                          </g>
                          <text
                            y="14"
                            textAnchor="middle"
                            fontSize="10"
                            letterSpacing="0.08em"
                            fill="var(--muted)"
                          >
                            {TOOLS[i].name}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>

                {/* Platform hub */}
                <g data-hub>
                  <rect
                    x={CENTER.x - 80}
                    y={CENTER.y - 52}
                    width="160"
                    height="104"
                    rx="2"
                    fill="var(--raised)"
                    stroke="var(--accent)"
                    strokeOpacity="0.65"
                  />
                  <text
                    x={CENTER.x}
                    y={CENTER.y - 26}
                    textAnchor="middle"
                    fontSize="10"
                    letterSpacing="0.18em"
                    fill="var(--accent)"
                  >
                    PLATFORM
                  </text>
                  <rect x={CENTER.x - 56} y={CENTER.y - 8} width="112" height="5" rx="2.5" fill="var(--diagram-fill)" />
                  <rect x={CENTER.x - 56} y={CENTER.y + 8} width="84" height="5" rx="2.5" fill="var(--accent)" fillOpacity="0.55" />
                  <rect x={CENTER.x - 56} y={CENTER.y + 24} width="98" height="5" rx="2.5" fill="var(--diagram)" />
                </g>

                {/* Application window */}
                <g data-app>
                  <rect x="150" y="120" width="420" height="320" rx="3" fill="var(--surface)" stroke="var(--diagram)" />
                  <line x1="150" y1="154" x2="570" y2="154" stroke="var(--diagram)" />
                  <circle cx="170" cy="137" r="3.5" fill="var(--diagram-strong)" />
                  <circle cx="186" cy="137" r="3.5" fill="var(--diagram-strong)" />
                  <circle cx="202" cy="137" r="3.5" fill="var(--diagram-strong)" />
                  {/* sidebar */}
                  <line x1="262" y1="154" x2="262" y2="440" stroke="var(--diagram)" />
                  {[0, 1, 2, 3, 4].map((i) => (
                    <rect
                      key={i}
                      x="170"
                      y={178 + i * 26}
                      width={i === 0 ? 76 : 60}
                      height="6"
                      rx="3"
                      fill={i === 0 ? "var(--accent)" : "var(--diagram-fill)"}
                      fillOpacity={i === 0 ? 0.7 : 1}
                    />
                  ))}
                  {/* content rows */}
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <g key={i}>
                      <rect
                        x="282"
                        y={182 + i * 34}
                        width={[248, 200, 232, 176, 220, 190, 240][i]}
                        height="7"
                        rx="3.5"
                        fill="var(--diagram-fill)"
                      />
                      <circle
                        cx="558"
                        cy={185.5 + i * 34}
                        r="3"
                        fill={i % 3 === 0 ? "var(--accent)" : "var(--diagram)"}
                        fillOpacity={i % 3 === 0 ? 0.8 : 1}
                      />
                    </g>
                  ))}
                </g>

                {/* Live metrics panel */}
                <g data-metrics>
                  <rect x="520" y="150" width="180" height="260" rx="3" fill="var(--raised)" stroke="var(--diagram)" />
                  <text x="538" y="180" fontSize="10" letterSpacing="0.16em" fill="var(--muted)">
                    OPERATIONS
                  </text>
                  <circle cx="682" cy="176" r="3" fill="var(--accent)" />
                  {[
                    { x: 538, h: 62 },
                    { x: 576, h: 96 },
                    { x: 614, h: 52 },
                    { x: 652, h: 118 },
                  ].map((bar) => (
                    <rect
                      key={bar.x}
                      data-bar
                      x={bar.x}
                      y={330 - bar.h}
                      width="22"
                      height={bar.h}
                      fill="var(--accent)"
                      fillOpacity="0.5"
                    />
                  ))}
                  <line x1="538" y1="330" x2="674" y2="330" stroke="var(--diagram)" />
                  <path
                    data-spark
                    d="M538 384 L560 372 L582 378 L604 360 L626 366 L648 350 L674 356"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Static fallback — small screens or reduced motion             */}
      {/* ------------------------------------------------------------ */}
      <div data-eco-static className="hidden">
        <div className="container-x section-y">
          <p className="section-label">
            The shift
          </p>
          <h2 className="text-h2 mt-4 font-semibold tracking-tight text-fg">
            One system, end to end.
          </h2>

          <ol className="mt-8 border-l border-line pl-5">
            {ecosystemPhases.map((phase) => (
              <li key={phase.id} data-eco-phase className="relative pb-7 last:pb-0">
                <div>
                  <p className="section-label">
                    {phase.label}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg">
                    {phase.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-muted">
                    {phase.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
