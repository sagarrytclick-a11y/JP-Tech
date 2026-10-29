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
          className="dialog-overlay fixed inset-0 z-[100] grid place-items-center bg-black/75 p-3 backdrop-blur-sm sm:p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            aria-describedby="contact-modal-description"
            onClick={(event) => event.stopPropagation()}
            className="dialog-panel no-scrollbar relative max-h-[calc(100dvh-1.5rem)] w-full max-w-[600px] overflow-y-auto overscroll-contain rounded-[22px] border border-white/10 bg-[#141414] p-4 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] sm:max-h-[calc(100dvh-2rem)] sm:rounded-[24px] sm:p-6"
          >
            <button
              type="button"
              onClick={closeContact}
              aria-label="Close contact form"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-200 hover:rotate-90 hover:bg-white/10 hover:text-white active:scale-95 sm:right-4 sm:top-4"
            >
              <X size={15} aria-hidden="true" />
            </button>

            <div className="px-6 text-center sm:px-8">
              <h2
                id="contact-modal-title"
                className="text-[22px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[26px]"
              >
                Get <span className="text-accent">In Touch</span>
              </h2>
              <p
                id="contact-modal-description"
                className="mx-auto mt-1.5 max-w-[420px] text-[12px] leading-relaxed text-white/55 sm:text-[12.5px]"
              >
                Tell us about the project and we&apos;ll book a call at your
                preferred time.
              </p>
            </div>

            <div className="mt-4 sm:mt-5">
              <ContactForm idPrefix="modal-" variant="modal" />
            </div>
          </div>
        </div>
      )}
    </ContactContext.Provider>
  );
}
