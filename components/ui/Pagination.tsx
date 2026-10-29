"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  pageSizes?: number[];
  loading?: boolean;
  itemLabel?: string;
  className?: string;
};

function getPageWindow(current: number, total: number) {
  const windowSize = 5;
  let start = Math.max(1, current - Math.floor(windowSize / 2));
  const end = Math.min(total, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export default function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onLimitChange,
  pageSizes = [10, 25, 50],
  loading = false,
  itemLabel = "results",
  className = "",
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const currentPage = Math.min(Math.max(1, page), safeTotalPages);
  const pages = getPageWindow(currentPage, safeTotalPages);
  const start = total === 0 ? 0 : (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, total);

  const goTo = (next: number) => {
    const clamped = Math.min(Math.max(1, next), safeTotalPages);
    if (clamped === currentPage || loading) return;
    onPageChange(clamped);
  };

  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-[11px] text-white/35">
          {total === 0
            ? `No ${itemLabel}`
            : `Showing ${start}–${end} of ${total} ${itemLabel}`}
        </p>

        {onLimitChange && (
          <label className="relative inline-flex items-center">
            <span className="sr-only">Rows per page</span>
            <select
              value={limit}
              onChange={(event) => {
                onLimitChange(Number(event.target.value));
                onPageChange(1);
              }}
              disabled={loading}
              className="h-8 appearance-none rounded-lg border border-white/[0.08] bg-white/[0.02] pl-2.5 pr-7 text-[11px] text-white/60 outline-none transition hover:border-white/20 focus:border-accent/50 disabled:opacity-50"
            >
              {pageSizes.map((size) => (
                <option key={size} value={size} className="bg-[#141414]">
                  {size} / page
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="pointer-events-none absolute right-2 text-white/30"
              aria-hidden="true"
            />
          </label>
        )}
      </div>

      {safeTotalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex items-center justify-between gap-2 sm:justify-end"
        >
          <button
            type="button"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 text-[11.5px] font-medium text-white/55 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.04] hover:text-white active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft size={13} aria-hidden="true" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-1">
            {pages[0] > 1 && (
              <span className="px-1 text-[11px] text-white/25" aria-hidden="true">
                …
              </span>
            )}

            {pages.map((pageNumber) => {
              const active = pageNumber === currentPage;
              return (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => goTo(pageNumber)}
                  aria-current={active ? "page" : undefined}
                  disabled={loading}
                  className={`h-8 min-w-8 rounded-lg px-1.5 text-[11.5px] font-semibold tabular-nums transition-all duration-200 active:scale-95 ${
                    active
                      ? "bg-accent text-white shadow-[0_8px_20px_-10px_rgba(255,77,31,0.9)]"
                      : "text-white/40 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}

            {pages[pages.length - 1] < safeTotalPages && (
              <span className="px-1 text-[11px] text-white/25" aria-hidden="true">
                …
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === safeTotalPages || loading}
            className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-white/[0.08] px-2.5 text-[11.5px] font-medium text-white/55 transition-all duration-200 hover:border-white/25 hover:bg-white/[0.04] hover:text-white active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={13} aria-hidden="true" />
          </button>
        </nav>
      )}
    </div>
  );
}
