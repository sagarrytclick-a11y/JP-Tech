"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const brands = [
  { name: "Education Times Abroad", file: "logo-1.png" },
  { name: "Alphaworldeducation", file: "logo-2.avif" },
  { name: "Admission Campus", file: "logo-3.webp" },
  { name: "Your Online MBA", file: "logo-4.webp" },
  { name: "Aspire Edification", file: "logo-5.webp" },
  { name: "My MBA Admission", file: "logo-6.webp" },
  { name: "IBI", file: "logo-7.png" },
  { name: "IIBS", file: "logo-8.png" },
  { name: "Firebird", file: "logo-9.svg" },
  { name: "Coral Edu", file: "logo10.png" },
];

const ClientLogos = () => {
  const duplicated = [...brands, ...brands];

  return (
    <section className="py-20 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-500 font-semibold tracking-wider text-sm">Trusted By</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-2">Brands We&apos;ve Worked With</h2>
          <p className="text-zinc-600 mt-4 max-w-xl mx-auto">
            We are proud to partner with businesses across industries.
          </p>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          <div className="scroll-x-container gap-20 py-6 items-center">
            {duplicated.map((brand, i) => (
              <div key={i} className="shrink-0 flex flex-col items-center gap-2">
                <div className="relative w-44 h-16">
                  <Image
                    src={`/brands/${brand.file}`}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-zinc-500 font-bold whitespace-nowrap">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
