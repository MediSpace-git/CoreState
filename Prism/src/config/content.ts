import type { PrismProps } from "@prism/components/effects/prism";

export const siteConfig = {
  name: "Prism",
  company: "MediVast Solutions",
  productLine: "Field operations platform",
  tagline: "Run field service and field sales from one system.",
  description:
    "Prism is a field-operations system for equipment-service companies. Engineers work from a phone. Operations and finance work from a console. Each company is an isolated tenant.",
} as const;

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  return "http://localhost:3000";
}

export const companyContact = {
  email: "info@medivastsolutions.com",
  phone: "+91 9116117302",
  phoneHref: "tel:+919116117302",
  address:
    "151 Ground Floor, Road No 01, Shanti Nagar, Near CK Birla Hospital, Jaipur, Rajasthan, India 302018",
  region: "India",
} as const;

export const siteBasePath = "/prism";

export const routes = {
  home: siteBasePath,
  product: `${siteBasePath}/product`,
  fieldOperations: `${siteBasePath}/product/field-operations`,
  workforce: `${siteBasePath}/product/workforce`,
  assets: `${siteBasePath}/product/assets`,
  fieldSales: `${siteBasePath}/product/field-sales`,
  security: `${siteBasePath}/security`,
  requestDemo: `${siteBasePath}/request-demo`,
  contact: `${siteBasePath}/contact`,
  privacy: `${siteBasePath}/privacy`,
  terms: `${siteBasePath}/terms`,
} as const;

export const navLinks = [
  { label: "Product", href: routes.product },
  { label: "Field operations", href: routes.fieldOperations },
  { label: "Workforce", href: routes.workforce },
  { label: "Assets", href: routes.assets },
  { label: "Field sales", href: routes.fieldSales },
  { label: "Security", href: routes.security },
] as const;

export const footerNav = [
  { label: "Product", href: routes.product },
  { label: "Request a demo", href: routes.requestDemo },
  { label: "Contact", href: routes.contact },
  { label: "Privacy", href: routes.privacy },
  { label: "Terms", href: routes.terms },
] as const;

export const heroContent = {
  eyebrow: siteConfig.productLine,
  headline: siteConfig.tagline,
  description:
    "Attendance, jobs, install-base contracts, and quotes — one tenant-isolated workflow. A phone for the route. A console for HQ.",
  primaryCta: { label: "Request a demo", href: routes.requestDemo },
  secondaryCta: { label: "See how it works", href: `${siteBasePath}/#workflow` },
} as const;

export const heroPrismProps: PrismProps = {
  animationType: "rotate",
  timeScale: 0.5,
  height: 3.5,
  baseWidth: 5.5,
  scale: 3.6,
  hueShift: 0,
  colorFrequency: 1,
  noise: 0.18,
  glow: 1,
  bloom: 1,
  transparent: true,
  suspendWhenOffscreen: true,
  pauseWhenScrolling: false,
  quality: "medium",
};

export const trustContent = {
  id: "trust",
  kicker: "Who it is for",
  title: "Built for equipment-service teams.",
  body: "Medical, diagnostic, and lab equipment distributors and service organizations. Same product for every tenant — your data, branding, and team stay inside your company.",
  models: [
    {
      title: "Shared SaaS",
      body: "One platform, isolated tenant data. Fastest way for a service company to go live.",
    },
    {
      title: "White-label app",
      body: "The same engine under your store listing and icon when you need your own APK.",
    },
    {
      title: "Roles that match the work",
      body: "Engineers in the field. Admins on mobile and web. Finance on expenses, attendance, and the map.",
    },
  ],
} as const;

export const problemContent = {
  id: "problem",
  kicker: "The problem",
  title: "Jobs in WhatsApp. The install base in a spreadsheet.",
  body: "When attendance, assignments, contract dates, and site visits live in different places, HQ cannot see who is working, which machine is due, or whether a visit became a sale.",
  points: [
    {
      title: "No proof of the field day",
      body: "Punch times and location stay in chat screenshots — if they are captured at all.",
    },
    {
      title: "Paper close-out",
      body: "Service notes, photos, and signatures do not become a single report.",
    },
    {
      title: "Sales after the visit",
      body: "A site stop that could have been a lead waits until someone is back at a desk.",
    },
  ],
} as const;

