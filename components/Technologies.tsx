"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Technologies = () => {
  const techImages = [
    { name: "Next.js", file: "nextjs.jpg" },
    { name: "React", file: "react.jpg" },
    { name: "PHP", file: "php.jpg" },
    { name: "Express", file: "express.jpg" },
    { name: "Node.js", file: "nodejs.jpg" },
    { name: "Laravel", file: "laravel.jpg" },
    { name: "MongoDB", file: "mongodb.png" },
    { name: "MySQL", file: "mysql.jpg" },
    { name: "WordPress", file: "wordpress.jpg" },
    { name: "PostgreSQL", file: "postgres.jpg" },
  ];

  const duplicated = [...techImages, ...techImages];

  return (
    <section className="py-20 bg-zinc-50 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-500 font-semibold tracking-wider text-sm">Our Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-2 mb-16">
            Technologies We Master to Build Your Success
          </h2>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          <div className="scroll-x-container gap-16 py-4 items-center">
            {duplicated.map((tech, index) => (
              <div key={index} className="relative shrink-0 w-28 h-28">
                <Image
                  src={`/tech/${tech.file}`}
                  alt={tech.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
