export const site = {
  name: 'JP Technology',
  legalName: 'JP Technology Private Limited',
  tagline: 'Web, CRM & App Development Company',
  url: 'https://jptechnology.com',
  email: 'Abhishek@vidyavriddhi.com',
  phone: '+91-9839865347',
  phoneHref: '+919839865347',
  address:
    'S0-2, Geniefolks Building (2nd Floor), Block A, Plot No. A-28, Sector 4, Noida, Uttar Pradesh - 201301',
  addressShort: 'Sector 4, Noida, Uttar Pradesh',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=Geniefolks+Building+Block+A+Plot+A-28+Sector+4+Noida',
  emailFrom: 'JP Technology <Abhishek@vidyavriddhi.com>',

  social: {
    linkedin: 'https://linkedin.com/company/jptechnology',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    {
      label: 'Services',
      href: '/services',
      children: [
        {
          label: 'Web Development',
          href: '/services/web-development',
          desc: 'Fast, SEO-ready sites and portals',
        },
        {
          label: 'CRM & Dashboards',
          href: '/services/crm-development',
          desc: 'Pipelines, routing and reporting',
        },
        {
          label: 'Mobile Apps',
          href: '/services/mobile-apps',
          desc: 'iOS, Android and field apps',
        },
        {
          label: 'SaaS Platforms',
          href: '/services/saas-development',
          desc: 'Subscriptions, roles and billing',
        },
        {
          label: 'Internal Tools',
          href: '/services/internal-tools',
          desc: 'Operations, inventory and approvals',
        },
        {
          label: 'All Services',
          href: '/services',
          desc: 'See how the pieces fit together',
        },
      ],
    },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Contact', href: '/contact' },
  ],

  services: [
    'Business Website',
    'Custom CRM & Dashboards',
    'Educational Platform',
    'Native & Mobile App',
    'SaaS Platform',
    'AI Agents & Automation',
    'E-Commerce',
    'Something Else',
  ],

  industries: [
    'Automotive',
    'Edtech',
    'Fintech',
    'Healthcare',
    'Real Estate',
    'E-commerce',
    'SaaS',
    'Manufacturing',
    'Logistics',
    'Professional Services',
    'Other',
  ],

  budgets: [
    '\u20b925,000 \u2013 \u20b950,000',
    '\u20b950,000 \u2013 \u20b91,50,000',
    '\u20b91,50,000 \u2013 \u20b95,00,000',
    '\u20b95,00,000 \u2013 \u20b915,00,000',
    '\u20b915,00,000+',
  ],

  faqs: [
    {
      q: 'What exactly does JP Technology build?',
      a: 'We build business websites, custom CRM systems and dashboards, educational platforms, native and cross-platform mobile apps, SaaS products, e-commerce storefronts, and AI-powered automations. Most clients start with one product and expand into a long-term build partnership.',
    },
    {
      q: 'How long does a typical project take?',
      a: 'A focused business website usually takes 3 to 6 weeks. A custom CRM or admin dashboard takes 6 to 12 weeks depending on integrations. Native apps and SaaS platforms typically run 3 to 6 months. You get a milestone plan before we start, so timelines are visible from day one.',
    },
    {
      q: 'How much does a project cost?',
      a: 'Websites start at \u20b99,999 for a launch page and \u20b919,999 for a complete business site. Custom CRMs start around \u20b939,999, and larger SaaS or native app builds are scoped individually. Every quote includes a fixed scope, payment milestones, and a clear list of what is included.',
    },
    {
      q: 'Do you work with existing codebases and teams?',
      a: 'Yes. We regularly join products mid-way, audit the existing stack, stabilise what is fragile, and then ship new features. We can work alongside your in-house team, take ownership of a module, or run the full delivery.',
    },
    {
      q: 'Who owns the code and design files?',
      a: 'You do. Once the final invoice is cleared, you get the repository, design files, environment documentation, and deployment access. There is no vendor lock-in and no hidden licence fee.',
    },
    {
      q: 'Can you connect payments, WhatsApp, ERP or other tools?',
      a: 'Yes. We integrate Razorpay, Stripe, WhatsApp Business, email platforms, ERPs, CRMs, accounting tools, logistics APIs, and custom internal systems. If an API exists, we can usually wire it into your product.',
    },
    {
      q: 'What happens after launch?',
      a: 'Every project includes a post-launch stabilisation window. After that you can move to a monthly care plan covering monitoring, security updates, backups, small improvements, and a monthly hours bucket for new work.',
    },
    {
      q: 'Why work with an agency instead of hiring developers?',
      a: 'Hiring gives you capacity but also recruitment, tooling, and management overhead. A senior agency team gives you product strategy, UI design, engineering, QA, and DevOps from week one, with a delivery process that is already running.',
    },
  ],
} as const;
