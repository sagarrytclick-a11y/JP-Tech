import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div
      className="min-h-screen bg-ink text-white"
      role="status"
      aria-label="Loading page"
    >
      <header className="border-b border-white/[0.06]">
        <div className="shell flex h-16 items-center justify-between gap-4 sm:h-[76px]">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="hidden items-center gap-6 md:flex">
            {[0, 1, 2, 3, 4].map((item) => (
              <Skeleton key={item} className="h-2.5 w-14" />
            ))}
          </div>
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </header>

      <main className="shell py-12 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <Skeleton className="h-7 w-44 rounded-full" />
            <div className="space-y-3">
              <Skeleton className="h-12 w-full max-w-[520px]" />
              <Skeleton className="h-12 w-[88%] max-w-[460px]" />
              <Skeleton className="h-12 w-[62%] max-w-[340px]" />
            </div>
            <div className="space-y-2.5 pt-2">
              <Skeleton className="h-3 w-full max-w-[440px]" />
              <Skeleton className="h-3 w-[80%] max-w-[380px]" />
            </div>
            <div className="flex flex-wrap gap-3 pt-3">
              <Skeleton className="h-11 w-36 rounded-lg" />
              <Skeleton className="h-11 w-32 rounded-lg" />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-[#131313] p-5">
            <Skeleton className="h-4 w-32" />
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-24 rounded-xl" />
              ))}
            </div>
            <Skeleton className="mt-4 h-10 w-full rounded-lg" />
          </div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((card) => (
            <div
              key={card}
              className="rounded-2xl border border-white/[0.07] bg-[#111111] p-5"
            >
              <Skeleton className="h-9 w-9 rounded-lg" />
              <Skeleton className="mt-4 h-4 w-40" />
              <div className="mt-3 space-y-2">
                <Skeleton className="h-2.5 w-full" />
                <Skeleton className="h-2.5 w-[85%]" />
                <Skeleton className="h-2.5 w-[60%]" />
              </div>
            </div>
          ))}
        </div>
      </main>

      <span className="sr-only">Loading page content</span>
    </div>
  );
}
