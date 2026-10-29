"use client";

import { useEffect, useState } from "react";
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
import AdminLoadingSkeleton from "@/components/admin/AdminLoadingSkeleton";
import AdminShell from "@/components/admin/AdminShell";
import BlogPostModal from "@/components/admin/BlogPostModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Pagination from "@/components/ui/Pagination";
import Skeleton from "@/components/ui/Skeleton";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import type { BlogPostView } from "@/lib/blog-seed";
import { formatBlogDate, blogTones } from "@/lib/blog-theme";

type StatusFilter = "all" | "published" | "draft";

type Counts = {
  all: number;
  published: number;
  draft: number;
};

type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

const PAGE_SIZES = [10, 25, 50];

export default function AdminBlogsPage() {
  const checking = useAdminAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPostView[]>([]);
  const [counts, setCounts] = useState<Counts>({ all: 0, published: 0, draft: 0 });
  const [pagination, setPagination] = useState<PaginationMeta>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasPrev: false,
    hasNext: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [editor, setEditor] = useState<
    { mode: "create" } | { mode: "edit"; post: BlogPostView } | null
  >(null);
  const [pendingDelete, setPendingDelete] = useState<BlogPostView | null>(null);

  useEffect(() => {
    const next = searchInput.trim();
    if (next === query) return;

    const timer = window.setTimeout(() => {
      setQuery(next);
      setPage(1);
    }, 300);

    return () => window.clearTimeout(timer);
  }, [searchInput, query]);

  useEffect(() => {
    if (checking) return;

    let active = true;
    const controller = new AbortController();

    // eslint-disable-next-line react-hooks/set-state-in-effect -- show the skeleton while the next page loads
    setLoading(true);
    setError("");

    const params = new URLSearchParams({
      page: String(page),
      limit: String(pageSize),
    });
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (query) params.set("q", query);

    fetch(`/api/admin/blogs?${params}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (response.status === 401) {
          router.replace("/admin/login");
          return null;
        }

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load blog posts.");

        return data as {
          posts: BlogPostView[];
          counts: Counts;
          pagination: PaginationMeta;
        };
      })
      .then((data) => {
        if (!active || !data) return;
        setPosts(data.posts ?? []);
        if (data.counts) setCounts(data.counts);
        if (data.pagination) {
          setPagination(data.pagination);
          if (data.pagination.page !== page) setPage(data.pagination.page);
        }
      })
      .catch((loadError) => {
        if (!active) return;
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }
        setError(
          loadError instanceof Error ? loadError.message : "Could not load blog posts."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [checking, page, pageSize, statusFilter, query, reloadKey, router]);

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

      setNotice("Post deleted.");
      setPendingDelete(null);

      if (posts.length === 1 && page > 1) {
        setPage((current) => Math.max(1, current - 1));
      } else {
        setReloadKey((key) => key + 1);
      }
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
      setPage(1);
      setReloadKey((key) => key + 1);
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
    return <AdminLoadingSkeleton />;
  }

  return (
    <AdminShell
      title="Blog posts"
      subtitle="Draft, publish, and manage the Blog"
      actions={
        <button
          type="button"
          onClick={() => setEditor({ mode: "create" })}
          className="hidden items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white transition-all duration-200 hover:bg-accent-soft hover:shadow-[0_12px_26px_-14px_rgba(255,77,31,0.9)] active:scale-[0.98] sm:inline-flex"
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
            {counts.all} post{counts.all === 1 ? "" : "s"} &middot;{" "}
            {counts.published} live &middot; {counts.draft} draft
            {counts.draft === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          <button
            type="button"
            onClick={handleImportStarter}
            disabled={importing}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-white/10 px-3 text-[11.5px] font-medium text-white/55 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.04] hover:text-white active:scale-[0.98] disabled:opacity-50"
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
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-accent px-3.5 text-[11.5px] font-semibold text-white transition-all duration-200 hover:bg-accent-soft active:scale-[0.98] sm:hidden"
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
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search title, slug, category..."
            className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] pl-9 pr-9 text-[12.5px] text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-accent/50 focus:bg-white/[0.04]"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Clear search"
            >
              <X size={13} aria-hidden="true" />
            </button>
          )}
        </label>

        <div className="flex items-center gap-1.5">
          {(
            [
              { value: "all", label: "All", count: counts.all },
              { value: "published", label: "Published", count: counts.published },
              { value: "draft", label: "Drafts", count: counts.draft },
            ] as const
          ).map((tab) => {
            const active = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  if (statusFilter === tab.value) return;
                  setStatusFilter(tab.value);
                  setPage(1);
                  setLoading(true);
                  setError("");
                }}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition-all duration-200 active:scale-[0.97] ${
                  active
                    ? "border-accent/40 bg-accent/10 text-accent"
                    : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
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
            ? `${pagination.total} match${pagination.total === 1 ? "" : "es"}`
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

      <div
        className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131313]"
        aria-busy={loading}
      >
        <div className="hidden grid-cols-[minmax(0,1fr)_150px_110px_110px_130px] gap-4 border-b border-white/[0.07] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 lg:grid">
          <span>Post</span>
          <span>Category</span>
          <span>Status</span>
          <span>Date</span>
          <span className="text-right">Actions</span>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {[0, 1, 2, 3, 4].map((row) => (
              <Skeleton key={row} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <FileText className="mx-auto text-white/15" size={26} aria-hidden="true" />
            <p className="mt-3 text-[13px] font-medium text-white/60">
              {counts.all === 0
                ? "No posts yet"
                : "No posts match these filters"}
            </p>
            <p className="mt-1 text-[11.5px] text-white/30">
              {counts.all === 0
                ? "Write a new post or import the starter articles."
                : "Try a different search term or tab."}
            </p>
            {counts.all === 0 && (
              <button
                type="button"
                onClick={() => setEditor({ mode: "create" })}
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[11.5px] font-semibold text-white transition-all duration-200 hover:bg-accent-soft active:scale-[0.98]"
              >
                <Plus size={13} aria-hidden="true" />
                New post
              </button>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {posts.map((post) => (
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
                          loading="lazy"
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
                    <button
                      type="button"
                      onClick={() => setEditor({ mode: "edit", post })}
                      className="block max-w-full truncate text-left text-[12.5px] font-medium text-white transition-colors hover:text-accent"
                    >
                      {post.title}
                    </button>
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
                      className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05] hover:text-white active:scale-90"
                    >
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => setEditor({ mode: "edit", post })}
                    title="Edit"
                    className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05] hover:text-white active:scale-90"
                  >
                    <Pencil size={13} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(post)}
                    disabled={deletingId === post._id}
                    title="Delete"
                    className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/[0.06] hover:text-red-400 active:scale-90 disabled:opacity-50"
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

        {!loading && pagination.total > 0 && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={(next) => {
              setPage(next);
              setLoading(true);
            }}
            onLimitChange={(next) => {
              setPageSize(next);
              setPage(1);
            }}
            pageSizes={PAGE_SIZES}
            loading={loading}
            itemLabel="posts"
            className="border-t border-white/[0.07] px-4 py-3 lg:px-5"
          />
        )}
      </div>

      {editor !== null && (
        <BlogPostModal
          open
          mode={editor.mode}
          post={editor.mode === "edit" ? editor.post : undefined}
          onClose={() => setEditor(null)}
          onSaved={(saved) => {
            setEditor(null);
            setNotice(saved ? `"${saved.title}" saved.` : "Post saved.");
            setPage(1);
            setReloadKey((key) => key + 1);
          }}
        />
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this post?"
        description={
          pendingDelete ? (
            <>
              <span className="font-medium text-white/70">
                &ldquo;{pendingDelete.title}&rdquo;
              </span>{" "}
              will be removed permanently. This cannot be undone.
            </>
          ) : null
        }
        confirmLabel="Delete post"
        loading={deletingId === pendingDelete?._id}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!deletingId) setPendingDelete(null);
        }}
      />
    </AdminShell>
  );
}
