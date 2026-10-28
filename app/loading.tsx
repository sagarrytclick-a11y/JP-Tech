export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink">
      <div className="text-center">
        <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-accent" />
        <p className="mt-4 text-sm text-white/60">Loading...</p>
      </div>
    </div>
  );
}
