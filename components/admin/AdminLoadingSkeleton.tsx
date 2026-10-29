import Skeleton from "@/components/ui/Skeleton";

/**
 * Full-page placeholder shown while the admin session is being verified.
 * Mirrors the admin shell so the layout does not jump when the real page loads.
 */
export default function AdminLoadingSkeleton() {
  return (
    <div
      className="min-h-screen bg-ink text-white"
      role="status"
      aria-label="Loading admin"
    >
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-[252px] shrink-0 flex-col border-r border-white/[0.07] bg-[#0a0a0a] p-5 lg:flex">
          <div className="flex h-[48px] items-center gap-2.5">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="mt-6 space-y-2.5">
            <Skeleton className="h-2.5 w-16" />
            {[0, 1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-10 w-full rounded-xl" />
            ))}
          </div>

          <div className="mt-auto space-y-3">
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-9 w-full rounded-xl" />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="border-b border-white/[0.07] bg-ink/85">
            <div className="flex items-center gap-3 px-4 py-5 sm:px-6 lg:px-8">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-2.5 w-48" />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1440px] space-y-6 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="space-y-3">
              <Skeleton className="h-7 w-56" />
              <Skeleton className="h-3 w-72 max-w-full" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {[0, 1, 2, 3].map((card) => (
                <div
                  key={card}
                  className="rounded-2xl border border-white/[0.08] bg-[#131313] p-4 sm:p-5"
                >
                  <Skeleton className="h-2.5 w-20" />
                  <Skeleton className="mt-5 h-8 w-12" />
                  <Skeleton className="mt-3 h-2.5 w-24" />
                </div>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131313]">
              <div className="border-b border-white/[0.07] px-5 py-4">
                <Skeleton className="h-3.5 w-40" />
              </div>
              <div className="space-y-3 p-5">
                {[0, 1, 2, 3, 4].map((row) => (
                  <Skeleton key={row} className="h-12 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      <span className="sr-only">Loading admin dashboard</span>
    </div>
  );
}
