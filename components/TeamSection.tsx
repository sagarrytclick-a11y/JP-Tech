"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa';

const team = [
  {
    name: "Abhishek Tiwari",
    role: "Founder (Google Ad Expert)",
    image: "https://i.pinimg.com/736x/db/c5/82/dbc582cb4a5ef9df9fc7e82e283947b2.jpg",
    bio: "Visionary leader with 13+ years of experience in web development and digital strategy.",
  },
  {
    name: "Gaurav Rathore",
    role: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    bio: "Skilled full-stack developer building scalable web applications with modern technologies.",
  },
  {
    name: "Sagar Bisht",
    role: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    bio: "Passionate developer crafting robust backend and frontend solutions.",
  },
  {
    name: "Alfaraz",
    role: "Graphic Designer",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=face",
    bio: "Creative designer bringing brands to life with stunning visuals and intuitive design.",
  },
  {
    name: "Siddhi Gupta",
    role: "Social Media Executive",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    bio: "Social media strategist driving engagement and growth across platforms.",
  },
  {
    name: "Shubham",
    role: "Sales Executive",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    bio: "Dedicated sales professional helping clients find the perfect digital solutions.",
  },
];

const TeamSection = () => {
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
          <p className="text-amber-500 font-semibold tracking-wider text-sm">Our Team</p>
          <h2 className="text-4xl font-extrabold text-zinc-900 mt-2">Meet the Minds Behind the Magic</h2>
          <p className="text-zinc-600 mt-4 max-w-xl mx-auto">
            A passionate team of creators, developers, and strategists dedicated to your success.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              className="bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-100 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              whileHover={{ y: -6 }}
            >
              <div className="relative h-64 overflow-hidden bg-zinc-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-zinc-700 hover:bg-amber-400 hover:text-white transition-colors"><FaLinkedinIn /></a>
                  <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-zinc-700 hover:bg-amber-400 hover:text-white transition-colors"><FaTwitter /></a>
                  <a href="#" className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-zinc-700 hover:bg-amber-400 hover:text-white transition-colors"><FaEnvelope /></a>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-zinc-900">{member.name}</h3>
                <p className="text-amber-600 text-sm font-semibold">{member.role}</p>
                <p className="text-zinc-500 text-sm mt-2 leading-relaxed">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
