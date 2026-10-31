"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  X,
} from "lucide-react";
import Logo from "@/components/site/Logo";
import ContactButton from "@/components/contact/ContactButton";
import { site } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  const hrefFor = (href: string) =>
    href.startsWith("#") && pathname !== "/" ? `/${href}` : href;

  const isActive = (href: string) => {
    if (href === "/#work") return false;
    if (href === "/about") return pathname.startsWith("/about");
    if (href === "/contact") return pathname.startsWith("/contact");
    if (href === "/services") return pathname.startsWith("/services");
    return pathname === href;
  };

  /* Close every overlay when the route changes (derived during render). */
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setOpenMenu(null);
  }

  /* Lock page scroll while the mobile drawer is open + close on Escape. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Reading progress line + elevated header after scrolling. */
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setProgress(max > 0 ? Math.min(1, doc.scrollTop / max) : 0);
        setScrolled(doc.scrollTop > 4);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-line/80 bg-panel/80 backdrop-blur-2xl transition-all duration-300 ${
          scrolled
            ? "shadow-[0_16px_40px_-24px_rgba(217,119,6,0.25)] bg-panel/95"
            : "shadow-[0_2px_12px_-8px_rgba(9,13,22,0.12)]"
        }`}
      >
        <div className="shell relative flex h-[74px] items-center justify-between gap-4">
          <Logo />

          {/* Desktop navigation — centered with an animated gold underline. */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
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
                    if (
                      !event.currentTarget.contains(event.relatedTarget as Node)
                    ) {
                      setOpenMenu(null);
                    }
                  }}
                >
                  <Link
                    href={hrefFor(item.href)}
                    aria-haspopup="true"
                    aria-expanded={openMenu === item.label}
                    className={`relative flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2.5 text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 ${
                      isActive(item.href) || openMenu === item.label
                        ? "text-accent"
                        : "text-fg/70 hover:text-fg"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-x-3.5 bottom-0 h-[2px] origin-left rounded-full bg-accent transition-transform duration-300 ${
                        isActive(item.href) || openMenu === item.label
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>

                  {/* Mega-ish services panel: promo rail + link grid. */}
                  <div
                    className={`absolute left-1/2 top-full w-[660px] -translate-x-1/2 pt-4 transition-all duration-200 ${
                      openMenu === item.label
                        ? "visible translate-y-0 opacity-100"
                        : "invisible -translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_34px_80px_-38px_rgba(9,13,22,0.4)]">
                      <div className="grid grid-cols-[216px_1fr]">
                        <div className="flex flex-col justify-between gap-6 border-r border-line bg-accent/[0.06] p-5">
                          <div>
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-ink">
                              <Sparkles size={16} aria-hidden="true" />
                            </span>
                            <p className="mt-4 text-[14px] font-semibold leading-snug tracking-[-0.01em] text-fg">
                              Not sure which service fits?
                            </p>
                            <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
                              Get a free 30-minute scoping call and a written
                              plan — no obligation.
                            </p>
                          </div>
                          <ContactButton className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-accent px-3.5 py-2.5 text-[12px] font-semibold text-accent-ink transition-colors hover:bg-accent-soft">
                            Talk to us
                            <ArrowUpRight size={13} aria-hidden="true" />
                          </ContactButton>
                        </div>

                        <div className="p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={hrefFor(child.href)}
                              className="group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-panel-soft"
                            >
                              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70 transition-transform duration-200 group-hover/item:scale-125" />
                              <span className="min-w-0">
                                <span className="flex items-center gap-1.5 text-[13px] font-semibold text-fg">
                                  {child.label}
                                  <ArrowRight
                                    size={12}
                                    className="-translate-x-1 text-accent opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                                    aria-hidden="true"
                                  />
                                </span>
                                <span className="mt-0.5 block text-[11.5px] leading-snug text-muted">
                                  {child.desc}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={hrefFor(item.href)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`group relative whitespace-nowrap px-3.5 py-2.5 text-[13.5px] font-semibold tracking-[-0.01em] transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-accent"
                      : "text-fg/70 hover:text-fg"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-3.5 bottom-0 h-[2px] origin-left rounded-full bg-accent transition-transform duration-300 ${
                      isActive(item.href)
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              )
            )}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0 lg:gap-3">
            <a
              href={`tel:${site.phoneHref}`}
              className="hidden items-center gap-2 text-[12.5px] font-semibold text-fg/80 transition-colors hover:text-accent xl:inline-flex"
            >
              <Phone size={13} className="text-accent" aria-hidden="true" />
              {site.phone}
            </a>

            <ContactButton className="group inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-accent to-accent-soft px-3 text-[12px] font-semibold text-accent-ink shadow-[0_12px_26px_-16px_rgba(217,119,6,0.95)] transition-all duration-200 hover:shadow-[0_16px_34px_-14px_rgba(217,119,6,0.9)] sm:h-11 sm:px-5 sm:text-[13px]">
              <span className="hidden min-[380px]:inline sm:hidden">Quote</span>
              <span className="hidden sm:inline">Get a Quote</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </ContactButton>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel text-fg transition-colors hover:border-accent/60 hover:text-accent lg:hidden"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>

        {/* Reading progress — a quiet gold cue under the navbar. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
          style={{ transform: `scaleX(${progress})` }}
        />
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 h-full w-full cursor-default bg-fg/45 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          id="mobile-menu"
          aria-label="Mobile menu"
          className={`absolute right-0 top-0 flex h-dvh w-[88%] max-w-[400px] flex-col bg-panel shadow-[-30px_0_90px_-40px_rgba(9,13,22,0.55)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Logo />
            <button
              type="button"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel text-fg transition-colors hover:border-accent/60 hover:text-accent"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6">
            <nav aria-label="Mobile primary" className="flex flex-col">
              {site.nav.map((item, index) => (
                <div
                  key={item.label}
                  className="border-b border-line/70 py-1 last:border-0"
                >
                  <Link
                    href={hrefFor(item.href)}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 py-3"
                  >
                    <span className="w-5 shrink-0 text-[10.5px] font-semibold tabular-nums text-muted">
                      0{index + 1}
                    </span>
                    <span
                      className={`flex-1 text-[17px] font-semibold tracking-[-0.02em] transition-colors ${
                        isActive(item.href)
                          ? "text-accent"
                          : "text-fg hover:text-accent"
                      }`}
                    >
                      {item.label}
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-muted"
                      aria-hidden="true"
                    />
                  </Link>

                  {"children" in item && (
                    <div className="grid grid-cols-2 gap-1 pb-3 pl-8">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={hrefFor(child.href)}
                          onClick={() => setOpen(false)}
                          className="rounded-lg px-2 py-2 text-[12px] font-medium text-muted transition-colors hover:bg-panel-soft hover:text-fg"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {site.secondaryNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-[12px] font-semibold text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <p className="mt-6 flex items-start gap-2 text-[9px] font-bold uppercase leading-relaxed tracking-[0.14em] text-muted">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              Next.js &middot; React &middot; TypeScript &middot; Tailwind &middot; Node.js
            </p>

            <div className="mt-auto pt-6">
              <div className="rounded-2xl border border-line bg-panel-soft/70 p-4">
                <a
                  href={`tel:${site.phoneHref}`}
                  className="flex items-center gap-2.5 text-[13px] font-semibold text-fg"
                >
                  <Phone size={14} className="text-accent" aria-hidden="true" />
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2.5 flex items-center gap-2.5 text-[12px] text-muted"
                >
                  <Mail size={14} className="text-accent" aria-hidden="true" />
                  <span className="truncate">{site.email}</span>
                </a>
                <p className="mt-2.5 flex items-start gap-2.5 text-[12px] leading-snug text-muted">
                  <MapPin
                    size={14}
                    className="mt-0.5 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  {site.addressShort}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-line p-5">
            <ContactButton
              onClick={() => setOpen(false)}
              className="btn-primary w-full"
            >
              Get a Quote
              <ArrowUpRight size={15} aria-hidden="true" />
            </ContactButton>
          </div>
        </aside>
      </div>
    </>
  );
}
