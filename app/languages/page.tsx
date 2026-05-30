import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { site } from "@/lib/site";

const languages = [
  { name: "JavaScript", desc: "Frontend & backend development with modern JS frameworks" },
  { name: "TypeScript", desc: "Type-safe scalable applications" },
  { name: "PHP", desc: "Server-side scripting & CMS development" },
  { name: "Python", desc: "Data processing & backend APIs" },
  { name: "Java", desc: "Enterprise-grade applications" },
  { name: "C#", desc: ".NET framework applications" },
  { name: "Go", desc: "High-performance backend services" },
  { name: "SQL", desc: "Database design & management" },
  { name: "HTML5/CSS3", desc: "Semantic markup & responsive styling" },
  { name: "Sass/SCSS", desc: "Advanced CSS preprocessing" },
];

const frameworks = [
  "Next.js", "React", "Vue.js", "Angular", "Express", "Node.js",
  "Laravel", "Django", "Flask", "Spring Boot", "WordPress", "Tailwind CSS"
];

export const metadata: Metadata = {
  title: `Technologies We Use — ${site.name}`,
  description: `Technologies we master: Next.js, React, Node.js, PHP, Laravel, MongoDB, TypeScript, and more. Web development tech stack.`,
  alternates: { canonical: `${site.url}/languages` },
};

export default function LanguagesPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <Header />
      <main className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-500 font-semibold tracking-wider text-sm">Our Technology Stack</p>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 mt-2">Languages & Frameworks We Work In</h1>
            <p className="text-zinc-600 mt-4 max-w-2xl mx-auto">We leverage a diverse range of programming languages and frameworks to deliver robust, scalable solutions.</p>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-zinc-900 mb-8">Programming Languages</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {languages.map((lang, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                  <h3 className="font-bold text-lg text-zinc-900">{lang.name}</h3>
                  <p className="text-zinc-600 text-sm mt-2">{lang.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-8">Frameworks & Technologies</h2>
            <div className="flex flex-wrap gap-4">
              {frameworks.map((f, i) => (
                <div key={i} className="bg-white px-6 py-3 rounded-xl border border-zinc-200 font-semibold text-zinc-800 shadow-sm">
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
