"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import ContactForm from "@/components/site/ContactForm";

type ContactContextValue = {
  isOpen: boolean;
  openContact: () => void;
  closeContact: () => void;
};

const ContactContext = createContext<ContactContextValue | null>(null);

export function useContact() {
  const context = useContext(ContactContext);

  if (!context) {
    throw new Error("useContact must be used within a ContactProvider");
  }

  return context;
}

export function ContactProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openContact = useCallback(() => setIsOpen(true), []);
  const closeContact = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeContact();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, closeContact]);

  const value = useMemo(
    () => ({ isOpen, openContact, closeContact }),
    [isOpen, openContact, closeContact]
  );

  return (
    <ContactContext.Provider value={value}>
      {children}

      {isOpen && (
        <div
          role="presentation"
          onClick={closeContact}
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/75 backdrop-blur-sm"
        >
          <div className="flex min-h-full items-center justify-center px-4 py-6 sm:py-10">
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-[760px] rounded-[24px] border border-white/10 bg-[#141414] p-4 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] sm:rounded-[28px] sm:p-7 lg:p-8"
            >
              <button
                type="button"
                onClick={closeContact}
                aria-label="Close contact form"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={17} aria-hidden="true" />
              </button>

              <div className="px-2 pr-10 text-center sm:pr-2">
                <span className="section-badge">Contact Us</span>
                <h2
                  id="contact-modal-title"
                  className="mt-4 text-[26px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[32px]"
                >
                  Get <span className="text-accent">In Touch</span>
                </h2>
                <p className="mx-auto mt-2 max-w-[520px] text-[13px] leading-relaxed text-white/60 sm:text-[14px]">
                  Let&apos;s discuss your project. Share your details, and
                  we&apos;ll book a call at your preferred time.
                </p>
              </div>

              <div className="mt-6">
                <ContactForm idPrefix="modal-" />
              </div>
            </div>
          </div>
        </div>
      )}
    </ContactContext.Provider>
  );
}
