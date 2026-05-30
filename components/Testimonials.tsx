"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { site } from '@/lib/site';

const testimonials = [
  {
    name: "AlphaworldEducation",
    role: "Founder",
    text: `${site.name} transformed our online presence completely. Our student inquiries tripled since they revamped our website and social media strategy.`,
    rating: 5,
  },
  {
    name: "EducationTimesAbroad",
    role: "Marketing Director",
    text: "The team delivered our portal ahead of schedule. Their expertise in education sector web solutions is unmatched. Highly recommended.",
    rating: 5,
  },
  {
    name: "AdmissionCampus",
    role: "CEO",
    text: "Our organic leads went up by 180% in just 3 months of their SEO campaign. Absolutely thrilled with the results and ongoing support.",
    rating: 5,
  },
  {
    name: "CoralEdu",
    role: "Managing Director",
    text: "From website design to social media marketing, they handle everything flawlessly. A true partner in our digital growth journey.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-500 font-semibold tracking-wider text-sm">Client Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-2">What Our Clients Say</h2>
          <p className="text-zinc-600 mt-4 max-w-2xl mx-auto">
            Don&apos;t just take our word for it — hear from our clients about their experience working with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-zinc-50 p-8 rounded-2xl border border-zinc-100 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <FaQuoteLeft className="text-amber-300 text-3xl mb-4 opacity-50" />
              <p className="text-zinc-700 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <FaStar key={s} className={s < t.rating ? 'text-amber-400' : 'text-zinc-200'} />
                ))}
              </div>
              <div>
                <p className="font-bold text-zinc-900">{t.name}</p>
                <p className="text-sm text-zinc-500">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
