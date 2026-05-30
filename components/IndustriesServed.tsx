"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaHeadset, FaShoppingCart, FaGavel, FaHospital, FaSchool, FaTooth, FaIndustry, FaPenFancy, FaTruck, FaCode, FaUtensils, FaArrowRight } from 'react-icons/fa';

const iconMap: Record<string, React.ReactNode> = {
  "Real Estate": <FaHome />,
  "Customer Support": <FaHeadset />,
  "E-Commerce": <FaShoppingCart />,
  "Law": <FaGavel />,
  "Hospital": <FaHospital />,
  "School": <FaSchool />,
  "Dentist": <FaTooth />,
  "Production": <FaIndustry />,
  "Blogging": <FaPenFancy />,
  "Logistics": <FaTruck />,
  "Software": <FaCode />,
  "Food & Beverage": <FaUtensils />,
};

const IndustriesServed = () => {
  const industries = [
    { title: "Real Estate", clients: "90+", desc: "Property portals & builder websites" },
    { title: "Customer Support", clients: "120+", desc: "Helpdesk & CRM solutions" },
    { title: "E-Commerce", clients: "200+", desc: "Stores & marketplace platforms" },
    { title: "Law", clients: "60+", desc: "Legal firm websites & case portals" },
    { title: "Hospital", clients: "75+", desc: "Patient portals & booking systems" },
    { title: "School", clients: "110+", desc: "LMS & institutional websites" },
    { title: "Dentist", clients: "50+", desc: "Clinic websites & appointment apps" },
    { title: "Production", clients: "40+", desc: "Manufacturing & supply chain" },
    { title: "Blogging", clients: "80+", desc: "Content platforms & newsletters" },
    { title: "Logistics", clients: "65+", desc: "Tracking & fleet management" },
    { title: "Software", clients: "150+", desc: "SaaS products & APIs" },
    { title: "Food & Beverage", clients: "95+", desc: "Menu apps & delivery systems" },
    { title: "Healthcare", clients: "70+", desc: "Telemedicine & wellness apps" },
    { title: "Finance", clients: "85+", desc: "Banking & fintech solutions" },
  ];

  return (
    <section className="py-20 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-amber-500 font-semibold tracking-wider text-sm">Our Expertise Across Sectors</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 mt-2 leading-tight">
            Industries We Serve
          </h2>
          <p className="text-zinc-600 mt-4 max-w-3xl mx-auto leading-relaxed">
            We have delivered results for businesses across diverse industries — from real estate and healthcare to e-commerce and finance. Our deep domain expertise ensures tailored solutions that drive measurable growth.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
        >
          {industries.map((item, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6 }}
            >
              <Link href="/services" className="block bg-white p-6 rounded-2xl border border-zinc-100 hover:shadow-lg hover:border-blue-400 transition-all duration-300 h-full">
                <div className="flex flex-col gap-3">
                  <div className="w-12 h-12 flex items-center justify-center text-xl text-[#1e3a5a] bg-zinc-100 rounded-xl">{iconMap[item.title] || <FaCode />}</div>
                  <div>
                    <p className="font-bold text-zinc-900">{item.title}</p>
                    <p className="text-xs text-zinc-500 mt-1">{item.clients} Projects</p>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold mt-3 group">
                  View Work <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesServed;
