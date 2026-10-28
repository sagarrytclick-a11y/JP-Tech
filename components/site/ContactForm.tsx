"use client";

import { useState } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { useEnquiryForm } from "@/hooks/useEnquiryForm";
import { site } from "@/lib/site";

export default function ContactForm({
  idPrefix = "",
}: {
  idPrefix?: string;
}) {
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
      <div className="flex flex-col items-center py-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check size={26} aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-white sm:text-2xl">
          Thank you for reaching out
        </h3>
        <p className="mt-2 max-w-md text-[13px] leading-relaxed text-white/60 sm:text-[14px]">
          Your enquiry has been received. Our team will get back to you within
          one business day to schedule your discovery call.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setAgree(false);
          }}
          className="btn-primary mt-7 w-full sm:w-auto"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("fullName")} className="field-label">
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
            className="field"
            aria-invalid={Boolean(fieldErrors.name)}
          />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor={fieldId("email")} className="field-label">
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
            className="field"
            aria-invalid={Boolean(fieldErrors.email)}
          />
          {errorText("email")}
        </div>

        <div>
          <label htmlFor={fieldId("phone")} className="field-label">
            Phone Number
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="Your phone number"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            onBlur={() => handleBlur("phone")}
            className="field"
            aria-invalid={Boolean(fieldErrors.phone)}
          />
          {errorText("phone")}
        </div>

        <div>
          <label htmlFor={fieldId("service")} className="field-label">
            Service
          </label>
          <div className="relative">
            <select
              id={fieldId("service")}
              name="service"
              value={form.service}
              onChange={(event) => updateField("service", event.target.value)}
              onBlur={() => handleBlur("service")}
              className={`field appearance-none pr-10 ${
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
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/70"
              aria-hidden="true"
            />
          </div>
          {errorText("service")}
        </div>

        <div>
          <label htmlFor={fieldId("industry")} className="field-label">
            Industry
          </label>
          <div className="relative">
            <select
              id={fieldId("industry")}
              name="industry"
              value={form.industry}
              onChange={(event) => updateField("industry", event.target.value)}
              onBlur={() => handleBlur("industry")}
              className={`field appearance-none pr-10 ${
                form.industry ? "text-white" : "text-white/40"
              }`}
              aria-invalid={Boolean(fieldErrors.industry)}
            >
              <option value="">Select industry</option>
              {site.industries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/70"
              aria-hidden="true"
            />
          </div>
          {errorText("industry")}
        </div>

        <div>
          <label htmlFor={fieldId("budget")} className="field-label">
            Budget
          </label>
          <div className="relative">
            <select
              id={fieldId("budget")}
              name="budget"
              value={form.budget}
              onChange={(event) => updateField("budget", event.target.value)}
              onBlur={() => handleBlur("budget")}
              className={`field appearance-none pr-10 ${
                form.budget ? "text-white" : "text-white/40"
              }`}
              aria-invalid={Boolean(fieldErrors.budget)}
            >
              <option value="">Select budget range</option>
              {site.budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/70"
              aria-hidden="true"
            />
          </div>
          {errorText("budget")}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor={fieldId("message")} className="field-label">
          Tell us more about your project
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          placeholder="Briefly describe your idea or requirements"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          onBlur={() => handleBlur("message")}
          className="field-area"
          aria-invalid={Boolean(fieldErrors.message)}
        />
        {errorText("message")}
      </div>

      <div className="mt-5">
        <label className="flex cursor-pointer items-start gap-2.5 text-[12px] leading-relaxed text-white/70 sm:text-[13px]">
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
              className="underline underline-offset-2 hover:text-white"
            >
              Privacy Policy
            </a>{" "}
            &{" "}
            <a
              href="/terms"
              className="underline underline-offset-2 hover:text-white"
            >
              Terms &amp; Conditions
            </a>
          </span>
        </label>
        {agreeError && (
          <p className="mt-1.5 text-[11px] text-red-400">{agreeError}</p>
        )}
      </div>

      <p className="mt-4 text-[11px] text-white/45 sm:text-[12px]">
        Note: This contact form is only for project and business inquiries. For
        job inquiries,{" "}
        <a
          href="mailto:info@jptechnology.com?subject=Job%20Inquiry"
          className="underline underline-offset-2 hover:text-white"
        >
          Click Here
        </a>
      </p>

      {error && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-[12px] text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-[14px] font-semibold text-white transition-colors hover:bg-accent-soft disabled:cursor-not-allowed disabled:opacity-70"
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