export const surfacesContent = {
  id: "surfaces",
  kicker: "Two surfaces",
  title: "A phone for the field. A console for HQ.",
  mobile: {
    title: "Mobile app",
    audience: "Engineers and field admins",
    items: [
      "Hold-to-punch attendance and travel history",
      "Assigned jobs, service timer, forms, photos, signatures",
      "Self-visit check-in, leads, and machine quotes",
      "Expense claims from the route",
      "Assign and unassign jobs from the admin tab",
    ],
  },
  admin: {
    title: "Web console",
    audience: "Operations, finance, and tenant admins",
    items: [
      "Live engineer map and attendance monitor",
      "Machine fleet, serial search, and contract health",
      "Sales pipeline and quote review",
      "Expense review for finance",
      "Company branding, team logins, and channel settings",
    ],
  },
} as const;

export const capabilitiesContent = {
  id: "capabilities",
  kicker: "Capabilities",
  title: "What Prism actually does.",
  items: [
    {
      href: routes.fieldOperations,
      title: "Field operations",
      body: "Customer requests arrive on WhatsApp or a QR form. Admins assign from the mobile console. Engineers close with a timer, form, photos, and a signed PDF.",
    },
    {
      href: routes.workforce,
      title: "Workforce",
      body: "GPS hold-to-punch, location while punched in, travel history, and structured expense claims with a finance review path.",
    },
    {
      href: routes.assets,
      title: "Assets",
      body: "One install base: serials, sites, placements, QR labels, and PM / CMC / AMC due dates that can open service tickets.",
    },
    {
      href: routes.fieldSales,
      title: "Field sales",
      body: "Check in at a site, capture a lead, record competitor equipment, and send a machine quote with GST from the same visit.",
    },
  ],
} as const;

export const workflowContent = {
  id: "workflow",
  kicker: "How it works",
  title: "From request to a closed record.",
  steps: [
    {
      title: "Request arrives",
      body: "A customer raises a job on WhatsApp or the public QR form. It lands in the same request queue.",
    },
    {
      title: "Admin assigns",
      body: "A tenant admin assigns an engineer from the mobile console — date, machine, and site included.",
    },
    {
      title: "Engineer visits",
      body: "The engineer punches in, travels, starts the service timer, or checks in on a self-visit.",
    },
    {
      title: "Close or sell",
      body: "Submit a signed report, or capture a lead and quote. HQ sees the outcome on the console.",
    },
  ],
} as const;

export const platformContent = {
  id: "platform",
  kicker: "Platform",
  title: "Each company is a tenant.",
  body: "Logins, machines, visits, and reports stay inside that tenant. Emails and PDFs use the company’s name and logo. WhatsApp, email, and push are the channels Prism already uses — not a marketplace of third-party CRMs.",
  items: [
    {
      title: "Isolated data",
      body: "Tenant scope comes from the signed-in session, not from a value the client picks.",
    },
    {
      title: "Roles",
      body: "Engineer, admin, and finance. Superadmin manages tenants for the platform operator.",
    },
    {
      title: "Branded output",
      body: "Service reports, quotes, and mail use that tenant’s company profile.",
    },
  ],
} as const;

export const ctaContent = {
  id: "start",
  kicker: "Next step",
  title: "See Prism with your own jobs and machines.",
  subtitle:
    "Request a walkthrough. We will use the same mobile app and console your team would use.",
  cta: { label: "Request a demo", href: routes.requestDemo },
  footer: `${siteConfig.company} · ${siteConfig.name}`,
} as const;

export const productOverview = {
  title: "The Prism product",
  description:
    "Prism is the name of the field-operations product — mobile app plus web console — for equipment-service companies.",
  hero: {
    eyebrow: "Product",
    title: "One system for the route and for HQ.",
    body: "Engineers punch, visit, service, and quote from the phone. Admins and finance use the console for the map, fleet, pipeline, and claims. Customers do not need an account.",
  },
  pillars: [
    {
      title: "Field operations",
      href: routes.fieldOperations,
      body: "Intake, assignment, digital close-out.",
    },
    {
      title: "Workforce",
      href: routes.workforce,
      body: "Attendance, location, expenses.",
    },
    {
      title: "Assets",
      href: routes.assets,
      body: "Install base and contract dates.",
    },
    {
      title: "Field sales",
      href: routes.fieldSales,
      body: "Self-visit, leads, quotes.",
    },
  ],
} as const;

