import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import Logo from "@/components/site/Logo";
import { site } from "@/lib/site";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Journal", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  "Business Websites",
  "CRM & Dashboards",
  "Educational Platforms",
  "Native & Mobile Apps",
  "SaaS Platforms",
  "AI & Automation",
];

const resourceLinks = [
  { label: "All articles", href: "/blogs" },
  { label: "Case studies", href: "/#work" },
  { label: "FAQs", href: "/#faq" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
];

const socials = [
  { label: "Instagram", href: site.social.instagram, icon: FaInstagram },
  { label: "LinkedIn", href: site.social.linkedin, icon: FaLinkedinIn },
  { label: "Facebook", href: site.social.facebook, icon: FaFacebookF },
  { label: "Email", href: `mailto:${site.email}`, icon: FaEnvelope },
];

export default function Footer() {
  return (
    <footer className="shell pb-5 pt-10 lg:pt-14">
      <div className="rounded-[24px] border border-line bg-[#121212] px-5 py-8 sm:rounded-[30px] sm:px-8 sm:py-10 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1fr_0.8fr_0.95fr_0.7fr_1.35fr] lg:gap-7">
          <div>
            <Logo />
            <p className="mt-4 max-w-[260px] text-[12.5px] leading-relaxed text-white/45">
              A senior web &amp; IT team building websites, CRM dashboards,
              native apps, and automation for growing businesses.
            </p>
            <div className="mt-5 flex items-center gap-1.5">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[14px] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link href="/#services" className="footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-semibold text-white">
              Talk to a human
            </h3>
            <p className="mt-4 max-w-[300px] text-[12.5px] leading-[1.7] text-white/50">
              Tell us what you are building or what is slowing your team down.
              You will hear back within one business day.
            </p>

            <ul className="mt-5 space-y-2.5">
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-2.5 text-[12.5px] text-white/70 transition-colors hover:text-white"
                >
                  <FaPhoneAlt className="text-[11px]" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.secondaryPhoneHref}`}
                  className="flex items-center gap-2.5 text-[12.5px] text-white/70 transition-colors hover:text-white"
                >
                  <FaPhoneAlt className="text-[11px]" aria-hidden="true" />
                  {site.secondaryPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-[12.5px] text-white/70 transition-colors hover:text-white"
                >
                  <FaEnvelope className="text-[12px]" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-white/60 sm:text-[13px]">
          <span>
            {"\u00a9"}2026 {site.legalName}.
          </span>
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms of Service
          </Link>
        </div>

        <p className="text-[11px] text-white/35">
          Built in India &middot; Working worldwide
        </p>
      </div>
    </footer>
  );
}
