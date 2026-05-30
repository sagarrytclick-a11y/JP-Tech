"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FaCheckCircle, FaArrowRight, FaRocket, FaStar, FaUsers, FaWhatsapp, FaGlobe, FaChartLine, FaShieldAlt, FaHeadset } from "react-icons/fa";

const plans = [
  {
    name: "Website Package",
    price: "₹5,999",
    tag: "One-Time",
    icon: FaGlobe,
    popular: false,
    features: [
      "5-Page Responsive Website",
      "Mobile Optimized Design",
      "Basic SEO Setup",
      "Contact Form Integration",
      "Social Media Links",
      "Google Maps Integration",
      "WhatsApp Chat Button",
      "1 Month Free Hosting",
      "Free Domain (.com / .in)",
    ],
  },
  {
    name: "Social Media Package",
    price: "₹1,999",
    tag: "/month",
    icon: FaChartLine,
    popular: true,
    features: [
      "8-10 Posts per Month",
      "Professional Content Creation",
      "Hashtag Research & Strategy",
      "Engagement Monitoring",
      "Monthly Performance Report",
      "Competitor Analysis",
      "Profile Optimization",
      "Story & Reel Creation",
      "Dedicated Account Manager",
    ],
  },
  {
    name: "Combo Package",
    price: "₹6,999",
    tag: "/month",
    icon: FaStar,
    popular: false,
    features: [
      "Everything in Website Package",
      "Everything in Social Media Package",
      "Priority Support",
      "SEO Optimization",
      "Google My Business Setup",
      "Email Marketing Setup",
      "Bi-Weekly Strategy Calls",
      "Custom Analytics Dashboard",
      "24/7 Dedicated Support",
    ],
  },
  {
    name: "Enterprise Plan",
    price: "Custom",
    tag: "Contact Us",
    icon: FaRocket,
    popular: false,
    features: [
      "Custom Web Application",
      "Full Digital Marketing Suite",
      "Dedicated Development Team",
      "Advanced SEO & PPC Campaigns",
      "Brand Strategy & Consulting",
      "API Integrations",
      "Scalable Cloud Infrastructure",
      "Monthly Business Reviews",
      "White-Glove Support",
    ],
  },
];

const faqs = [
  { q: "Is there any setup fee?", a: "No hidden setup fees. The price you see is what you pay." },
  { q: "Can I upgrade my plan later?", a: "Yes, you can upgrade anytime. We'll prorate the difference." },
  { q: "Do you offer refunds?", a: "We offer a 7-day money-back guarantee on all packages." },
  { q: "How long does website delivery take?", a: "Standard websites are delivered within 7-14 business days." },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-[#0a2540] via-[#1e3a5a] to-[#0a2540] text-white px-6 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
            <span className="inline-block bg-amber-400/20 text-amber-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">Pricing</span>
            <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">Simple, Transparent <br/><span className="text-amber-400">Pricing</span></h1>
            <p className="text-zinc-300 mt-4 text-lg">No hidden fees. No surprises. Just results.</p>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="px-6 py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`bg-white rounded-3xl border p-6 sm:p-8 flex flex-col relative ${plan.popular ? 'border-amber-400 shadow-xl shadow-amber-200/30 scale-[1.02] lg:scale-105' : 'border-zinc-100 shadow-sm'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-zinc-900 text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <FaStar /> Most Popular
                  </div>
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${plan.popular ? 'bg-amber-400 text-zinc-900' : 'bg-[#1e3a5a] text-amber-400'}`}>
                  <plan.icon size={22} />
                </div>

                <h3 className="text-lg font-bold text-zinc-900">{plan.name}</h3>

                <div className="mt-4 mb-6">
                  <span className="text-4xl font-extrabold text-zinc-900">{plan.price}</span>
                  <span className="text-zinc-400 text-sm ml-1">{plan.tag}</span>
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-zinc-600">
                      <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('openPopupForm'))}
                  className={`mt-8 w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${plan.popular ? 'bg-[#1e3a5a] text-white hover:bg-[#152d45]' : 'bg-zinc-100 text-zinc-800 hover:bg-zinc-200'}`}
                >
                  Get Started <FaArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features Strip */}
        <section className="px-6 py-16 bg-white border-t border-zinc-100">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: FaShieldAlt, label: "No Hidden Charges", desc: "100% transparent pricing" },
              { icon: FaHeadset, label: "24/7 Support", desc: "We're always here to help" },
              { icon: FaUsers, label: "Dedicated Team", desc: "Get your own account manager" },
              { icon: FaWhatsapp, label: "WhatsApp Support", desc: "Quick responses via chat" },
            ].map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600"><feat.icon size={22} /></div>
                <h4 className="font-bold text-zinc-900 text-sm">{feat.label}</h4>
                <p className="text-zinc-500 text-xs">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 py-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-extrabold text-center text-zinc-900 mb-10">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl border border-zinc-100 p-6"
                >
                  <h3 className="font-bold text-zinc-900 mb-1">{faq.q}</h3>
                  <p className="text-zinc-500 text-sm">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-20 bg-[#1e3a5a] text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Still Have Questions?</h2>
            <p className="text-zinc-300 mb-8">Our team is ready to help you find the perfect plan.</p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('openPopupForm'))}
              className="bg-amber-400 text-zinc-900 px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center gap-2 mx-auto hover:bg-amber-500 transition-colors cursor-pointer"
            >
              Talk to Us <FaArrowRight />
            </button>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