export const fieldOperationsPage = {
  title: "Field operations",
  description:
    "Turn a customer request into a signed service record without leaving Prism.",
  hero: {
    eyebrow: "Field operations",
    title: "From WhatsApp or QR to a signed report.",
    body: "Customers raise jobs without installing an app. Your admin assigns on mobile. The engineer closes with time on site, photos, signatures, and a PDF.",
  },
  features: [
    {
      title: "Request intake",
      body: "WhatsApp Flow and a public QR web form both create a service request on the same machine.",
    },
    {
      title: "Assignment",
      body: "Tenant admins assign and unassign engineers from the mobile admin console, with notifications to the field.",
    },
    {
      title: "Time on the job",
      body: "A service timer with start, pause, and stop — one active timer per engineer.",
    },
    {
      title: "Digital close-out",
      body: "Dynamic forms for service, PM, installation, and visit reports, plus photos and signatures.",
    },
    {
      title: "History as PDF",
      body: "Completed work is available as a downloadable service report for HQ and the customer email path.",
    },
    {
      title: "Training certificates",
      body: "Engineers can issue a branded training certificate using the tenant stamp and partner logo.",
    },
  ],
  workflow: [
    "Request arrives on WhatsApp or the QR form",
    "Admin assigns an engineer on mobile",
    "Engineer starts the timer and completes the form",
    "PDF report is stored in history",
  ],
  note: "Job assignment is on the mobile admin console today. The web service-request screen is not the dispatch tool.",
} as const;

export const workforcePage = {
  title: "Workforce",
  description:
    "See who punched in, where they went while on duty, and what they claimed.",
  hero: {
    eyebrow: "Workforce",
    title: "Proof of the field day — not a chat screenshot.",
    body: "Engineers hold-to-punch with GPS. While punched in, Prism records location on an interval so HQ can see the map and reconstruct a route. Expenses follow a review path for finance.",
  },
  features: [
    {
      title: "Hold-to-punch attendance",
      body: "Punch in and out with location and address. Duplicate punch-in is blocked. Hours are calculated for the day.",
    },
    {
      title: "Field map",
      body: "Admins and finance can open a live map of engineers who are sharing location, plus a movement timeline.",
    },
    {
      title: "Travel history",
      body: "An engineer can open their own route. Admins can review travel against the attendance day.",
    },
    {
      title: "Reminders and auto punch-out",
      body: "Scheduled reminders during the workday, and an automatic punch-out if someone forgets at the configured hour.",
    },
    {
      title: "Expense claims",
      body: "Travel, hotel and food, daily allowance, and other line items with attachments. Finance and admin review, approve, or reject.",
    },
    {
      title: "Monthly attendance proof",
      body: "Calendar and export paths so HQ has a record beyond the live map.",
    },
  ],
  workflow: [
    "Engineer hold-to-punches in the morning",
    "Location updates while they are on duty",
    "Jobs and self-visits happen during the day",
    "Punch out — or the system closes the day — and claims go to finance",
  ],
  note: "Location is recorded on an interval while the engineer is punched in. It is not a continuous video-like GPS stream.",
} as const;

export const assetsPage = {
  title: "Assets",
  description:
    "One install base for serials, sites, and PM / CMC / AMC dates.",
  hero: {
    eyebrow: "Assets",
    title: "Know what is installed — and when it is due.",
    body: "Prism keeps machines, placements, and contract dates in one registry. Due PM, CMC, or AMC can create service tickets and an email digest for the tenant.",
  },
  features: [
    {
      title: "Machine registry",
      body: "Serial, model, site, account, status, and installation date — searchable on web and mobile.",
    },
    {
      title: "Sites and placements",
      body: "Machines sit at customer sites with placement history, not a single static row.",
    },
    {
      title: "Contract health",
      body: "The admin overview shows AMC / CMC coverage and PM due, overdue, and unknown counts.",
    },
    {
      title: "Scheduled tickets",
      body: "A daily job can open PM / CMC / AMC work from due dates, with an optional digest to ops email.",
    },
    {
      title: "QR labels",
      body: "Admins can print a QR sticker sheet for a machine. Customers can also open a QR request form.",
    },
    {
      title: "Product catalog",
      body: "Each tenant configures the machine models and sales products their field team picks from.",
    },
  ],
  workflow: [
    "Register or look up a machine by serial",
    "Keep site and contract dates on the record",
    "Due dates create tickets when the tenant enables it",
    "Service history stays on that machine",
  ],
  note: "Engineers look up machines by serial. QR is used for labels and customer request intake — not as an in-app camera scanner.",
} as const;

