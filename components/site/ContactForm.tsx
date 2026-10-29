"use client";

import { useState } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useEnquiryForm } from "@/hooks/useEnquiryForm";
import { site } from "@/lib/site";

export default function ContactForm({
  idPrefix = "",
  variant = "page",
}: {
  idPrefix?: string;
  variant?: "page" | "modal";
}) {
  const compact = variant === "modal";
  const labelClass = compact ? "field-label-compact" : "field-label";
  const inputClass = compact ? "field-compact" : "field";
  const {
    form,
    updateField,
    handleBlur,
    submitting,
    submitted,
    error,
    fieldErrors,
    handleSubmit,
    reset,
  } = useEnquiryForm();
  const [agree, setAgree] = useState(false);
  const [agreeError, setAgreeError] = useState("");

  const fieldId = (name: string) => `${idPrefix}${name}`;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!agree) {
      event.preventDefault();
      setAgreeError("Please accept the Privacy Policy and Terms & Conditions.");
      return;
    }
    setAgreeError("");
    handleSubmit(event);
  };

  const errorText = (field: string) =>
    fieldErrors[field] ? (
      <p className="mt-1 text-[11px] text-red-400">{fieldErrors[field]}</p>
    ) : null;

  if (submitted) {
    return (
      <div
        className={`flex flex-col items-center text-center ${
          compact ? "py-5" : "py-8"
        }`}
      >
        <span
          className={`flex items-center justify-center rounded-full bg-accent/15 text-accent ${
            compact ? "h-12 w-12" : "h-14 w-14"
          }`}
        >
          <Check size={compact ? 22 : 26} aria-hidden="true" />
        </span>
        <h3
          className={`mt-4 font-semibold text-white ${
            compact ? "text-lg" : "text-xl sm:text-2xl"
          }`}
        >
          Thank you for reaching out
        </h3>
        <p className="mt-2 max-w-md text-[12.5px] leading-relaxed text-white/60 sm:text-[13.5px]">
          Your enquiry has been received. Our team will get back to you within
          one business day to schedule your discovery call.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setAgree(false);
          }}
          className={`btn-primary w-full sm:w-auto ${compact ? "mt-5 h-11 text-[12.5px]" : "mt-7"}`}
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className={`grid grid-cols-2 ${compact ? "gap-2.5" : "gap-4"}`}>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor={fieldId("fullName")} className={labelClass}>
            Full Name
          </label>
          <input
            id={fieldId("fullName")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            onBlur={() => handleBlur("name")}
            className={inputClass}
            aria-invalid={Boolean(fieldErrors.name)}
          />
          {errorText("name")}
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label htmlFor={fieldId("email")} className={labelClass}>
            Email
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            onBlur={() => handleBlur("email")}
            className={inputClass}
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {errorText("email")}
        </div>

        <div>
          <label htmlFor={fieldId("phone")} className={labelClass}>
            Phone Number
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Phone number"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            onBlur={() => handleBlur("phone")}
            className={inputClass}
            aria-invalid={Boolean(fieldErrors.phone)}
          />
          {errorText("phone")}
        </div>

        <div>
          <label htmlFor={fieldId("service")} className={labelClass}>
            Service
          </label>
          <div className="relative">
            <select
              id={fieldId("service")}
              name="service"
              value={form.service}
              onChange={(event) => updateField("service", event.target.value)}
              onBlur={() => handleBlur("service")}
              className={`${inputClass} appearance-none pr-8 ${
                form.service ? "text-white" : "text-white/40"
              }`}
              aria-invalid={Boolean(fieldErrors.service)}
            >
              <option value="">Select a service</option>
              {site.services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70"
              aria-hidden="true"
            />
          </div>
          {errorText("service")}
        </div>
      </div>

      <div className={compact ? "mt-2.5" : "mt-4"}>
        <label htmlFor={fieldId("message")} className={labelClass}>
          Message
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={compact ? 2 : 4}
          placeholder={
            compact
              ? "A short brief — timeline, goals, or what you need"
              : "Tell us about your project, timeline, or what you need help with"
          }
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          onBlur={() => handleBlur("message")}
          className={compact ? "field-area-compact" : "field-area"}
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {errorText("message")}
      </div>

      <div className={compact ? "mt-3" : "mt-5"}>
        <label
          className={`flex cursor-pointer items-start gap-2.5 leading-relaxed text-white/70 ${
            compact ? "text-[11.5px]" : "text-[12px] sm:text-[13px]"
          }`}
        >
          <input
            type="checkbox"
            checked={agree}
            onChange={(event) => {
              setAgree(event.target.checked);
              if (event.target.checked) setAgreeError("");
            }}
            className="peer sr-only"
          />
          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border border-white/80 bg-white text-transparent transition-colors peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-accent/50">
            <Check size={12} strokeWidth={3} aria-hidden="true" />
          </span>
          <span>
            I agree to the{" "}
            <a
              href="/privacy"
              className="underline underline-offset-2 transition-colors hover:text-white"
            >
              Privacy Policy
            </a>{" "}
            &{" "}
            <a
              href="/terms"
              className="underline underline-offset-2 transition-colors hover:text-white"
            >
              Terms &amp; Conditions
            </a>
          </span>
        </label>
        {agreeError && (
          <p className="mt-1.5 text-[11px] text-red-400">{agreeError}</p>
        )}
      </div>

      {!compact && (
        <p className="mt-4 text-[11px] text-white/45 sm:text-[12px]">
          Note: This contact form is only for project and business inquiries. For
          job inquiries,{" "}
          <a
            href={`mailto:${site.email}?subject=Job%20Inquiry`}
            className="underline underline-offset-2 transition-colors hover:text-white"
          >
            Click Here
          </a>
        </p>
      )}

      {error && (
        <p
          className={`rounded-lg border border-red-500/30 bg-red-500/10 text-[12px] text-red-300 ${
            compact ? "mt-3 px-3 py-2" : "mt-4 px-3 py-2.5"
          }`}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`flex w-full items-center justify-center gap-2 bg-accent font-semibold text-white transition-all duration-200 hover:bg-accent-soft hover:shadow-[0_14px_30px_-16px_rgba(255,77,31,0.9)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 ${
          compact
            ? "mt-3.5 h-11 rounded-lg text-[13px]"
            : "mt-5 h-12 rounded-xl text-[14px]"
        }`}
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
