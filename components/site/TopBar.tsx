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

export default function TopBar() {
  return (
    <div className="bg-accent text-white">
      <div className="shell flex items-center justify-between gap-3 py-2.5 sm:gap-4">
        {/* Left — phone + email */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-4">
          <a
            href={`tel:${site.phoneHref}`}
            className="flex shrink-0 items-center gap-2 text-[12px] font-medium transition-opacity hover:opacity-85 sm:text-[14px]"
          >
            <FaPhoneAlt className="text-[11px] sm:text-[12px]" aria-hidden="true" />
            <span className="whitespace-nowrap">{site.phone}</span>
          </a>

          <span
            className="hidden h-3 w-px bg-white/30 sm:block"
            aria-hidden="true"
          />

          <a
            href={`mailto:${site.email}`}
            className="flex min-w-0 items-center gap-2 text-[12px] font-medium transition-opacity hover:opacity-85 sm:text-[14px]"
          >
            <FaEnvelope
              className="shrink-0 text-[11px] sm:text-[12px]"
              aria-hidden="true"
            />
            <span className="truncate">{site.email}</span>
          </a>
        </div>

        {/* Right — address + socials */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 text-[12.5px] font-medium text-white/90 transition-opacity hover:opacity-85 lg:flex xl:text-[13.5px]"
          >
            <FaMapMarkerAlt
              className="shrink-0 text-[11px] sm:text-[12px]"
              aria-hidden="true"
            />
            <span className="whitespace-nowrap">{site.addressShort}</span>
          </a>

          <span
            className="hidden h-3 w-px bg-white/30 lg:block"
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
                className="flex h-7 w-7 items-center justify-center rounded-full text-[13px] transition-colors hover:bg-white/15 sm:h-8 sm:w-8 sm:text-[14px]"
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
