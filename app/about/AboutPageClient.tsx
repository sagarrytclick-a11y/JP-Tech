"use client";
import Header from "@/components/Header";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaRocket, FaUsers, FaTrophy, FaGlobe, FaCheckCircle, FaArrowRight, FaQuoteLeft, FaEye, FaBullseye, FaHandshake, FaLightbulb, FaHeart, FaShieldAlt, FaStar } from "react-icons/fa";
import { site } from "@/lib/site";

const stats = [
  { icon: FaTrophy, label: "Years Experience", value: "13+" },
  { icon: FaUsers, label: "Team Members", value: site.stats.teamMembers },
  { icon: FaGlobe, label: "Clients Served", value: site.stats.happyClients },
  { icon: FaRocket, label: "Projects Delivered", value: site.stats.projectsDelivered },
];

const values = [
  { icon: FaLightbulb, title: "Innovation First", desc: "We stay ahead of the curve with the latest tech and trends to give you a competitive edge." },
  { icon: FaHandshake, title: "Client Partnership", desc: "Your success is our success. We work as an extension of your team, not just a vendor." },
  { icon: FaShieldAlt, title: "Transparency", desc: "No hidden fees, no jargon. Clear communication and honest reporting at every step." },
  { icon: FaHeart, title: "Passion for Quality", desc: "We don't cut corners. Every pixel, every line of code, and every post is crafted with care." },
];

const timeline = [
  { year: String(site.stats.foundedYear), title: "The Beginning", desc: `${site.founder} started ${site.name} with a vision to help small businesses go digital.` },
  { year: "2015", title: "Team Expansion", desc: "Grew to 15+ team members and launched our social media marketing division." },
  { year: "2018", title: `${site.stats.happyClients} Clients`, desc: `Crossed the ${site.stats.happyClients} client milestone and expanded into SEO and PPC services.` },
  { year: "2021", title: "Full-Scale Agency", desc: `${site.stats.teamMembers} experts across web dev, design, marketing, and content working as one unit.` },
  { year: "2025", title: "Award-Winning", desc: `Recognized as a top-rated digital agency with ${site.stats.projectsDelivered}+ successful projects delivered.` },
];

export default function AboutPage() {
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
            <span className="inline-block bg-amber-400/20 text-amber-400 px-4 py-1 rounded-full text-sm font-semibold mb-4">Who We Are</span>
            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight">We Build Brands<br/>That Matter</h1>
            <p className="text-zinc-300 mt-6 text-lg max-w-2xl mx-auto">
              JP Technologies is a team of passionate developers, designers, and marketers dedicated to helping businesses thrive in the digital world.
            </p>
            <motion.div className="flex gap-4 justify-center mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-400 text-zinc-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-300 transition-colors">
                Start Your Journey <FaArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Row */}
        <section className="px-6 -mt-12 relative z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md text-center border border-zinc-100 hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <s.icon className="text-2xl text-amber-500 mx-auto mb-2" />
                <div className="text-3xl font-extrabold text-zinc-900">{s.value}</div>
                <div className="text-sm text-zinc-500">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-amber-500 font-semibold tracking-wider text-sm">Our Story</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 leading-tight mt-2">From a Vision to a<br/>Full-Scale Digital Agency</h2>
              <div className="mt-6 space-y-4 text-zinc-600 leading-relaxed">
                <p>
                  JP Technologies was founded in 2012 by <strong className="text-zinc-900">Abhishek Tiwari</strong> with a simple belief — every business, regardless of size, deserves a world-class digital presence.
                </p>
                <p>
                  What started as a one-person web development operation has grown into a 60+ member team of developers, designers, SEO specialists, social media strategists, and content creators. We&apos;ve served over 500 clients across India and globally, delivering 1000+ successful projects.
                </p>
                <p>
                  Today, we&apos;re known for our transparent approach, data-driven strategies, and unwavering commitment to client success. We don&apos;t just build websites — we build digital ecosystems that drive real business growth.
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <FaQuoteLeft className="text-amber-500 shrink-0" />
                <p className="text-sm text-zinc-700 italic">&ldquo;We measure our success by the success of our clients. Every project is a partnership, not just a transaction.&rdquo;</p>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-zinc-300 overflow-hidden">
                  <Image
                    src="https://i.pinimg.com/736x/db/c5/82/dbc582cb4a5ef9df9fc7e82e283947b2.jpg"
                    alt="Abhishek Tiwari"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-zinc-900">Abhishek Tiwari</p>
                  <p className="text-sm text-zinc-500">Founder, JP Technologies</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 bg-zinc-200 rounded-2xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Team collaboration" width={300} height={200} className="w-full h-full object-cover" />
                  </div>
                  <div className="h-36 bg-zinc-200 rounded-2xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop" alt="Strategy session" width={300} height={200} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-36 bg-zinc-200 rounded-2xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop" alt="Client meeting" width={300} height={200} className="w-full h-full object-cover" />
                  </div>
                  <div className="h-48 bg-zinc-200 rounded-2xl overflow-hidden">
                    <Image src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop" alt="Office workspace" width={300} height={200} className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-amber-400 text-zinc-900 px-6 py-3 rounded-xl font-bold shadow-lg">
                <span className="text-2xl">13+</span> <span className="text-sm">Years</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="px-6 py-20 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              className="bg-gradient-to-br from-[#1e3a5a] to-[#0a2540] text-white p-6 sm:p-10 rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              <FaBullseye className="text-amber-400 text-3xl mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-zinc-300 leading-relaxed">
                To empower businesses with cutting-edge digital solutions that drive measurable growth. We combine technical expertise with creative strategy to deliver results that matter.
              </p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-amber-400 to-amber-500 text-zinc-900 p-6 sm:p-10 rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
            >
              <FaEye className="text-3xl mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-zinc-800 leading-relaxed">
                To be the most trusted digital partner for businesses worldwide — known for transparency, innovation, and an unwavering commitment to client success.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-6 py-20">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-amber-500 font-semibold tracking-wider text-sm">Our Journey</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-2">The Road to 1000+ Projects</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-200 hidden md:block" />
            <div className="space-y-8">
              {timeline.map((t, i) => (
                <motion.div
                  key={i}
                  className="relative pl-0 md:pl-20"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="hidden md:flex absolute left-4 top-1 w-9 h-9 bg-[#1e3a5a] text-white rounded-full items-center justify-center text-xs font-bold -translate-x-1/2 z-10 border-4 border-white">
                    {t.year}
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all ml-0 md:ml-0">
                    <span className="text-amber-500 font-bold text-sm md:hidden">{t.year} — </span>
                    <h3 className="font-bold text-zinc-900 text-lg inline">{t.title}</h3>
                    <p className="text-zinc-500 text-sm mt-2">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 py-20 bg-white border-t border-zinc-100">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-amber-500 font-semibold tracking-wider text-sm">What We Stand For</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mt-2">Our Core Values</h2>
          </motion.div>

          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 text-2xl mx-auto mb-4">
                  <v.icon />
                </div>
                <h3 className="font-bold text-zinc-900 mb-2">{v.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
