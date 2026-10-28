"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, FileText, Inbox, LogOut } from "lucide-react";

const links = [
  { label: "Enquiries", href: "/admin", icon: Inbox },
  { label: "Blog posts", href: "/admin/blogs", icon: FileText },
];

export default function AdminHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-4">
        <div className="mr-auto">
          <h1 className="text-lg font-bold text-zinc-900">{title}</h1>
          <p className="text-xs text-zinc-500">{subtitle}</p>
        </div>

        <nav className="flex items-center gap-1 rounded-xl bg-zinc-100 p-1">
          {links.map(({ label, href, icon: Icon }) => {
            const active =
              href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-white text-zinc-900 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                <Icon size={13} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-600 transition-colors hover:border-zinc-400"
        >
          View site
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-700"
        >
          <LogOut size={13} aria-hidden="true" />
          Logout
        </button>
      </div>
    </div>
  );
}
