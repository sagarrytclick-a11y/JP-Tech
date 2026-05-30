"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">!</span>
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 mb-3">Something Went Wrong</h1>
        <p className="text-zinc-500 mb-8">An unexpected error occurred. Please try again.</p>
        <button
          onClick={reset}
          className="bg-[#1e3a5a] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#152d45] transition-colors cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
