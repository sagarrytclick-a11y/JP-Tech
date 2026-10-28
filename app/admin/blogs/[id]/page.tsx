"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import BlogEditor from "@/components/admin/BlogEditor";
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

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-white/40">
        <Loader2 className="animate-spin" size={22} aria-label="Loading" />
      </div>
    );
  }

  return (
    <AdminShell
      title="Edit post"
      subtitle="Update the article, publishing state, and cover image"
    >
      {loading ? (
        <div className="flex items-center justify-center py-24 text-[12px] text-white/35">
          <Loader2 className="mr-2 animate-spin" size={16} />
          Loading post...
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
