import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-extrabold text-[#1e3a5a] mb-4">404</div>
        <h1 className="text-3xl font-extrabold text-zinc-900 mb-3">Page Not Found</h1>
        <p className="text-zinc-500 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#1e3a5a] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#152d45] transition-colors"
        >
          <FaHome /> Back to Home
        </Link>
      </div>
    </div>
  );
}
