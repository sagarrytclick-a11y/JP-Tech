"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import Logo from "@/components/site/Logo";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
  { label: "Blog posts", href: "/admin/blogs", icon: FileText },
];

export default function AdminShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const navLinks = (
    <nav className="space-y-1">
      {nav.map(({ label, href, icon: Icon, exact }) => {
        const active = isActive(href, exact);
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-colors ${
              active
                ? "bg-white/[0.07] text-white ring-1 ring-white/[0.06]"
                : "text-white/50 hover:bg-white/[0.03] hover:text-white"
            }`}
          >
            <Icon
              size={16}
              strokeWidth={1.8}
              className={active ? "text-accent" : "text-white/35 group-hover:text-white/70"}
              aria-hidden="true"
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-ink text-white">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-[252px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0a0a0a] lg:flex">
          <div className="flex h-[88px] items-center px-5">
            <Logo />
          </div>

          <div className="px-3">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
              Manage
            </p>
            {navLinks}
          </div>

          <div className="mt-auto border-t border-white/[0.07] p-3">
            <div className="mb-2 flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[10.5px] font-bold tracking-[-0.02em] text-white">
                JP
              </span>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-medium text-white/80">
                  Administrator
                </p>
                <p className="truncate text-[10.5px] text-white/30">
                  JP Technology
                </p>
              </div>
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/50 transition-colors hover:bg-white/[0.03] hover:text-white"
            >
              <ArrowUpRight size={15} className="text-white/35" aria-hidden="true" />
              View website
            </Link>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-ink/85 backdrop-blur-xl">
            <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/70 transition-colors hover:border-white/25 hover:text-white lg:hidden"
                aria-label="Open admin menu"
              >
                <Menu size={16} aria-hidden="true" />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-[15px] font-semibold tracking-[-0.01em] text-white sm:text-[16px]">
                  {title}
                </h1>
                <p className="truncate text-[11.5px] text-white/40">{subtitle}</p>
              </div>

              <div className="ml-auto flex items-center gap-2">
                {actions}
                <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-semibold text-white/65 sm:inline-flex">
                  <ShieldCheck size={12} aria-hidden="true" />
                  Admin
                </span>
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-[11px] font-bold tracking-[-0.02em] text-white"
                  title="JP Technology admin"
                >
                  JP
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/50 transition-colors hover:border-white/25 hover:text-white"
                  aria-label="Log out"
                  title="Log out"
                >
                  <LogOut size={15} aria-hidden="true" />
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close admin menu"
          />
          <aside className="relative flex h-full w-[280px] flex-col border-r border-white/10 bg-[#0a0a0a] p-4 shadow-2xl">
            <div className="flex items-center justify-between px-1 pb-5">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-white/50 hover:bg-white/5 hover:text-white"
                aria-label="Close menu"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/25">
              Manage
            </p>
            {navLinks}

            <div className="mt-auto border-t border-white/[0.07] pt-3">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium text-white/50 transition-colors hover:bg-white/[0.03] hover:text-white"
              >
                <ArrowUpRight size={15} aria-hidden="true" />
                View website
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-white/50 transition-colors hover:bg-white/[0.03] hover:text-white"
              >
                <LogOut size={15} aria-hidden="true" />
                Log out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
