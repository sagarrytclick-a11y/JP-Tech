"use client";
import { useState } from "react";
import { enquirySchema, type EnquiryFormData } from "@/lib/validation";

const initialForm: EnquiryFormData = {
  name: "",
  email: "",
  phone: "",
  service: "",
  industry: "",
  budget: "",
  message: "",
};

export function useEnquiryForm() {
  const [form, setForm] = useState<EnquiryFormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (field: string, value: string) => {
    const result = enquirySchema.safeParse({ ...form, [field]: value });
    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === field);
      return issue ? issue.message : "";
    }
    return "";
  };

  const updateField = <K extends keyof EnquiryFormData>(
    field: K,
    value: EnquiryFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setFieldErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, form[field as keyof EnquiryFormData]);
    setFieldErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const allTouched: Record<string, boolean> = {};
    Object.keys(form).forEach((k) => {
      allTouched[k] = true;
    });
    setTouched(allTouched);

    const parsed = enquirySchema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const path = String(issue.path[0]);
        if (!errs[path]) errs[path] = issue.message;
      });
      setFieldErrors(errs);
      return;
    }

    setFieldErrors({});
    setSubmitting(true);
    try {
      const body = new FormData();
      Object.entries(parsed.data).forEach(([key, value]) => {
        body.append(key, value ?? "");
      });

      const response = await fetch("/api/enquiries", {
        method: "POST",
        body,
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      setSubmitting(false);
      setSubmitted(true);
      setForm(initialForm);
      setTouched({});
      setFieldErrors({});
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setSubmitting(false);
    setSubmitted(false);
    setError("");
    setFieldErrors({});
    setTouched({});
  };

  return {
    form,
    updateField,
    handleBlur,
    submitting,
    submitted,
    error,
    fieldErrors,
    handleSubmit,
    reset,
  };
}
