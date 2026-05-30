"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane, FaHeadset, FaCheckCircle } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#0a2540] via-[#1e3a5a] to-[#0a2540] text-white px-6 py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
          </div>
          <motion.div
            className="max-w-4xl mx-auto text-center relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-amber-400/20 text-amber-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">Get In Touch</span>
            <h1 className="text-6xl font-extrabold leading-tight">Let&apos;s Build<br/>Something Great</h1>
            <p className="text-zinc-300 mt-6 text-lg max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? We&apos;d love to hear from you.
            </p>
          </motion.div>
        </section>

        {/* Contact Content */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            {/* Left - Info Cards */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
                <div className="w-12 h-12 bg-[#1e3a5a] rounded-xl flex items-center justify-center text-amber-400 mb-4"><FaHeadset /></div>
                <h3 className="text-xl font-bold text-zinc-900 mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <motion.div className="flex items-center gap-4 text-zinc-700" whileHover={{ x: 4 }}>
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0"><FaEnvelope /></div>
                    <div>
                      <p className="text-xs text-zinc-400 font-semibold uppercase">Email</p>
                      <p className="font-medium">contact@batterseawebexpert.com</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-center gap-4 text-zinc-700" whileHover={{ x: 4 }}>
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0"><FaPhone /></div>
                    <div>
                      <p className="text-xs text-zinc-400 font-semibold uppercase">Phone</p>
                      <p className="font-medium">+91 8826 916 476</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-center gap-4 text-zinc-700" whileHover={{ x: 4 }}>
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0"><FaMapMarkerAlt /></div>
                    <div>
                      <p className="text-xs text-zinc-400 font-semibold uppercase">Location</p>
                      <p className="font-medium">India</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-center gap-4 text-zinc-700" whileHover={{ x: 4 }}>
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0"><FaClock /></div>
                    <div>
                      <p className="text-xs text-zinc-400 font-semibold uppercase">Office Hours</p>
                      <p className="font-medium">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="bg-[#1e3a5a] p-8 rounded-2xl text-white"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-bold mb-4">Why Work With Us?</h3>
                <ul className="space-y-3">
                  {["60+ Expert Team Members", "Award-Winning Agency", "500+ Happy Clients", "24/7 Dedicated Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-200">
                      <FaCheckCircle className="text-amber-400 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              className="bg-white p-10 rounded-2xl shadow-sm border border-zinc-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Send a Message</h3>
              <p className="text-zinc-500 text-sm mb-8">Fill out the form and we&apos;ll get back to you within 24 hours.</p>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <motion.div whileFocus={{ scale: 1.01 }}>
                    <input type="text" placeholder="Your Name" className="w-full p-4 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all" />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.01 }}>
                    <input type="email" placeholder="Your Email" className="w-full p-4 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all" />
                  </motion.div>
                </div>
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <input type="text" placeholder="Subject" className="w-full p-4 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all" />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.01 }}>
                  <textarea placeholder="Tell us about your project..." rows={5} className="w-full p-4 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all resize-none" />
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-full bg-[#1e3a5a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#152d45] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message <FaPaperPlane />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
