"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AdminLoadingSkeleton from "@/components/admin/AdminLoadingSkeleton";
import AdminShell from "@/components/admin/AdminShell";
import BlogEditor from "@/components/admin/BlogEditor";
import Skeleton from "@/components/ui/Skeleton";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import type { BlogPostView } from "@/lib/blog-seed";

export default function EditBlogPostPage() {
  const checking = useAdminAuth();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostView | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (checking) return;

    let active = true;

    fetch(`/api/admin/blogs/${params.id}`)
      .then(async (response) => {
        if (response.status === 401) {
          router.replace("/admin/login");
          return null;
        }

        const data = (await response.json()) as {
          post?: BlogPostView;
          error?: string;
        };

        if (!response.ok) {
          throw new Error(data.error || "Could not load the post.");
        }

        return data.post ?? null;
      })
      .then((loaded) => {
        if (active && loaded) setPost(loaded);
      })
      .catch((loadError) => {
        if (active) {
          setError(
            loadError instanceof Error ? loadError.message : "Could not load the post."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [checking, params.id, router]);

  // `/admin/blogs/new` used to be a dedicated create page. Creating a post now
  // happens in the modal on `/admin/blogs`, so the old URL should 404 instead
  // of falling into the dynamic `[id]` route.
  if (params.id === "new") {
    notFound();
  }

  if (checking) {
    return <AdminLoadingSkeleton />;
  }

  return (
    <AdminShell
      title="Edit post"
      subtitle="Update the article, publishing state, and cover image"
    >
      {loading ? (
        <div className="mx-auto max-w-5xl space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-9 w-28 rounded-lg" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#131313] p-5">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              <div className="space-y-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-28 w-full rounded-xl" />
                <Skeleton className="h-40 w-full rounded-xl" />
              </div>
              <div className="space-y-4">
                <Skeleton className="aspect-[16/9] w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      ) : error || !post ? (
        <div className="mx-auto max-w-3xl py-6">
          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[12px] text-red-300">
            {error || "Post not found."}
          </div>
          <Link
            href="/admin/blogs"
            className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Back to all posts
          </Link>
        </div>
      ) : (
        <BlogEditor mode="edit" post={post} />
      )}
    </AdminShell>
  );
}
