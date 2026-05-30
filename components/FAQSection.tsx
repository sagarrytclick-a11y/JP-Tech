"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle, FaHeadset } from 'react-icons/fa';
import Link from 'next/link';

const faqs = [
  {
    q: "What services does JP Technologies offer?",
    a: "We specialize in web development (React, Next.js, PHP, Laravel, Node.js) and social media management (LinkedIn, Instagram, Facebook). From custom websites to full digital marketing campaigns, we handle your entire online presence.",
  },
  {
    q: "How long does it take to build a website?",
    a: "A standard 5-page website typically takes 7-10 business days. More complex projects like web applications or e-commerce sites may take 3-6 weeks depending on requirements. We always provide a timeline estimate before starting.",
  },
  {
    q: "What is the pricing model for social media management?",
    a: "Our social media management starts at ₹1,999/month for LinkedIn and Instagram. This includes 8-10 posts per month, content creation, hashtag research, engagement monitoring, and a monthly performance report.",
  },
  {
    q: "Do you provide hosting and domain services?",
    a: "Yes! Every website we build comes with free hosting for the first year and a free domain (.com, .in, or .org). After the first year, hosting can be renewed at nominal rates. We also provide SSL certificates and security monitoring.",
  },
  {
    q: "Can I update the website content myself after it's built?",
    a: "Absolutely. We build websites with easy-to-use content management systems or provide you with a simple guide to make updates. For clients who prefer hands-off management, we also offer maintenance packages starting at ₹999/month.",
  },
  {
    q: "Do you work with clients outside India?",
    a: "Yes, we work with clients globally. Our team collaborates remotely using modern tools, and we schedule calls to accommodate different time zones. Distance is never a barrier to great work.",
  },
  {
    q: "What is the refund or revision policy?",
    a: "We offer up to 2 rounds of revisions on design and development work. Refund requests are handled on a case-by-case basis depending on the project stage. We aim for 100% satisfaction and will not stop until you're happy.",
  },
  {
    q: "Do you offer ongoing website maintenance?",
    a: "Yes, we offer comprehensive maintenance plans including security updates, content changes, performance optimization, backups, and 24/7 monitoring. Contact us for custom maintenance pricing.",
  },
  {
    q: "How do you measure social media success?",
    a: "We track key metrics including engagement rate, reach, impressions, follower growth, click-through rate, and conversions. You get a detailed monthly report showing exactly how your accounts are performing.",
  },
  {
    q: "What information do you need to get started?",
    a: "We typically need your business details, any existing branding/assets, target audience information, and your goals. Don't worry if you don't have everything ready — our team can help you create it from scratch.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-500 font-semibold tracking-wider text-sm">Got Questions?</p>
          <h2 className="text-4xl font-extrabold text-zinc-900 mt-2">Frequently Asked Questions</h2>
          <p className="text-zinc-600 mt-4 max-w-xl mx-auto">
            Everything you need to know about working with us.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className={`border rounded-2xl overflow-hidden ${openIndex === i ? 'border-amber-400' : 'border-zinc-200'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-zinc-50 transition-colors"
              >
                <span className="font-semibold text-zinc-900 flex items-center gap-3">
                  <FaQuestionCircle className="text-amber-500 text-sm shrink-0" />
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown className="text-zinc-400 shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-zinc-600 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          className="mt-12 text-center bg-zinc-50 rounded-2xl p-8 border border-zinc-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <FaHeadset className="text-amber-500 text-3xl mx-auto mb-4" />
          <h3 className="text-lg font-bold text-zinc-900 mb-2">Still Have Questions?</h3>
          <p className="text-zinc-600 text-sm mb-6">Our team is ready to help you. Reach out to us anytime.</p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openPopupForm'))}
            className="inline-flex items-center gap-2 bg-[#1e3a5a] text-white px-8 py-3 rounded-full font-bold hover:bg-[#152d45] transition-colors cursor-pointer"
          >
            Contact Us <FaHeadset />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
