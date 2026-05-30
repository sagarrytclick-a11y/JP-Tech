"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaRocket, FaCheckCircle, FaArrowRight, FaSpinner, FaStar } from 'react-icons/fa';
import { site } from '@/lib/site';
import { useEnquiryForm } from '@/hooks/useEnquiryForm';

const words = ["Stunning Websites", "Real Business Growth", "Social Media Impact", "Digital Dominance"];

const seededRandom = (i: number) => {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const { form, updateField, submitting, submitted, error, handleSubmit } = useEnquiryForm();

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!deleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <section className="relative px-6 py-20 bg-gradient-to-br from-zinc-50 via-white to-zinc-100 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />

        {/* Floating Particle Dots */}
        <motion.div
          className="absolute top-1/4 left-[15%] w-2 h-2 bg-amber-400/40 rounded-full"
          animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-[25%] w-1.5 h-1.5 bg-amber-400/30 rounded-full"
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute top-1/2 right-[20%] w-3 h-3 bg-amber-300/30 rounded-full"
          animate={{ y: [10, -15, 10], x: [-5, 10, -5], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-[15%] w-2 h-2 bg-blue-400/30 rounded-full"
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        <motion.div
          className="absolute top-[60%] left-[10%] w-1 h-1 bg-amber-400/50 rounded-full"
          animate={{ y: [-10, 10, -10], scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
          className="absolute top-[20%] right-[35%] w-1 h-1 bg-amber-400/40 rounded-full"
          animate={{ y: [5, -15, 5], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-[15%] right-[10%] w-8 h-8 border border-amber-400/20 rounded-lg"
          animate={{ rotate: [0, 360], y: [-10, 10, -10] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[8%] w-5 h-5 border border-blue-400/20 rounded-full"
          animate={{ y: [-8, 8, -8], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[45%] right-[8%] w-6 h-6 border border-amber-400/15 rotate-45"
          animate={{ rotate: [45, 405], y: [-5, 5, -5] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Grid Sparkle Lines */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "60px 60px"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        {/* Twinkling Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-amber-300 rounded-full"
            style={{
              top: `${10 + seededRandom(i * 2) * 80}%`,
              left: `${5 + seededRandom(i * 2 + 1) * 90}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + seededRandom(i * 2 + 2) * 3,
              repeat: Infinity,
              delay: seededRandom(i * 2 + 3) * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 items-start relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left - Text Area */}
        <motion.div className="flex-1 space-y-7" variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-zinc-200 text-sm font-medium text-zinc-800 shadow-sm"
            whileHover={{ scale: 1.03 }}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <FaRocket className="text-amber-500" /> Welcome To {site.name}
          </motion.div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tighter text-zinc-900">
            Web Development &<br className="hidden xs:block" />
            Social Media<br className="hidden xs:block" />
            That Drives{" "}
            <span className="text-[#1e3a5a] relative inline-block">
              {words[wordIndex].substring(0, charIndex)}
              <span className="animate-pulse text-amber-500">|</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-amber-400/60 rounded-full" />
            </span>
          </h1>

          <p className="text-zinc-600 text-lg max-w-lg leading-relaxed">
            We build stunning websites and run data-driven social campaigns that turn visitors into loyal customers.
          </p>

          <motion.div className="flex flex-wrap gap-4" variants={itemVariants}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => window.dispatchEvent(new CustomEvent('openPopupForm'))} className="bg-[#1e3a5a] text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-shadow cursor-pointer">
                Audit My Web Presence <FaArrowRight />
              </button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/services" className="bg-[#f5b85a] text-zinc-900 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-shadow">
                View Our Work <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>

          <motion.ul className="space-y-3 text-zinc-700 text-base font-medium" variants={itemVariants}>
            {[
              "Build 2X brand visibility with stunning websites & social strategy",
              "Boost engagement by up to 120% with data-driven content",
              "Achieve consistent growth with performance tracking",
            ].map((text, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.2, duration: 0.5 }}
              >
                <span className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <FaCheckCircle className="text-green-600 text-xs" />
                </span>
                {text}
              </motion.li>
            ))}
          </motion.ul>

          {/* Trust Line */}
          <motion.div
            className="flex items-center gap-4 text-sm text-zinc-400 pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white relative">
                <Image src="https://i.pinimg.com/736x/46/88/12/468812df30ab33d9c66397e40be563af.jpg" alt="Client" fill sizes="28px" className="object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white relative">
                <Image src="https://i.pinimg.com/736x/1a/5f/4f/1a5f4f37c7df3a498b87b62e62cfa05b.jpg" alt="Client" fill sizes="28px" className="object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white relative">
                <Image src="https://i.pinimg.com/736x/89/4b/ff/894bff75c0b4ef5f34c9914377d13185.jpg" alt="Client" fill sizes="28px" className="object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white relative">
                <Image src="https://i.pinimg.com/1200x/3a/0c/d8/3a0cd8a35bb1c1d8390cd35987cd4a9e.jpg" alt="Client" fill sizes="28px" className="object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white relative">
                <Image src="https://i.pinimg.com/736x/1a/5f/4f/1a5f4f37c7df3a498b87b62e62cfa05b.jpg" alt="Client" fill className="object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white relative">
                <Image src="https://i.pinimg.com/736x/89/4b/ff/894bff75c0b4ef5f34c9914377d13185.jpg" alt="Client" fill className="object-cover" />
              </div>
              <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white relative">
                <Image src="https://i.pinimg.com/1200x/3a/0c/d8/3a0cd8a35bb1c1d8390cd35987cd4a9e.jpg" alt="Client" fill className="object-cover" />
              </div>
            </div>
            <span>Trusted by <strong className="text-zinc-700">200+</strong> businesses worldwide</span>
            <span className="w-px h-4 bg-zinc-300" />
            <span className="flex items-center gap-1"><FaStar className="text-amber-400" /> 4.9/5</span>
          </motion.div>
        </motion.div>

        {/* Right - Form Card */}
        <motion.div
          className="flex-1 w-full max-w-md mx-auto lg:mx-0"
          variants={itemVariants}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-zinc-100 relative"
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <motion.div
              className="absolute -top-5 -right-5"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-amber-400 rounded-full blur-sm opacity-60" />
                <Image
                  src="/avatar.png"
                  alt="Avatar"
                  width={60}
                  height={60}
                  className="rounded-full border-4 border-white shadow-lg relative"
                />
              </div>
            </motion.div>

            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 relative"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="text-green-500 text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">Thank You!</h3>
                <p className="text-zinc-500">We&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2 text-zinc-900">Get a Free Consultation</h2>
                <p className="text-zinc-500 text-sm mb-6">Fill in your details and we&apos;ll reach out.</p>
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      placeholder="Your Name *"
                      value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                      />
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="email"
                        placeholder="Your Email *"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                      className="p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                    />
                  </div>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                  />
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    className="w-full p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                  />
                  <motion.select
                    value={form.service}
                    onChange={(e) => updateField("service", e.target.value)}
                    className="w-full p-3.5 border border-zinc-200 rounded-xl text-zinc-900 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                  >
                    <option value="Web">Web Development</option>
                    <option value="Social Media">Social Media Marketing</option>
                  </motion.select>
                  {error && <p className="text-red-500 text-sm flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {error}</p>}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#1e3a5a] to-[#2a4f7a] text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow disabled:opacity-70"
                  >
                    {submitting ? <><FaSpinner className="animate-spin" /> Sending...</> : <>Get Free Consultation <FaArrowRight /></>}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Ratings Bar */}
      <motion.div
        className="max-w-7xl mx-auto mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-zinc-200"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-sm font-semibold text-zinc-900 mb-8 flex items-center gap-2">
          <FaStar className="text-amber-400" /> Transparent Service Ratings
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4 sm:gap-8 items-center justify-center">
          {[
            { src: "https://i.pinimg.com/736x/94/5c/4e/945c4ee2f85a184e208a34d3c6663421.jpg", label: "4.9/5.0" },
            { src: "https://i.pinimg.com/1200x/c1/75/0b/c1750bc8854d49788896e71df7d50f16.jpg", label: "★★★★★" },
            { src: "https://i.pinimg.com/736x/c7/33/4d/c7334d2c447779868742a62bd52e118f.jpg", label: "5/5" },
            { src: "https://i.pinimg.com/1200x/40/cb/86/40cb86a20317d420cd528f2ee886ef1e.jpg", label: "Top Agency" },
            { src: "https://i.pinimg.com/736x/cf/a1/bb/cfa1bbe7602c3ca8c6ec89e9366f2ba2.jpg", label: "4.8/5" },
            { src: "https://i.pinimg.com/736x/45/20/dd/4520ddfc56208707045c56232e946f7f.jpg", label: "4.9 ★" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="w-16 h-16 relative">
                <Image src={item.src} alt="" fill sizes="64px" className="object-contain" />
              </div>
              <span className="text-sm font-semibold text-black">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
