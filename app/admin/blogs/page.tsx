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
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import type { BlogPostView } from "@/lib/blog-seed";
import { formatBlogDate } from "@/lib/blog-theme";

export default function AdminBlogsPage() {
  const checking = useAdminAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPostView[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/blogs");
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
    if (!term) return posts;
    return posts.filter((post) =>
      [post.title, post.slug, post.category, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [posts, query]);

  const handleDelete = async (post: BlogPostView) => {
    if (!window.confirm(`Delete "${post.title}" permanently?`)) return;

    setDeletingId(post._id);
    setError("");

    try {
      const response = await fetch(`/api/admin/blogs/${post._id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not delete the post.");
      setPosts((current) => current.filter((item) => item._id !== post._id));
      setNotice("Post deleted.");
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

  if (checking) return null;

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminHeader
        title="JP Technology Admin"
        subtitle="Enquiries, blog posts & publishing"
      />

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-zinc-900">Blog posts</h2>
            <p className="mt-1 text-sm text-zinc-500">
              {posts.length} post{posts.length === 1 ? "" : "s"} in the database.
              Published posts appear on{" "}
              <Link href="/blogs" target="_blank" className="font-medium text-amber-600">
                /blogs
              </Link>
              .
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleImportStarter}
              disabled={importing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-xs font-semibold text-zinc-600 transition-colors hover:border-zinc-400 disabled:opacity-60"
            >
              {importing ? (
                <Loader2 size={13} className="animate-spin" aria-hidden="true" />
              ) : (
                <DownloadCloud size={13} aria-hidden="true" />
              )}
              Import starter posts
            </button>

            <Link
              href="/admin/blogs/new"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1e3a5a] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#162b43]"
            >
              <Plus size={14} aria-hidden="true" />
              New post
            </Link>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <label className="relative block w-full max-w-[360px]">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search title, slug, category..."
              className="h-10 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </label>
          {query && (
            <span className="text-xs text-zinc-400">
              {filtered.length} match{filtered.length === 1 ? "" : "es"}
            </span>
          )}
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {error}
            <span className="mt-1 block text-[11px] text-red-500">
              Blog storage needs MongoDB. Add <code>MONGODB_URI</code> to
              <code> .env.local</code>, then reload this page.
            </span>
          </div>
        )}

        {notice && (
          <div className="mt-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs text-green-700">
            {notice}
          </div>
        )}

        <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
                  <th className="px-5 py-3.5 font-semibold">Post</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold">Date</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center text-zinc-400">
                      <Loader2 className="mx-auto mb-2 animate-spin" size={20} />
                      Loading posts...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-16 text-center">
                      <FileText className="mx-auto mb-2 text-zinc-300" size={22} />
                      <p className="text-sm font-semibold text-zinc-600">
                        {posts.length === 0 ? "No posts yet." : "No posts match your search."}
                      </p>
                      <p className="mt-1 text-xs text-zinc-400">
                        {posts.length === 0
                          ? "Create a post or import the starter articles."
                          : "Try a different search term."}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((post) => (
                    <tr key={post._id} className="hover:bg-zinc-50">
                      <td className="px-5 py-4">
                        <div className="max-w-[420px]">
                          <p className="truncate font-semibold text-zinc-900">
                            {post.title}
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-zinc-400">
                            /blogs/{post.slug}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            post.published
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              post.published ? "bg-green-500" : "bg-amber-500"
                            }`}
                          />
                          {post.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-zinc-500">
                        {formatBlogDate(post.publishedAt)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {post.published && (
                            <Link
                              href={`/blogs/${post.slug}`}
                              target="_blank"
                              title="View live"
                              className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                            >
                              <ArrowUpRight size={14} aria-hidden="true" />
                            </Link>
                          )}
                          <Link
                            href={`/admin/blogs/${post._id}`}
                            title="Edit"
                            className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
                          >
                            <Pencil size={14} aria-hidden="true" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(post)}
                            disabled={deletingId === post._id}
                            title="Delete"
                            className="rounded-lg p-2 text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                          >
                            {deletingId === post._id ? (
                              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                            ) : (
                              <Trash2 size={14} aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
