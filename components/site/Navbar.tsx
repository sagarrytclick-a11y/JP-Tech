"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/site/Logo";
import ContactButton from "@/components/contact/ContactButton";
import { site } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const hrefFor = (href: string) =>
    href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  return (
    <header className="relative z-30">
      <div className="relative flex items-center justify-between px-4 py-5 sm:px-7 lg:px-10 lg:py-6">
        <Logo />

        <nav
          aria-label="Primary"
          className="absolute left-1/2 top-1/2 hidden w-max -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-full border border-white/10 bg-[#1b1b1b] px-2 py-2 lg:flex xl:gap-1"
        >
          {site.nav.map((item) =>
            "children" in item ? (
              <div
                key={item.label}
                className="group relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => setOpenMenu(item.label)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setOpenMenu(null);
                  }
                }}
              >
                <Link
                  href={hrefFor(item.href)}
                  aria-haspopup="true"
                  aria-expanded={openMenu === item.label}
                  className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] text-white/70 transition-all duration-200 hover:bg-white/[0.08] hover:text-white xl:px-4 xl:text-[14px]"
                >
                  {item.label}
                  <ChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
                      openMenu === item.label ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </Link>

                <div
                  className={`absolute left-1/2 top-full -translate-x-1/2 pt-2.5 transition-all duration-150 ${
                    openMenu === item.label
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  } ${item.label === "Services" ? "w-[560px]" : "w-[330px]"}`}
                >
                  <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#151515] shadow-[0_30px_80px_-24px_rgba(0,0,0,0.9)]">
                    <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                        {item.label === "Services"
                          ? "What we build"
                          : "Selected work"}
                      </span>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-white/50 transition-colors hover:text-accent"
                      >
                        View all
                        <ArrowUpRight size={12} aria-hidden="true" />
                      </Link>
                    </div>

                    <div
                      className={`grid gap-1 p-2 ${
                        item.label === "Services"
                          ? "grid-cols-2"
                          : "grid-cols-1"
                      }`}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={hrefFor(child.href)}
                          className="group/item flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-white/[0.08] hover:translate-x-1"
                        >
                          <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-accent/70 transition-transform duration-200 group-hover/item:scale-125" />
                          <span className="min-w-0">
                            <span className="flex items-center gap-1.5 text-[13.5px] font-medium text-white/85 transition-colors group-hover/item:text-white">
                              {child.label}
                              <ArrowRight
                                size={12}
                                className="-translate-x-1 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-70"
                                aria-hidden="true"
                              />
                            </span>
                            <span className="mt-0.5 block text-[11.5px] leading-snug text-white/40">
                              {child.desc}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] bg-white/[0.02] px-5 py-3.5">
                      <p className="text-[12px] text-white/45">
                        Not sure where to start? Get a free scoping call.
                      </p>
                      <ContactButton className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-accent-soft">
                        Talk to us
                        <ArrowUpRight size={13} aria-hidden="true" />
                      </ContactButton>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={hrefFor(item.href)}
                className="whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] text-white/70 transition-all duration-200 hover:bg-white/[0.08] hover:text-white xl:px-4 xl:text-[14px]"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 sm:gap-3">
          <ContactButton className="hidden h-10 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 text-[13px] font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.22)] transition-colors hover:bg-accent-soft sm:inline-flex">
            Get a Quote
            <ArrowUpRight size={15} aria-hidden="true" />
          </ContactButton>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-[#101010] px-4 pb-5 pt-2 sm:px-7 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {site.nav.map((item) => (
              <div
                key={item.label}
                className="border-b border-white/5 last:border-0"
              >
                <Link
                  href={hrefFor(item.href)}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-[14px] font-medium text-white/80 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
                {"children" in item && (
                  <div className="pb-2 pl-3.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={hrefFor(child.href)}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-[13px] text-white/50 transition-colors hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <ContactButton
              onClick={() => setOpen(false)}
              className="btn-primary mt-4 w-full"
            >
              Get a Quote
            </ContactButton>
          </nav>
        </div>
      )}
    </header>
  );
}
