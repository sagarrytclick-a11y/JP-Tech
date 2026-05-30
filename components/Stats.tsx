"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FaProjectDiagram, FaSmile, FaTrophy, FaHeadset } from 'react-icons/fa';

const stats = [
  { icon: FaProjectDiagram, value: "500+", label: "Projects Delivered" },
  { icon: FaSmile, value: "200+", label: "Happy Clients" },
  { icon: FaTrophy, value: "15+", label: "Awards Won" },
  { icon: FaHeadset, value: "24/7", label: "Client Support" },
];

function useCountUp(end: string): React.ReactNode {
  const [count, setCount] = useState("0");
  const ref = useRef<HTMLDivElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const num = parseInt(end);
    if (isNaN(num)) {
      setCount(end);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let current = 0;
          const increment = Math.ceil(num / 40);
          const timer = setInterval(() => {
            current += increment;
            if (current >= num) {
              clearInterval(timer);
              setCount(end);
            } else {
              setCount(current.toString());
            }
          }, 30);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count}</span>;
}

const StatCard = ({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) => {
  const animatedValue = useCountUp(value);
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="text-3xl text-amber-400 mx-auto mb-3" />
      <div className="text-4xl font-extrabold mb-1">{animatedValue}</div>
      <div className="text-zinc-300 text-sm">{label}</div>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="py-16 bg-[#1e3a5a] text-white px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <StatCard key={i} icon={s.icon} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  );
};

export default Stats;
