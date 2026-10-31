import { memo } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPostView } from "@/lib/blog-seed";
import { blogTones, formatBlogDate } from "@/lib/blog-theme";

function BlogCard({
  post,
  featured = false,
}: {
  post: BlogPostView;
  featured?: boolean;
}) {
  const tone = blogTones[post.coverTone] ?? blogTones.orange;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-all duration-300 hover:-translate-y-2 hover:border-accent/40 hover:bg-gradient-to-b hover:from-accent/[0.12] to-transparent hover:shadow-[0_22px_45px_-18px_rgba(217,119,6,0.22)] ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <Link href={`/blogs/${post.slug}`} className="flex h-full flex-col">
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${tone} ${
            featured ? "h-[190px] sm:h-[220px]" : "h-[148px]"
          }`}
        >
          {post.coverImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element -- cover images can be any external URL */}
              <img
                src={post.coverImage}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30"
              />
            </>
          ) : (
            <>
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.14]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #ffffff 0 1px, transparent 1px 9px)",
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-14 h-44 w-44 rounded-full border border-fg/10"
              />
              <div
                aria-hidden="true"
                className="absolute -right-3 -top-5 h-28 w-28 rounded-full border border-fg/[0.07]"
              />

              <div className="absolute inset-x-4 inset-y-4 flex items-end">
                <span className="text-[54px] font-semibold leading-none tracking-[-0.06em] text-fg/[0.07]">
                  {post.title.slice(0, 2).toUpperCase()}
                </span>
              </div>
            </>
          )}

          <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
            <span className="rounded-full border border-fg/15 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-fg/90 backdrop-blur-sm">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/35 px-2 py-1 text-[10px] text-fg/75 backdrop-blur-sm">
              <Clock size={10} aria-hidden="true" />
              {post.readTime} min
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3
            className={`font-semibold tracking-[-0.01em] text-fg transition-colors group-hover:text-accent ${
              featured ? "text-[19px] sm:text-[22px]" : "text-[16px]"
            }`}
          >
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-fg/75">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-fg/[0.06] pt-4 text-[11px] text-fg/60">
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span className="inline-flex items-center gap-1 font-medium text-fg/60 transition-colors group-hover:text-accent">
              Read article
              <ArrowUpRight
                size={12}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default memo(BlogCard);
