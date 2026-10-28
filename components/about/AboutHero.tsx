import ContactButton from "@/components/contact/ContactButton";

export default function AboutHero() {
  return (
    <section id="about" className="relative">
      <div className="relative mx-auto flex max-w-[980px] flex-col items-center px-5 pb-14 pt-6 text-center sm:px-8 sm:pb-16 sm:pt-8 lg:pb-[60px] lg:pt-[56px]">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          About JP Technology
        </span>

        <h1 className="mt-6 text-balance text-[clamp(30px,4.2vw,56px)] font-semibold leading-[1.07] tracking-[-0.025em] text-white">
          We build the systems your{" "}
          <span className="text-accent">business runs on</span>
        </h1>

        <p className="mt-6 max-w-[820px] text-[14.5px] leading-[1.7] text-white/65 sm:mt-7 sm:text-[16.5px] lg:text-[17.5px]">
          JP Technology is a web and IT agency working with startups,
          institutions, and established businesses. One senior team handles
          strategy, design, engineering, and the support that comes after launch
          &mdash; from a first business website to a multi-tenant SaaS platform.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row sm:gap-4">
          <ContactButton className="btn-primary w-full sm:w-auto">
            Start a conversation
          </ContactButton>
          <a href="#team" className="btn-light w-full sm:w-auto">
            Meet the team
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11.5px] text-white/40">
          <span>Websites</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>CRM &amp; dashboards</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>Native apps</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>SaaS</span>
          <span className="h-1 w-1 rounded-full bg-white/20" />
          <span>AI automation</span>
        </div>
      </div>
    </section>
  );
}
