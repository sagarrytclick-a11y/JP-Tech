"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <span className="text-6xl font-semibold text-accent">!</span>
        <h1 className="mt-5 text-3xl font-semibold text-white">
          Something went wrong
        </h1>
        <p className="mt-3 text-white/60">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="btn-primary mt-8 w-full sm:w-auto"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
