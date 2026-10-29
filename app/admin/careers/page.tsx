"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  Phone,
  Search,
  Trash2,
  X,
} from "lucide-react";
import AdminLoadingSkeleton from "@/components/admin/AdminLoadingSkeleton";
import AdminShell from "@/components/admin/AdminShell";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Pagination from "@/components/ui/Pagination";
import Skeleton from "@/components/ui/Skeleton";
import { useAdminAuth } from "@/hooks/useAdminAuth";

type Application = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  resumeUrl: string;
  resumeName?: string;
  resumeProvider?: string;
  status: "new" | "shortlisted" | "rejected";
  createdAt: string;
};

type Counts = {
  all: number;
  new: number;
  shortlisted: number;
  rejected: number;
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
  { value: "new", label: "New", key: "new" as const },
  { value: "shortlisted", label: "Shortlisted", key: "shortlisted" as const },
  { value: "rejected", label: "Rejected", key: "rejected" as const },
];

const statusStyles: Record<string, string> = {
  new: "bg-amber-500/10 text-amber-300 ring-amber-400/20",
  shortlisted: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20",
  rejected: "bg-red-500/10 text-red-300 ring-red-400/20",
};

const statusLabels: Record<string, string> = {
  new: "New",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
};

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

export default function AdminCareersPage() {
  const checking = useAdminAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [counts, setCounts] = useState<Counts>({
    all: 0,
    new: 0,
    shortlisted: 0,
    rejected: 0,
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<Application | null>(null);
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
      limit: "10",
    });
    if (statusFilter) params.set("status", statusFilter);
    if (query) params.set("q", query);

    fetch(`/api/careers?${params}`, {
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
          throw new Error(data.error || "Could not load applications.");
        }
        return data as {
          applications: Application[];
          counts: Counts;
          pagination: Pagination;
        };
      })
      .then((data) => {
        if (!active || !data) return;
        setApplications(data.applications ?? []);
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
          loadError instanceof Error
            ? loadError.message
            : "Could not load applications."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [checking, page, statusFilter, query, reloadKey]);

  const updateStatus = async (application: Application, status: Application["status"]) => {
    if (application.status === status) return;
    const previous = application.status;

    setUpdatingId(application._id);
    setError("");
    setNotice("");
    setApplications((current) =>
      current.map((item) =>
        item._id === application._id ? { ...item, status } : item
      )
    );

    try {
      const response = await fetch(`/api/careers/${application._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Could not update the application.");
      }
      setNotice(`${application.fullName} marked as ${statusLabels[status]}.`);
    } catch (updateError) {
      setApplications((current) =>
        current.map((item) =>
          item._id === application._id ? { ...item, status: previous } : item
        )
      );
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Could not update the application."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteApplication = async () => {
    if (!pendingDelete) return;
    const application = pendingDelete;

    setDeletingId(application._id);
    setError("");
    setNotice("");

    try {
      const response = await fetch(`/api/careers/${application._id}`, {
        method: "DELETE",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Could not delete the application.");
      }
      setApplications((current) =>
        current.filter((item) => item._id !== application._id)
      );
      setNotice("Application deleted.");
      setPendingDelete(null);
      setReloadKey((key) => key + 1);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Could not delete the application."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (checking) {
    return <AdminLoadingSkeleton />;
  }

  return (
    <AdminShell
      title="Career applications"
      subtitle="Review candidates and move them through the hiring flow"
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-[26px] font-semibold tracking-[-0.025em] text-white sm:text-[30px]">
            Career applications
          </h2>
          <p className="mt-1.5 text-[12.5px] text-white/40 sm:text-[13px]">
            {counts.all} application{counts.all === 1 ? "" : "s"} &middot;{" "}
            {counts.new} new &middot; {counts.shortlisted} shortlisted
          </p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-white/50">
          Careers
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
                className={`rounded-full px-1.5 text-[10px] font-semibold tabular-nums ${
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
        <label className="relative block w-full sm:max-w-[360px]">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search name, email, phone, role..."
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
        <p className="text-[11px] text-white/30 sm:ml-auto">
          Resumes are stored securely in ImageKit.
        </p>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[12px] text-red-300">
          {error}
          <span className="mt-1 block text-[11px] text-red-300/70">
            Career storage needs MongoDB. Check <code>MONGODB_URI</code> and reload.
          </span>
        </div>
      )}

      {notice && (
        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-3 text-[12px] text-emerald-300">
          {notice}
        </div>
      )}

      <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131313]">
        <div className="hidden grid-cols-[minmax(0,1fr)_170px_120px_105px_120px] gap-4 border-b border-white/[0.07] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30 lg:grid">
          <span>Applicant</span>
          <span>Position</span>
          <span>Status</span>
          <span>Applied</span>
          <span className="text-right">Actions</span>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {[0, 1, 2, 3].map((row) => (
              <Skeleton key={row} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <BriefcaseBusiness
              className="mx-auto text-white/15"
              size={26}
              aria-hidden="true"
            />
            <p className="mt-3 text-[13px] font-medium text-white/60">
              {counts.all === 0
                ? "No applications yet"
                : "No applications match these filters"}
            </p>
            <p className="mt-1 text-[11.5px] text-white/30">
              {counts.all === 0
                ? "Applications from /careers will appear here."
                : "Try a different search or tab."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {applications.map((application) => {
              const expanded = expandedId === application._id;
              return (
                <li key={application._id}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 transition-colors hover:bg-white/[0.02] lg:grid-cols-[minmax(0,1fr)_170px_120px_105px_120px] lg:gap-4 lg:px-5">
                    <button
                      type="button"
                      onClick={() => setExpandedId(expanded ? null : application._id)}
                      className="col-span-2 flex min-w-0 items-center gap-3 text-left lg:col-span-1"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10.5px] font-semibold text-white/70">
                        {initials(application.fullName)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[12.5px] font-medium text-white">
                          {application.fullName}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-white/30">
                          {application.email}
                        </span>
                        <span className="mt-1 flex items-center gap-2 text-[10.5px] text-white/35 lg:hidden">
                          {application.position}
                          <span className="h-1 w-1 rounded-full bg-white/20" />
                          {formatDate(application.createdAt)}
                        </span>
                      </span>
                      <ChevronDown
                        size={14}
                        className={`ml-auto shrink-0 text-white/25 transition-transform lg:hidden ${
                          expanded ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <span className="hidden truncate text-[11.5px] text-white/50 lg:block">
                      {application.position}
                    </span>

                    <div className="lg:col-start-3">
                      <select
                        value={application.status}
                        onChange={(event) =>
                          updateStatus(
                            application,
                            event.target.value as Application["status"]
                          )
                        }
                        disabled={updatingId === application._id}
                        className={`w-fit appearance-none rounded-full px-2.5 py-1 text-[10px] font-semibold outline-none ring-1 ring-inset transition-colors ${
                          statusStyles[application.status] || statusStyles.new
                        }`}
                        aria-label={`Status for ${application.fullName}`}
                      >
                        <option value="new" className="bg-[#141414] text-white">
                          New
                        </option>
                        <option
                          value="shortlisted"
                          className="bg-[#141414] text-white"
                        >
                          Shortlisted
                        </option>
                        <option value="rejected" className="bg-[#141414] text-white">
                          Rejected
                        </option>
                      </select>
                    </div>

                    <span className="hidden whitespace-nowrap text-[11px] text-white/30 lg:block">
                      {formatDate(application.createdAt)}
                    </span>

                    <div className="flex items-center justify-end gap-1.5 lg:col-start-5 lg:row-start-1">
                      <a
                        href={application.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Open resume"
                        className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-colors hover:border-white/20 hover:text-white"
                      >
                        <FileText size={13} aria-hidden="true" />
                      </a>
                      <a
                        href={`mailto:${application.email}`}
                        title="Email"
                        className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-colors hover:border-white/20 hover:text-white"
                      >
                        <Mail size={13} aria-hidden="true" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(application)}
                        disabled={deletingId === application._id}
                        title="Delete"
                        className="rounded-lg border border-white/[0.08] p-2 text-white/35 transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-50"
                      >
                        {deletingId === application._id ? (
                          <Loader2 size={13} className="animate-spin" aria-hidden="true" />
                        ) : (
                          <Trash2 size={13} aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </div>

                  {expanded && (
                    <div className="border-t border-white/[0.06] bg-white/[0.015] px-4 py-4 lg:px-5">
                      <div className="grid gap-3 text-[11.5px] sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-white/25">
                            Phone
                          </p>
                          <a
                            href={`tel:${application.phone}`}
                            className="mt-1 inline-flex items-center gap-1.5 text-white/70 hover:text-white"
                          >
                            <Phone size={11} aria-hidden="true" />
                            {application.phone}
                          </a>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-white/25">
                            Resume
                          </p>
                          <a
                            href={application.resumeUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-1 inline-flex items-center gap-1.5 text-accent hover:text-accent-soft"
                          >
                            <ExternalLink size={11} aria-hidden="true" />
                            {application.resumeName || "Open PDF"}
                          </a>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.12em] text-white/25">
                            Storage
                          </p>
                          <p className="mt-1 text-white/50">ImageKit</p>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {!loading && pagination.total > 0 && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
            onPageChange={(next) => {
              setPage(next);
              setLoading(true);
            }}
            loading={loading}
            itemLabel="applications"
            className="border-t border-white/[0.07] px-4 py-3 lg:px-5"
          />
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this application?"
        description={
          pendingDelete ? (
            <>
              The application from{" "}
              <span className="font-medium text-white/70">
                {pendingDelete.fullName}
              </span>{" "}
              will be removed permanently. This cannot be undone.
            </>
          ) : null
        }
        confirmLabel="Delete application"
        loading={deletingId === pendingDelete?._id}
        onConfirm={deleteApplication}
        onCancel={() => {
          if (!deletingId) setPendingDelete(null);
        }}
      />
    </AdminShell>
  );
}
