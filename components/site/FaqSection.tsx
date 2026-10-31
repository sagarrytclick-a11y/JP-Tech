"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { site } from "@/lib/site";

import ContactButton from "@/components/contact/ContactButton";
import Reveal from "@/components/ui/Reveal";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="shell py-5 lg:py-7">
      <div className="rounded-[28px] border border-line bg-gradient-to-br from-panel-soft to-accent/[0.05] px-4 py-10 sm:rounded-[34px] sm:px-8 sm:py-12 lg:px-14">
        <div className="mx-auto max-w-[1100px]">
          <Reveal className="text-center">
            <span className="section-badge">FAQs</span>
            <h2 className="section-heading mt-5">
              Have <span className="text-accent">Questions?</span>
            </h2>
            <p className="mt-3 text-[14px] text-fg/60 sm:text-[16px]">
              Everything you need to know before we even start.
            </p>
          </Reveal>

          <div className="mt-8 space-y-3 sm:mt-7">
            {site.faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-fg/10 bg-panel transition-colors duration-200 hover:border-fg/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="text-[14px] font-medium leading-snug text-fg sm:text-[17px]">
                      {faq.q}
                    </span>
                    <span className="shrink-0 text-fg/90" aria-hidden="true">
                      {isOpen ? <X size={18} /> : <Plus size={18} />}
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${index}`}
                    className="faq-answer"
                    data-open={isOpen}
                  >
                    <div>
                      <p className="px-4 pb-5 text-[13px] leading-[1.75] text-fg/60 sm:px-6 sm:text-[14px]">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center sm:mt-7">
            <p className="text-[13px] text-fg/65 sm:text-[14px]">
              Still have questions?{" "}
              <ContactButton className="text-accent underline-offset-4 hover:underline">
                Contact us
              </ContactButton>
            </p>
            <ContactButton className="btn-primary mt-5 w-full sm:w-auto">
              Book a Discovery Call
            </ContactButton>
          </div>
        </div>
      </div>
    </section>
  );
}
