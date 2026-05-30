"use client";
import Header from "@/components/Header";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  FaCode, FaSearch, FaShareAlt, FaBullhorn, FaThumbsUp, FaPaintBrush, 
  FaArrowRight, FaRocket, FaCheckCircle, FaStar, FaChartLine, FaCogs,
  FaMobileAlt, FaPalette, FaPenFancy, FaGoogle, FaFacebook, FaInstagram,
  FaLinkedinIn, FaTachometerAlt, FaShieldAlt, FaSyncAlt, FaUsers, FaFileAlt,
  FaCamera, FaPlayCircle, FaHashtag, FaRegLightbulb, FaLayerGroup, FaServer,
  FaDatabase, FaCloud, FaShoppingCart, FaEnvelope, FaHeadset
} from "react-icons/fa";
import { site } from "@/lib/site";

const services = [
  {
    icon: FaCode,
    title: "Website Development",
    tagline: "Fast, scalable, SEO-optimized websites that convert visitors into customers.",
    details: [
      "Custom React / Next.js websites",
      "PHP / Laravel web applications",
      "E-commerce solutions (Shopify, WooCommerce, Custom)",
      "API development & integration",
      "Progressive Web Apps (PWA)",
      "Payment gateway integration",
    ],
    tools: ["Next.js", "React", "Node.js", "PHP", "Laravel", "MongoDB"],
  },
  {
    icon: FaPaintBrush,
    title: "Web Design",
    tagline: "Modern UI/UX that captivates your audience and drives conversions.",
    details: [
      "Custom UI/UX design tailored to your brand",
      "Wireframing & prototyping",
      "Responsive mobile-first design",
      "Landing page optimization",
      "Design system creation",
      "A/B testing & iteration",
    ],
    tools: ["Figma", "Adobe XD", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: FaSearch,
    title: "SEO Optimization",
    tagline: "Dominate search rankings with white-hat SEO that delivers lasting results.",
    details: [
      "Comprehensive website SEO audit",
      "On-page optimization & keyword strategy",
      "Technical SEO & site structure",
      "Local SEO & Google My Business",
      "Link building & off-page SEO",
      "Monthly ranking reports",
    ],
    tools: ["Google Search Console", "Ahrefs", "SEMrush", "Google Analytics"],
  },
  {
    icon: FaShareAlt,
    title: "Social Media Marketing",
    tagline: "Data-driven content strategies that grow your brand across every platform.",
    details: [
      "Instagram profile management & growth",
      "LinkedIn networking & content strategy",
      "Facebook page management & ads",
      "8-10 high-quality posts per month",
      "Hashtag & trend research",
      "Monthly performance analytics",
    ],
    tools: ["Meta Business Suite", "LinkedIn Campaign Manager", "Canva", "Buffer"],
  },
  {
    icon: FaBullhorn,
    title: "PPC & Google Ads",
    tagline: "High-ROI ad campaigns engineered to bring you qualified leads fast.",
    details: [
      "Google Search & Display ads",
      "Meta Ads (Facebook & Instagram)",
      "LinkedIn advertising campaigns",
      "Keyword research & negative keyword targeting",
      "A/B ad creative testing",
      "Real-time performance dashboard",
    ],
    tools: ["Google Ads", "Meta Ads Manager", "LinkedIn Ads", "Google Tag Manager"],
  },
  {
    icon: FaChartLine,
    title: "Social Media Optimization",
    tagline: "Fine-tune your profiles for maximum engagement and community growth.",
    details: [
      "Profile audit & optimization",
      "Content calendar planning",
      "Engagement rate improvement",
      "Community management",
      "Influencer outreach support",
      "Competitor analysis",
    ],
    tools: ["Hootsuite", "Later", "Google Trends", "Social Blade"],
  },
  {
    icon: FaCamera,
    title: "Content Creation & Graphics",
    tagline: "Eye-catching visuals and copy that tell your brand's story.",
    details: [
      "Social media graphics & carousels",
      "Logo & brand identity design",
      "Video editing & short-form content",
      "Copywriting & captions",
      "Infographic design",
      "Presentation decks",
    ],
    tools: ["Photoshop", "Illustrator", "Premiere Pro", "Canva"],
  },
  {
    icon: FaShoppingCart,
    title: "E-Commerce Solutions",
    tagline: "Complete online stores that look great and sell even better.",
    details: [
      "Custom e-commerce website development",
      "Product catalog management",
      "Shopping cart & checkout optimization",
      "Payment & shipping integration",
      "Inventory management setup",
      "Conversion rate optimization",
    ],
    tools: ["Shopify", "WooCommerce", "Stripe", "Razorpay"],
  },
];

const stats = [
  { icon: FaRocket, value: "120+", label: "Websites Launched" },
  { icon: FaUsers, value: "200+", label: "Happy Clients" },
  { icon: FaChartLine, value: "300%", label: "Avg. ROI Delivered" },
  { icon: FaStar, value: "4.9/5", label: "Client Satisfaction" },
];

const processSteps = [
  { step: "01", title: "Discovery Call", desc: "We learn about your business, goals, and vision. No assumptions — just deep understanding.", color: "from-[#1e3a5a] to-[#2a4f7a]" },
  { step: "02", title: "Strategy & Proposal", desc: "We create a detailed roadmap with timelines, deliverables, and transparent pricing.", color: "from-[#1e3a5a] to-[#3b6a9a]" },
  { step: "03", title: "Design & Development", desc: "Our team builds your website or campaign with regular updates and feedback loops.", color: "from-amber-500 to-amber-600" },
  { step: "04", title: "Launch & Optimize", desc: "We deploy, monitor, and continuously optimize for the best possible results.", color: "from-green-500 to-green-600" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0a2540] via-[#1e3a5a] to-[#0a2540] text-white px-6 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <motion.div
            className="max-w-4xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-amber-400/20 text-amber-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">Everything You Need</span>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">Complete Digital<br/>Solutions for Your Business</h1>
            <p className="text-zinc-300 mt-6 text-lg max-w-2xl mx-auto">
              From stunning websites to powerful marketing campaigns — we deliver end-to-end digital services that drive measurable growth.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-400 text-zinc-900 px-8 py-4 rounded-xl font-bold text-lg mt-8 hover:bg-amber-300 transition-colors">
                Start Your Project <FaRocket />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Bar */}
        <section className="bg-white border-b border-zinc-100 px-6 py-10">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <s.icon className="text-amber-500 text-2xl mx-auto mb-2" />
                <div className="text-3xl font-extrabold text-zinc-900">{s.value}</div>
                <div className="text-sm text-zinc-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-amber-500 font-semibold tracking-wider text-sm">What We Offer</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-2">Services Designed for Results</h2>
              <p className="text-zinc-600 mt-4 max-w-2xl mx-auto">Every service is backed by proven processes, modern tools, and a team that knows exactly what they&apos;re doing.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((s, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="p-8">
                    <div className="flex items-start gap-5">
                      <div className="w-14 h-14 bg-[#1e3a5a] rounded-xl flex items-center justify-center text-amber-400 text-2xl shrink-0 group-hover:bg-amber-400 group-hover:text-[#1e3a5a] transition-all duration-300">
                        <s.icon />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-zinc-900 mb-1">{s.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{s.tagline}</p>
                      </div>
                    </div>

                    <div className="mt-6 grid sm:grid-cols-2 gap-2.5">
                      {s.details.map((d, j) => (
                        <div key={j} className="flex items-start gap-2 text-sm text-zinc-700">
                          <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                          {d}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-zinc-100">
                      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">Tools & Technologies</p>
                      <div className="flex flex-wrap gap-2">
                        {s.tools.map((tool, j) => (
                          <span key={j} className="px-3 py-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-full">{tool}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How We Deliver Process */}
        <section className="bg-white px-6 py-20 border-t border-zinc-100">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-amber-500 font-semibold tracking-wider text-sm">Our Process</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-2">How We Deliver Excellence</h2>
              <p className="text-zinc-600 mt-4 max-w-2xl mx-auto">A proven 4-step process that ensures timely delivery, transparent communication, and outstanding results.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
              {processSteps.map((p, i) => (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${p.color} text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg`}>
                    {p.step}
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900 text-center">{p.title}</h3>
                  <p className="text-zinc-500 text-sm mt-2 text-center leading-relaxed">{p.desc}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-3 w-6 h-px bg-amber-300" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Trust Us */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-amber-500 font-semibold tracking-wider text-sm">Why {site.name}</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-2">We Don&apos;t Just Build — We Deliver Results</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: FaUsers, title: "60+ Expert Team", desc: "Developers, designers, strategists, and marketers working as one unit for your success." },
                { icon: FaFileAlt, title: "Transparent Reporting", desc: "Weekly updates, monthly reports, and real-time dashboards — you always know where things stand." },
                { icon: FaSyncAlt, title: "Agile Approach", desc: "We work in sprints with regular check-ins so you stay involved and informed at every stage." },
                { icon: FaShieldAlt, title: "Data-Driven Decisions", desc: "Every strategy is backed by analytics. We don't guess — we measure, optimize, and scale." },
                { icon: FaTachometerAlt, title: "Fast Turnaround", desc: "Standard websites in 7-10 days. Campaign results visible within the first month." },
                { icon: FaHeadset, title: "Dedicated Support", desc: "You get a dedicated project manager and 24/7 support — no chatbots, real humans." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -3 }}
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 text-xl mb-4 group-hover:bg-[#1e3a5a] group-hover:text-amber-400 transition-all">
                    <item.icon />
                  </div>
                  <h3 className="font-bold text-zinc-900 mb-2">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
