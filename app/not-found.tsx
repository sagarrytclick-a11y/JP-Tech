import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="text-7xl font-semibold text-accent">404</div>
        <h1 className="mt-5 text-3xl font-semibold text-white">Page not found</h1>
        <p className="mt-3 text-white/60">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn-primary mt-8 w-full sm:w-auto">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
