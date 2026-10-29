import type { Metadata } from "next";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import HeroRings from "@/components/site/HeroRings";
import Footer from "@/components/site/Footer";
import CallToAction from "@/components/site/CallToAction";
import BlogGrid from "@/components/blog/BlogGrid";
import { getPublishedBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | JP Technology",
  description:
    "Practical notes on websites, custom CRMs, native apps, e-commerce, and AI automation from the JP Technology build team.",
  alternates: { canonical: "/blogs" },
};

export default async function BlogsPage() {
  const { posts } = await getPublishedBlogs(50);
  const categories = new Set(posts.map((post) => post.category));

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink">
      <TopBar />

      <div className="shell pt-4 sm:pt-6">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-panel sm:rounded-[40px]">
          <HeroRings />
          <Navbar />

          <section className="relative mx-auto max-w-[980px] px-5 pb-12 pt-6 text-center sm:px-8 sm:pb-14 sm:pt-8 lg:pt-10">
            <span className="section-badge">Blog</span>
            <h1 className="mt-5 text-balance text-[clamp(30px,4.2vw,58px)] font-semibold leading-[1.06] tracking-[-0.025em] text-white">
              Field notes from the{" "}
              <span className="text-accent">build room</span>
            </h1>
            <p className="section-copy mt-5">
              No growth-hack listicles. Just practical writing about the
              decisions, trade-offs, and details we run into while building
              websites, CRMs, apps, and automations.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.14em] text-white/35">
              <span>{posts.length} articles</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>{categories.size} topics</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Updated by the team</span>
            </div>
          </section>
        </div>
      </div>

      <main className="shell py-10 lg:py-14">
        <BlogGrid posts={posts} />
      </main>

      <CallToAction />
      <Footer />
    </div>
  );
}
