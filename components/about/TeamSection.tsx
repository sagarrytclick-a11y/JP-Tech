import Image from "next/image";

const team = [
  {
    name: "Gaurav rathore",
    role: "Founder & CEO",
    image: "/images/gaurav.png",
    width: 481,
    height: 600,
    linkedin: "https://www.linkedin.com/in/imsrivastavagaurav/",
    paragraphs: [
      "Sagar Bisht is a Product Growth Strategist and Founder who began his journey in the 3rd year of college, driven by curiosity and a passion for building real-world solutions beyond academics.",
      "He founded JP Technology with a clear belief: technology should solve real problems and drive measurable business growth. Today, JP Technology builds web apps, mobile apps, SaaS platforms, and AI solutions across B2B, Healthcare, CareerTech, and Enterprise, maintaining 100% client retention through trust and long-term value.",
      "Beyond building products, Gaurav helps founders and businesses grow by simplifying product thinking, strengthening execution systems, and using technology and AI to scale smarter. His focus is on clarity turning ideas into structured roadmaps and growth-driven products.",
    ],
  },
  {
    name: "Sagar Bisht",
    role: "Co-Founder & CTO",
    image: "/images/yudi.png",
    width: 480,
    height: 600,
    linkedin: "https://www.linkedin.com/in/yudhisthir-sharma/",
    paragraphs: [
      "Yudhishthir Sharma is a technology leader and CTO with a strong focus on building scalable, reliable, and execution-driven digital products. With deep hands-on experience across web platforms, SaaS systems, and complex backend architectures, he specializes in translating business ideas into well-structured, production-ready systems.",
      "As CTO at JP Technology, Yudhishthir leads technical strategy, system design, and engineering execution across web apps, mobile applications, SaaS platforms, and AI-driven solutions for B2B, Healthcare, CareerTech, and Enterprise clients. His approach emphasizes clean architecture, performance, security, and long-term scalability rather than short-term hacks.",
      "Beyond engineering, Yudhishthir works closely with founders and product teams to shape technical roadmaps, optimize development processes, and ensure technology decisions directly support business growth. His strength lies in bringing clarity to complex requirements and building technology foundations that scale with the company's vision.",
    ],
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="shell py-12 lg:py-16">
      <div className="text-center">
        <span className="section-badge">Team</span>
        <h2 className="section-heading mt-5 text-balance">
          The Mind Behind <span className="text-accent">JP Technology</span>
        </h2>
        <p className="section-copy mt-4">
          The vision, experience, and thinking shaping how we build technology.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-[1240px] space-y-12 lg:mt-14 lg:space-y-16">
        {team.map((member, index) => (
          <article
            key={member.name}
            className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-[78px]"
          >
            <div
              className={`mx-auto w-full max-w-[440px] overflow-hidden rounded-xl border border-line bg-[#151515] p-2 lg:mx-0 lg:max-w-[480px] ${
                index % 2 === 1 ? "lg:order-2" : ""
              }`}
            >
              <Image
                src={member.image}
                alt={`${member.name}, ${member.role} at JP Technology`}
                width={member.width}
                height={member.height}
                sizes="(min-width: 1024px) 440px, 90vw"
                className="h-full w-full rounded-lg object-cover"
              />
            </div>

            <div>
              <h3 className="text-[22px] font-semibold leading-snug text-white sm:text-[24px]">
                {member.name}{" "}
                <span className="text-white/90">({member.role})</span>
              </h3>

              <div className="mt-4 space-y-4 lg:mt-6 lg:space-y-7">
                {member.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-[14px] leading-[1.65] text-white/70 sm:text-[15px] lg:text-[16px] lg:leading-[1.7]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-7 w-full sm:w-auto"
              >
                Connect on Linkedin
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
