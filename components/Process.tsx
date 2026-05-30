"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaPencilRuler, FaCode, FaRocket } from 'react-icons/fa';

const steps = [
  { icon: FaSearch, step: "01", title: "Discovery", desc: "We analyze your business, goals, competitors, and audience to build a strategy." },
  { icon: FaPencilRuler, step: "02", title: "Design & Plan", desc: "We craft wireframes, design mockups, and a project roadmap tailored to your needs." },
  { icon: FaCode, step: "03", title: "Development", desc: "Our team builds and optimizes your website or campaign with precision and speed." },
  { icon: FaRocket, step: "04", title: "Launch & Grow", desc: "We deploy, monitor, and continuously optimize to ensure maximum results." },
];

const Process = () => {
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
          <p className="text-amber-500 font-semibold tracking-wider text-sm">How We Work</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-2">Our Process</h2>
          <p className="text-zinc-600 mt-4 max-w-2xl mx-auto">
            A proven methodology that ensures timely delivery, clear communication, and outstanding results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-zinc-200" />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              className="relative text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <motion.div
                className="w-20 h-20 bg-[#1e3a5a] rounded-2xl flex items-center justify-center text-amber-400 text-2xl mx-auto mb-6 relative z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <s.icon />
              </motion.div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-5xl font-extrabold text-zinc-100 select-none -z-10">
                {s.step}
              </div>
              <h3 className="font-bold text-lg text-zinc-900 mb-2">{s.title}</h3>
              <p className="text-zinc-500 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
