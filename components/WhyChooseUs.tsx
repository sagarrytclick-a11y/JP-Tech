"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaBullseye, FaTools, FaUsers, FaBolt, FaCogs, FaBriefcase, FaChevronDown } from 'react-icons/fa';

const WhyChooseUs = () => {
  const reasons = [
    { title: "Proven Track Record", href: "/about", icon: FaRocket },
    { title: "Transparent Reporting", href: "/about", icon: FaChartLine },
    { title: "ROI-Focused Approach", href: "/about", icon: FaBullseye },
    { title: "Up-to-Date Tools", href: "/about", icon: FaTools },
  ];

  return (
    <section className="bg-[#1e3a5a] text-white py-20 px-6">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Left: Image Placeholder */}
        <motion.div
          className="w-full md:w-1/3 h-[500px] rounded-2xl relative overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="https://i.pinimg.com/736x/db/c5/82/dbc582cb4a5ef9df9fc7e82e283947b2.jpg"
            alt="Founder"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Right: Text and Reasons */}
        <motion.div
          className="w-full md:w-2/3 space-y-8"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <p className="text-amber-400 font-semibold tracking-wider text-sm"> Why Choose Us</p>
            <h2 className="text-4xl font-extrabold mt-2 leading-tight">
              Why Choose JP Technologies as the Best Digital Marketing Company
            </h2>
            <p className="text-zinc-200 mt-4 leading-relaxed">
              Today, the online space is as competitive as a fast-paced digital enterprise. Companies within India have more than just online presence that they require as a business partner that actually promotes its growth. JP Technologies is an excellent digital marketing agency because it provides custom solutions, strategic analysis, and quantifiable outcomes. Their professional team makes certain that each brand prospers on all digital platforms, so that the clients remain ahead of the game by being innovative and impactful in marketing.
            </p>
          </div>

          {/* Reasons Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-xl cursor-pointer hover:bg-white hover:text-zinc-900 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-10 h-10 bg-amber-400/20 rounded-lg flex items-center justify-center text-amber-400 shrink-0"><reason.icon /></div>
                <span className="font-bold flex-1">{reason.title}</span>
                <FaChevronDown className="text-amber-400 text-xs opacity-60" />
              </motion.div>
            ))}
          </div>
          </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
