"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Loader2,
  Save,
  Trash2,
} from "lucide-react";
import type { BlogPostView } from "@/lib/blog-seed";
import { slugify } from "@/lib/slug";

const coverTones = ["orange", "blue", "violet", "green", "amber", "slate"];

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  tags: string;
  coverTone: string;
  readTime: string;
  published: boolean;
  publishedAt: string;
};

function initialState(post?: BlogPostView): FormState {
  return {
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    category: post?.category ?? "Insights",
    author: post?.author ?? "JP Technology Team",
    authorRole: post?.authorRole ?? "Product & engineering",
    tags: post?.tags.join(", ") ?? "",
    coverTone: post?.coverTone ?? "orange",
    readTime: String(post?.readTime ?? 5),
    published: post?.published ?? false,
    publishedAt: post?.publishedAt
      ? post.publishedAt.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  };
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

const labelClass = "mb-1.5 block text-xs font-semibold text-zinc-700";

export default function BlogEditor({
  mode,
  post,
}: {
  mode: "create" | "edit";
  post?: BlogPostView;
}) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => initialState(post));
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleTitle = (value: string) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugTouched ? current.slug : slugify(value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        tags: form.tags,
        readTime: Number(form.readTime) || 5,
        publishedAt: form.publishedAt
          ? new Date(`${form.publishedAt}T09:00:00`).toISOString()
          : new Date().toISOString(),
      };

      const response = await fetch(
        mode === "create" ? "/api/admin/blogs" : `/api/admin/blogs/${post?._id}`,
        {
          method: mode === "create" ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Could not save the post.");
      }

      router.push("/admin/blogs");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Could not save the post."
      );
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !window.confirm("Delete this post permanently?")) return;

    setDeleting(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/blogs/${post._id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not delete the post.");
      router.push("/admin/blogs");
      router.refresh();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Could not delete the post."
      );
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-500 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          All posts
        </Link>
        <span className="text-zinc-300">/</span>
        <h2 className="text-sm font-semibold text-zinc-900">
          {mode === "create" ? "New post" : "Edit post"}
        </h2>

        <div className="ml-auto flex items-center gap-2">
          {mode === "edit" && post?.published && (
            <Link
              href={`/blogs/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 transition-colors hover:border-zinc-400"
            >
              View live
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          )}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1e3a5a] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#162b43] disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={13} className="animate-spin" aria-hidden="true" />
            ) : (
              <Save size={13} aria-hidden="true" />
            )}
            {saving ? "Saving..." : "Save post"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <label htmlFor="blog-title" className={labelClass}>
              Title
            </label>
            <input
              id="blog-title"
              value={form.title}
              onChange={(event) => handleTitle(event.target.value)}
              placeholder="A clear, specific headline"
              className={`${inputClass} text-base font-semibold`}
              required
            />

            <div className="mt-4">
              <label htmlFor="blog-slug" className={labelClass}>
                Slug
              </label>
              <div className="flex items-center rounded-lg border border-zinc-200 bg-white focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-100">
                <span className="pl-3 text-xs text-zinc-400">/blogs/</span>
                <input
                  id="blog-slug"
                  value={form.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    setField("slug", event.target.value);
                  }}
                  placeholder="post-slug"
                  className="w-full rounded-lg bg-transparent px-1 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-zinc-400">
                Generated from the title until you edit it.
              </p>
            </div>

            <div className="mt-4">
              <label htmlFor="blog-excerpt" className={labelClass}>
                Excerpt
              </label>
              <textarea
                id="blog-excerpt"
                value={form.excerpt}
                onChange={(event) => setField("excerpt", event.target.value)}
                rows={3}
                placeholder="One or two lines used on cards and in search results."
                className={inputClass}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label htmlFor="blog-content" className={labelClass}>
                Content
              </label>
              <span className="text-[11px] text-zinc-400">
                ## heading &middot; ### subheading &middot; - list
              </span>
            </div>
            <textarea
              id="blog-content"
              value={form.content}
              onChange={(event) => setField("content", event.target.value)}
              rows={20}
              placeholder={"## Start with the problem\n\nWrite the section here.\n\n- A point\n- Another point"}
              className={`${inputClass} font-mono text-[13px] leading-relaxed`}
              required
            />
            <p className="mt-2 text-[11px] text-zinc-400">
              Simple markdown is supported: `##` headings, `###` subheadings,
              `-` bullet lists, and `**bold**`.
            </p>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-500">
              Publishing
            </h3>

            <label className="mt-4 flex cursor-pointer items-start gap-2.5">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => setField("published", event.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-zinc-300 accent-amber-500"
              />
              <span>
                <span className="block text-sm font-semibold text-zinc-800">
                  Published
                </span>
                <span className="block text-[11px] text-zinc-400">
                  Visible on the public journal.
                </span>
              </span>
            </label>

            <div className="mt-4">
              <label htmlFor="blog-date" className={labelClass}>
                Publish date
              </label>
              <input
                id="blog-date"
                type="date"
                value={form.publishedAt}
                onChange={(event) => setField("publishedAt", event.target.value)}
                className={inputClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="blog-category" className={labelClass}>
                Category
              </label>
              <input
                id="blog-category"
                value={form.category}
                onChange={(event) => setField("category", event.target.value)}
                placeholder="Websites, CRM, Mobile..."
                className={inputClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="blog-readtime" className={labelClass}>
                Read time (minutes)
              </label>
              <input
                id="blog-readtime"
                type="number"
                min={1}
                max={60}
                value={form.readTime}
                onChange={(event) => setField("readTime", event.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-zinc-500">
              Author &amp; cover
            </h3>

            <div className="mt-4">
              <label htmlFor="blog-author" className={labelClass}>
                Author
              </label>
              <input
                id="blog-author"
                value={form.author}
                onChange={(event) => setField("author", event.target.value)}
                className={inputClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="blog-author-role" className={labelClass}>
                Author role
              </label>
              <input
                id="blog-author-role"
                value={form.authorRole}
                onChange={(event) => setField("authorRole", event.target.value)}
                className={inputClass}
              />
            </div>

            <div className="mt-4">
              <label htmlFor="blog-tags" className={labelClass}>
                Tags
              </label>
              <input
                id="blog-tags"
                value={form.tags}
                onChange={(event) => setField("tags", event.target.value)}
                placeholder="CRM, Sales, Operations"
                className={inputClass}
              />
              <p className="mt-1 text-[11px] text-zinc-400">
                Separate tags with commas.
              </p>
            </div>

            <div className="mt-4">
              <label htmlFor="blog-tone" className={labelClass}>
                Cover tone
              </label>
              <select
                id="blog-tone"
                value={form.coverTone}
                onChange={(event) => setField("coverTone", event.target.value)}
                className={inputClass}
              >
                {coverTones.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-60"
            >
              {deleting ? (
                <Loader2 size={13} className="animate-spin" aria-hidden="true" />
              ) : (
                <Trash2 size={13} aria-hidden="true" />
              )}
              {deleting ? "Deleting..." : "Delete post"}
            </button>
          )}
        </aside>
      </div>
    </form>
  );
}
