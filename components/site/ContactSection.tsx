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
    <section id="contact" className="shell py-5 lg:py-7">
      {showHeader && (
        <div className="text-center">
          <span className="section-badge">Contact Us</span>
          <h2 className="section-heading mt-3 text-balance">
            Get <span className="text-accent">In Touch</span>
          </h2>
          <p className="mx-auto mt-2.5 max-w-xl section-copy">
            Let&apos;s discuss your project. Share your details, and we&apos;ll
            book a call at your preferred time.
          </p>
        </div>
      )}

      <div
        className={`mx-auto grid max-w-[1120px] items-stretch gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] ${
          showHeader ? "mt-8 sm:mt-7" : "mt-2 lg:mt-0"
        }`}
      >
        {/* Left Sidebar: Contact Info & Steps */}
        <aside className="order-2 flex flex-col justify-between rounded-[24px] border border-line bg-panel p-6 sm:rounded-[28px] sm:p-7 lg:order-1 lg:p-8">
          <div>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-accent">
              Direct lines
            </span>

            <h3 className="mt-2.5 text-balance text-[20px] font-semibold leading-[1.25] tracking-[-0.01em] text-fg sm:text-[22px]">
              Talk to the people who will actually build it
            </h3>

            <p className="mt-2.5 text-[12.5px] leading-[1.7] text-fg/80 sm:text-[13px]">
              No sales handoffs, no account managers relaying messages. The same
              team that scopes your project writes the code.
            </p>

            <ul className="mt-5 space-y-2.5">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const inner = (
                  <>
                    <span className="flex items-center justify-center h-9 w-9 shrink-0 rounded-lg bg-accent/12 text-accent">
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10.5px] uppercase tracking-[0.12em] text-fg/60">
                        {channel.label}
                      </span>
                      <span
                        className={`mt-0.5 block text-[13px] font-medium text-fg/85 ${
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
                        className="flex items-center gap-3 rounded-xl border border-fg/[0.06] bg-fg/[0.02] px-3 py-2.5 transition-colors hover:border-accent/35 hover:bg-fg/[0.05]"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl border border-fg/[0.06] bg-fg/[0.02] px-3 py-2.5">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="pt-5 mt-5 border-t border-fg/[0.07]">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-fg/65">
                What happens next
              </p>
              <ol className="mt-3 space-y-3">
                {steps.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-[10.5px] font-semibold text-accent">
                      {index + 1}
                    </span>
                    <span>
                      <span className="block text-[12.5px] font-semibold text-fg/90">
                        {step.title}
                      </span>
                      <span className="mt-0.5 block text-[11.5px] leading-[1.5] text-fg/70">
                        {step.copy}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex items-center justify-between pt-5 mt-5 border-t border-fg/[0.07]">
            <span className="text-[11px] text-fg/60">Connect on social</span>
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
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-fg/[0.07] bg-fg/[0.02] text-fg/75 transition-colors hover:border-accent/40 hover:text-fg"
                  >
                    <Icon size={13} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right Panel: Form */}
        <div className="order-1 flex flex-col justify-between rounded-[24px] border border-line bg-panel p-5 sm:rounded-[28px] sm:p-7 lg:order-2 lg:p-8">
          <div>
            {!showHeader && (
              <div className="mb-5">
                <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-fg sm:text-[17px]">
                  Tell us about your project
                </h3>
                <p className="mt-1 text-[11.5px] text-fg/65">
                  A few details are enough — we&apos;ll ask the rest on the call.
                </p>
              </div>
            )}
            <ContactForm />
          </div>

          <div className="pt-4 mt-5 flex items-start gap-2 border-t border-fg/[0.06] text-[11px] leading-relaxed text-fg/60">
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