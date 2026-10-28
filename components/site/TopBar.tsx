import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { site } from "@/lib/site";

const socials = [
  { label: "Instagram", href: site.social.instagram, icon: FaInstagram },
  { label: "LinkedIn", href: site.social.linkedin, icon: FaLinkedinIn },
  { label: "Facebook", href: site.social.facebook, icon: FaFacebookF },
  { label: "Email", href: `mailto:${site.email}`, icon: FaEnvelope },
];

export default function TopBar() {
  return (
    <div className="bg-accent text-white">
      <div className="shell flex items-center justify-between gap-4 py-2.5">
        <a
          href={`tel:${site.phoneHref}`}
          className="flex items-center gap-2.5 text-[13px] font-medium transition-opacity hover:opacity-85 sm:text-[15px]"
        >
          <FaPhoneAlt className="text-[13px]" aria-hidden="true" />
          <span>{site.phone}</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[14px] transition-colors hover:bg-white/15 sm:h-8 sm:w-8"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
