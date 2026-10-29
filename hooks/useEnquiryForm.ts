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

const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024;
const ALLOWED_ATTACHMENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function useEnquiryForm(onSuccess?: () => void) {
  const [form, setForm] = useState<EnquiryFormData>(initialForm);
  const [attachment, setAttachmentState] = useState<File | null>(null);
  const [attachmentError, setAttachmentError] = useState("");
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

  const setAttachment = (file: File | null) => {
    setAttachmentError("");
    if (!file) {
      setAttachmentState(null);
      return;
    }
    if (!ALLOWED_ATTACHMENT_TYPES.includes(file.type)) {
      setAttachmentError(
        "Attach a PDF, Word document, or image (JPG, PNG, WebP, AVIF, GIF)."
      );
      setAttachmentState(null);
      return;
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      setAttachmentError("Attachment is too large. Keep it under 8 MB.");
      setAttachmentState(null);
      return;
    }
    setAttachmentState(file);
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
    setAttachmentError("");
    setSubmitting(true);
    try {
      const body = new FormData();
      Object.entries(parsed.data).forEach(([key, value]) => {
        body.append(key, value ?? "");
      });
      if (attachment) body.append("attachment", attachment);

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
      setAttachmentState(null);
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
    setAttachmentState(null);
    setAttachmentError("");
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
    attachment,
    setAttachment,
    attachmentError,
    submitting,
    submitted,
    error,
    fieldErrors,
    handleSubmit,
    reset,
  };
}
