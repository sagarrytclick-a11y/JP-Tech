"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ImagePlus,
  Loader2,
  Save,
  Trash2,
  X,
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
  coverImage: string;
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
    coverImage: post?.coverImage ?? "",
    readTime: String(post?.readTime ?? 5),
    published: post?.published ?? false,
    publishedAt: post?.publishedAt
      ? post.publishedAt.slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  };
}

const inputClass =
  "w-full rounded-lg border border-white/[0.09] bg-white/[0.02]/[0.02] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-accent/50 focus:bg-white/[0.02]/[0.04]";

const labelClass = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40";

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
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleCoverUpload = async (file: File) => {
    setUploading(true);
    setError("");

    try {
      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body,
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Could not upload the image.");
      }

      setField("coverImage", data.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Could not upload the image."
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 transition-colors hover:text-white"
        >
          <ArrowLeft size={13} aria-hidden="true" />
          All posts
        </Link>
        <span className="text-white/20">/</span>
        <h2 className="text-sm font-semibold text-white">
          {mode === "create" ? "New post" : "Edit post"}
        </h2>

        <div className="ml-auto flex items-center gap-2">
          {mode === "edit" && post?.published && (
            <Link
              href={`/blogs/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-2 text-xs font-semibold text-white/60 transition-colors hover:border-white/25"
            >
              View live
              <ArrowUpRight size={13} aria-hidden="true" />
            </Link>
          )}
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-soft disabled:opacity-60"
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
        <div className="mb-5 rounded-xl border border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-xs text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/[0.08] bg-[#131313] p-5">
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
              <div className="flex items-center rounded-lg border border-white/[0.09] bg-white/[0.02]/[0.02] focus-within:border-accent/50 focus-within:bg-white/[0.02]/[0.04]">
                <span className="pl-3 text-xs text-white/30">/blogs/</span>
                <input
                  id="blog-slug"
                  value={form.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    setField("slug", event.target.value);
                  }}
                  placeholder="post-slug"
                  className="w-full rounded-lg bg-transparent px-1 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-white/30">
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

          <div className="rounded-2xl border border-white/[0.08] bg-[#131313] p-5">
            <div className="mb-1.5 flex items-center justify-between gap-3">
              <label htmlFor="blog-content" className={labelClass}>
                Content
              </label>
              <span className="text-[11px] text-white/30">
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
            <p className="mt-2 text-[11px] text-white/30">
              Simple markdown is supported: `##` headings, `###` subheadings,
              `-` bullet lists, and `**bold**`.
            </p>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-white/[0.08] bg-[#131313] p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-white/40">
              Publishing
            </h3>

            <label className="mt-4 flex cursor-pointer items-start gap-2.5">
              <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(event) => setField("published", event.target.checked)}
                  className="peer h-4 w-4 cursor-pointer appearance-none rounded-[4px] bg-white/[0.04] ring-1 ring-inset ring-white/25 transition-colors checked:bg-accent checked:ring-accent"
                />
                <Check
                  size={11}
                  strokeWidth={3}
                  className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100"
                  aria-hidden="true"
                />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">
                  Published
                </span>
                <span className="block text-[11px] text-white/30">
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

          <div className="rounded-2xl border border-white/[0.08] bg-[#131313] p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-white/40">
              Cover image
            </h3>
            <p className="mt-1.5 text-[11px] leading-relaxed text-white/30">
              Shown on cards, the journal list, and the article header. Leave it
              empty to use the gradient tone.
            </p>

            {form.coverImage ? (
              <div className="relative mt-4 aspect-[16/9] overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.02]/[0.04]">
                {/* eslint-disable-next-line @next/next/no-img-element -- cover images can be any external URL */}
                <img
                  src={form.coverImage}
                  alt="Cover preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setField("coverImage", "")}
                  className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
                  aria-label="Remove cover image"
                >
                  <X size={13} aria-hidden="true" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="mt-4 flex aspect-[16/9] w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-white/[0.12] bg-white/[0.02]/[0.02] text-white/45 transition-colors hover:border-accent/50 hover:text-accent disabled:opacity-60"
              >
                {uploading ? (
                  <Loader2 size={20} className="animate-spin" aria-hidden="true" />
                ) : (
                  <ImagePlus size={20} aria-hidden="true" />
                )}
                <span className="text-xs font-semibold">
                  {uploading ? "Uploading..." : "Upload image"}
                </span>
                <span className="text-[10px] text-white/30">
                  JPG, PNG, WebP &middot; up to 5 MB
                </span>
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void handleCoverUpload(file);
              }}
            />

            <div className="mt-3">
              <label htmlFor="blog-cover-url" className={labelClass}>
                Or paste an image URL
              </label>
              <input
                id="blog-cover-url"
                value={form.coverImage}
                onChange={(event) => setField("coverImage", event.target.value)}
                placeholder="https://... or /images/..."
                className={inputClass}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#131313] p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-white/40">
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
              <p className="mt-1 text-[11px] text-white/30">
                Separate tags with commas.
              </p>
            </div>

            <div className="mt-4">
              <label htmlFor="blog-tone" className={labelClass}>
                Gradient fallback
              </label>
              <select
                id="blog-tone"
                value={form.coverTone}
                onChange={(event) => setField("coverTone", event.target.value)}
                className={inputClass}
              >
                {coverTones.map((tone) => (
                  <option key={tone} value={tone} className="bg-[#141414]">
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
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border border-red-500/20 bg-red-500/[0.07] px-4 py-2.5 text-xs font-semibold text-red-300 transition-colors hover:bg-red-500/[0.12] disabled:opacity-60"
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
