import { existsSync } from "node:fs";
import path from "node:path";
import { Quote, Star } from "lucide-react";
import ClientMark from "@/components/site/ClientMark";

const testimonials = [
  {
    quote:
      "They rebuilt our warranty portal without stopping dealer operations for a single day. What stood out was the questions they asked before writing any code.",
    name: "Operations Head",
    company: "Raam Group",
    context: "Automotive warranty platform",
    image: "/images/clients/raam-group.png",
    fit: "contain" as const,
  },
  {
    quote:
      "Our sales team used to live in spreadsheets and WhatsApp forwards. The CRM now matches how we actually work, because they sat with the team first.",
    name: "Sales Director",
    company: "SmartShakti",
    context: "CRM & lead management",
    image: "/images/clients/smartshakti.png",
    fit: "contain" as const,
  },
  {
    quote:
      "The first clickable build arrived in two weeks. That changed how we planned the rest of the year — we could finally show something real to the team.",
    name: "Product Lead",
    company: "College Duniya",
    context: "Education platform",
    image: "/images/clients/college-duniya.png",
    fit: "contain" as const,
  },
];

/**
 * Only reference an image when the file actually exists in /public, so a
 * missing logo shows the initials fallback instead of a broken image icon.
 */
function resolveImage(src: string) {
  try {
    return existsSync(path.join(process.cwd(), "public", src)) ? src : undefined;
  } catch {
    return undefined;
  }
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="shell py-12 lg:py-16">
      <div className="text-center">
        <span className="section-badge">Client words</span>
        <h2 className="section-heading mt-5 text-balance">
          What it&apos;s like on{" "}
          <span className="text-accent">the other side</span>
        </h2>
        <p className="section-copy mt-4">
          Long relationships, not one-off launches. Here is how a few teams
          describe the work.
        </p>
      </div>

      <div className="mt-9 grid gap-4 sm:mt-11 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.company}
            className="flex flex-col rounded-2xl border border-line bg-[#141414] p-6 transition-colors hover:border-white/20"
          >
            <div className="flex items-start justify-between gap-4">
              <ClientMark
                src={resolveImage(testimonial.image)}
                name={testimonial.company}
                fit={testimonial.fit}
                className="h-11 w-[74px] shrink-0"
              />

              <div className="flex shrink-0 gap-0.5 pt-1.5">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star
                    key={star}
                    size={11}
                    className="fill-accent text-accent"
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>

            <blockquote className="relative mt-5 flex-1 text-[13px] leading-[1.7] text-white/65">
              <Quote
                size={16}
                className="mb-1.5 text-accent/45"
                aria-hidden="true"
              />
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>

            <figcaption className="mt-5 border-t border-white/[0.06] pt-4">
              <p className="text-[12.5px] font-semibold text-white">
                {testimonial.name}
              </p>
              <p className="mt-0.5 text-[11px] text-white/40">
                {testimonial.company} &middot; {testimonial.context}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
