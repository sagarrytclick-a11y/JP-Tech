"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

const CallToAction = () => {
  return (
    <section className="py-20 px-6">
      <motion.div
        className="max-w-7xl mx-auto bg-[#1e3a5a] rounded-3xl p-6 sm:p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8 md:gap-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex-1 space-y-6">
          <p className="text-amber-400 font-semibold tracking-wider text-sm">GET IN TOUCH</p>
          <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight">Let&apos;s Build Your Digital Success Story!</h2>
          <p className="text-zinc-200">
            Ready to elevate your online presence? Get in touch with us today for personalized solutions tailored to your business needs.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-4">
            {["60+ Team Members", "Award Winning Agency", "Affordable Pricing Plan"].map((text, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2 font-semibold"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <FaRocket className="text-amber-400" /> {text}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="flex-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button onClick={() => window.dispatchEvent(new CustomEvent('openPopupForm'))} className="bg-amber-400 text-zinc-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg cursor-pointer">
            Book A Free Consultation <FaRocket />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CallToAction;
