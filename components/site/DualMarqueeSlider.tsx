"use client";

import Reveal from "@/components/ui/Reveal";

// Tech images from /public/images/tech/
const techImages = [
  { src: "/images/tech/nextjs.png", alt: "Next.js" },
  { src: "/images/tech/react.png", alt: "React" },
  { src: "/images/tech/ts.png", alt: "TypeScript" },
  { src: "/images/tech/nodejs.png", alt: "Node.js" },
  { src: "/images/tech/php.png", alt: "PHP" },
  { src: "/images/tech/postgresql.png", alt: "PostgreSQL" },
  { src: "/images/tech/mongodb.png", alt: "MongoDB" },
  { src: "/images/tech/tailwind.png", alt: "Tailwind CSS" },
  { src: "/images/tech/docker.png", alt: "Docker" },
  { src: "/images/tech/chatgpt.png", alt: "OpenAI / ChatGPT" },
  { src: "/images/tech/redis.png", alt: "redis" },
  { src: "/images/tech/bootstrap.png", alt: "bootstrap" },
  { src: "/images/tech/claude.png", alt: "claude" },
  { src: "/images/tech/vercel.png", alt: "vercel" },
  { src: "/images/tech/netlify.png", alt: "netlify" },
];

// Row 2 — slightly different order for visual variety
const row2Images = [
  { src: "/images/tech/react.png", alt: "React" },
  { src: "/images/tech/docker.png", alt: "Docker" },
  { src: "/images/tech/nextjs.png", alt: "Next.js" },
  { src: "/images/tech/mongodb.png", alt: "MongoDB" },
  { src: "/images/tech/nodejs.png", alt: "Node.js" },
  { src: "/images/tech/chatgpt.png", alt: "OpenAI / ChatGPT" },
  { src: "/images/tech/tailwind.png", alt: "Tailwind CSS" },
  { src: "/images/tech/ts.png", alt: "TypeScript" },
  { src: "/images/tech/postgresql.png", alt: "PostgreSQL" },
  { src: "/images/tech/php.png", alt: "PHP" },
  { src: "/images/tech/redis.png", alt: "redis" },
  { src: "/images/tech/bootstrap.png", alt: "bootstrap" },
  { src: "/images/tech/claude.png", alt: "claude" },
  { src: "/images/tech/vercel.png", alt: "vercel" },
  { src: "/images/tech/netlify.png", alt: "netlify" },
];

function TechLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group shrink-0 cursor-default transition-all duration-300 hover:scale-110">
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-14 w-auto rounded-2xl object-contain select-none transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(255,77,31,0.5)] sm:h-16"
      />
    </div>
  );
}

export default function DualMarqueeSlider() {
  const row1 = [...techImages, ...techImages, ...techImages, ...techImages];
  const row2 = [...row2Images, ...row2Images, ...row2Images, ...row2Images];

  return (
    <section id="stack" className="relative overflow-hidden py-10 lg:py-14">
      <Reveal className="shell text-center mb-8 sm:mb-10">
        <span className="section-badge">Tech &amp; Capabilities</span>
        <h2 className="section-heading mt-4 text-balance">
          The technology behind{" "}
          <span className="text-accent">products that scale</span>
        </h2>
        <p className="section-copy mt-3.5">
          From high-performance frontend frameworks to production-grade cloud
          and AI pipelines — built with modern, battle-tested tools.
        </p>
      </Reveal>

      {/* Edge gradient masks */}
      <div className="relative w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-ink to-transparent sm:w-44"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-ink to-transparent sm:w-44"
        />

        <div className="space-y-4 sm:space-y-5">
          {/* Row 1: scrolls left → right (Opposite) */}
          <div className="flex overflow-hidden py-1">
            <div className="animate-marquee-right flex gap-4 sm:gap-5">
              {row1.map((img, index) => (
                <TechLogo key={`r1-${img.alt}-${index}`} {...img} />
              ))}
            </div>
          </div>

          {/* Row 2: scrolls right → left (Opposite) */}
          <div className="flex overflow-hidden py-1">
            <div className="animate-marquee-left flex gap-4 sm:gap-5">
              {row2.map((img, index) => (
                <TechLogo key={`r2-${img.alt}-${index}`} {...img} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}