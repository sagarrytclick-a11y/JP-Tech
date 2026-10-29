"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Cloud,
  ImagePlus,
  Loader2,
  Save,
  X,
} from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import type { BlogPostView } from "@/lib/blog-seed";
import { slugify } from "@/lib/slug";

const COVER_ACCEPT = "image/jpeg,image/png,image/webp,image/avif,image/gif";
const COVER_TYPES = COVER_ACCEPT.split(",");
const COVER_MAX_BYTES = 5 * 1024 * 1024;

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
  "w-full rounded-lg border border-white/[0.09] bg-white/[0.02] px-3 py-2.5 text-[13px] text-white outline-none transition placeholder:text-white/25 focus:border-accent/50 focus:bg-white/[0.04]";

const labelClass =
  "mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.1em] text-white/40";

export default function BlogPostModal({
  open,
  mode,
  post,
  onClose,
  onSaved,
}: {
  open: boolean;
  mode: "create" | "edit";
  post?: BlogPostView;
  onClose: () => void;
  onSaved: (post?: BlogPostView) => void;
}) {
  const [form, setForm] = useState<FormState>(() => initialState(post));
  const [baseline] = useState(() =>
    JSON.stringify(initialState(post))
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [advancedOpen, setAdvancedOpen] = useState(Boolean(post?.content));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [closeConfirmOpen, setCloseConfirmOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => titleRef.current?.focus(), 80);
    return () => window.clearTimeout(focusTimer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

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

  const dirty = JSON.stringify(form) !== baseline;

  const requestClose = () => {
    if (saving || uploading) return;
    if (dirty) {
      setCloseConfirmOpen(true);
      return;
    }
    onClose();
  };

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || saving || uploading || closeConfirmOpen) {
        return;
      }
      requestClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (form.title.trim().length < 3) {
      setError("Give the post a title with at least 3 characters.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...form,
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

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const data = (await response.json()) as {
        post?: BlogPostView;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Could not save the post.");
      }

      onSaved(data.post);
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
      const data = (await response.json()) as {
        url?: string;
        error?: string;
      };

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

  /** Shared validation for both the file picker and drag-and-drop. */
  const handleCoverFile = (file: File | null | undefined) => {
    if (!file) return;

    if (!COVER_TYPES.includes(file.type)) {
      setError("Use a JPG, PNG, WebP, AVIF, or GIF image.");
      return;
    }

    if (file.size > COVER_MAX_BYTES) {
      setError("Image is too large. Keep it under 5 MB.");
      return;
    }

    void handleCoverUpload(file);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-4">
        <button
          type="button"
          aria-label="Close post dialog"
          onClick={requestClose}
          className="dialog-overlay absolute inset-0 cursor-default bg-black/75 backdrop-blur-[3px]"
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="blog-modal-title"
          className="dialog-panel relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-2xl border border-white/[0.08] bg-[#111111] shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:max-w-[620px] sm:rounded-2xl"
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/[0.07] px-5 py-4 sm:px-6">
            <div>
              <h2
                id="blog-modal-title"
                className="text-[16px] font-semibold tracking-[-0.015em] text-white"
              >
                {mode === "create" ? "New blog post" : "Edit blog post"}
              </h2>
              <p className="mt-0.5 text-[11.5px] text-white/35">
                {mode === "create"
                  ? "Add the essentials — the article body is optional."
                  : "Update the post details and cover image."}
              </p>
            </div>
            <button
              type="button"
              onClick={requestClose}
              disabled={saving || uploading}
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white disabled:opacity-40"
              aria-label="Close"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-3.5 py-3 text-[12px] text-red-300">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="post-title" className={labelClass}>
                  Title
                </label>
                <input
                  ref={titleRef}
                  id="post-title"
                  value={form.title}
                  onChange={(event) => handleTitle(event.target.value)}
                  placeholder="A clear, specific headline"
                  maxLength={160}
                  required
                  className={`${inputClass} text-[14px] font-semibold`}
                />
              </div>

              <div>
                <label htmlFor="post-slug" className={labelClass}>
                  Slug
                </label>
                <div className="flex items-center rounded-lg border border-white/[0.09] bg-white/[0.02] transition-colors focus-within:border-accent/50 focus-within:bg-white/[0.04]">
                  <span className="pl-3 text-[12px] text-white/30">/blogs/</span>
                  <input
                    id="post-slug"
                    value={form.slug}
                    onChange={(event) => {
                      setSlugTouched(true);
                      setField("slug", event.target.value);
                    }}
                    placeholder="auto-generated-from-title"
                    maxLength={100}
                    className="w-full bg-transparent px-1 py-2.5 text-[13px] text-white outline-none placeholder:text-white/25"
                  />
                </div>
                <p className="mt-1.5 text-[10.5px] text-white/30">
                  Generated from the title until you edit it.
                </p>
              </div>

              <div>
                <label htmlFor="post-excerpt" className={labelClass}>
                  Description
                </label>
                <textarea
                  id="post-excerpt"
                  value={form.excerpt}
                  onChange={(event) => setField("excerpt", event.target.value)}
                  rows={3}
                  maxLength={420}
                  placeholder="One or two lines used on cards and in search results."
                  className={`${inputClass} resize-none leading-relaxed`}
                />
                <p className="mt-1.5 text-right text-[10px] tabular-nums text-white/25">
                  {form.excerpt.length}/420
                </p>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between gap-3">
                  <span className={`${labelClass} mb-0`}>Cover image</span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[9.5px] font-medium text-white/40"
                    title="Cover images are stored in ImageKit"
                  >
                    <Cloud size={10} aria-hidden="true" />
                    ImageKit
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                </div>

                <div
                  onDragEnter={(event) => {
                    event.preventDefault();
                    if (!uploading) setDragOver(true);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    if (!uploading) setDragOver(true);
                  }}
                  onDragLeave={(event) => {
                    if (
                      !event.currentTarget.contains(
                        event.relatedTarget as Node | null
                      )
                    ) {
                      setDragOver(false);
                    }
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    setDragOver(false);
                    if (uploading) return;
                    handleCoverFile(event.dataTransfer.files?.[0]);
                  }}
                  className={`rounded-xl transition-all ${
                    dragOver
                      ? "ring-2 ring-accent/70 ring-offset-4 ring-offset-[#111111]"
                      : ""
                  }`}
                >
                  {form.coverImage ? (
                    <div className="relative aspect-[16/8] overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
                      {/* eslint-disable-next-line @next/next/no-img-element -- cover images can be any external URL */}
                      <img
                        src={form.coverImage}
                        alt="Cover preview"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                      {dragOver && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/70 text-accent backdrop-blur-sm">
                          <ImagePlus size={20} aria-hidden="true" />
                          <span className="text-[11px] font-semibold">
                            Drop to replace cover
                          </span>
                        </div>
                      )}
                      <div className="absolute right-2 top-2 flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="rounded-lg bg-black/65 px-2.5 py-1.5 text-[10.5px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/80 disabled:opacity-50"
                        >
                          Replace
                        </button>
                        <button
                          type="button"
                          onClick={() => setField("coverImage", "")}
                          className="rounded-lg bg-black/65 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
                          aria-label="Remove cover image"
                        >
                          <X size={13} aria-hidden="true" />
                        </button>
                      </div>
                      {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-[11px] font-medium text-white">
                          <Loader2 size={16} className="mr-2 animate-spin" />
                          Uploading...
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className={`flex aspect-[16/7] w-full flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed transition-colors disabled:opacity-60 ${
                        dragOver
                          ? "border-accent/70 bg-accent/[0.06] text-accent"
                          : "border-white/[0.12] bg-white/[0.02] text-white/40 hover:border-accent/50 hover:text-accent"
                      }`}
                    >
                      {uploading ? (
                        <Loader2
                          size={20}
                          className="animate-spin"
                          aria-hidden="true"
                        />
                      ) : (
                        <ImagePlus size={20} aria-hidden="true" />
                      )}
                      <span className="text-[11.5px] font-semibold">
                        {uploading
                          ? "Uploading..."
                          : dragOver
                            ? "Drop image here"
                            : "Drag & drop or click to upload"}
                      </span>
                      <span className="text-[10px] text-white/25">
                        JPG, PNG, WebP, AVIF, GIF &middot; up to 5 MB
                      </span>
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={COVER_ACCEPT}
                    className="hidden"
                    onChange={(event) => {
                      handleCoverFile(event.target.files?.[0]);
                    }}
                  />
                </div>
              </div>

              <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3">
                <span>
                  <span className="block text-[12.5px] font-semibold text-white">
                    Publish post
                  </span>
                  <span className="mt-0.5 block text-[10.5px] text-white/30">
                    {form.published
                      ? "Visible on the public journal."
                      : "Saved as a draft until you publish."}
                  </span>
                </span>
                <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(event) =>
                      setField("published", event.target.checked)
                    }
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-md bg-white/[0.04] ring-1 ring-inset ring-white/25 transition-colors checked:bg-accent checked:ring-accent"
                  />
                  <Check
                    size={12}
                    strokeWidth={3}
                    className="pointer-events-none absolute text-white opacity-0 peer-checked:opacity-100"
                    aria-hidden="true"
                  />
                </span>
              </label>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.015]">
                <button
                  type="button"
                  onClick={() => setAdvancedOpen((current) => !current)}
                  aria-expanded={advancedOpen}
                  className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left"
                >
                  <span>
                    <span className="block text-[12px] font-semibold text-white/80">
                      Article body &amp; details
                    </span>
                    <span className="mt-0.5 block text-[10.5px] text-white/30">
                      Optional content, category, and read time.
                    </span>
                  </span>
                  <ChevronDown
                    size={15}
                    className={`shrink-0 text-white/35 transition-transform ${
                      advancedOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {advancedOpen && (
                  <div className="space-y-4 border-t border-white/[0.06] px-3.5 py-4">
                    <div>
                      <label htmlFor="post-content" className={labelClass}>
                        Content
                      </label>
                      <textarea
                        id="post-content"
                        value={form.content}
                        onChange={(event) =>
                          setField("content", event.target.value)
                        }
                        rows={9}
                        placeholder={"## Start with the problem\n\nWrite the section here.\n\n- A point\n- Another point"}
                        className={`${inputClass} resize-y font-mono text-[12px] leading-relaxed`}
                      />
                      <p className="mt-1.5 text-[10px] text-white/25">
                        Supports `##` headings, `-` lists, and `**bold**`.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="post-category" className={labelClass}>
                          Category
                        </label>
                        <input
                          id="post-category"
                          value={form.category}
                          onChange={(event) =>
                            setField("category", event.target.value)
                          }
                          placeholder="Insights"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="post-readtime" className={labelClass}>
                          Read time (minutes)
                        </label>
                        <input
                          id="post-readtime"
                          type="number"
                          min={1}
                          max={60}
                          value={form.readTime}
                          onChange={(event) =>
                            setField("readTime", event.target.value)
                          }
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] px-5 py-4 sm:px-6">
              <p className="hidden text-[10.5px] text-white/25 sm:block">
                {mode === "create"
                  ? "Publish later from the blog list."
                  : "Existing article content is kept."}
              </p>
              <div className="ml-auto flex items-center gap-2">
                <button
                  type="button"
                  onClick={requestClose}
                  disabled={saving || uploading}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-white/10 px-3.5 text-[11.5px] font-semibold text-white/55 transition-colors hover:border-white/25 hover:text-white disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 text-[11.5px] font-semibold text-white transition-colors hover:bg-accent-soft disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 size={13} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Save size={13} aria-hidden="true" />
                  )}
                  {saving ? "Saving..." : mode === "create" ? "Create post" : "Save changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <ConfirmDialog
        open={closeConfirmOpen}
        title="Discard changes?"
        description="You have unsaved changes to this post. Closing now will lose them."
        confirmLabel="Discard changes"
        cancelLabel="Keep editing"
        tone="danger"
        onConfirm={() => {
          setCloseConfirmOpen(false);
          onClose();
        }}
        onCancel={() => setCloseConfirmOpen(false)}
      />
    </>
  );
}
