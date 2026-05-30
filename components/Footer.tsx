"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaArrowRight } from 'react-icons/fa6';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { site } from '@/lib/site';

const Footer = () => {
  return (
    <footer className="bg-[#0a1a2e] text-white">
      {/* Main Footer */}
      <div className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="md:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.png" alt={site.name} width={40} height={40} className="object-contain" />
              <span className="text-2xl font-bold">{site.name.split(' ')[0]} <span className="text-amber-400">{site.name.split(' ')[1]}</span></span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Your trusted partner for web development and social media marketing. We build brands that matter with cutting-edge technology and data-driven strategies.
            </p>
            <div className="space-y-3 text-sm text-zinc-400">
              <Link href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-white transition-colors group">
                <span className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-amber-400 group-hover:text-zinc-900 transition-colors"><FaEnvelope /></span>
                {site.email}
              </Link>
              <Link href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-white transition-colors group">
                <span className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center group-hover:bg-amber-400 group-hover:text-zinc-900 transition-colors"><FaPhone /></span>
                {site.phone}
              </Link>
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center"><FaMapMarkerAlt /></span>
                {site.location}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {[
                { icon: FaFacebookF, href: site.social.facebook },
                { icon: FaInstagram, href: site.social.instagram },
                { icon: FaLinkedinIn, href: site.social.linkedin },
                { icon: FaXTwitter, href: site.social.twitter },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center hover:bg-amber-400 hover:text-zinc-900 transition-colors">
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider text-amber-400 uppercase">Quick Links</h4>
            <div className="flex flex-col gap-2.5 text-sm text-zinc-400">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Contact Us", href: "/contact" },
              ].map((link, i) => (
                <Link key={i} href={link.href} className="hover:text-white transition-colors flex items-center gap-2 group">
                  <FaArrowRight className="text-amber-400 text-xs opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider text-amber-400 uppercase">Services</h4>
            <div className="flex flex-col gap-2.5 text-sm text-zinc-400">
              {[
                "Web Development",
                "Social Media Marketing",
                "SEO Optimization",
                "PPC Advertising",
                "Web Design",
                "Google Ads Management",
              ].map((s, i) => (
                <Link key={i} href="/services" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <FaArrowRight className="text-amber-400 text-xs opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {s}
                </Link>
              ))}
            </div>
          </div>

          {/* Support & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm tracking-wider text-amber-400 uppercase">Support</h4>
            <div className="flex flex-col gap-2.5 text-sm text-zinc-400">
              {[
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/terms" },
                { label: "Technologies", href: "/languages" },
                { label: "Support", href: "/contact" },
              ].map((link, i) => (
                <Link key={i} href={link.href} className="hover:text-white transition-colors flex items-center gap-2 group">
                  <FaArrowRight className="text-amber-400 text-xs opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> {link.label}
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h4 className="font-bold text-sm tracking-wider text-amber-400 uppercase mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2.5 bg-zinc-800 text-white text-sm rounded-l-xl outline-none focus:ring-1 focus:ring-amber-400 placeholder-zinc-500"
                />
                <button className="px-4 bg-amber-400 text-zinc-900 rounded-r-xl font-bold hover:bg-amber-500 transition-colors">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="px-6 py-5 border-t border-zinc-800 bg-[#0b1d33]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-zinc-500 leading-relaxed max-w-4xl mx-auto">
            <strong className="text-zinc-400">Disclaimer:</strong> The information provided on this website is for general informational purposes only. All services are subject to our terms and conditions. Results may vary depending on various factors including industry, competition, and market conditions. {site.name} makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, or reliability of the information. Any reliance you place on such information is strictly at your own risk.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-6 py-6 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <div className="flex gap-6 text-xs">
            <Link href="/terms" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <button onClick={() => window.dispatchEvent(new CustomEvent('openPopupForm'))} className="hover:text-white transition-colors cursor-pointer">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
