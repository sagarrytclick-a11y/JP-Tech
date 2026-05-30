"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaArrowRight, FaCheckCircle, FaSpinner, FaCommentDots } from "react-icons/fa";

const PopupForm = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "", service: "Web" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openPopupForm", handler);
    return () => window.removeEventListener("openPopupForm", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setOpen(false);
      setForm({ name: "", email: "", phone: "", city: "", service: "Web" });
    }, 2000);
  };

  return (
    <>
      {/* Floating Trigger Button — left side, above WhatsApp */}
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed left-6 bottom-20 z-[60] bg-amber-400 text-zinc-900 w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-500 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaCommentDots size={20} />
      </motion.button>

      {/* Popup Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-8 overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-200 transition-colors"
              >
                <FaTimes />
              </button>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-green-500 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-2">Thank You!</h3>
                  <p className="text-zinc-500">We&apos;ll get back to you shortly.</p>
                </motion.div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#1e3a5a] rounded-xl flex items-center justify-center text-amber-400">
                      <FaCommentDots />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zinc-900">Quick Enquiry</h3>
                      <p className="text-zinc-500 text-sm">Fill in your details and we&apos;ll reach out.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-2 gap-3.5">
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        placeholder="Your Name *"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                      />
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="email"
                        placeholder="Your Email *"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                      />
                    </div>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                    />
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="w-full p-3.5 border border-zinc-200 rounded-xl text-zinc-900 placeholder-zinc-400 transition-all focus:shadow-lg focus:border-amber-400 outline-none bg-zinc-50 focus:bg-white"
                    />
                    <motion.select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
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
                      {submitting ? <><FaSpinner className="animate-spin" /> Sending...</> : <>Submit Enquiry <FaArrowRight /></>}
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PopupForm;
