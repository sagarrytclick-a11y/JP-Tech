"use client";

import { Loader2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import BlogEditor from "@/components/admin/BlogEditor";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function NewBlogPostPage() {
  const checking = useAdminAuth();

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-white/40">
        <Loader2 className="animate-spin" size={22} aria-label="Loading" />
      </div>
    );
  }

  return (
    <AdminShell
      title="New post"
      subtitle="Write, preview, and publish to the journal"
    >
      <BlogEditor mode="create" />
    </AdminShell>
  );
}
