"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight, FaLaptopCode, FaInstagram } from 'react-icons/fa';

const packages = [
  {
    name: "Website Development",
    price: "₹5,999",
    period: "",
    desc: "Professional, responsive website built with modern tech. One-time payment — no hidden charges.",
    features: [
      "Custom Website Design",
      "Mobile Responsive Layout",
      "Up to 5 Pages",
      "Contact Form Integration",
      "Basic SEO Setup",
      "Social Media Links Integration",
      "Google Maps Embed",
      "Fast Loading & Optimized",
      "Free Hosting for 1 Year",
      "Free Domain (.com, .in, .org)",
    ],
    icon: FaLaptopCode,
    popular: true,
  },
  {
    name: "Social Media Management",
    price: "₹1,999",
    period: "/month",
    desc: "LinkedIn + Instagram handled end-to-end. Monthly engagement that drives real results.",
    features: [
      "LinkedIn Profile Management",
      "Instagram Profile Management",
      "8-10 Posts Per Month (Both Platforms)",
      "Professional Content Creation",
      "Hashtag & Keyword Research",
      "Engagement Monitoring",
      "Monthly Performance Report",
      "Competitor Analysis",
      "Direct Message Management",
      "Growth Strategy Consultation",
    ],
    icon: FaInstagram,
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-20 bg-zinc-50 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-500 font-semibold tracking-wider text-sm">Transparent Pricing</p>
          <h2 className="text-4xl font-extrabold text-zinc-900 mt-2">Simple, Honest Pricing</h2>
          <p className="text-zinc-600 mt-4 max-w-2xl mx-auto">
            No hidden fees. No long-term contracts. Just clear, upfront pricing for the services you need.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              className={`relative bg-white rounded-2xl border-2 p-8 flex flex-col ${pkg.popular ? 'border-amber-400 shadow-xl' : 'border-zinc-100 shadow-sm'}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-zinc-900 text-xs font-bold px-4 py-1 rounded-full">
                  Best Seller
                </div>
              )}
              <div className="w-14 h-14 bg-[#1e3a5a] rounded-2xl flex items-center justify-center text-amber-400 text-2xl mb-4">
                <pkg.icon />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">{pkg.name}</h3>
              <div className="mt-4 mb-2">
                <span className="text-5xl font-extrabold text-zinc-900">{pkg.price}</span>
                <span className="text-zinc-500 text-sm ml-1">{pkg.period}</span>
              </div>
              <p className="text-zinc-500 text-sm mb-6">{pkg.desc}</p>
              <div className="border-t border-zinc-100 pt-4 mb-6">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">What&apos;s Included</p>
                <ul className="space-y-3 flex-1">
                  {pkg.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-zinc-700">
                      <FaCheck className="text-green-500 mt-0.5 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openPopupForm'))}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm bg-[#1e3a5a] text-white hover:bg-[#152d45] transition-colors mt-auto"
              >
                Get Started <FaArrowRight />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
