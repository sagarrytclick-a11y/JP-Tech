"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaEnvelope, FaPhone, FaRocket, FaChevronDown } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { HiMenu, HiX } from 'react-icons/hi';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const navItems = [
    {
      label: 'Web Development',
      key: 'web',
      items: [
        { label: 'React / Next.js', href: '/services' },
        { label: 'PHP / Laravel', href: '/services' },
        { label: 'Express / Node.js', href: '/services' },
        { label: 'Full Stack Development', href: '/services' },
        { label: 'E-commerce Solutions', href: '/services' },
      ],
    },
    {
      label: 'Social Media',
      key: 'social',
      items: [
        { label: 'Social Media Marketing', href: '/services' },
        { label: 'Social Media Optimization', href: '/services' },
        { label: 'Content Strategy', href: '/services' },
        { label: 'Influencer Marketing', href: '/services' },
      ],
    },
    {
      label: 'Packages',
      key: 'packages',
      items: [
        { label: 'Starter Package', href: '/services' },
        { label: 'Growth Package', href: '/services' },
        { label: 'Premium Package', href: '/services' },
        { label: 'Enterprise Plan', href: '/services' },
      ],
    },
    {
      label: 'Our Work',
      key: 'work',
      items: [
        { label: 'Web Development Projects', href: '/services' },
        { label: 'Social Media Campaigns', href: '/services' },
        { label: 'Case Studies', href: '/services' },
        { label: 'Testimonials', href: '/about' },
      ],
    },
  ];

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-[#1e3a5a] text-white py-2 px-6 text-sm text-center flex justify-center items-center relative max-md:hidden">
        <span className="flex items-center gap-2"><FaTrophy className="text-amber-400" /> Top-Rated Web Development & Social Media Agency — Award Winning 2025</span>
        <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"><IoClose /></button>
      </div>

      {/* Contact & Sub-Menu Bar */}
      <div className="bg-[#f5b85a] py-2 px-6 flex justify-between items-center text-sm font-semibold text-black max-md:hidden">
        <div className="flex gap-6">
          <Link href="mailto:contact@batterseawebexpert.com" className="flex items-center gap-2 hover:opacity-80"><FaEnvelope /> contact@batterseawebexpert.com</Link>
          <Link href="tel:+918826916476" className="flex items-center gap-2 hover:opacity-80"><FaPhone /> +91 8826 916 476</Link>
        </div>
        <div className="flex gap-6">
          <Link href="/about" className="hover:underline">About Us</Link>
          <button onClick={() => window.dispatchEvent(new CustomEvent('openPopupForm'))} className="hover:underline cursor-pointer">Reach Us</button>

        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex items-center justify-between py-4 px-6 border-b border-zinc-100 bg-white/95 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="JP Technologies" width={40} height={40} className="object-contain" />
          <span className="text-xl font-bold text-black">JP Technologies</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex gap-8 text-sm font-semibold text-zinc-800 relative">
          {navItems.map((item) => (
            <div
              key={item.key}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.key)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button className="flex items-center gap-1 hover:text-[#1e3a5a] transition-colors cursor-pointer">
                {item.label}
                <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${openDropdown === item.key ? 'rotate-180' : ''}`} />
              </button>
              <div className="absolute top-full left-0 w-full h-2" />
              <AnimatePresence>
                {openDropdown === item.key && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scaleY: 0.95 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-xl border border-zinc-100 py-2 z-50 origin-top"
                  >
                    {item.items.map((sub, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <Link
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-[#1e3a5a] hover:pl-6 transition-all"
                        >
                          {sub.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <button onClick={() => window.dispatchEvent(new CustomEvent('openPopupForm'))} className="flex items-center hover:text-[#1e3a5a] transition-colors cursor-pointer">Contact</button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('openPopupForm'))}
            className="hidden lg:flex bg-[#1e3a5a] text-white px-6 py-3 rounded-full items-center gap-2 hover:bg-[#152d45] transition-colors cursor-pointer"
          >
            Schedule A Meeting <FaRocket />
          </button>
          {/* Mobile Hamburger */}
          <button
            className="lg:hidden p-2 text-zinc-800 hover:text-[#1e3a5a] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-b border-zinc-100 overflow-hidden shadow-xl"
          >
            <div className="px-6 py-4 space-y-1">
              {navItems.map((item) => (
                <div key={item.key}>
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === item.key ? null : item.key)}
                    className="flex items-center justify-between w-full py-3 text-sm font-semibold text-zinc-800 hover:text-[#1e3a5a] transition-colors"
                  >
                    {item.label}
                    <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${mobileDropdown === item.key ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileDropdown === item.key && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pb-2 space-y-1 border-l-2 border-amber-400 ml-2">
                          {item.items.map((sub, i) => (
                            <Link
                              key={i}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-sm text-zinc-600 hover:text-[#1e3a5a] transition-colors"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <button
                onClick={() => { window.dispatchEvent(new CustomEvent('openPopupForm')); setMobileOpen(false); }}
                className="block py-3 text-sm font-semibold text-zinc-800 hover:text-[#1e3a5a] transition-colors cursor-pointer"
              >
                Contact
              </button>
              <div className="pt-4 space-y-3 border-t border-zinc-100 mt-4">
                <Link href="mailto:contact@batterseawebexpert.com" className="flex items-center gap-2 text-sm text-zinc-600"><FaEnvelope /> contact@batterseawebexpert.com</Link>
                <Link href="tel:+918826916476" className="flex items-center gap-2 text-sm text-zinc-600"><FaPhone /> +91 8826 916 476</Link>
              </div>
              <button
                onClick={() => { window.dispatchEvent(new CustomEvent('openPopupForm')); setMobileOpen(false); }}
                className="mt-4 flex items-center justify-center gap-2 bg-[#1e3a5a] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#152d45] transition-colors cursor-pointer w-full"
              >
                Schedule A Meeting <FaRocket />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
