"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Reveal from "@/components/ui/Reveal";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    quote:
      "The admissions portal cut our counselling team's follow-up time in half. Parents finally get answers without calling the office three times.",
    name: "Founder",
    role: "Himalayan Edu",
    context: "Admissions & learning platform",
    image:
      "/images/founders/founder-1.jpg",
  },
  {
    quote:
      "They mapped the entire student journey before writing a single screen. That one exercise saved us months of rework after launch.",
    name: "Co-founder",
    role: "Vidyavriddhi",
    context: "Student lifecycle platform",
    image:
      "/images/founders/founder-2.jpg",
  },
  {
    quote:
      "They rebuilt our warranty portal without stopping dealer operations for a single day. What stood out was the questions they asked before writing any code.",
    name: "Director",
    role: "Raam Group",
    context: "Automotive warranty platform",
    image:
      "/images/founders/founder-3.jpg",
  },
  {
    quote:
      "Our sales team used to live in spreadsheets and WhatsApp forwards. The CRM now matches how we actually work, because they sat with the team first.",
    name: "Founder",
    role: "SmartShakti",
    context: "CRM & lead management",
    image:
      "/images/founders/founder-4.jpg",
  },
  {
    quote:
      "The first clickable build arrived in two weeks. That changed how we planned the rest of the year — we could finally show something real to the team.",
    name: "Product Lead",
    role: "College Duniya",
    context: "Education discovery platform",
    image:
      "/images/founders/founder-5.jpg",
  },
  {
    quote:
      "We came with a rough idea and left with a product roadmap. The first build was in front of real users in six weeks, not six months.",
    name: "Founder",
    role: "Geniefolks",
    context: "Workspace & community platform",
    image:
      "/images/founders/founder-6.jpg",
  },
  {
    quote:
      "Our field team stopped sending screenshots on WhatsApp. The app captures everything on the spot, and the office sees it the same day.",
    name: "Operations Head",
    role: "Northline Logistics",
    context: "Field operations app",
    image:
      "/images/founders/founder-7.jpg",
  },
  {
    quote:
      "The dashboard gives me one number to check every morning. That clarity changed how we run the business, not just how we report on it.",
    name: "Managing Partner",
    role: "Sector 4 Ventures",
    context: "Internal reporting dashboard",
    image:
      "/images/founders/founder-8.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="shell py-10 lg:py-12">
      <Reveal className="text-center">
        <span className="section-badge">Client words</span>
        <h2 className="section-heading mt-4 text-balance">
          Founders who trust us with{" "}
          <span className="text-accent">the real work</span>
        </h2>
        <p className="section-copy mt-3">
          Long relationships, not one-off launches. Here is how a few teams
          describe the work.
        </p>
      </Reveal>

      <Swiper
        className="testimonial-swiper mt-6 !pb-10"
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={16}
        loop
        speed={650}
        autoplay={{
          delay: 2800,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 18 },
        }}
        a11y={{ enabled: true }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.image} className="!h-auto">
            <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-[#141414] p-5 transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-gradient-to-b hover:from-[#221613] hover:to-[#111111] hover:shadow-[0_22px_45px_-18px_rgba(255,77,31,0.22)]">
              {/* Top ambient hover accent line */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="flex items-center gap-3">
                <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/[0.06] ring-2 ring-white/10 transition-all duration-300 group-hover:ring-accent/60 group-hover:scale-105">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.role} founder portrait`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[12.5px] font-semibold text-white transition-colors duration-300 group-hover:text-accent-soft">
                    {testimonial.name}
                  </p>
                  <p className="truncate text-[10.5px] text-white/40">
                    {testimonial.role}
                  </p>
                </div>
                <div className="ml-auto flex shrink-0 gap-0.5">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star
                      key={star}
                      size={10}
                      className="fill-accent text-accent transition-transform duration-200 group-hover:scale-110"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <blockquote className="mt-4 flex-1 text-[12.5px] leading-[1.7] text-white/65 transition-colors duration-300 group-hover:text-white/80">
                <Quote
                  size={14}
                  className="mb-1.5 text-accent/45 transition-colors duration-300 group-hover:text-accent"
                  aria-hidden="true"
                />
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-4 border-t border-white/[0.06] pt-3 text-[10.5px] text-white/35 transition-colors duration-300 group-hover:text-white/55">
                {testimonial.context}
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
