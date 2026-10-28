import { ArrowUpRight } from "lucide-react";
import ContactButton from "@/components/contact/ContactButton";
import ProjectMockup, { type MockupVariant } from "@/components/site/ProjectMockup";

const projects: {
  title: string;
  subtitle: string;
  tags: string[];
  result: string;
  variant: MockupVariant;
}[] = [
  {
    title: "MG Portal — Raam Group",
    subtitle: "Automotive warranty & claims management",
    tags: ["B2B", "Web Platform"],
    result: "Dealer claims moved from email chains to one tracked flow.",
    variant: "mg",
  },
  {
    title: "360 Car Protect",
    subtitle: "Warranty products for dealerships",
    tags: ["B2B", "B2C", "Web Application"],
    result: "Sales, activation, and renewals managed in one portal.",
    variant: "car",
  },
  {
    title: "SmartShakti CRM",
    subtitle: "Sales & lead management for service teams",
    tags: ["CRM", "Dashboard"],
    result: "Pipeline visibility from first call to closed deal.",
    variant: "crm",
  },
  {
    title: "SOV Portal",
    subtitle: "Student services platform for an edtech team",
    tags: ["Edtech", "Student Portal"],
    result: "Applications, documents, and updates in one place.",
    variant: "sov",
  },
  {
    title: "College Duniya",
    subtitle: "College discovery & admission enquiries",
    tags: ["Edtech", "Platform"],
    result: "A cleaner journey from search to admission enquiry.",
    variant: "edu",
  },
  {
    title: "Vidya Vriddhi",
    subtitle: "Learning app for students and teachers",
    tags: ["Native", "Mobile App"],
    result: "Lessons, progress, and communication on the phone.",
    variant: "app",
  },
];

export default function Projects() {
  return (
    <section id="work" className="shell py-12 lg:py-16">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <span className="section-badge">Selected work</span>
          <h2 className="section-heading mt-5 max-w-[760px] text-balance">
            Products that are still{" "}
            <span className="text-accent">doing the work</span>
          </h2>
        </div>
        <p className="max-w-[380px] text-[13px] leading-relaxed text-white/50 sm:text-[14px]">
          A mix of websites, CRM dashboards, portals, and mobile products. Some
          started as a small build and turned into a multi-year partnership.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-[#151515] transition-colors hover:border-white/20"
          >
            <div className="relative">
              <ProjectMockup variant={project.variant} />
              <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/80 backdrop-blur-sm">
                {project.tags[0]}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-white sm:text-[18px]">
                {project.title}
              </h3>
              <p className="mt-1 text-[12px] text-white/55">{project.subtitle}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.slice(1).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-2.5 py-1 text-[10.5px] font-medium text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 flex-1 border-l-2 border-accent/50 pl-3 text-[12px] leading-relaxed text-white/45">
                {project.result}
              </p>

              <ContactButton className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/80 transition-colors hover:text-accent">
                Discuss a similar build
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </ContactButton>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-line bg-[#141414] px-5 py-5 text-center sm:flex-row sm:px-6 sm:text-left">
        <p className="text-[13px] leading-relaxed text-white/55 sm:text-[14px]">
          <span className="font-semibold text-white">
            Your product doesn&apos;t need to look like these.
          </span>{" "}
          It needs to solve your problem. Tell us what is slowing your team down.
        </p>
        <ContactButton className="btn-primary shrink-0">Start a project</ContactButton>
      </div>
    </section>
  );
}
