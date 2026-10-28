import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | JP Technology",
  description: "Manage enquiries, blog posts, and publishing.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
