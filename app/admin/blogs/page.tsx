"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  DownloadCloud,
  FileText,
  Loader2,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import BlogPostModal from "@/components/admin/BlogPostModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import type { BlogPostView } from "@/lib/blog-seed";
import { formatBlogDate, blogTones } from "@/lib/blog-theme";

export default function AdminBlogsPage() {
  const checking = useAdminAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPostView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">(
    "all"
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [editor, setEditor] = useState<
    { mode: "create" } | { mode: "edit"; post: BlogPostView } | null
  >(null);
  const [pendingDelete, setPendingDelete] = useState<BlogPostView | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/blogs", { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      const data = (await response.json()) as {
        posts?: BlogPostView[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Could not load blog posts.");
      }

      setPosts(data.posts ?? []);
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Could not load blog posts."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- load posts once the auth check completes
    if (!checking) loadPosts();
  }, [checking, loadPosts]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (statusFilter === "published" && !post.published) return false;
      if (statusFilter === "draft" && post.published) return false;
      if (!term) return true;
      return [post.title, post.slug, post.category, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [posts, query, statusFilter]);

  const publishedCount = posts.filter((post) => post.published).length;
  const draftCount = posts.length - publishedCount;

  const handleDelete = async () => {
    if (!pendingDelete) return;
    const post = pendingDelete;

    setDeletingId(post._id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/admin/blogs/${post._id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not delete the post.");
      setPosts((current) => current.filter((item) => item._id !== post._id));
      setNotice("Post deleted.");
      setPendingDelete(null);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Could not delete the post."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const handleImportStarter = async () => {
    setImporting(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/blogs/seed", { method: "POST" });
      const data = (await response.json()) as {
        imported?: number;
        skipped?: number;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Could not import starter posts.");
      }

      setNotice(
        `Starter posts imported: ${data.imported ?? 0}. Already existed: ${
          data.skipped ?? 0
        }.`
      );
      await loadPosts();
    } catch (importError) {
      setError(
        importError instanceof Error
          ? importError.message
          : "Could not import starter posts."
      );
    } finally {
      setImporting(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-white/40">
        <Loader2 className="animate-spin" size={22} aria-label="Loading" />
      </div>
    );
  }

  return (
    <AdminShell
      title="Blog posts"
      subtitle="Draft, publish, and manage the journal"
      actions={
        <button
          type="button"
          onClick={() => setEditor({ mode: "create" })}
          className="hidden items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-accent-soft sm:inline-flex"
        >
          <Plus size={13} aria-hidden="true" />
          New post
        </button>
      }
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-[26px] font-semibold tracking-[-0.025em] text-white sm:text-[30px]">
            Blog posts
          </h2>
          <p className="mt-1.5 text-[12.5px] text-white/40 sm:text-[13px]">
            {posts.length} post{posts.length === 1 ? "" : "s"} &middot;{" "}
            {publishedCount} live &middot; {draftCount} draft
            {draftCount === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <button
            type="button"
            onClick={handleImportStarter}
            disabled={importing}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-[11.5px] font-medium text-white/55 transition-colors hover:border-white/25 hover:text-white disabled:opacity-50"
          >
            {importing ? (
              <Loader2 size={13} className="animate-spin" aria-hidden="true" />
            ) : (
              <DownloadCloud size={13} aria-hidden="true" />
            )}
            Import starter
          </button>

          <button
            type="button"
            onClick={() => setEditor({ mode: "create" })}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-[11.5px] font-semibold text-white transition-colors hover:bg-accent-soft sm:hidden"
          >
            <Plus size={13} aria-hidden="true" />
            New post
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <label className="relative block w-full lg:max-w-[340px]">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, slug, category..."
            className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] pl-9 pr-9 text-[12.5px] text-white outline-none transition placeholder:text-white/25 focus:border-accent/50 focus:bg-white/[0.04]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-white/30 hover:text-white"
              aria-label="Clear search"
            >
              <X size={13} aria-hidden="true" />
            </button>
          )}
        </label>

        <div className="flex items-center gap-1.5">
          {(
            [
              { value: "all", label: "All", count: posts.length },
              { value: "published", label: "Published", count: publishedCount },
              { value: "draft", label: "Drafts", count: draftCount },
            ] as const
          ).map((tab) => {
            const active = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setStatusFilter(tab.value)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition-colors ${
                  active
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white"
                }`}
              >
                {tab.label}
                <span
                  className={`rounded-full px-1.5 text-[10px] font-semibold tabular-nums ${
                    active ? "bg-accent/15 text-accent" : "bg-white/[0.06] text-white/40"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-white/30 lg:ml-auto">
          {query || statusFilter !== "all"
            ? `${filtered.length} match${filtered.length === 1 ? "" : "es"}`
            : "Published posts appear on /blogs"}
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[12px] text-red-300">
          {error}
          <span className="mt-1 block text-[11px] text-red-300/70">
            Blog storage needs MongoDB. Add <code>MONGODB_URI</code> to
            <code> .env.local</code>, then reload this page.
          </span>
        </div>
      )}

      {notice && (
        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-3 text-[12px] text-emerald-300">
          {notice}
        </div>
      )}

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131313]">
        <div className="hidden grid-cols-[minmax(0,1fr)_150px_110px_110px_130px] gap-4 border-b border-white/[0.07] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 lg:grid">
          <span>Post</span>
          <span>Category</span>
          <span>Status</span>
          <span>Date</span>
          <span className="text-right">Actions</span>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="h-14 animate-pulse rounded-xl bg-white/[0.04]" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <FileText className="mx-auto text-white/15" size={26} aria-hidden="true" />
            <p className="mt-3 text-[13px] font-medium text-white/60">
              {posts.length === 0
                ? "No posts yet"
                : "No posts match these filters"}
            </p>
            <p className="mt-1 text-[11.5px] text-white/30">
              {posts.length === 0
                ? "Write a new post or import the starter articles."
                : "Try a different search term or tab."}
            </p>
            {posts.length === 0 && (
              <Link
                href="/admin/blogs/new"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[11.5px] font-semibold text-white transition-colors hover:bg-accent-soft"
              >
                <Plus size={13} aria-hidden="true" />
                New post
              </Link>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {filtered.map((post) => (
              <li
                key={post._id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/[0.02] lg:grid-cols-[minmax(0,1fr)_150px_110px_110px_130px] lg:gap-4 lg:px-5"
              >
                <div className="col-span-2 flex min-w-0 items-center gap-3 lg:col-span-1">
                  <div
                    className={`relative flex h-11 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br ${
                      blogTones[post.coverTone] ?? blogTones.orange
                    }`}
                  >
                    {post.coverImage ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element -- cover images can be any external URL */}
                        <img
                          src={post.coverImage}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </>
                    ) : (
                      <span className="text-[10px] font-semibold text-white/70">
                        {post.title.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/admin/blogs/${post._id}`}
                      className="block truncate text-[12.5px] font-medium text-white transition-colors hover:text-accent"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-0.5 truncate text-[11px] text-white/30">
                      /blogs/{post.slug}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 lg:hidden">
                      <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium text-white/50">
                        {post.category}
                      </span>
                      <span className="text-[10.5px] text-white/30">
                        {formatBlogDate(post.publishedAt)}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="hidden truncate rounded-full bg-white/[0.04] px-2.5 py-1 text-[10.5px] font-medium text-white/55 lg:col-start-2 lg:inline-flex lg:w-fit">
                  {post.category}
                </span>

                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset lg:col-start-3 ${
                    post.published
                      ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20"
                      : "bg-amber-500/10 text-amber-300 ring-amber-400/20"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      post.published ? "bg-emerald-400" : "bg-amber-400"
                    }`}
                  />
                  {post.published ? "Published" : "Draft"}
                </span>

                <span className="hidden whitespace-nowrap text-[11px] text-white/30 lg:col-start-4 lg:block">
                  {formatBlogDate(post.publishedAt)}
                </span>

                <div className="flex items-center justify-end gap-1.5 lg:col-start-5 lg:row-start-1">
                  {post.published && (
                    <Link
                      href={`/blogs/${post.slug}`}
                      target="_blank"
                      title="View live"
                      className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-colors hover:border-white/20 hover:text-white"
                    >
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  )}
                  <Link
                    href={`/admin/blogs/${post._id}`}
                    title="Edit"
                    className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-colors hover:border-white/20 hover:text-white"
                  >
                    <Pencil size={13} aria-hidden="true" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(post)}
                    disabled={deletingId === post._id}
                    title="Delete"
                    className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-50"
                  >
                    {deletingId === post._id ? (
                      <Loader2 size={13} className="animate-spin" aria-hidden="true" />
                    ) : (
                      <Trash2 size={13} aria-hidden="true" />
                    )}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
