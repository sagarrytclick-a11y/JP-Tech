import ContactButton from "@/components/contact/ContactButton";

export default function CallToAction() {
  return (
    <section className="shell py-10 lg:py-14">
      <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(120%_140%_at_85%_10%,#ff6a3d_0%,#f14a1c_45%,#c63f1b_100%)] px-5 py-12 text-center sm:rounded-[38px] sm:px-10 sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 sm:h-[680px] sm:w-[680px]" />
          <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[980px] sm:w-[980px]" />
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 sm:h-[1280px] sm:w-[1280px]" />
        </div>

        <div className="relative mx-auto max-w-[760px]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
            Have a project in mind?
          </p>
          <h2 className="mt-4 text-[clamp(26px,3.4vw,46px)] font-semibold leading-[1.12] tracking-[-0.02em] text-white">
            Tell us what&apos;s slowing
            <br className="hidden sm:block" /> your business down.
          </h2>
          <p className="mx-auto mt-5 max-w-[580px] text-[14px] leading-relaxed text-white/90 sm:text-[17px]">
            We&apos;ll come back with a clear scope, a realistic timeline, and
            the first milestone &mdash; not a 40-slide pitch deck.
          </p>
          <ContactButton className="mt-7 inline-flex h-[46px] items-center justify-center rounded-lg bg-white px-6 text-[13px] font-semibold text-[#151515] transition-colors hover:bg-white/90 sm:mt-8 sm:h-[50px] sm:px-7 sm:text-[14px]">
            Book a scoping call
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
