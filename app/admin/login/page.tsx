"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
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
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error || "Login failed");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#090909] px-4 py-10">
      <div className="w-full max-w-[460px]">
        <div className="rounded-[22px] border border-white/[0.08] bg-[#151515] px-6 py-8 shadow-[0_28px_80px_-30px_rgba(0,0,0,0.95)] sm:px-9 sm:py-9">
          <div className="flex flex-col items-center text-center">
            <span className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-white/10 bg-[#0b0b0b] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <Image
                src="/logo.png"
                alt="JP Technology"
                width={105}
                height={115}
                priority
                className="h-11 w-auto object-contain"
              />
            </span>
            <p className="mt-3 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35">
              JP Technology
            </p>
            <h1 className="mt-4 text-[28px] font-bold tracking-[-0.03em] text-white sm:text-[32px]">
              Admin login
            </h1>
            <p className="mt-2 max-w-[300px] text-[12.5px] leading-relaxed text-white/45">
              Use the username and password from your env file.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="admin-username"
                className="mb-2 block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/45"
              >
                Username
              </label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                className="h-[52px] w-full rounded-xl border border-white/[0.09] bg-[#1c1c1c] px-4 text-[13.5px] text-white outline-none transition placeholder:text-white/25 focus:border-accent/60 focus:bg-[#202020] focus:ring-2 focus:ring-accent/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-[10.5px] font-semibold uppercase tracking-[0.12em] text-white/45"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="h-[52px] w-full rounded-xl border border-white/[0.09] bg-[#1c1c1c] px-4 pr-12 text-[13.5px] text-white outline-none transition placeholder:text-white/25 focus:border-accent/60 focus:bg-[#202020] focus:ring-2 focus:ring-accent/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-white/30 transition-colors hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={16} aria-hidden="true" />
                  ) : (
                    <Eye size={16} aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/[0.07] px-3 py-2.5 text-[11.5px] text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-accent text-[13.5px] font-semibold text-white transition-colors hover:bg-accent-soft disabled:opacity-70"
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
      </div>
    </div>
  );
}
