"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock,
  FileText,
  Inbox,
  Plus,
  RotateCcw,
  Send,
} from "lucide-react";
import AdminLoadingSkeleton from "@/components/admin/AdminLoadingSkeleton";
import AdminShell from "@/components/admin/AdminShell";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import Skeleton from "@/components/ui/Skeleton";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import type { BlogPostView } from "@/lib/blog-seed";
import { formatBlogDate } from "@/lib/blog-theme";

type Enquiry = {
  _id: string;
  name: string;
  email: string;
  service: string;
  status: string;
  createdAt: string;
};

type Counts = {
  all: number;
  pending: number;
  resolved: number;
  follow: number;
};

type CareerApplication = {
  _id: string;
  fullName: string;
  email: string;
  position: string;
  status: "new" | "shortlisted" | "rejected";
  createdAt: string;
  resumeUrl: string;
};

type CareerCounts = {
  all: number;
  new: number;
  shortlisted: number;
  rejected: number;
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-300 ring-amber-400/20",
  resolved: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20",
  follow: "bg-sky-500/10 text-sky-300 ring-sky-400/20",
};

const careerStatusStyles: Record<string, string> = {
  new: "bg-amber-500/10 text-amber-300 ring-amber-400/20",
  shortlisted: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20",
  rejected: "bg-red-500/10 text-red-300 ring-red-400/20",
};

