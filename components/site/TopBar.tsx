import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaLinkedinIn,
} from "react-icons/fa";
import { site } from "@/lib/site";

const socials = [
  { label: "LinkedIn", href: site.social.linkedin, icon: FaLinkedinIn },
];

/**
 * Thin utility bar above the sticky navbar. Deep slate base with
 * gold accents keeps the 60-30-10 ratio intact while adding contrast.
 */
export default function TopBar() {
  return (
    <div className="bg-gradient-to-r from-[#090d16] via-[#1a2233] to-[#090d16] text-white border-b border-accent/25">
      <div className="shell flex items-center justify-between gap-3 py-2 sm:gap-4">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
          <a
            href={`tel:${site.phoneHref}`}
            className="flex shrink-0 items-center gap-2 text-[12px] font-medium text-white/85 transition-colors hover:text-accent-soft sm:text-[13px]"
          >
            <FaPhoneAlt className="text-[10px] text-accent sm:text-[11px]" aria-hidden="true" />
            <span className="whitespace-nowrap">{site.phone}</span>
          </a>

          <span
            className="hidden h-3 w-px bg-white/15 sm:block"
            aria-hidden="true"
          />

          <a
            href={`mailto:${site.email}`}
            className="flex min-w-0 items-center gap-2 text-[12px] font-medium text-white/85 transition-colors hover:text-accent-soft sm:text-[13px]"
          >
            <FaEnvelope
              className="shrink-0 text-[10px] text-accent sm:text-[11px]"
              aria-hidden="true"
            />
            <span className="truncate">{site.email}</span>
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden max-w-[360px] items-center gap-2 text-[12px] font-medium text-white/70 transition-colors hover:text-accent-soft lg:flex xl:text-[12.5px]"
          >
            <FaMapMarkerAlt
              className="shrink-0 text-[10px] text-accent sm:text-[11px]"
              aria-hidden="true"
            />
            <span className="truncate">{site.address}</span>
          </a>

          <span
            className="hidden h-3 w-px bg-white/15 lg:block"
            aria-hidden="true"
          />

          <div className="flex items-center gap-1 sm:gap-2">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] text-white/70 transition-colors hover:bg-white/10 hover:text-accent-soft sm:h-8 sm:w-8 sm:text-[13px]"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
