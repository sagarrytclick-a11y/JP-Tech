export const site = {
  name: 'JP Technologies',
  tagline: 'Web Development & Social Media Marketing Agency',
  domain: 'jptechnologies.com',
  url: 'https://jptechnologies.com',
  founder: 'Abhishek Tiwari',
  email: 'Abhishek@vidyavriddhi.com',
  phone: '+91-9839865347',
  location: 'S0-2, Geniefolks Building (2nd Floor), Block A, Plot No. A-28, Sector 4, Noida, Uttar Pradesh - 201301',
  officeHours: 'Mon - Fri: 10:00 AM - 6:00 PM',
  description:
    'We build stunning websites and run data-driven social campaigns that turn visitors into loyal customers.',

  stats: {
    teamMembers: '60+',
    happyClients: '500+',
    projectsDelivered: '1000+',
    foundedYear: 2012,
    rating: '4.9/5',
  },

  social: {
    facebook: 'https://facebook.com/jptechnologies',
    instagram: 'https://instagram.com/jptechnologies',
    linkedin: 'https://linkedin.com/company/jptechnologies',
    twitter: 'https://x.com/jptechnologies',
  },

  emailFrom: 'JP Technologies <Abhishek@vidyavriddhi.com>',
  adminEmail: 'Abhishek@vidyavriddhi.com',

  team: [
    { name: 'Abhishek Tiwari', role: 'Founder & CEO', bio: 'Visionary leader with 12+ years in digital marketing and web development.' },
    { name: 'Gaurav Rathore', role: 'Lead Developer', bio: 'Full-stack expert specializing in React, Node.js, and scalable architectures.' },
    { name: 'Sagar Bisht', role: 'UI/UX Designer', bio: 'Creative designer crafting beautiful, user-centric digital experiences.' },
    { name: 'Alfaraz', role: 'Digital Marketing Head', bio: 'Data-driven strategist managing high-performance ad campaigns.' },
    { name: 'Siddhi Gupta', role: 'Social Media Manager', bio: 'Content expert who builds engaged communities across platforms.' },
    { name: 'Shubham', role: 'SEO Specialist', bio: 'Technical SEO guru driving organic growth for 100+ clients.' },
  ],

  faq: [
    { q: 'What services does JP Technologies offer?', a: 'We offer web development, social media marketing, SEO, Google Ads, logo design, graphic design, and more.' },
    { q: 'How much does a website cost?', a: 'Our website packages start at ₹5,999 (one-time) with no hidden fees.' },
    { q: 'Do you offer social media management?', a: 'Yes, our social media packages start at ₹1,999/month.' },
    { q: 'How long does it take to build a website?', a: 'Most websites are delivered within 7–14 business days.' },
    { q: 'Do you provide SEO services?', a: 'Yes, we offer on-page, off-page, and technical SEO to boost your rankings.' },
    { q: 'Can I customize my package?', a: 'Absolutely! We tailor every package to your specific business needs.' },
    { q: 'Do you work with clients outside India?', a: 'Yes, we serve clients globally with remote collaboration.' },
    { q: 'What platforms do you build websites on?', a: 'We use Next.js, React, WordPress, PHP, and modern stacks.' },
    { q: 'Is hosting included in your pricing?', a: 'Hosting is available as an add-on service at affordable rates.' },
    { q: 'How do I get started?', a: 'Click the "Get Started" button or fill out our enquiry form and we\'ll reach out within 24 hours.' },
  ],

  services: [
    { title: 'Web Design', icon: 'FaPalette' },
    { title: 'Web Development', icon: 'FaCode' },
    { title: 'Social Media Marketing', icon: 'FaShareAlt' },
    { title: 'Instagram Posts', icon: 'FaCamera' },
    { title: 'Graphics Work', icon: 'FaPaintBrush' },
    { title: 'SEO Optimization', icon: 'FaSearch' },
    { title: 'Google Ads', icon: 'FaGoogle' },
    { title: 'Logo Design', icon: 'FaPenFancy' },
  ],

  trustLine: {
    rating: '4.9/5',
    clients: '200+',
  },

  whyChooseUs: {
    title: 'Why Choose JP Technologies',
    description: 'JP Technologies is an excellent digital marketing agency that helps you achieve your business goals.',
  },

  callToAction: {
    tagline: '60+ Team Members • Award Winning Agency • Affordable Pricing Plan',
  },

  pricing: {
    website: { price: '₹5,999', label: 'One-Time', description: 'Professional website with 5 pages, responsive design, basic SEO' },
    socialMedia: { price: '₹1,999', label: '/month', description: 'Social media management, content creation, monthly reports' },
  },
} as const;

export type SiteConfig = typeof site;
