export type ServicePageData = {
  slug: string;
  eyebrow: string;
  title: string;
  highlight: string;
  summary: string;
  description: string;
  stats: { value: string; label: string }[];
  features: { title: string; copy: string }[];
  symptoms: string[];
  outcomes: string[];
  process: { title: string; copy: string }[];
  stack: string[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string; copy: string }[];
};

export const servicePages: ServicePageData[] = [
  {
    slug: "web-development",
    eyebrow: "Web development",
    title: "Websites that look sharp and",
    highlight: "work hard",
    summary:
      "Business websites, marketing sites, portals, and e-commerce builds that load fast, rank well, and turn attention into enquiries.",
    description:
      "We design and build the website your business actually needs — not a template with your logo dropped in. Every page is planned around a job: explain the offer, answer the objection, or start a conversation. Then we engineer it for speed, search, accessibility, and easy editing after launch.",
    stats: [
      { value: "3–6", label: "weeks for a focused build" },
      { value: "95+", label: "typical Lighthouse target" },
      { value: "100%", label: "code and design ownership" },
    ],
    features: [
      {
        title: "Business & marketing sites",
        copy: "Home, services, work, about, and contact pages with a clear content structure and a conversion path on every screen.",
      },
      {
        title: "Customer & partner portals",
        copy: "Authenticated dashboards, document downloads, order tracking, and role-based access without bolting on a second product.",
      },
      {
        title: "E-commerce",
        copy: "Product catalogues, variants, checkout, payments, shipping rules, and an admin flow your team can actually run.",
      },
      {
        title: "SEO foundations",
        copy: "Semantic markup, metadata, sitemaps, schema, internal linking, and page-speed work built in from the first commit.",
      },
      {
        title: "CMS & editing",
        copy: "A simple admin for pages, posts, case studies, and images — so routine updates do not become a developer ticket.",
      },
      {
        title: "Integrations",
        copy: "CRM, WhatsApp, email, analytics, payments, calendars, and internal APIs connected and tested end to end.",
      },
    ],
    symptoms: [
      "Your current site looks dated on mobile and loads slowly.",
      "Enquiries arrive by phone only because the contact flow is hidden.",
      "Marketing cannot publish a page without asking a developer.",
      "The site has traffic, but no clear story about what you sell.",
      "You are expanding to new services and the current structure cannot hold them.",
    ],
    outcomes: [
      "A page structure mapped to how customers evaluate you.",
      "A responsive build tested at 390, 768, and 1440 pixels.",
      "Core Web Vitals and SEO checks before launch.",
      "An editor for the content your team changes often.",
      "Analytics events for calls, forms, and quote requests.",
      "A handover with repository, hosting, and deployment notes.",
    ],
    process: [
      {
        title: "Scope & sitemap",
        copy: "We agree on the pages, the primary action, and what is explicitly out of scope before design starts.",
      },
      {
        title: "Design direction",
        copy: "A small set of key screens establishes the visual system, then we extend it across the full page list.",
      },
      {
        title: "Build & content",
        copy: "Responsive development, CMS setup, integrations, and real copy placed into real layouts.",
      },
      {
        title: "Launch & handover",
        copy: "QA across devices, analytics, redirects, search setup, and a walkthrough for your team.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
      "Sanity / Strapi",
      "Razorpay",
      "Stripe",
      "Vercel",
      "Cloudflare",
    ],
    faqs: [
      {
        q: "Can you redesign an existing site without losing rankings?",
        a: "Yes. We audit the current URLs and rankings, keep or redirect what matters, and move the content into the new structure with a redirect map before launch.",
      },
      {
        q: "Do you write the content too?",
        a: "We can. Most projects include content structuring and editing. Full copywriting is scoped separately, but we will not launch placeholder text.",
      },
      {
        q: "Who owns the website after launch?",
        a: "You do. The repository, design files, domain, hosting, and analytics accounts are transferred or handed over once the final invoice clears.",
      },
      {
        q: "Can you work with our existing brand guidelines?",
        a: "Absolutely. We can extend your brand into a web system, or create a focused visual direction for the site if the guidelines are still evolving.",
      },
    ],
    related: [
      {
        label: "CRM & dashboards",
        href: "/services/crm-development",
        copy: "Connect the website to a sales process your team can run.",
      },
      {
        label: "Internal tools",
        href: "/services/internal-tools",
        copy: "Replace spreadsheets with a system built around your workflow.",
      },
      {
        label: "All services",
        href: "/services",
        copy: "See how the pieces fit together.",
      },
    ],
  },
  {
    slug: "crm-development",
    eyebrow: "CRM & dashboards",
    title: "A CRM that matches",
    highlight: "how you sell",
    summary:
      "Custom pipelines, lead routing, follow-ups, reporting, and dashboards for teams that have outgrown spreadsheets and generic tools.",
    description:
      "Off-the-shelf CRMs assume one way of selling. We build around yours: how leads arrive, who owns them, what happens next, and which numbers leadership actually checks. The result is a system your team uses because it removes work, not because management insists.",
    stats: [
      { value: "6–12", label: "weeks for a focused CRM" },
      { value: "1", label: "source of truth for leads" },
      { value: "0", label: "spreadsheets after handover" },
    ],
    features: [
      {
        title: "Lead capture & routing",
        copy: "Website forms, calls, WhatsApp, and CSV imports flow into one inbox with territory, product, or owner rules.",
      },
      {
        title: "Pipelines & stages",
        copy: "Multiple pipelines, custom stages, required fields, and next-step rules that reflect the real sales motion.",
      },
      {
        title: "Follow-ups & tasks",
        copy: "Reminders, call outcomes, activity timelines, and escalation rules so a lead never goes cold silently.",
      },
      {
        title: "Quotes & approvals",
        copy: "Line items, discounts, approval chains, PDF quotes, and a clean handoff to accounts once a deal closes.",
      },
      {
        title: "Reporting",
        copy: "Source, stage, owner, conversion, and revenue views with filters that answer the questions asked in reviews.",
      },
      {
        title: "Roles & audit",
        copy: "Granular permissions, field-level visibility, activity logs, and exports that respect who should see what.",
      },
    ],
    symptoms: [
      "Two people update the same lead and nobody knows which version is current.",
      "Follow-ups live in personal reminders, notebooks, and WhatsApp.",
      "Leadership cannot answer how many deals are close to closing.",
      "Your team pays for a CRM but still keeps a spreadsheet beside it.",
      "Approvals happen over email and the quote version is unclear.",
    ],
    outcomes: [
      "A lead-to-cash map agreed with the people who do the work.",
      "One timeline per customer across calls, email, notes, and files.",
      "Dashboards built around weekly review questions.",
      "Owner, stage, and next-step rules enforced by the system.",
      "Import of existing leads and a clean cutover plan.",
      "Training and a short admin guide for the team.",
    ],
    process: [
      {
        title: "Workflow workshop",
        copy: "We map how a lead moves today, where it stalls, and which exceptions the system must support.",
      },
      {
        title: "Data model",
        copy: "Leads, companies, contacts, deals, activities, and permissions are designed before screens.",
      },
      {
        title: "Build in slices",
        copy: "Capture and pipeline first, then reporting, quotes, and integrations. You see a working system early.",
      },
      {
        title: "Migrate & train",
        copy: "We clean the existing data, migrate it, run the team through real scenarios, and stay close after go-live.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "WhatsApp Business",
      "Razorpay",
      "Nodemailer",
      "AWS",
    ],
    faqs: [
      {
        q: "Should we buy a CRM or build one?",
        a: "If your process is standard and simple, buy. If lead routing, approvals, or reporting are specific to your business, a custom layer usually pays for itself. We will tell you honestly which side you are on.",
      },
      {
        q: "Can it work with our existing tools?",
        a: "Yes. We integrate email, WhatsApp, accounting, ERP, inventory, telephony, and payment systems where APIs or exports exist.",
      },
      {
        q: "How do you handle our old data?",
        a: "We profile the existing files, clean duplicates and missing fields, map them to the new model, and run a dry migration before the real cutover.",
      },
      {
        q: "What happens when the team grows?",
        a: "Roles, teams, territories, and approval limits are designed as data, not hard-coded screens, so changes do not require a rebuild.",
      },
    ],
    related: [
      {
        label: "Web development",
        href: "/services/web-development",
        copy: "Feed the website's enquiries into the right pipeline.",
      },
      {
        label: "Internal tools",
        href: "/services/internal-tools",
        copy: "Connect operations, inventory, and finance to the same system.",
      },
      {
        label: "All services",
        href: "/services",
        copy: "See how the pieces fit together.",
      },
    ],
  },
  {
    slug: "mobile-apps",
    eyebrow: "Mobile apps",
    title: "Apps for customers and",
    highlight: "field teams",
    summary:
      "Native and cross-platform apps with offline support, notifications, clean UX, and the backend needed to run them.",
    description:
      "A mobile app only earns its place if it does something the website cannot: work offline, use the camera, track location, send push notifications, or fit into a technician's day. We start with that job, then build the smallest product that does it well.",
    stats: [
      { value: "8–16", label: "weeks for a first release" },
      { value: "iOS + Android", label: "from one codebase" },
      { value: "Offline", label: "first where it matters" },
    ],
    features: [
      {
        title: "Customer apps",
        copy: "Accounts, catalogues, orders, bookings, payments, support, and notifications in a focused mobile experience.",
      },
      {
        title: "Field operations",
        copy: "Job lists, checklists, photos, signatures, location, and sync that survives patchy networks.",
      },
      {
        title: "Offline-first data",
        copy: "Local storage, conflict handling, and background sync so the app keeps working when the signal does not.",
      },
      {
        title: "Push & in-app messaging",
        copy: "Targeted notifications, delivery tracking, and in-app updates that do not require a store release.",
      },
      {
        title: "Backend & admin",
        copy: "APIs, authentication, file storage, queues, and an admin panel to run the product behind the app.",
      },
      {
        title: "Store readiness",
        copy: "App icons, screenshots, privacy details, review notes, and a release checklist for both stores.",
      },
    ],
    symptoms: [
      "Field staff send photos and updates through WhatsApp with no record.",
      "Customers cannot track an order or booking without calling.",
      "Your web app is unusable on a phone in the field.",
      "A critical workflow stops when the network drops.",
      "You need camera, location, or push features a website cannot provide.",
    ],
    outcomes: [
      "A clear mobile-only job, not a shrunken website.",
      "A working build on real devices early in the project.",
      "Offline and sync behaviour tested against real scenarios.",
      "Push notification flows and opt-in handling.",
      "An admin view of the data the app creates.",
      "Store submission support and a post-launch update plan.",
    ],
    process: [
      {
        title: "Job & platform",
        copy: "We agree on the one job the app owns, then choose native or cross-platform based on hardware and release needs.",
      },
      {
        title: "Prototype",
        copy: "Key flows are clickable and tested with real users before the full build.",
      },
      {
        title: "Build & device QA",
        copy: "Features ship in slices, tested on low-end Android devices as well as recent iPhones.",
      },
      {
        title: "Release & iterate",
        copy: "Store submission, crash monitoring, analytics, and a short cycle for the first round of fixes.",
      },
    ],
    stack: [
      "React Native",
      "Expo",
      "Swift",
      "Kotlin",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "Firebase",
      "S3",
      "Sentry",
    ],
    faqs: [
      {
        q: "Native or cross-platform?",
        a: "Cross-platform is usually right for business apps, booking, field work, and content. Native makes sense for heavy camera, Bluetooth, background location, or performance-critical UI.",
      },
      {
        q: "Do we need a separate backend?",
        a: "Usually yes, even if it is small. The app needs auth, storage, notifications, and sync logic that should not live only on the device.",
      },
      {
        q: "Can you update the app without store approval?",
        a: "Some content and configuration can be updated remotely. Code changes still need a store release, so we design for fewer forced updates.",
      },
      {
        q: "How do you test offline behaviour?",
        a: "We test with throttled and disabled networks, interrupted syncs, duplicate submissions, and conflicting edits — not just airplane mode once.",
      },
    ],
    related: [
      {
        label: "SaaS platforms",
        href: "/services/saas-development",
        copy: "Turn the app into a subscription product with billing and roles.",
      },
      {
        label: "CRM & dashboards",
        href: "/services/crm-development",
        copy: "Give the office a live view of what the field team is doing.",
      },
      {
        label: "All services",
        href: "/services",
        copy: "See how the pieces fit together.",
      },
    ],
  },
  {
    slug: "saas-development",
    eyebrow: "SaaS platforms",
    title: "Multi-tenant products built to",
    highlight: "grow",
    summary:
      "Subscriptions, roles, onboarding, billing, and admin controls for founders turning a workflow into a product.",
    description:
      "A SaaS product is more than a web app with a login. Tenants need isolation, plans need enforcement, admins need visibility, and onboarding has to work without a demo call. We build the product layer properly so growth does not become a rewrite.",
    stats: [
      { value: "12–24", label: "weeks for a first release" },
      { value: "Multi-tenant", label: "architecture from day one" },
      { value: "Usage-ready", label: "billing and limits" },
    ],
    features: [
      {
        title: "Tenant architecture",
        copy: "Workspaces, invitations, roles, and data isolation designed into the schema rather than added later.",
      },
      {
        title: "Subscriptions & billing",
        copy: "Plans, trials, upgrades, invoices, dunning, and usage limits connected to Razorpay or Stripe.",
      },
      {
        title: "Onboarding",
        copy: "Self-serve signup, guided setup, sample data, and activation events that show where users drop off.",
      },
      {
        title: "Admin console",
        copy: "Customer health, plan changes, support notes, feature flags, and audit tools for your internal team.",
      },
      {
        title: "APIs & webhooks",
        copy: "Public or partner APIs with keys, rate limits, documentation, and retry-safe webhook delivery.",
      },
      {
        title: "Analytics & reliability",
        copy: "Product events, usage dashboards, error monitoring, backups, and a deployment pipeline from day one.",
      },
    ],
    symptoms: [
      "Every new customer needs a manual setup call.",
      "Billing is tracked in a spreadsheet beside the product.",
      "Admins cannot see which accounts are active or stuck.",
      "Plan limits are enforced by trust rather than code.",
      "The codebase assumes one customer and is now serving ten.",
    ],
    outcomes: [
      "A tenant model and permission matrix agreed before build.",
      "A self-serve path from signup to first useful action.",
      "Billing tied to plans, not manual reminders.",
      "An internal console for support and account health.",
      "Monitoring, backups, and a repeatable deploy process.",
      "A product backlog ordered by activation and retention.",
    ],
    process: [
      {
        title: "Product definition",
        copy: "We narrow the first release to one customer segment and one job worth paying for.",
      },
      {
        title: "Architecture",
        copy: "Tenancy, roles, billing, and data flows are designed together so the platform can hold the roadmap.",
      },
      {
        title: "Build the core",
        copy: "Onboarding, the main workflow, and billing ship first; secondary features follow after real usage.",
      },
      {
        title: "Launch & learn",
        copy: "Analytics, support tooling, and a short iteration cycle around activation and churn.",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Stripe",
      "Razorpay",
      "AWS",
      "Vercel",
    ],
    faqs: [
      {
        q: "Can you join an existing SaaS codebase?",
        a: "Yes. We start with an architecture and delivery audit, stabilise the risky parts, and then work through the roadmap in agreed slices.",
      },
      {
        q: "How do you decide what goes into v1?",
        a: "We start from the activation path: what a new customer must do to get value. Everything that does not support that path waits.",
      },
      {
        q: "Do you handle compliance?",
        a: "We build the technical controls for access, audit, encryption, and data handling. Formal legal or certification work is handled with your compliance partner.",
      },
      {
        q: "What does support look like after launch?",
        a: "We offer a stabilisation window and an optional monthly plan covering monitoring, security updates, small improvements, and a support channel.",
      },
    ],
    related: [
      {
        label: "CRM & dashboards",
        href: "/services/crm-development",
        copy: "The internal console your support and sales teams need.",
      },
      {
        label: "Mobile apps",
        href: "/services/mobile-apps",
        copy: "Meet users where they already work.",
      },
      {
        label: "All services",
        href: "/services",
        copy: "See how the pieces fit together.",
      },
    ],
  },
  {
    slug: "internal-tools",
    eyebrow: "Internal tools",
    title: "Replace the spreadsheet with a system that",
    highlight: "fits",
    summary:
      "Operations, inventory, HR, finance, and approval tools built around the way your team already works.",
    description:
      "Internal tools are where good companies quietly lose hours. A custom operations app does not need to be enormous: it needs the right fields, the right permissions, and one place where the current state of work is obvious. We build the layer that connects your existing tools instead of replacing everything.",
    stats: [
      { value: "4–10", label: "weeks for a focused tool" },
      { value: "1", label: "place to see current state" },
      { value: "Less", label: "copy-paste between tools" },
    ],
    features: [
      {
        title: "Operations & inventory",
        copy: "Stock, movements, purchase orders, vendors, and low-stock alerts in one auditable flow.",
      },
      {
        title: "Approvals & requests",
        copy: "Leave, expense, purchase, and discount approvals with the right chain and a visible status.",
      },
      {
        title: "Field & service jobs",
        copy: "Job assignment, checklists, photos, signatures, and completion reports for on-ground teams.",
      },
      {
        title: "HR & onboarding",
        copy: "Employee records, documents, onboarding steps, and reminders without another spreadsheet.",
      },
      {
        title: "Reports that matter",
        copy: "Daily and weekly views built around decisions, not a generic chart library.",
      },
      {
        title: "Integrations",
        copy: "Accounting, email, WhatsApp, payroll, and Excel imports connected where the data already lives.",
      },
    ],
    symptoms: [
      "A critical process lives in a spreadsheet only one person understands.",
      "Approvals get lost in email or WhatsApp threads.",
      "The same data is typed into three different tools.",
      "Nobody can tell the current status of a request without asking.",
      "Reports take a day to prepare every week.",
    ],
    outcomes: [
      "A process map with the exceptions, not just the happy path.",
      "One current-state view for the team and leadership.",
      "Permissions that match who can see and change what.",
      "Imports from the spreadsheets you already have.",
      "Exports and reports without manual formatting.",
      "A short guide and training session for the team.",
    ],
    process: [
      {
        title: "Observe the process",
        copy: "We walk through the current workflow with the people who run it, including the workarounds.",
      },
      {
        title: "Design the state",
        copy: "We agree on what one record looks like, who can change it, and what 'done' means.",
      },
      {
        title: "Build the core",
        copy: "The main flow ships first, with imports and reports close behind.",
      },
      {
        title: "Roll out",
        copy: "We run a pilot with one team, fix the gaps, then move the rest of the company over.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Excel / CSV",
      "Google Workspace",
      "WhatsApp Business",
      "AWS",
    ],
    faqs: [
      {
        q: "Isn't this what Notion or Airtable is for?",
        a: "Those tools are great for early structure. A custom tool makes sense when permissions, validation, integrations, or volume make a flexible document hard to trust.",
      },
      {
        q: "Can you improve a spreadsheet instead?",
        a: "Sometimes yes. We will tell you if a better spreadsheet or an existing tool is enough. Building software only makes sense when it removes real recurring work.",
      },
      {
        q: "How do you avoid building too much?",
        a: "We pick one process with a measurable cost, ship it, and only expand after the team is using it. The first release is deliberately small.",
      },
      {
        q: "Can it sit beside our accounting software?",
        a: "Yes. We integrate through APIs or scheduled imports and keep the accounting system as the source of truth where that is the right boundary.",
      },
    ],
    related: [
      {
        label: "CRM & dashboards",
        href: "/services/crm-development",
        copy: "Connect sales to the rest of the operation.",
      },
      {
        label: "Web development",
        href: "/services/web-development",
        copy: "Give customers a clean front door to the business.",
      },
      {
        label: "All services",
        href: "/services",
        copy: "See how the pieces fit together.",
      },
    ],
  },
];

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
