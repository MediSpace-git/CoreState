/**
 * Site content lives here so sections stay data-driven.
 * Add a new product, solution, or industry by adding an object —
 * no component changes required.
 */

export const site = {
  name: "CoreState",
  tagline: "Software products & solutions",
  // TODO: replace with real contact details when available.
  // Fields left null are not rendered anywhere on the site.
  contact: {
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
    linkedin: null as string | null,
  },
};

export const nav = [
  { label: "Company", href: "/#company" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Products", href: "/#products" },
  { label: "Industries", href: "/#industries" },
  { label: "Contact", href: "/#contact" },
];

export type Product = {
  name: string;
  category: string;
  description: string;
  /** Product site path (internal) or external URL. */
  url: string | null;
  /** Open the product site in a new browser tab. */
  newTab?: boolean;
  facets: string[];
  /** Optional marketing poster shown in the product stage. */
  poster?: string;
};

export const products: Product[] = [
  {
    name: "Prism",
    category: "Field-operations platform",
    description:
      "Field-operations platform for equipment-service companies across medical, diagnostic, and laboratory environments.",
    facets: ["Service workflows", "Field teams", "Equipment lifecycle"],
    poster: "/products/prism-poster.jpg",
    url: "/prism",
    newTab: true,
  },
];

export const capabilities = [
  {
    index: "01",
    title: "Product Engineering",
    description:
      "Designing and building software products that are meant to be owned, operated, and improved for years.",
    icon: "Boxes",
  },
  {
    index: "02",
    title: "Custom Software",
    description:
      "Software shaped around a specific business and its workflows — not the other way around.",
    icon: "Wrench",
  },
  {
    index: "03",
    title: "Web Applications",
    description:
      "Modern web platforms for teams, customers, and day-to-day operations.",
    icon: "AppWindow",
  },
  {
    index: "04",
    title: "Mobile Applications",
    description:
      "Mobile experiences for employees, customers, and field teams who work away from a desk.",
    icon: "Smartphone",
  },
  {
    index: "05",
    title: "Business Systems",
    description:
      "Connected systems for workflows, records, operations, and reporting.",
    icon: "Network",
  },
  {
    index: "06",
    title: "Digital Transformation",
    description:
      "Replacing manual or fragmented processes with software that fits how the work is actually done.",
    icon: "Workflow",
  },
];

export const solutions = [
  {
    name: "Operations",
    description: "Systems that track work, assets, and field activity as it happens.",
  },
  {
    name: "Automation",
    description: "Removing repetitive manual steps from daily processes.",
  },
  {
    name: "Workforce",
    description: "Scheduling, dispatch, and coordination across distributed teams.",
  },
  {
    name: "Data Management",
    description: "One reliable source for records that currently live in many places.",
  },
  {
    name: "Business Intelligence",
    description: "Reporting and visibility built into the workflow, not bolted on.",
  },
  {
    name: "Customer Management",
    description: "Accounts, history, and communication kept in one place.",
  },
  {
    name: "Asset Management",
    description: "Equipment tracked through its full service lifecycle.",
  },
  {
    name: "Workflow Management",
    description: "Informal processes turned into structured, traceable steps.",
  },
];

export const industries = [
  {
    name: "Healthcare",
    note: "Software that respects clinical environments: careful data handling, clear audit trails, and interfaces that work under pressure.",
    signals: ["Patient-adjacent workflows", "Audit trails", "Data sensitivity"],
  },
  {
    name: "Medical Equipment",
    note: "Systems for the companies that install, service, and maintain the machines healthcare depends on.",
    signals: ["Install base records", "Service history", "Compliance documentation"],
  },
  {
    name: "Diagnostics & Laboratories",
    note: "Operational software for environments where uptime, traceability, and precision are non-negotiable.",
    signals: ["Uptime tracking", "Calibration cycles", "Traceability"],
  },
  {
    name: "Field-Service Businesses",
    note: "Tools for teams whose work happens on-site: scheduling, dispatch, job records, and reporting from the field.",
    signals: ["Dispatch & routing", "Mobile job records", "On-site reporting"],
  },
  {
    name: "Enterprise Operations",
    note: "Internal platforms that connect departments, standardize processes, and give leadership a live view of the operation.",
    signals: ["Cross-team workflows", "Process standardization", "Live visibility"],
  },
];

export const whyUs = [
  {
    title: "We understand the workflow",
    description:
      "Software is designed around actual business processes — the way work is really done, including the exceptions.",
  },
  {
    title: "Product mindset",
    description:
      "We build systems that can evolve, not temporary solutions that get replaced in two years.",
  },
  {
    title: "Engineering first",
    description:
      "Architecture, reliability, performance, and maintainability are treated as features, not afterthoughts.",
  },
  {
    title: "Connected systems",
    description:
      "People, data, operations, and applications brought together instead of another disconnected tool.",
  },
  {
    title: "Built to evolve",
    description:
      "Every system is structured to support future products, more users, and new workflows.",
  },
];

export const ecosystemPhases = [
  {
    id: "fragmented",
    label: "Problem",
    title: "Fragmented workflow",
    description:
      "Work lives in spreadsheets, inboxes, and disconnected tools. Every handoff is manual. Nobody sees the whole picture.",
  },
  {
    id: "connected",
    label: "System",
    title: "Connected system",
    description:
      "A single platform brings people, data, and processes into one place, with clear ownership of every record.",
  },
  {
    id: "software",
    label: "Software",
    title: "Modern software",
    description:
      "Teams work in fast, purpose-built applications on web and mobile — designed around the job, not the database.",
  },
  {
    id: "visibility",
    label: "Outcome",
    title: "Operational visibility",
    description:
      "The state of the operation is visible in real time — not reconstructed at month-end from six exports.",
  },
];
