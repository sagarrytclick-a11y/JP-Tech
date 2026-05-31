"use client";
import { useState } from "react";
import { submitEnquiry } from "@/lib/actions";
import { enquirySchema } from "@/lib/validation";

export type EnquiryFormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  service: string;
};

const initialForm: EnquiryFormData = {
  name: "",
  email: "",
  phone: "",
  city: "",
  service: "Web",
};

export function useEnquiryForm(onSuccess?: () => void) {
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
    Object.keys(form).forEach((k) => { allTouched[k] = true; });
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
      const result = await submitEnquiry(form);
      if (result.error) throw new Error(result.error);
      setSubmitting(false);
      setSubmitted(true);
      setForm(initialForm);
      setTouched({});
      setFieldErrors({});
      onSuccess?.();
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
    setForm,
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
