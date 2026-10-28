"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import BlogEditor from "@/components/admin/BlogEditor";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function NewBlogPostPage() {
  const checking = useAdminAuth();

  if (checking) return null;

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminHeader
        title="New blog post"
        subtitle="Write, preview, and publish from the admin panel"
      />
      <BlogEditor mode="create" />
    </div>
  );
}
