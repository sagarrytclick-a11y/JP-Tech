export type BlogPostView = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  tags: string[];
  coverTone: string;
  coverImage?: string;
  readTime: number;
  published: boolean;
  publishedAt: string;
  updatedAt?: string;
};

export const blogSeedPosts: BlogPostView[] = [
  {
    _id: "seed-business-website-cost",
    title: "What a business website should cost in 2026",
    slug: "business-website-cost-india-2026",
    excerpt:
      "A ₹9,999 site and a ₹1.5L site can both look fine on a laptop. The difference shows up in enquiries, speed, and how much time you spend fixing it.",
    content: `## The ₹9,999 question

Every week someone asks us whether a business website is really worth more than a few thousand rupees. The honest answer: it depends on the job the site is supposed to do.

A one-page launch site that explains what you sell can genuinely cost under ₹15,000. A site that has to rank, handle enquiries, integrate with a CRM, and represent a multi-location business is a different product.

## Three tiers, three jobs

- **Launch page (₹9,999–₹25,000):** one clear offer, a contact form, mobile-first design. Good for a new brand testing demand.
- **Business site (₹25,000–₹75,000):** 5–12 pages, service pages, blog, SEO foundations, analytics, and a proper enquiry flow.
- **Growth site (₹75,000+):** custom design, CMS, integrations, multi-language or multi-location, and conversion work tied to your sales process.

The mistake is buying the third tier when the first would do, or buying the first when your sales team needs the third.

## What drives the price

Design is only part of it. Most of the cost sits in the invisible work: content structure, page speed, responsive behaviour, accessibility, form validation, spam protection, analytics events, and the time spent reviewing copy with you.

Integrations add up too. Payment gateways, CRM sync, WhatsApp notifications, and booking calendars each need testing across real scenarios — not just the happy path.

## Red flags

Be careful when a quote has no page list, no revision limit, and no handover clause. Also ask who owns the hosting and domain. If the agency controls both and will not transfer them, you are renting your own website.

## A simple way to decide

Write down the one action you want a visitor to take. Then count how many pages are genuinely needed to get them there. That number, plus the integrations, is your real scope. Everything else is decoration.`,
    category: "Websites",
    author: "JP Technology Team",
    authorRole: "Product & engineering",
    tags: ["Websites", "Pricing", "SEO"],
    coverTone: "orange",
    readTime: 7,
    published: true,
    publishedAt: "2026-10-12T09:30:00.000Z",
  },
  {
    _id: "seed-crm-vs-off-the-shelf",
    title: "Custom CRM or off-the-shelf tool? Start with your sales flow",
    slug: "custom-crm-vs-off-the-shelf",
    excerpt:
      "Most teams do not need a bigger CRM. They need one that matches the way leads actually move through their business.",
    content: `## The spreadsheet phase is not a strategy

Almost every growing sales team starts in spreadsheets and WhatsApp. It works until two people update the same lead, a follow-up gets missed, or nobody can answer a simple question: how many deals are actually close to closing?

An off-the-shelf CRM can fix the basics. It becomes expensive when your process does not fit the tool's default pipeline.

## When off-the-shelf is enough

- Your sales process is standard and unlikely to change soon.
- You need something live this month.
- The team is small and one administrator can own the tool.
- Reporting needs are simple: stage, owner, value, next step.

## When custom starts to make sense

Custom becomes cheaper than forcing a tool when you need any of these:

- Multiple pipelines with different approval steps.
- Lead routing based on territory, product, or dealer.
- Quotes, inventory, or service tickets connected to the deal.
- WhatsApp or call records stitched into the timeline.
- Reports that combine sales with operations or finance data.

## The hidden cost of "we will customise it later"

Every workaround in an off-the-shelf CRM becomes a process your team has to remember. After a year, the tool is no longer a system — it is a collection of habits.

A custom CRM should not start with screens. It should start with a map of how a lead moves from first contact to money received. If that map is clear, the build is usually smaller than people expect.

## A practical middle path

Keep the tools that already work — email, accounting, WhatsApp — and build the layer that is specific to you: lead assignment, follow-up rules, and the dashboard your manager actually checks. Integrate instead of replacing everything.`,
    category: "CRM",
    author: "JP Technology Team",
    authorRole: "Product & engineering",
    tags: ["CRM", "Sales", "Operations"],
    coverTone: "blue",
    readTime: 6,
    published: true,
    publishedAt: "2026-10-02T08:15:00.000Z",
  },
  {
    _id: "seed-native-vs-cross-platform",
    title: "Native or cross-platform? A decision guide that skips the religion",
    slug: "native-vs-cross-platform-apps",
    excerpt:
      "The right answer depends on your users, your hardware needs, and how often you plan to ship. Here is the version without the framework wars.",
    content: `## Start with the constraints

The native-versus-cross-platform debate usually turns into a framework argument. For a business decision, start with three constraints instead: hardware access, release cadence, and team size.

If your app needs heavy camera processing, Bluetooth hardware, background location, or tight OS integration, native gives you fewer surprises. If it is a content, booking, or field-reporting app, cross-platform usually gets you there faster.

## Where cross-platform wins

- One codebase for iOS and Android.
- Faster first release and cheaper iteration.
- A shared design system across platforms.
- Over-the-air updates for JavaScript-based builds.

For most B2B and internal apps, this is the pragmatic default. React Native in particular is mature enough that users rarely notice the difference when the interface is designed well.

## Where native wins

- Camera, audio, or sensor-heavy products.
- Apps that must work smoothly on low-end or older devices.
- Deep OS features such as widgets, watch apps, or advanced background tasks.
- Products where performance itself is the differentiator.

## The question most teams forget

Who maintains this after launch? A cross-platform codebase is easier for a small team to own. Two native codebases need two sets of release processes, store reviews, and crash triage.

## Our default recommendation

Build the smallest useful version cross-platform. Measure how people use it. Go native only where the experience genuinely breaks — usually a specific feature, not the whole app. Rewriting everything because one screen needs native code is an expensive habit.`,
    category: "Mobile",
    author: "JP Technology Team",
    authorRole: "Product & engineering",
    tags: ["Mobile", "React Native", "Product"],
    coverTone: "violet",
    readTime: 6,
    published: true,
    publishedAt: "2026-09-24T10:00:00.000Z",
  },
  {
    _id: "seed-ai-agents-small-business",
    title: "Five AI workflows that are actually worth automating",
    slug: "ai-agents-small-business",
    excerpt:
      "Skip the chatbot demo. These are the repetitive workflows where AI saves real hours without adding risk to your operations.",
    content: `## Automate the boring middle

AI is most useful in the middle of a process: after a lead arrives, before a quote goes out, between a support message and a resolution. That is where people copy information from one place to another.

Here are five workflows we see working in real businesses.

## 1. Lead qualification and routing

A new enquiry is scored on budget, service, and location, then routed to the right owner with a short summary. The team still makes the call; they just do not spend ten minutes reading the form.

## 2. First-draft replies

Support and sales replies are drafted from your own documentation and past responses. A human approves before anything is sent. This is faster and safer than a fully autonomous chatbot.

## 3. Document extraction

Quotes, invoices, and application forms arrive as PDFs. AI extracts the fields, flags low-confidence values, and creates a review task instead of silently writing bad data.

## 4. Meeting notes into tasks

Calls are summarised into decisions, owners, and deadlines. The output goes to your project tool, not a document nobody opens.

## 5. Internal search

Your team asks a question in plain language and gets an answer with links to the source policy or record. This is often the highest-value first project because it removes repeated interruptions.

## Keep a human checkpoint

Every workflow above keeps a person in the loop for anything customer-facing or financially significant. The goal is not to remove judgement. It is to remove the copying, sorting, and rewriting that happens before judgement.`,
    category: "AI & Automation",
    author: "JP Technology Team",
    authorRole: "Product & engineering",
    tags: ["AI", "Automation", "Operations"],
    coverTone: "green",
    readTime: 5,
    published: true,
    publishedAt: "2026-09-15T07:45:00.000Z",
  },
  {
    _id: "seed-dashboards-team-uses",
    title: "Why your team ignores the dashboard you paid for",
    slug: "dashboards-your-team-will-use",
    excerpt:
      "A dashboard is not a wall of charts. It is a decision tool. If nobody opens it on Monday morning, the problem is the questions, not the colours.",
    content: `## Charts are not decisions

Most dashboards fail for a simple reason: they answer questions nobody is asking at 9am on a Monday. A screen full of numbers can be technically correct and still useless.

Start with the decisions your team makes every week. Then work backwards to the five numbers that change those decisions.

## A useful test

For every metric on the dashboard, ask:

- Who acts on this?
- What would they do differently if it moved?
- How often does it need to be seen?
- Where does the number come from, and can we trust it?

If a metric has no owner, it is decoration.

## Three layers that work

- **Now:** today's queue, overdue items, leads waiting for a response.
- **This week:** pipeline movement, open tickets, delivery risk.
- **This month:** trend, conversion, revenue, retention.

Most teams need the first layer far more than the third. Operational dashboards should feel like a to-do list with context.

## Make the number trustworthy

A dashboard that disagrees with the finance sheet will be abandoned. Define one source of truth per metric, document the calculation, and show the last-updated time. Small touches like these decide whether people trust the screen.

## Build less, observe more

Launch a small dashboard with five numbers. Watch which tabs people open. Add the next number only when someone asks for it. The best dashboards grow from use, not from a requirements document.`,
    category: "Product",
    author: "JP Technology Team",
    authorRole: "Product & engineering",
    tags: ["Dashboards", "Product", "Data"],
    coverTone: "amber",
    readTime: 5,
    published: true,
    publishedAt: "2026-09-04T11:20:00.000Z",
  },
  {
    _id: "seed-ecommerce-stack-d2c",
    title: "E-commerce stack decisions for small D2C brands",
    slug: "ecommerce-stack-decisions-d2c",
    excerpt:
      "Shopify, WooCommerce, or a custom storefront? The right choice depends less on features and more on how weird your operation is.",
    content: `## Start with operations, not the storefront

The storefront is the visible part. The expensive part is what happens after an order: inventory, packing, shipping, returns, and reconciliations.

Before choosing a platform, write down how an order actually moves through your business today. If the answer is "we will figure it out", the platform choice will not save you.

## When hosted commerce wins

- You want to launch quickly and sell standard products.
- You do not have a developer on the team.
- Apps cover your shipping, tax, and marketing needs.
- You would rather pay a subscription than own infrastructure.

Shopify is still the default for a reason. The ecosystem solves most common problems, and you can move on to selling instead of building.

## When WooCommerce makes sense

- Your content and store live together.
- You need custom pricing or B2B rules.
- You already run WordPress well.
- You want control over hosting and data.

The trade-off is maintenance. Plugins need updates, and performance depends heavily on hosting and discipline.

## When custom is justified

Custom storefronts make sense when the buying process is not a standard cart: configurable products, dealer pricing, quote-to-order, rental, or deep ERP integration. In those cases, forcing a standard platform creates workarounds that cost more every month.

## The unglamorous checklist

Whatever you choose, get these right before spending on design: clear product data, accurate stock, shipping rules that match reality, a returns policy, and order notifications that actually reach the customer.`,
    category: "E-commerce",
    author: "JP Technology Team",
    authorRole: "Product & engineering",
    tags: ["E-commerce", "D2C", "Operations"],
    coverTone: "slate",
    readTime: 6,
    published: true,
    publishedAt: "2026-08-22T09:00:00.000Z",
  },
];
