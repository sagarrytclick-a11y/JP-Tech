"use client";

import { useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import Pagination from "@/components/ui/Pagination";
import Reveal from "@/components/ui/Reveal";
import type { BlogPostView } from "@/lib/blog-seed";

const PAGE_SIZE = 9;

export default function BlogGrid({ posts }: { posts: BlogPostView[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement | null>(null);

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

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const visiblePosts = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (next: number) => {
    setPage(next);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setCategory(item);
                setPage(1);
              }}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all duration-200 active:scale-[0.96] ${
                category === item
                  ? "border-accent bg-accent text-white shadow-[0_8px_20px_-12px_rgba(255,77,31,0.95)]"
                  : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
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
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search articles"
            className="h-10 w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 text-[12.5px] text-white outline-none transition placeholder:text-white/30 hover:border-white/20 focus:border-accent/60 focus:bg-white/[0.05]"
          />
        </label>
      </div>

      <div className="mt-6 flex items-center justify-between text-[11px] text-white/35">
        <span>
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        </span>
        <span>Written by the people who build the work</span>
      </div>

      <div ref={resultsRef} className="scroll-mt-24">
        {filtered.length ? (
          <>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visiblePosts.map((post, index) => (
                <Reveal
                  key={post._id}
                  className="h-full"
                  delay={Math.min(index, 5) * 45}
                >
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                total={filtered.length}
                limit={PAGE_SIZE}
                onPageChange={goToPage}
                itemLabel="articles"
                className="mt-8 rounded-2xl border border-line bg-[#141414] px-4 py-3 sm:px-5"
              />
            )}
          </>
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
                setPage(1);
              }}
              className="mt-5 rounded-lg border border-white/15 px-4 py-2 text-[12px] font-medium text-white/75 transition-all duration-200 hover:border-accent hover:text-accent active:scale-[0.97]"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
