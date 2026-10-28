"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Inbox,
  Loader2,
  Mail,
  Phone,
  Search,
  Trash2,
  X,
} from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import { useAdminAuth } from "@/hooks/useAdminAuth";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  city?: string;
  service: string;
  industry?: string;
  budget?: string;
  message?: string;
  status: string;
  createdAt: string;
};

type Counts = {
  all: number;
  pending: number;
  resolved: number;
  follow: number;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
};

const TABS = [
  { value: "", label: "All", key: "all" as const },
  { value: "pending", label: "Pending", key: "pending" as const },
  { value: "follow", label: "Follow up", key: "follow" as const },
  { value: "resolved", label: "Resolved", key: "resolved" as const },
];

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-300 ring-amber-400/20",
  resolved: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20",
  follow: "bg-sky-500/10 text-sky-300 ring-sky-400/20",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  resolved: "Resolved",
  follow: "Follow up",
};

const PAGE_SIZES = [10, 25, 50];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminEnquiriesPage() {
  const checking = useAdminAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [counts, setCounts] = useState<Counts>({
    all: 0,
    pending: 0,
    resolved: 0,
    follow: 0,
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasPrev: false,
    hasNext: false,
  });
  const [statusFilter, setStatusFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const next = searchInput.trim();
    if (next === query) return;

    const timer = window.setTimeout(() => {
      setQuery(next);
      setPage(1);
      setLoading(true);
      setError("");
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput, query]);

  useEffect(() => {
    if (checking) return;

    let active = true;
    const controller = new AbortController();

    const params = new URLSearchParams({
      page: String(page),
      limit: String(pageSize),
    });
    if (statusFilter) params.set("status", statusFilter);
    if (query) params.set("q", query);

    fetch(`/api/enquiries?${params}`, {
      signal: controller.signal,
      cache: "no-store",
    })
      .then(async (response) => {
        if (response.status === 401) {
          window.location.href = "/admin/login";
          return null;
        }
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Could not load enquiries.");
        }
        return data as {
          enquiries: Enquiry[];
          counts: Counts;
          pagination: Pagination;
        };
      })
      .then((data) => {
        if (!active || !data) return;
        setEnquiries(data.enquiries ?? []);
        if (data.counts) setCounts(data.counts);
        if (data.pagination) {
          setPagination(data.pagination);
          if (data.pagination.page !== page) setPage(data.pagination.page);
        }
      })
      .catch((loadError) => {
        if (!active) return;
        if (loadError instanceof DOMException && loadError.name === "AbortError") {
          return;
        }
        setError(
          loadError instanceof Error ? loadError.message : "Could not load enquiries."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [checking, page, pageSize, statusFilter, query, reloadKey]);

  const refreshCounts = useCallback(async () => {
    try {
      const response = await fetch("/api/enquiries?limit=5", { cache: "no-store" });
      if (!response.ok) return;
      const data = (await response.json()) as { counts?: Counts };
      if (data.counts) setCounts(data.counts);
    } catch {
      // best effort — the table stays authoritative
    }
  }, []);

  const updateStatus = async (enquiry: Enquiry, status: string) => {
    if (enquiry.status === status) return;
    const previous = enquiry.status;

    setUpdatingId(enquiry._id);
    setError("");
    setNotice("");
    setEnquiries((current) =>
      current.map((item) =>
        item._id === enquiry._id ? { ...item, status } : item
      )
    );

    try {
      const response = await fetch(`/api/enquiries/${enquiry._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Could not update the enquiry.");
      }
      setNotice(`Marked ${enquiry.name} as ${statusLabels[status]}.`);
      await refreshCounts();
    } catch (updateError) {
      setEnquiries((current) =>
        current.map((item) =>
          item._id === enquiry._id ? { ...item, status: previous } : item
        )
      );
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Could not update the enquiry."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteEnquiry = async (enquiry: Enquiry) => {
    if (!window.confirm(`Delete the enquiry from "${enquiry.name}" permanently?`)) {
      return;
    }

    setDeletingId(enquiry._id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/enquiries/${enquiry._id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not delete the enquiry.");

      const removingLast = enquiries.length === 1 && page > 1;
      setEnquiries((current) => current.filter((item) => item._id !== enquiry._id));
      setNotice("Enquiry deleted.");
      if (removingLast) {
        setLoading(true);
        setPage((current) => Math.max(1, current - 1));
      } else {
        setReloadKey((key) => key + 1);
      }
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete the enquiry."
      );
    } finally {
      setDeletingId(null);
    }
  };

  const pages = useMemo(() => {
    const total = pagination.totalPages || 1;
    const current = pagination.page || 1;
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    const end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }, [pagination.totalPages, pagination.page]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-white/40">
        <Loader2 className="animate-spin" size={22} aria-label="Loading" />
      </div>
    );
  }

  const start = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
  const end = Math.min(pagination.page * pagination.limit, pagination.total);

  return (
    <AdminShell
      title="Enquiries"
      subtitle="Contact form submissions and follow-ups"
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-[26px] font-semibold tracking-[-0.025em] text-white sm:text-[30px]">
            Enquiries
          </h2>
          <p className="mt-1.5 text-[12.5px] text-white/40 sm:text-[13px]">
            Every submission from the contact form, sorted newest first.
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-white/50">
          {counts.all} total
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((tab) => {
          const active = statusFilter === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => {
                if (statusFilter === tab.value) return;
                setStatusFilter(tab.value);
                setPage(1);
                setLoading(true);
                setError("");
              }}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-medium transition-colors ${
                active
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white"
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums ${
                  active ? "bg-accent/15 text-accent" : "bg-white/[0.06] text-white/40"
                }`}
              >
                {counts[tab.key]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative block w-full sm:max-w-[340px]">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search name, email, phone, service..."
            className="h-10 w-full rounded-lg border border-white/[0.08] bg-white/[0.02] pl-9 pr-9 text-[12.5px] text-white outline-none transition placeholder:text-white/25 focus:border-accent/50 focus:bg-white/[0.04]"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-white/30 hover:text-white"
              aria-label="Clear search"
            >
              <X size={13} aria-hidden="true" />
            </button>
          )}
        </label>

        <label className="relative inline-flex items-center">
          <span className="sr-only">Rows per page</span>
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.target.value));
              setPage(1);
              setLoading(true);
              setError("");
            }}
            className="h-10 appearance-none rounded-lg border border-white/[0.08] bg-white/[0.02] pl-3 pr-8 text-[12px] text-white/60 outline-none transition focus:border-accent/50"
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size} className="bg-[#141414]">
                {size} / page
              </option>
            ))}
          </select>
          <ChevronDown
            size={13}
            className="pointer-events-none absolute right-2.5 text-white/30"
            aria-hidden="true"
          />
        </label>

        <p className="text-[11px] text-white/30 sm:ml-auto">
          {pagination.total === 0
            ? "No results"
            : `Showing ${start}–${end} of ${pagination.total}`}
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[12px] text-red-300">
          {error}
          <span className="mt-1 block text-[11px] text-red-300/70">
            If this mentions the database, check <code>MONGODB_URI</code> and that
            MongoDB is reachable.
          </span>
        </div>
      )}

      {notice && (
        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-3 text-[12px] text-emerald-300">
          {notice}
        </div>
      )}

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131313]">
        <div className="hidden grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_120px_110px_150px] gap-4 border-b border-white/[0.07] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 lg:grid">
          <span>Contact</span>
          <span>Service</span>
          <span>Status</span>
          <span>Received</span>
          <span className="text-right">Actions</span>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {[0, 1, 2, 3, 4].map((row) => (
              <div key={row} className="h-14 animate-pulse rounded-xl bg-white/[0.04]" />
            ))}
          </div>
        ) : enquiries.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <Inbox className="mx-auto text-white/15" size={26} aria-hidden="true" />
            <p className="mt-3 text-[13px] font-medium text-white/60">
              {query || statusFilter
                ? "No enquiries match these filters"
                : "No enquiries yet"}
            </p>
            <p className="mt-1 text-[11.5px] text-white/30">
              {query || statusFilter
                ? "Try clearing the search or switching tabs."
                : "New submissions from the contact form will show up here."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {enquiries.map((enquiry) => {
              const expanded = expandedId === enquiry._id;
              return (
                <li key={enquiry._id} className="transition-colors hover:bg-white/[0.02]">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_120px_110px_150px] lg:gap-4 lg:px-5">
                    <div className="col-span-2 flex min-w-0 items-center gap-3 lg:col-span-1">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10.5px] font-semibold text-white/70">
                        {initials(enquiry.name)}
                      </span>
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(expanded ? null : enquiry._id)
                          }
                          className="flex max-w-full items-center gap-1.5 text-left"
                          aria-expanded={expanded}
                        >
                          <span className="truncate text-[12.5px] font-medium text-white">
                            {enquiry.name}
                          </span>
                          <ChevronDown
                            size={12}
                            className={`shrink-0 text-white/25 transition-transform ${
                              expanded ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          />
                        </button>
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="mt-0.5 block truncate text-[11px] text-white/35 transition-colors hover:text-accent"
                        >
                          {enquiry.email}
                        </a>
                      </div>
                    </div>

                    <div className="col-span-2 min-w-0 lg:col-span-1">
                      <span className="truncate rounded-full bg-white/[0.04] px-2.5 py-1 text-[10.5px] font-medium text-white/55">
                        {enquiry.service || "General"}
                      </span>
                      <span className="ml-2 inline-flex items-center gap-1.5 align-middle text-[11px] text-white/30 lg:hidden">
                        {formatDate(enquiry.createdAt)}
                      </span>
                    </div>

                    <div className="lg:block">
                      <div className="relative inline-flex items-center">
                        <select
                          value={enquiry.status}
                          onChange={(event) =>
                            updateStatus(enquiry, event.target.value)
                          }
                          disabled={updatingId === enquiry._id}
                          aria-label={`Status for ${enquiry.name}`}
                          className={`h-7 appearance-none rounded-full pl-2.5 pr-7 text-[10px] font-semibold uppercase tracking-[0.06em] ring-1 ring-inset outline-none transition disabled:opacity-60 ${
                            statusStyles[enquiry.status] || statusStyles.pending
                          }`}
                        >
                          <option value="pending" className="bg-[#141414] text-white">
                            Pending
                          </option>
                          <option value="follow" className="bg-[#141414] text-white">
                            Follow up
                          </option>
                          <option value="resolved" className="bg-[#141414] text-white">
                            Resolved
                          </option>
                        </select>
                        {updatingId === enquiry._id ? (
                          <Loader2
                            size={11}
                            className="pointer-events-none absolute right-2 animate-spin"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDown
                            size={11}
                            className="pointer-events-none absolute right-2 opacity-60"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>

                    <span className="hidden whitespace-nowrap text-[11px] text-white/30 lg:block">
                      {formatDate(enquiry.createdAt)}
                    </span>

                    <div className="flex items-center justify-end gap-1.5 lg:col-start-5 lg:row-start-1">
                      <a
                        href={`mailto:${enquiry.email}`}
                        title="Email"
                        className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-colors hover:border-white/20 hover:text-white"
                      >
                        <Mail size={13} aria-hidden="true" />
                      </a>
                      <a
                        href={`tel:${enquiry.phone}`}
                        title="Call"
                        className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-colors hover:border-white/20 hover:text-white"
                      >
                        <Phone size={13} aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={() => deleteEnquiry(enquiry)}
                        disabled={deletingId === enquiry._id}
                        title="Delete"
                        className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-50"
                      >
                        {deletingId === enquiry._id ? (
                          <Loader2 size={13} className="animate-spin" aria-hidden="true" />
                        ) : (
                          <Trash2 size={13} aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="border-t border-white/[0.06] bg-white/[0.015] px-4 py-4 lg:px-5">
                      <div className="grid gap-3 text-[11.5px] sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-white/25">
                            Phone
                          </p>
                          <p className="mt-1 text-white/70">{enquiry.phone || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-white/25">
                            Service
                          </p>
                          <p className="mt-1 text-white/70">
                            {enquiry.service || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-white/25">
                            Budget
                          </p>
                          <p className="mt-1 text-white/70">
                            {enquiry.budget || enquiry.industry || "—"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-white/25">
                            Received
                          </p>
                          <p className="mt-1 text-white/70">
                            {formatDate(enquiry.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="text-[10px] uppercase tracking-[0.12em] text-white/25">
                          Message
                        </p>
                        <p className="mt-1.5 whitespace-pre-wrap text-[12px] leading-relaxed text-white/60">
                          {enquiry.message || "No message provided."}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {!loading && pagination.total > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] px-4 py-3 lg:px-5">
            <button
              type="button"
              onClick={() => {
                setPage((current) => Math.max(1, current - 1));
                setLoading(true);
              }}
              disabled={!pagination.hasPrev || loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-[11.5px] font-medium text-white/55 transition-colors hover:border-white/25 hover:text-white disabled:opacity-35"
            >
              <ChevronLeft size={13} aria-hidden="true" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {pages[0] > 1 && (
                <span className="px-1 text-[11px] text-white/25">…</span>
              )}
              {pages.map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => {
                  if (pageNumber === pagination.page) return;
                  setPage(pageNumber);
                  setLoading(true);
                }}
                  aria-current={
                    pageNumber === pagination.page ? "page" : undefined
                  }
                  className={`h-7 min-w-7 rounded-md px-1.5 text-[11.5px] font-medium tabular-nums transition-colors ${
                    pageNumber === pagination.page
                      ? "bg-accent text-white"
                      : "text-white/40 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
              {pages[pages.length - 1] < pagination.totalPages && (
                <span className="px-1 text-[11px] text-white/25">…</span>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setPage((current) =>
                  Math.min(pagination.totalPages, current + 1)
                );
                setLoading(true);
              }}
              disabled={!pagination.hasNext || loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-3 py-1.5 text-[11.5px] font-medium text-white/55 transition-colors hover:border-white/25 hover:text-white disabled:opacity-35"
            >
              Next
              <ChevronRight size={13} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
