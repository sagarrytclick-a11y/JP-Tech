import Link from "next/link";
import {
  FaEnvelope,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import Logo from "@/components/site/Logo";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blogs" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = [
  { label: "Web Development", href: "/services/web-development" },
  { label: "CRM & Dashboards", href: "/services/crm-development" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "SaaS Platforms", href: "/services/saas-development" },
  { label: "Internal Tools", href: "/services/internal-tools" },
  { label: "All services", href: "/services" },
];

const resourceLinks = [
  { label: "All articles", href: "/blogs" },
  { label: "Case studies", href: "/#work" },
  { label: "FAQs", href: "/#faq" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms of service", href: "/terms" },
  { label: "Sitemap", href: "/sitemap" },
];

const socials = [
  { label: "LinkedIn", href: site.social.linkedin, icon: FaLinkedinIn },
];

export default function Footer() {
  return (
    <footer className="shell pb-5 pt-10 lg:pt-14">
      <div className="relative overflow-hidden rounded-[24px] border border-line bg-[#121212] px-5 py-8 sm:rounded-[30px] sm:px-8 sm:py-10 lg:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,rgba(255,77,31,0.16),transparent_55%)]" />

        {/* Grid layout equalized across 5 columns */}
        <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-[12.5px] leading-relaxed text-white/50">
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
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-[14px] text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.08] hover:text-white active:scale-95"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links Col */}
          <div className="lg:col-span-1">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link inline-block transition-all duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links Col */}
          <div className="lg:col-span-1">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link inline-block transition-all duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links Col */}
          <div className="lg:col-span-1">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Resources
            </h3>
            <ul className="mt-4 space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="footer-link inline-block transition-all duration-200 hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-1">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Talk to a human
            </h3>
            <p className="mt-4 text-[12.5px] leading-[1.7] text-white/50">
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
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-[12.5px] text-white/70 transition-colors hover:text-white"
                >
                  <FaEnvelope className="text-[12px]" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-2.5 text-[12px] leading-relaxed text-white/55 transition-colors hover:text-white"
                >
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-[12px]" aria-hidden="true" />
                  {site.address}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Simple Disclaimer Text Section */}
        <div className="relative mt-8 border-t border-white/[0.07] pt-5">
          <p className="text-[11.5px] leading-relaxed text-white/40">
            <strong className="text-white/60 font-medium">Disclaimer:</strong> All product names, logos, brands, trademarks, and registered trademarks are property of their respective owners. All company, product, and service names used in this website are for identification purposes only. Use of these names, trademarks, and brands does not imply endorsement.
          </p>
        </div>

        {/* Bottom copyright & legal links section */}
        <div className="relative mt-6 border-t border-white/[0.07] pt-5">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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
              <Link href="/sitemap" className="transition-colors hover:text-white">
                Sitemap
              </Link>
            </div>

            <p className="text-[11px] text-white/35">
              Built in India
            </p>
          </div>
        </div>
      </div>

      <Reveal className="mt-6 overflow-hidden px-1 sm:mt-8">
        <p
          aria-hidden="true"
          className="select-none whitespace-nowrap bg-gradient-to-b from-white/22 via-white/12 to-white/[0.02] bg-clip-text text-transparent text-[clamp(64px,18vw,230px)] font-bold leading-[0.82] tracking-[-0.06em]"
        >
          JP Technology
        </p>
      </Reveal>
    </footer>
  );
}