const careerStatusLabels: Record<string, string> = {
  new: "New",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  resolved: "Resolved",
  follow: "Follow up",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AdminDashboard() {
  const checking = useAdminAuth();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [counts, setCounts] = useState<Counts>({ all: 0, pending: 0, resolved: 0, follow: 0 });
  const [posts, setPosts] = useState<BlogPostView[]>([]);
  const [blogCounts, setBlogCounts] = useState({
    all: 0,
    published: 0,
    draft: 0,
  });
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [careerCounts, setCareerCounts] = useState<CareerCounts>({
    all: 0,
    new: 0,
    shortlisted: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (checking) return;

    let active = true;
    const controller = new AbortController();

    Promise.all([
      fetch("/api/enquiries?limit=5", { signal: controller.signal, cache: "no-store" }).then(
        async (response) => {
          if (response.status === 401) {
            window.location.href = "/admin/login";
            return null;
          }
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Could not load enquiries.");
          return data as { enquiries: Enquiry[]; counts: Counts };
        }
      ),
      fetch("/api/admin/blogs?limit=5", {
        signal: controller.signal,
        cache: "no-store",
      }).then(async (response) => {
        if (response.status === 401) {
          window.location.href = "/admin/login";
          return null;
        }
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load blog posts.");
        return data as {
          posts: BlogPostView[];
          counts: { all: number; published: number; draft: number };
        };
      }),
      fetch("/api/careers?limit=5", { signal: controller.signal, cache: "no-store" }).then(
        async (response) => {
          if (response.status === 401) {
            window.location.href = "/admin/login";
            return null;
          }
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || "Could not load career applications.");
          }
          return data as {
            applications: CareerApplication[];
            counts: CareerCounts;
          };
        }
      ),
    ])
      .then(([enquiryData, blogData, careerData]) => {
        if (!active) return;
        if (enquiryData) {
          setEnquiries(enquiryData.enquiries ?? []);
          if (enquiryData.counts) setCounts(enquiryData.counts);
        }
        if (blogData) {
          setPosts(blogData.posts ?? []);
          if (blogData.counts) setBlogCounts(blogData.counts);
        }
        if (careerData) {
          setApplications(careerData.applications ?? []);
          if (careerData.counts) setCareerCounts(careerData.counts);
        }
      })
      .catch((loadError) => {
        if (!active || (loadError instanceof DOMException && loadError.name === "AbortError")) {
          return;
        }
        setError(
          loadError instanceof Error ? loadError.message : "Could not load the dashboard."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [checking]);

  const published = blogCounts.published;
  const drafts = blogCounts.draft;
  const latestPost = posts[0];

  const stats = [
    {
      label: "Enquiries",
      value: counts.all,
      hint: "All time",
      href: "/admin/enquiries",
      icon: Inbox,
    },
    {
      label: "Pending",
      value: counts.pending,
      hint: "Needs a reply",
      href: "/admin/enquiries",
      icon: Clock,
    },
    {
      label: "Resolved",
      value: counts.resolved,
      hint: "Closed out",
      href: "/admin/enquiries",
      icon: CheckCircle2,
    },
    {
      label: "Follow up",
      value: counts.follow,
      hint: "In conversation",
      href: "/admin/enquiries",
      icon: RotateCcw,
    },
    {
      label: "Blog posts",
      value: blogCounts.all,
      hint: "In the database",
      href: "/admin/blogs",
      icon: FileText,
    },
    {
      label: "Published",
      value: published,
      hint: `${drafts} draft${drafts === 1 ? "" : "s"}`,
      href: "/admin/blogs",
      icon: Send,
    },
    {
      label: "Applications",
      value: careerCounts.all,
      hint: "Career pipeline",
      href: "/admin/careers",
      icon: BriefcaseBusiness,
    },
    {
      label: "New applicants",
      value: careerCounts.new,
      hint: `${careerCounts.shortlisted} shortlisted`,
      href: "/admin/careers",
      icon: Clock,
    },
  ];

  if (checking) {
    return <AdminLoadingSkeleton />;
  }

  return (
    <AdminShell
      title="Dashboard"
      subtitle="Overview of your enquiries and publishing"
      actions={
        <Link
          href="/admin/blogs"
          className="hidden items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-accent-soft sm:inline-flex"
        >
          <Plus size={13} aria-hidden="true" />
          New post
        </Link>
      }
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-[26px] font-semibold tracking-[-0.025em] text-white sm:text-[30px]">
            Dashboard
          </h2>
          <p className="mt-1.5 text-[12.5px] text-white/40 sm:text-[13px]">
            Enquiries, blog posts, and publishing &mdash; all in one place.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 text-[12px] font-medium text-white/65 transition-colors hover:border-accent/50 hover:text-accent"
        >
          Open website
          <ArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/[0.07] px-4 py-3 text-[12px] text-red-300">
          {error}
          <span className="mt-1 block text-[11px] text-red-300/70">
            If this mentions the database, check <code>MONGODB_URI</code> and that
            MongoDB is reachable.
          </span>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, hint, href, icon: Icon }, index) => (
          <Reveal key={label} delay={index * 45} className="h-full">
            <Link
              href={href}
              className="card-lift group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#131313] p-4 hover:border-accent/25 hover:bg-[#171717] sm:p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35 transition-colors group-hover:text-white/55">
                  {label}
                </p>
                <Icon
                  size={14}
                  className="shrink-0 text-white/20 transition-all duration-200 group-hover:scale-110 group-hover:text-accent"
                  aria-hidden="true"
                />
              </div>
              {loading ? (
                <Skeleton className="mt-5 h-8 w-12 rounded-md" />
              ) : (
                <p className="mt-4 text-[30px] font-semibold leading-none tracking-[-0.035em] text-white sm:mt-5 sm:text-[34px]">
                  <CountUp value={value} />
                </p>
              )}
              <p className="mt-2 text-[11px] text-white/30 transition-colors group-hover:text-white/45">
                {hint}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131313] self-start">
          <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4">
            <div>
              <h3 className="text-[13.5px] font-semibold text-white">Recent enquiries</h3>
              <p className="mt-0.5 text-[11px] text-white/35">
                The five latest contact form submissions.
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="shrink-0 text-[11.5px] font-medium text-white/45 transition-colors hover:text-accent"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3 p-5">
              {[0, 1, 2].map((row) => (
                <Skeleton key={row} className="h-11 w-full rounded-lg" />
              ))}
            </div>
          ) : enquiries.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <Inbox className="mx-auto text-white/15" size={24} aria-hidden="true" />
              <p className="mt-3 text-[13px] font-medium text-white/60">No enquiries yet</p>
              <p className="mt-1 text-[11.5px] text-white/30">
                New submissions from the contact form will show up here.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {enquiries.map((enquiry) => (
                <li
                  key={enquiry._id}
                  className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10.5px] font-semibold text-white/70">
                    {initials(enquiry.name)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium text-white">
                      {enquiry.name}
                    </p>
                    <p className="truncate text-[11px] text-white/35">{enquiry.email}</p>
                  </div>
                  <span className="hidden max-w-[150px] truncate text-[11px] text-white/40 sm:block">
                    {enquiry.service}
                  </span>
                  <span
                    className={`hidden shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset sm:inline-flex ${
                      statusStyles[enquiry.status] || statusStyles.pending
                    }`}
                  >
                    {statusLabels[enquiry.status] || enquiry.status}
                  </span>
                  <span className="hidden w-[76px] shrink-0 text-right text-[10.5px] text-white/30 md:block">
                    {new Date(enquiry.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="space-y-5">
          <section className="rounded-2xl border border-white/[0.08] bg-[#131313] p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[13.5px] font-semibold text-white">Publishing</h3>
              <Link
                href="/admin/blogs"
                className="text-[11.5px] font-medium text-white/45 transition-colors hover:text-accent"
              >
                Manage
              </Link>
            </div>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-[30px] font-semibold leading-none tracking-[-0.03em] text-white">
                  {loading ? "—" : published}
                </p>
                <p className="mt-1.5 text-[11px] text-white/35">
                  Live post{published === 1 ? "" : "s"} &middot; {drafts} draft
                  {drafts === 1 ? "" : "s"}
                </p>
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/50">
                {blogCounts.all} total
              </span>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-accent transition-[width] duration-500"
                style={{
                  width: blogCounts.all
                    ? `${Math.round((published / blogCounts.all) * 100)}%`
                    : "0%",
                }}
              />
            </div>

            {latestPost ? (
              <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3">
                <p className="text-[10px] uppercase tracking-[0.12em] text-white/25">
                  Latest
                </p>
                <p className="mt-1 line-clamp-1 text-[12px] font-medium text-white/80">
                  {latestPost.title}
                </p>
                <p className="mt-0.5 text-[10.5px] text-white/30">
                  {latestPost.published ? "Published" : "Draft"} &middot;{" "}
                  {formatBlogDate(latestPost.publishedAt)}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-[11.5px] text-white/30">
                No posts yet. Write one or import the starter articles.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-white/[0.08] bg-[#131313] p-5">
            <h3 className="text-[13.5px] font-semibold text-white">Quick actions</h3>
            <div className="mt-3 space-y-2">
              <Link
                href="/admin/enquiries"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
              >
                <Inbox size={15} className="text-white/35 group-hover:text-accent" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-white/85">Review enquiries</p>
                  <p className="text-[10.5px] text-white/30">
                    {counts.pending} pending
                  </p>
                </div>
                <ArrowUpRight size={13} className="text-white/25" aria-hidden="true" />
              </Link>

              <Link
                href="/admin/blogs"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
              >
                <FileText size={15} className="text-white/35 group-hover:text-accent" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-white/85">Write a post</p>
                  <p className="text-[10.5px] text-white/30">Publish to the journal</p>
                </div>
                <ArrowUpRight size={13} className="text-white/25" aria-hidden="true" />
              </Link>

              <Link
                href="/admin/careers"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
              >
                <BriefcaseBusiness size={15} className="text-white/35 group-hover:text-accent" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-white/85">Review applicants</p>
                  <p className="text-[10.5px] text-white/30">
                    {careerCounts.new} new application{careerCounts.new === 1 ? "" : "s"}
                  </p>
                </div>
                <ArrowUpRight size={13} className="text-white/25" aria-hidden="true" />
              </Link>

              <Link
                href="/"
                target="_blank"
                className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-3 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
              >
                <ArrowUpRight size={15} className="text-white/35 group-hover:text-accent" aria-hidden="true" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-medium text-white/85">Open website</p>
                  <p className="text-[10.5px] text-white/30">See the live journal</p>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <section className="mt-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131313]">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-4">
          <div>
            <h3 className="text-[13.5px] font-semibold text-white">
              Recent career applications
            </h3>
            <p className="mt-0.5 text-[11px] text-white/35">
              The five latest candidates from the careers page.
            </p>
          </div>
          <Link
            href="/admin/careers"
            className="shrink-0 text-[11.5px] font-medium text-white/45 transition-colors hover:text-accent"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {[0, 1, 2].map((row) => (
              <Skeleton key={row} className="h-11 w-full rounded-lg" />
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <BriefcaseBusiness
              className="mx-auto text-white/15"
              size={24}
              aria-hidden="true"
            />
            <p className="mt-3 text-[13px] font-medium text-white/60">
              No applications yet
            </p>
            <p className="mt-1 text-[11.5px] text-white/30">
              Candidates who apply on /careers will show up here.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {applications.map((application) => (
              <li
                key={application._id}
                className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[10.5px] font-semibold text-white/70">
                  {initials(application.fullName)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12.5px] font-medium text-white">
                    {application.fullName}
                  </p>
                  <p className="truncate text-[11px] text-white/35">
                    {application.email}
                  </p>
                </div>
                <span className="hidden max-w-[160px] truncate text-[11px] text-white/40 sm:block">
                  {application.position}
                </span>
                <span
                  className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${
                    careerStatusStyles[application.status] || careerStatusStyles.new
                  }`}
                >
                  {careerStatusLabels[application.status] || application.status}
                </span>
                <span className="hidden w-[76px] shrink-0 text-right text-[10.5px] text-white/30 md:block">
                  {new Date(application.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AdminShell>
  );
}
