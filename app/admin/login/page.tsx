"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }
      router.push('/admin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a2540] to-[#1e3a5a] flex items-center justify-center px-4">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1e3a5a] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FaLock className="text-amber-400 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">Admin Login</h1>
          <p className="text-zinc-500 text-sm mt-1">Sign in to manage enquiries</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@jptechnologies.com"
                className="w-full pl-10 pr-4 py-3 border border-zinc-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-black"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 border border-zinc-200 rounded-xl outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full" /> {error}
            </p>
          )}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1e3a5a] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#152d45] transition-colors disabled:opacity-70"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <><FaSpinner className="animate-spin" /> Signing in...</> : <>Sign In <FaLock /></>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
