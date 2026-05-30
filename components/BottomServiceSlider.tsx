"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaPalette, FaCode, FaShareAlt, FaCamera, FaPaintBrush, FaSearch, FaGoogle, FaPenFancy } from "react-icons/fa";

const services = [
  { label: "Web Design", icon: FaPalette },
  { label: "Web Development", icon: FaCode },
  { label: "Social Media Marketing", icon: FaShareAlt },
  { label: "Instagram Posts", icon: FaCamera },
  { label: "Graphics Work", icon: FaPaintBrush },
  { label: "SEO Optimization", icon: FaSearch },
  { label: "Google Ads", icon: FaGoogle },
  { label: "Logo Design", icon: FaPenFancy },
];

const BottomServiceSlider = () => {
  const duplicated = [...services, ...services, ...services];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#1e3a5a]/95 backdrop-blur-sm border-t border-amber-400/20 py-4 overflow-hidden">
      <motion.div className="flex items-center gap-0" style={{ whiteSpace: "nowrap" }}>
        <motion.div
          className="flex items-center gap-0"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {duplicated.map((s, i) => (
            <div key={i} className="flex items-center gap-2 px-6 text-white/90 text-sm font-medium">
              <s.icon className="text-amber-400 text-base" />
              <span>{s.label}</span>
              <span className="w-1 h-1 rounded-full bg-amber-400 ml-2" />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BottomServiceSlider;
