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

  const updateField = <K extends keyof EnquiryFormData>(
    field: K,
    value: EnquiryFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const parsed = enquirySchema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const result = await submitEnquiry(form);
      if (result.error) throw new Error(result.error);
      setSubmitting(false);
      setSubmitted(true);
      setForm(initialForm);
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
  };

  return {
    form,
    setForm,
    updateField,
    submitting,
    submitted,
    error,
    handleSubmit,
    reset,
  };
}
