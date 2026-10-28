import ContactButton from "@/components/contact/ContactButton";

export default function AboutHero() {
  return (
    <section id="about" className="relative">
      <div className="relative mx-auto flex max-w-[964px] flex-col items-center px-5 pb-14 pt-4 text-center sm:px-8 sm:pb-16 sm:pt-8 lg:pb-[60px] lg:pt-[60px]">
        <h1 className="text-balance text-[clamp(30px,4vw,56px)] font-semibold leading-[1.08] tracking-[-0.025em] text-white lg:leading-[1.04]">
          Your Global Technology Partner for AI Automation &amp; Custom
          Software Development
        </h1>

        <p className="mt-6 max-w-[960px] text-[15px] leading-[1.6] text-white/70 sm:mt-7 sm:text-[17px] lg:mt-8 lg:text-[19px] lg:leading-[1.55]">
          JP Technology is a trusted web app development agency and custom mobile
          app development agency helping startups and enterprises build reliable
          digital solutions worldwide. We provide premium mobile app development
          services India businesses rely on, along with scalable web development
          services India teams trust for long-term growth.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row sm:gap-4 lg:mt-8">
          <ContactButton className="btn-primary w-full sm:w-auto">
            Let&apos;s Build Together
          </ContactButton>
          <a href="#why-choose" className="btn-light w-full sm:w-auto">
            Why JP Technology?
          </a>
        </div>
      </div>
    </section>
  );
}
