"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const FounderMessage = () => {
  return (
    <section className="bg-[#1e3a5a] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Text Content */}
        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl font-extrabold">Words Of Founder & MD</h2>
          <p className="text-zinc-200 leading-relaxed italic">
            “I truly believe in delivering complete satisfaction to every client I work with. I have done my MBA in Digital Marketing and bring over 12+ years of hands-on experience in the marketing industry.
            <br/><br/>
            I founded JP Technologies in 2012 with a clear vision to help businesses grow, and since then, we have consistently evolved and expanded our capabilities.
            <br/><br/>
            With my experience and deep understanding of marketing, I have always focused on building strategies that drive real results. I strongly believe that with dedication, the right approach, and continuous learning, any business can achieve remarkable growth.
            <br/><br/>
            This belief is not just a thought, it reflects clearly in the results we deliver and the reputation we have built over the years.”
          </p>
          <div>
            <p className="font-bold text-xl">Abhishek Tiwari</p>
            <p className="text-amber-400">Founder & MD, JP Technologies</p>
          </div>
          </motion.div>

        {/* Image / Founder Section */}
        <motion.div
          className="flex-none relative w-full md:w-1/3 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="bg-amber-400 p-8 rounded-t-full rounded-b-2xl relative">
            <div className="w-64 h-80 rounded-b-2xl relative overflow-hidden">
              <Image
                src="https://i.pinimg.com/736x/db/c5/82/dbc582cb4a5ef9df9fc7e82e283947b2.jpg"
                alt="Abhishek Tiwari - Founder"
                fill
                className="object-cover"
              />
            </div>
            {/* Experience Badge */}
            <motion.div
              className="absolute -left-12 top-12 w-24 h-24 bg-white text-zinc-900 rounded-full flex flex-col items-center justify-center font-bold shadow-lg"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
            >
              <span className="text-xl">13+</span>
              <span className="text-xs">Years</span>
            </motion.div>
            {/* Meet Founder Badge */}
            <motion.div
              className="absolute -left-12 bottom-12 w-28 h-28 bg-[#1e3a5a] rounded-full flex items-center justify-center font-bold border-4 border-amber-400 text-center text-sm"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.4 }}
            >
              Meet<br/>our<br/>Founder
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderMessage;
