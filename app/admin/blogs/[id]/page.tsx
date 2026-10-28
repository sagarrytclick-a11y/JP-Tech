"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
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

  if (checking) return null;

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminHeader
        title="Edit blog post"
        subtitle="Update the article, publishing state, and cover tone"
      />

      {loading ? (
        <div className="flex items-center justify-center py-24 text-sm text-zinc-400">
          <Loader2 className="mr-2 animate-spin" size={16} />
          Loading post...
        </div>
      ) : error || !post ? (
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
            {error || "Post not found."}
          </div>
        </div>
      ) : (
        <BlogEditor mode="edit" post={post} />
      )}
    </div>
  );
}
