"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import type { BlogPostView } from "@/lib/blog-seed";

export default function BlogGrid({ posts }: { posts: BlogPostView[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts]
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      if (!matchesCategory) return false;
      if (!term) return true;

      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        ...post.tags,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(term);
    });
  }, [posts, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
                category === item
                  ? "border-accent bg-accent text-white"
                  : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="relative block w-full lg:w-[280px]">
          <Search
            size={14}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/35"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search articles"
            className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 text-[12.5px] text-white outline-none transition placeholder:text-white/30 focus:border-accent/60 focus:bg-white/[0.05]"
          />
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between text-[11px] text-white/35">
        <span>
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        </span>
        <span>Written by the people who build the work</span>
      </div>

      {filtered.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-line bg-[#141414] px-6 py-14 text-center">
          <p className="text-[15px] font-semibold text-white">
            No articles match that search.
          </p>
          <p className="mt-1.5 text-[13px] text-white/45">
            Try a different category or clear the search box.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
            }}
            className="mt-5 rounded-lg border border-white/15 px-4 py-2 text-[12px] font-medium text-white/75 transition-colors hover:border-accent hover:text-accent"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
