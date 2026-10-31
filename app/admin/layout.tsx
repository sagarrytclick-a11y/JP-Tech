import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Manage enquiries, blog posts, and publishing.",
  alternates: { canonical: "/admin" },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
