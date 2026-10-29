import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import Footer from "@/components/site/Footer";
import ContactButton from "@/components/contact/ContactButton";
import BlogCard from "@/components/blog/BlogCard";
import BlogContent from "@/components/blog/BlogContent";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/blogs";
import { blogTones, formatBlogDate } from "@/lib/blog-theme";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return { title: "Article not found | JP Technology" };
  }

  return {
    title: `${post.title} | JP Technology`,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
      images: post.coverImage
        ? [
            {
              url: /^https?:\/\//i.test(post.coverImage)
                ? post.coverImage
                : new URL(post.coverImage, site.url).toString(),
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) notFound();

  const { posts } = await getPublishedBlogs(12);
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  const tone = blogTones[post.coverTone] ?? blogTones.orange;
  const initials = post.author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <TopBar />

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />

          <article className="relative mx-auto max-w-[980px] px-5 pb-10 pt-6 sm:px-8 sm:pb-12 sm:pt-8 lg:pt-10">
            <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] text-white/35">
              <Link href="/blogs" className="transition-colors hover:text-white">
                Blog
              </Link>
              <span>/</span>
              <span className="text-white/55">{post.category}</span>
            </div>

            <div className="mt-5 text-center">
              <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent">
                {post.category}
              </span>
              <h1 className="mt-4 text-balance text-[clamp(28px,4vw,52px)] font-semibold leading-[1.1] tracking-[-0.025em] text-white">
                {post.title}
              </h1>
              <p className="mx-auto mt-4 max-w-[720px] text-[14px] leading-relaxed text-white/55 sm:text-[15px]">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] text-white/40">
              <span className="inline-flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-[10px] font-semibold text-accent">
                  {initials}
                </span>
                <span className="text-white/65">{post.author}</span>
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>{formatBlogDate(post.publishedAt)}</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="inline-flex items-center gap-1.5">
                <Clock size={11} aria-hidden="true" />
                {post.readTime} min read
              </span>
            </div>

            <div
              className={`relative mt-8 h-[190px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${tone} sm:h-[320px]`}
            >
              {post.coverImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element -- cover images can be any external URL */}
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20"
                  />
                </>
              ) : (
                <>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-[0.12]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #ffffff 0 1px, transparent 1px 10px)",
                    }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute -right-4 top-0 h-48 w-48 rounded-full border border-white/[0.07]"
                  />
                  <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
                    <span className="text-[64px] font-semibold leading-none tracking-[-0.06em] text-white/[0.08] sm:text-[100px]">
                      {post.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                </>
              )}

              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 sm:inset-x-7 sm:bottom-7">
                <span className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-sm">
                  {post.category}
                </span>
                <span className="max-w-[220px] text-right text-[10.5px] uppercase tracking-[0.16em] text-white/60">
                  JP Technology &middot; Build notes
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>

      <main className="shell py-10 lg:py-14">
        <div className="mx-auto max-w-[780px]">
          <BlogContent content={post.content} />

          <div className="mt-10 flex flex-wrap items-center gap-2">
            <Tag size={13} className="text-white/30" aria-hidden="true" />
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href="/blogs"
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/50 transition-colors hover:border-accent/50 hover:text-accent"
              >
                {tag}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-[#141414] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[13px] font-semibold text-accent">
                {initials}
              </span>
              <div>
                <p className="text-[13px] font-semibold text-white">
                  {post.author}
                </p>
                <p className="text-[11.5px] text-white/40">{post.authorRole}</p>
              </div>
            </div>
            <ContactButton className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-[12.5px] font-medium text-white/80 transition-colors hover:border-accent hover:text-accent">
              Talk to the team
            </ContactButton>
          </div>

          <div className="mt-6">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-[12.5px] font-medium text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              Back to all articles
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mx-auto mt-12 max-w-[1240px] border-t border-white/[0.06] pt-10">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-[22px] font-semibold tracking-[-0.01em] text-white sm:text-[26px]">
                Keep reading
              </h2>
              <Link
                href="/blogs"
                className="text-[12px] font-medium text-white/50 transition-colors hover:text-accent"
              >
                All articles
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item._id} post={item} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
