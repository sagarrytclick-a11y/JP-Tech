"use client";

import { useRef, useState } from "react";
import { Check, FileText, Loader2, Send, X } from "lucide-react";
import { careerPositions } from "@/lib/careers";

const inputClass =
  "h-12 w-full rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 text-[13px] text-white outline-none transition placeholder:text-white/25 focus:border-accent/60 focus:bg-white/[0.05] focus:ring-2 focus:ring-accent/10";

const labelClass = "mb-1.5 block text-[11.5px] font-medium text-white/70";

const emptyForm = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
};

export default function CareerForm({
  defaultPosition = "",
}: {
  defaultPosition?: string;
}) {
  const [form, setForm] = useState({
    ...emptyForm,
    position: defaultPosition,
  });
  const [resume, setResume] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const setField = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleFile = (file: File | null) => {
    setFieldError("");
    if (!file) {
      setResume(null);
      return;
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setFieldError("Please attach your resume as a PDF.");
      setResume(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFieldError("Resume is too large. Keep it under 5 MB.");
      setResume(null);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }
    setResume(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    if (!resume) {
      setFieldError("Attach your resume as a PDF.");
      return;
    }

    setSubmitting(true);
    setFieldError("");

    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value));
      body.append("resume", resume);

      const response = await fetch("/api/careers", { method: "POST", body });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Could not submit your application.");
      }

      setSubmitted(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Could not submit your application."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] px-6 py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Check size={26} aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-[20px] font-semibold text-white">
          Application received
        </h3>
        <p className="mt-2 max-w-[430px] text-[12.5px] leading-relaxed text-white/50">
          Thanks, {form.fullName.split(" ")[0]}. We have your resume and details.
          If your experience fits the {form.position} role, we will reach out
          within five working days.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setForm({ ...emptyForm });
            setResume(null);
            if (fileRef.current) fileRef.current.value = "";
          }}
          className="mt-6 inline-flex h-10 items-center justify-center rounded-lg border border-white/12 px-4 text-[12px] font-semibold text-white/65 transition-colors hover:border-white/25 hover:text-white"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line bg-[#141414] p-5 sm:p-7"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
            Apply now
          </p>
          <h2 className="mt-1.5 text-[20px] font-semibold tracking-[-0.02em] text-white sm:text-[22px]">
            Tell us what you have built
          </h2>
        </div>
        <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/35 sm:inline">
          We reply in 5 days
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="career-name" className={labelClass}>
            Full Name <span className="text-accent">*</span>
          </label>
          <input
            id="career-name"
            value={form.fullName}
            onChange={(event) => setField("fullName", event.target.value)}
            placeholder="Your full name"
            autoComplete="name"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="career-email" className={labelClass}>
            Email Address <span className="text-accent">*</span>
          </label>
          <input
            id="career-email"
            type="email"
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="career-phone" className={labelClass}>
            Phone Number <span className="text-accent">*</span>
          </label>
          <input
            id="career-phone"
            type="tel"
            value={form.phone}
            onChange={(event) => setField("phone", event.target.value)}
            placeholder="+91 98765 43210"
            autoComplete="tel"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label htmlFor="career-position" className={labelClass}>
            Position Applying For <span className="text-accent">*</span>
          </label>
          <select
            id="career-position"
            value={form.position}
            onChange={(event) => setField("position", event.target.value)}
            className={`${inputClass} appearance-none pr-9 ${
              form.position ? "text-white" : "text-white/35"
            }`}
            required
          >
            <option value="" disabled className="bg-[#141414]">
              Select a position
            </option>
            {careerPositions.map((position) => (
              <option key={position} value={position} className="bg-[#141414]">
                {position}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <span className={labelClass}>
          Resume (PDF) <span className="text-accent">*</span>
        </span>
        <input
          ref={fileRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
        />

        {resume ? (
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.03] px-3.5 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <FileText size={16} aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-white/80">
                {resume.name}
              </p>
              <p className="text-[10px] text-white/30">
                {(resume.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setResume(null);
                if (fileRef.current) fileRef.current.value = "";
              }}
              className="rounded p-1.5 text-white/35 transition-colors hover:bg-white/[0.06] hover:text-white"
              aria-label="Remove resume"
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center gap-3 rounded-xl border border-dashed border-white/[0.14] bg-white/[0.02] px-3.5 py-3 text-left transition-colors hover:border-accent/45"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <FileText size={16} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[12px] font-medium text-white/75">
                Choose resume
              </span>
              <span className="mt-0.5 block text-[10.5px] text-white/30">
                PDF only &middot; up to 5 MB
              </span>
            </span>
          </button>
        )}
        {fieldError && (
          <p className="mt-1.5 text-[11px] text-red-400">{fieldError}</p>
        )}
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/20 bg-red-500/[0.07] px-3 py-2.5 text-[11.5px] text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-[13px] font-semibold text-white transition-colors hover:bg-accent-soft disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 size={15} className="animate-spin" aria-hidden="true" />
            Submitting application...
          </>
        ) : (
          <>
            <Send size={15} aria-hidden="true" />
            Submit application
          </>
        )}
      </button>
    </form>
  );
}
