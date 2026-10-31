"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import Reveal from "@/components/ui/Reveal";
import { blogSeedPosts, type BlogPostView } from "@/lib/blog-seed";

const initialPosts = blogSeedPosts.filter((post) => post.published).slice(0, 3);

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPostView[]>(initialPosts);

  useEffect(() => {
    let active = true;

    fetch("/api/blogs?limit=3")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { posts?: BlogPostView[] } | null) => {
        if (active && data?.posts?.length) {
          setPosts(data.posts.slice(0, 3));
        }
      })
      .catch(() => {
        // Keep the starter articles if the API or database is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="blogs" className="shell py-5 lg:py-7">
      <Reveal>
        <div className="text-center">
          <span className="section-badge">Blog</span>
          <h2 className="section-heading mt-5 mx-auto max-w-[700px] text-balance">
            Field notes from the{" "}
            <span className="text-accent">build room</span>
          </h2>
          <p className="mt-4 mx-auto max-w-[620px] text-[13px] leading-relaxed text-fg/75 sm:text-[14px]">
            Practical writing on websites, CRMs, mobile apps, and automation
            &mdash; from the team doing the work, not a content farm.
          </p>
          <Link
            href="/blogs"
            className="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-fg/15 px-4 py-2.5 text-[12.5px] font-medium text-fg/80 transition-all duration-200 hover:border-accent hover:bg-accent/[0.06] hover:text-accent active:scale-[0.98]"
          >
            View all articles
            <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-7 grid gap-4 sm:mt-7 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal
            key={post._id}
            className="h-full"
            delay={Math.min(index, 3) * 70}
          >
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
