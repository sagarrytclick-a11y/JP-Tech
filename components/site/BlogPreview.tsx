"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
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
    <section id="blogs" className="shell py-12 lg:py-16">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="section-badge">Journal</span>
          <h2 className="section-heading mt-5 max-w-[700px] text-balance">
            Field notes from the{" "}
            <span className="text-accent">build room</span>
          </h2>
          <p className="mt-4 max-w-[620px] text-[13px] leading-relaxed text-white/50 sm:text-[14px]">
            Practical writing on websites, CRMs, mobile apps, and automation
            &mdash; from the team doing the work, not a content farm.
          </p>
        </div>

        <Link
          href="/blogs"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 px-4 py-2.5 text-[12.5px] font-medium text-white/80 transition-colors hover:border-accent hover:text-accent"
        >
          View all articles
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-7 grid gap-4 sm:mt-9 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
