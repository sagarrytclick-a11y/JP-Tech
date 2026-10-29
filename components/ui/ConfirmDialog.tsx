"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "danger" | "neutral";
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Yes, continue",
  cancelLabel = "Cancel",
  tone = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const onCancelRef = useRef(onCancel);

  useEffect(() => {
    onCancelRef.current = onCancel;
  }, [onCancel]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => cancelRef.current?.focus(), 40);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) onCancelRef.current();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, loading]);

  if (!mounted || !open) return null;

  const Icon = tone === "danger" ? Trash2 : AlertTriangle;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close confirmation"
        onClick={() => {
          if (!loading) onCancelRef.current();
        }}
        className="dialog-overlay absolute inset-0 cursor-default bg-black/75 backdrop-blur-[3px]"
      />

      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="dialog-panel relative w-full max-w-[420px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#131313] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:p-6"
      >
        <div className="flex items-start gap-4">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ${
              tone === "danger"
                ? "bg-red-500/10 text-red-300 ring-red-400/20"
                : "bg-accent/10 text-accent ring-accent/25"
            }`}
          >
            <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
          </span>

          <div className="min-w-0 pt-0.5">
            <h2
              id={titleId}
              className="text-[15px] font-semibold tracking-[-0.01em] text-white"
            >
              {title}
            </h2>
            {description && (
              <div
                id={descriptionId}
                className="mt-1.5 text-[12.5px] leading-relaxed text-white/45"
              >
                {description}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="inline-flex h-10 items-center justify-center rounded-lg border border-white/10 px-4 text-[12px] font-semibold text-white/60 transition-colors hover:border-white/25 hover:text-white disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-[12px] font-semibold text-white transition-colors disabled:opacity-60 ${
              tone === "danger"
                ? "bg-red-500 hover:bg-red-400"
                : "bg-accent hover:bg-accent-soft"
            }`}
          >
            {loading && (
              <Loader2 size={14} className="animate-spin" aria-hidden="true" />
            )}
            {loading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
