import ContactButton from "@/components/contact/ContactButton";

const industries = [
  "Edtech",
  "Real Estate",
  "Startup",
  "SaaS",
  "E-commerce",
  "MVP",
  "EMS,CRM",
  "B2B Portal",
  "Automobile",
  "Career",
  "Consulting",
  "Fin-tech",
  "Automation",
  "IOT Platforms",
  "Social Media",
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="shell py-12 lg:py-16">
      <div className="text-center">
        <h2 className="section-heading text-balance">
          Who <span className="text-accent">We Are</span>
        </h2>
        <p className="section-copy mt-4">
          A tech partner that turns complex ideas into simple, scalable
          solutions.
        </p>
      </div>

      <div className="mt-9 grid gap-10 lg:mt-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
        <div>
          <h3 className="text-center text-[20px] font-medium text-white sm:text-[22px] lg:text-[24px]">
            Industries We Served
          </h3>

          <div className="mt-5 grid grid-cols-3 gap-2.5 sm:gap-3 lg:gap-4">
            {industries.map((industry) => (
              <span
                key={industry}
                className="flex min-h-[44px] items-center justify-center rounded-2xl border border-accent/40 bg-white/[0.02] px-2 py-2.5 text-center text-[12px] font-medium text-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent/20 hover:text-white hover:shadow-[0_0_20px_rgba(255,77,31,0.3)] cursor-default sm:px-3 sm:text-[13px] lg:text-[14px]"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[15px] leading-[1.65] text-white/75 sm:text-[17px] lg:text-[18px] lg:leading-[1.6]">
            JP Technology is a product-focused technology company founded by
            engineers and strategists who believe technology should solve real
            problems, not just look good.
          </p>
          <p className="mt-4 text-[15px] leading-[1.65] text-white/75 sm:text-[17px] lg:text-[18px] lg:leading-[1.6]">
            We work as an extended tech team for our clients, helping them go
            from idea to MVP, and from MVP to scale.
          </p>

          <ContactButton className="btn-primary mt-6 w-full sm:mt-7 sm:w-auto">
            Book a Discovery Call
          </ContactButton>
        </div>
      </div>
    </section>
  );
}
