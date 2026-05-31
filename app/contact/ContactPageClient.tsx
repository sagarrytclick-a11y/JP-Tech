"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaCheckCircle, FaArrowRight, FaSpinner } from "react-icons/fa";
import { useEnquiryForm } from "@/hooks/useEnquiryForm";
import { site } from "@/lib/site";

export default function ContactPage() {
  const { form, updateField, handleBlur, submitting, submitted, error, fieldErrors, handleSubmit } = useEnquiryForm();

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
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">Let&apos;s Build<br/>Something Great</h1>
            <p className="text-zinc-300 mt-6 text-lg max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? We&apos;d love to hear from you.
            </p>
          </motion.div>
        </section>

        {/* Contact Content */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-16 items-start">
            {/* Left - Info Cards */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100">
                <div className="w-12 h-12 bg-[#1e3a5a] rounded-xl flex items-center justify-center text-amber-400 mb-4"><FaCheckCircle /></div>
                <h3 className="text-xl font-bold text-zinc-900 mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <motion.div className="flex items-center gap-4 text-zinc-700" whileHover={{ x: 4 }}>
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0"><FaEnvelope /></div>
                    <div>
                      <p className="text-xs text-zinc-400 font-semibold uppercase">Email</p>
                      <p className="font-medium">{site.email}</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-center gap-4 text-zinc-700" whileHover={{ x: 4 }}>
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0"><FaPhone /></div>
                    <div>
                      <p className="text-xs text-zinc-400 font-semibold uppercase">Phone</p>
                      <p className="font-medium">{site.phone}</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-center gap-4 text-zinc-700" whileHover={{ x: 4 }}>
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0"><FaMapMarkerAlt /></div>
                    <div>
                      <p className="text-xs text-zinc-400 font-semibold uppercase">Location</p>
                      <p className="font-medium">{site.location}</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-center gap-4 text-zinc-700" whileHover={{ x: 4 }}>
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 shrink-0"><FaClock /></div>
                    <div>
                      <p className="text-xs text-zinc-400 font-semibold uppercase">Office Hours</p>
                      <p className="font-medium">{site.officeHours}</p>
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
                  {[`${site.stats.teamMembers} Expert Team Members`, "Award-Winning Agency", `${site.stats.happyClients} Happy Clients`, "24/7 Dedicated Support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-zinc-200">
                      <FaCheckCircle className="text-amber-400 shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-zinc-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
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
                  <h3 className="text-2xl font-bold text-zinc-900 mb-2">Send a Message</h3>
                  <p className="text-zinc-500 text-sm mb-8">Fill out the form and we&apos;ll get back to you within 24 hours.</p>
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="text"
                          placeholder="Your Name *"
                          value={form.name}
                          onChange={(e) => updateField("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          className="p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white w-full"
                        />
                        {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
                      </div>
                      <div>
                        <motion.input
                          whileFocus={{ scale: 1.01 }}
                          type="email"
                          placeholder="Your Email *"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          className="p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white w-full"
                        />
                        {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="tel"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        onBlur={() => handleBlur("phone")}
                        className="w-full p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                      />
                      {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
                    </div>
                    <div>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        placeholder="City"
                        value={form.city}
                        onChange={(e) => updateField("city", e.target.value)}
                        onBlur={() => handleBlur("city")}
                        className="w-full p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                      />
                      {fieldErrors.city && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
                    </div>
                    <div>
                      <motion.select
                        value={form.service}
                        onChange={(e) => updateField("service", e.target.value)}
                        onBlur={() => handleBlur("service")}
                        className="w-full p-3.5 border border-zinc-200 rounded-xl text-zinc-900 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                      >
                        <option value="Web">Web Development</option>
                        <option value="Social Media">Social Media Marketing</option>
                      </motion.select>
                      {fieldErrors.service && <p className="text-red-500 text-xs mt-1">{fieldErrors.service}</p>}
                    </div>
                    {error && <p className="text-red-500 text-sm flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {error}</p>}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-[#1e3a5a] to-[#2a4f7a] text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow disabled:opacity-70"
                    >
                      {submitting ? <><FaSpinner className="animate-spin" /> Sending...</> : <>Send Message <FaArrowRight /></>}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
