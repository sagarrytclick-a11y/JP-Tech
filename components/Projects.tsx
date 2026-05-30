"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { cn } from "@/lib/utils";
import Link from "next/link";

const projects = [
  { src: "https://i.pinimg.com/1200x/20/78/09/20780957dc1fbdade8e5b42f2f92c4d2.jpg", title: "E-Commerce Platform", category: "Web Development" },
  { src: "https://i.pinimg.com/736x/c1/bf/45/c1bf4590ca62ebde52c23f9b3090494f.jpg", title: "Corporate Website", category: "Web Development" },
  { src: "https://i.pinimg.com/736x/03/fe/a4/03fea4bc42b9bd9b8c875a3f0758104c.jpg", title: "Brand Identity", category: "Social Media" },
  { src: "https://i.pinimg.com/1200x/7d/a3/e1/7da3e1f1976f1ad90510cfc9a982d415.jpg", title: "Mobile App UI", category: "Mobile App" },
  { src: "https://i.pinimg.com/736x/e6/6e/1a/e66e1adc7776d2d94c0d6c31c4233105.jpg", title: "Social Campaign", category: "Social Media" },
  { src: "https://i.pinimg.com/736x/21/e4/d3/21e4d3401f1691a1a51e31c75df357e9.jpg", title: "SaaS Dashboard", category: "Web Development" },
  { src: "https://i.pinimg.com/736x/96/5e/fa/965efa9591bd83bac2b7963a5f485bef.jpg", title: "Marketing Collateral", category: "Social Media" },
];

const Projects = () => {
  return (
    <section className="py-20 bg-[#f5f4f3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-amber-500 font-semibold tracking-wider text-sm">Our Portfolio</p>
          <h2 className="text-4xl font-extrabold text-zinc-900 mt-2">Recent Projects</h2>
          <p className="text-zinc-600 mt-4 max-w-2xl mx-auto">
            A showcase of our best work — from web development to social media campaigns.
          </p>
        </motion.div>

        <ProjectCarousel images={projects} showPagination loop />
      </div>
    </section>
  );
};

const ProjectCarousel = ({
  images,
  className,
  showPagination = false,
  loop = true,
}: {
  images: { src: string; title: string; category: string }[];
  className?: string;
  showPagination?: boolean;
  loop?: boolean;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className={cn("relative w-full max-w-5xl mx-auto", className)}
    >
      <style>{`
        .project-swiper { width: 100%; height: 420px; padding-bottom: 50px !important; }
        .project-swiper .swiper-slide { background-position: center; background-size: cover; width: 320px; border-radius: 16px; overflow: hidden; }
        .swiper-pagination-bullet { background-color: #1e3a5a !important; }
      `}</style>

      <Swiper
        spaceBetween={30}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        effect="coverflow"
        grabCursor
        slidesPerView="auto"
        centeredSlides
        loop={loop}
        coverflowEffect={{ rotate: 30, stretch: 0, depth: 120, modifier: 1.2, slideShadows: true }}
        pagination={showPagination ? { clickable: true } : false}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
        className="project-swiper"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((project, index) => (
          <SwiperSlide key={index}>
            <Link href="/services" className="block relative h-full w-full group">
              <img className="h-full w-full object-cover" src={project.src} alt={project.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{project.category}</span>
                <h3 className="text-white text-xl font-bold mt-1">{project.title}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next after:hidden">
          <ChevronRightIcon className="h-6 w-6 text-white" />
        </div>
        <div className="swiper-button-prev after:hidden">
          <ChevronLeftIcon className="h-6 w-6 text-white" />
        </div>
      </Swiper>
    </motion.div>
  );
};

export default Projects;
