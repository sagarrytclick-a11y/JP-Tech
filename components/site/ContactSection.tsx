import {
  Clock3,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import ContactForm from "@/components/site/ContactForm";
import { site } from "@/lib/site";

type Channel = {
  label: string;
  value: string;
  href?: string;
  icon: LucideIcon;
};

const channels: Channel[] = [
  {
    label: "Email us",
    value: site.email,
    href: `mailto:${site.email}`,
    icon: Mail,
  },
  {
    label: "Call us",
    value: site.phone,
    href: `tel:${site.phoneHref}`,
    icon: Phone,
  },
  {
    label: "Visit us",
    value: site.address,
    href: site.mapUrl,
    icon: MapPin,
  },
  {
    label: "Working hours",
    value: "Mon – Sat · 10:00 – 19:00 IST",
    icon: Clock3,
  },
];

const steps = [
  {
    title: "We read your brief",
    copy: "A real engineer reviews it — usually the same working day.",
  },
  {
    title: "A 20-minute call",
    copy: "We ask the uncomfortable questions early, not after signing.",
  },
  {
    title: "Written scope & timeline",
    copy: "Fixed phases, clear deliverables, no vague estimates.",
  },
];

const socials = [
  { label: "LinkedIn", href: site.social.linkedin, icon: FaLinkedinIn },
];

export default function ContactSection({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  return (
    <section id="contact" className="shell py-8 lg:py-10">
      {showHeader && (
        <div className="text-center">
          <span className="section-badge">Contact Us</span>
          <h2 className="section-heading mt-5 text-balance">
            Get <span className="text-accent">In Touch</span>
          </h2>
          <p className="section-copy mt-3">
            Let&apos;s discuss your project. Share your details, and we&apos;ll
            book a call at your preferred time.
          </p>
        </div>
      )}

      <div
        className={`mx-auto grid max-w-[1120px] gap-4 lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:gap-5 ${
          showHeader ? "mt-8 sm:mt-10" : "mt-2 lg:mt-0"
        }`}
      >
        {/* Contact information */}
        <aside className="order-2 flex flex-col rounded-[24px] border border-line bg-[#191919] p-6 sm:rounded-[28px] sm:p-7 lg:order-1 lg:p-8">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
            Direct lines
          </span>

          <h3 className="mt-3 text-balance text-[20px] font-semibold leading-[1.25] tracking-[-0.01em] text-white sm:text-[22px]">
            Talk to the people who will actually build it
          </h3>

          <p className="mt-3 text-[12.5px] leading-[1.7] text-white/55 sm:text-[13px]">
            No sales handoffs, no account managers relaying messages. The same
            team that scopes your project writes the code.
          </p>

          <ul className="mt-6 space-y-2.5">
            {channels.map((channel) => {
              const Icon = channel.icon;
              const inner = (
                <>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent">
                    <Icon size={15} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10.5px] uppercase tracking-[0.12em] text-white/35">
                      {channel.label}
                    </span>
                    <span
                      className={`mt-0.5 block text-[13px] font-medium text-white/85 ${
                        channel.label === "Visit us"
                          ? "leading-snug"
                          : "truncate"
                      }`}
                    >
                      {channel.value}
                    </span>
                  </span>
                </>
              );

              return (
                <li key={channel.label}>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 transition-colors hover:border-accent/35 hover:bg-white/[0.05]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-7 border-t border-white/[0.07] pt-6">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/40">
              What happens next
            </p>
            <ol className="mt-4 space-y-4">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[10.5px] font-semibold text-accent">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-[12.5px] font-semibold text-white/90">
                      {step.title}
                    </span>
                    <span className="mt-0.5 block text-[11.5px] leading-[1.6] text-white/45">
                      {step.copy}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-end gap-3 pt-7">
            <div className="flex items-center gap-1.5">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-white/50 transition-colors hover:border-accent/40 hover:text-white"
                  >
                    <Icon size={13} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Form */}
        <div className="order-1 flex flex-col rounded-[24px] border border-line bg-[#191919] p-4 sm:rounded-[28px] sm:p-7 lg:order-2 lg:p-8">
          {!showHeader && (
            <div className="mb-5">
              <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-white sm:text-[17px]">
                Tell us about your project
              </h3>
              <p className="mt-1 text-[11.5px] text-white/40">
                A few details are enough — we&apos;ll ask the rest on the call.
              </p>
            </div>
          )}
          <ContactForm />
          <div className="mt-auto flex items-start gap-2 border-t border-white/[0.06] pt-4 text-[11px] leading-relaxed text-white/35">
            <ShieldCheck
              size={13}
              className="mt-0.5 shrink-0 text-accent/70"
              aria-hidden="true"
            />
            Your details stay private. No newsletters, no third-party sharing.
          </div>
        </div>
      </div>
    </section>
  );
}
