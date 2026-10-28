"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import Logo from "@/components/site/Logo";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Login failed");
      }
      router.push("/admin");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4 py-12">
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]"
        aria-hidden="true"
      />

      <motion.div
        className="relative w-full max-w-[400px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-7 flex flex-col items-center text-center">
          <Logo />
          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">
            <ShieldCheck size={11} aria-hidden="true" />
            Admin console
          </span>
          <h1 className="mt-4 text-[22px] font-semibold tracking-[-0.02em] text-white">
            Sign in to continue
          </h1>
          <p className="mt-1 text-[12.5px] text-white/40">
            Manage enquiries, blog posts, and publishing.
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.08] bg-[#121212]/95 p-6 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40"
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                  aria-hidden="true"
                />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@jptechnology.com"
                  autoComplete="email"
                  className="h-11 w-full rounded-xl border border-white/[0.09] bg-white/[0.02] pl-10 pr-4 text-[13px] text-white outline-none transition placeholder:text-white/25 focus:border-accent/50 focus:bg-white/[0.04]"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-white/40"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={15}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                  aria-hidden="true"
                />
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="h-11 w-full rounded-xl border border-white/[0.09] bg-white/[0.02] pl-10 pr-11 text-[13px] text-white outline-none transition placeholder:text-white/25 focus:border-accent/50 focus:bg-white/[0.04]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/30 transition-colors hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={15} aria-hidden="true" />
                  ) : (
                    <Eye size={15} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/[0.07] px-3 py-2 text-[11.5px] text-red-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-accent text-[12.5px] font-semibold text-white transition-colors hover:bg-accent-soft disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <div className="mt-5 flex items-center justify-between text-[11px] text-white/30">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white/70"
          >
            <ArrowLeft size={12} aria-hidden="true" />
            Back to website
          </Link>
          <span>&copy; {new Date().getFullYear()} JP Technology</span>
        </div>
      </motion.div>
    </div>
  );
}
