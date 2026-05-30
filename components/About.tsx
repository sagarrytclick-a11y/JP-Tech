"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="px-6 py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-500 font-semibold tracking-wider text-sm">About Our Company</p>
          <h2 className="text-4xl font-extrabold text-zinc-900 mt-2">
            Best Digital Marketing Agency in Noida<br/>
            Boosting Online Growth
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 relative rounded-2xl overflow-hidden">
                <Image src="https://i.pinimg.com/736x/d5/44/3d/d5443d71e44c3ffbb73bd492d1b667bd.jpg" alt="Portfolio 1" fill className="object-cover" />
              </div>
              <div className="h-64 relative rounded-2xl overflow-hidden">
                <Image src="https://i.pinimg.com/736x/93/86/f5/9386f512929d0bd27270ff36641c7fc7.jpg" alt="Portfolio 2" fill className="object-cover" />
              </div>
              <div className="h-64 relative rounded-2xl overflow-hidden">
                <Image src="https://i.pinimg.com/1200x/ce/3e/77/ce3e770009fc5d7e270001be47898da1.jpg" alt="Portfolio 3" fill className="object-cover" />
              </div>
              <div className="h-64 relative rounded-2xl overflow-hidden">
                <Image src="https://i.pinimg.com/736x/3d/2a/f2/3d2af2fb4696e2659d42a1b1fc01be32.jpg" alt="Portfolio 4" fill className="object-cover" />
              </div>
            </div>
            {/* Experience Badge */}
            <motion.div
              className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#1e3a5a] rounded-full flex items-center justify-center text-center text-white font-bold border-4 border-white shadow-xl px-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
            >
              12+ Years<br/>Experience
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl font-bold text-zinc-900">SEO | Google Ads | Social Media | Website</h3>
            <p className="text-zinc-600 leading-relaxed">
              JP Technologies is one-stop solution to all your web marketing needs. 
              If you want to see an instant growth in your businesses through digital marketing strategies, 
              give us an opportunity to help you. From SEO, content writing, graphic designing, 
              website development to social media marketing, our team consists experts for everything.
            </p>
            <p className="text-zinc-600 leading-relaxed">
              You will be amazed to know that through the services we provide, our clients received 
              more than four million business leads with the help of which they could earn a revenue of billion of dollars.
            </p>
            
            <div className="flex items-center gap-6 pt-4">
              <Link href="/about" className="bg-[#1e3a5a] text-white px-8 py-3 rounded-lg font-bold inline-block">Discover More ↗</Link>
              <div className="flex items-center gap-2 font-bold text-zinc-900">
                <span>📞</span>
                <div>
                  <div className="text-xs text-zinc-500 font-normal">Call us anytime</div>
                  <div>+91 8826 916 476</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