export const fieldSalesPage = {
  title: "Field sales",
  description:
    "A site visit can close a service or open a deal.",
  hero: {
    eyebrow: "Field sales",
    title: "Sell from the same stop.",
    body: "Engineers check in at a site, capture a lead, record competitor equipment on the floor, and request a machine quote. Admins run the pipeline and approve quotes.",
  },
  features: [
    {
      title: "Self-visit check-in",
      body: "GPS check-in with an arrival photo, then a hub for service, lead, machine, or competitor equipment.",
    },
    {
      title: "Lead capture",
      body: "Contact, products of interest, existing equipment, and notes — from a visit or a prospect registration.",
    },
    {
      title: "Pipeline",
      body: "Admin board with stages from New through Qualified, Proposal, Negotiation, Won, or Lost.",
    },
    {
      title: "Machine quotes",
      body: "Engineer drafts a quote from the lead. Admin approves. PDF uses tenant GST, bank, and stamp settings.",
    },
    {
      title: "Competitor survey",
      body: "Record what else is installed at the site while the engineer is there.",
    },
    {
      title: "Check-out",
      body: "Close the visit with location and a record of what was done — service, lead, or both.",
    },
  ],
  workflow: [
    "Punch in, then check in at the site",
    "Choose service, lead, machine, or competitor capture",
    "Submit a quote for admin approval when needed",
    "Check out — HQ sees the lead on the board",
  ],
  note: "Prism is not a generic CRM. Leads and quotes are tied to field visits and the install base.",
} as const;

export const securityPage = {
  title: "Security and tenancy",
  description:
    "How Prism keeps each company’s data and team in their own tenant.",
  hero: {
    eyebrow: "Security",
    title: "Your company is a tenant — not a shared inbox.",
    body: "Prism is multi-tenant. After sign-in, every query is scoped to that company. We do not ask the app to “pick a tenant” for authorization.",
  },
  features: [
    {
      title: "Session-scoped tenant",
      body: "The signed token carries tenant context. Protected APIs reject requests that lack it.",
    },
    {
      title: "Role gates",
      body: "Engineer, admin, and finance see different consoles. Superadmin is reserved for platform tenant management.",
    },
    {
      title: "Engineer sessions",
      body: "A field login is one active session. A new device replaces the previous one. Admins can force logout.",
    },
    {
      title: "Admin and finance sessions",
      body: "Web roles may keep more than one session so HQ is not locked to a single browser.",
    },
    {
      title: "Branded, not leaked",
      body: "Emails and PDFs render that tenant’s company profile. Another tenant’s machines and claims are not on the same screen.",
    },
    {
      title: "Channels you configure",
      body: "WhatsApp number, mail sender, and intake QR destination are set per tenant — optional, not assumed.",
    },
  ],
  workflow: [
    "User signs in with company credentials",
    "Session establishes tenant and role",
    "Mobile and console only load that tenant’s records",
    "Output (mail, PDF, quotes) uses that tenant’s brand",
  ],
  note: "Prism does not publish SOC, ISO, or HIPAA badges on this site because those certifications are not claimed in the product.",
} as const;

export const demoPage = {
  title: "Request a demo",
  description: "See Prism on the same app and console your team would use.",
  hero: {
    eyebrow: "Demo",
    title: "Walk through Prism with your field work in mind.",
    body: "Tell us about your team. We will show attendance, a job close-out, the install base, and a field lead — not a slide deck of features we do not ship.",
  },
} as const;

export const contactPage = {
  title: "Contact",
  description: `Talk to ${siteConfig.company} about Prism.`,
} as const;

export const privacyPage = {
  title: "Privacy",
  updated: "29 August 2026",
} as const;

export const termsPage = {
  title: "Terms of use",
  updated: "29 August 2026",
} as const;
