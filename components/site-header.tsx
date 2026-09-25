"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { siteConfig } from "@/lib/site";

const headerGroups = [
  {
    label: "Services",
    items: [
      { label: "Accounts", href: "/accounts" },
      { label: "Tax", href: "/tax" },
      { label: "Bookkeeping", href: "/bookkeeping" },
      { label: "Payroll", href: "/payroll" },
      { label: "Advisory", href: "/advisory" },
      { label: "Company formation", href: "/company-formation" },
    ],
  },
  {
    label: "Who we help",
    items: [
      { label: "Limited companies", href: "/who-we-help/limited-companies" },
      { label: "Sole traders", href: "/who-we-help/sole-traders" },
      { label: "Contractors & freelancers", href: "/who-we-help/contractors-freelancers" },
      { label: "E-commerce sellers", href: "/who-we-help/ecommerce-sellers" },
      { label: "Non-resident directors", href: "/who-we-help/non-resident-directors" },
      { label: "Startups & new companies", href: "/who-we-help/startups-new-companies" },
    ],
  },
  {
    label: "Countries",
    items: [
      { label: "Ireland", href: "/countries/ireland" },
      { label: "United Kingdom", href: "/countries/united-kingdom" },
      { label: "Gibraltar", href: "/countries/gibraltar" },
      { label: "International", href: "/international-accounting" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Our story", href: "/about" },
      { label: "Meet the team", href: "/about/team" },
      { label: "How we work", href: "/about/how-we-work" },
    ],
  },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setDesktopOpen(null);
        setMobileOpen(null);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setDesktopOpen(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, []);

  useEffect(() => {
    setDesktopOpen(null);
    setMobileOpen(null);
    setOpen(false);
  }, [pathname]);

  const isCurrent = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const groupIsCurrent = (items: readonly { href: string }[]) =>
    items.some((item) => isCurrent(item.href));

  return (
    <header ref={headerRef} className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {headerGroups.slice(0, 3).map((group) => {
            const isOpen = desktopOpen === group.label;
            return (
              <div className="nav-dropdown" key={group.label}>
                <button
                  type="button"
                  className={groupIsCurrent(group.items) ? "nav-dropdown-trigger is-current" : "nav-dropdown-trigger"}
                  aria-expanded={isOpen}
                  aria-controls={`desktop-nav-${group.label.toLowerCase().replaceAll(" ", "-")}`}
                  onClick={() => setDesktopOpen(isOpen ? null : group.label)}
                >
                  {group.label}<span aria-hidden="true">⌄</span>
                </button>
                {isOpen && (
                  <div
                    className="nav-dropdown-panel"
                    id={`desktop-nav-${group.label.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link
            href="/case-studies"
            aria-current={isCurrent("/case-studies") ? "page" : undefined}
            onClick={() => setDesktopOpen(null)}
          >
            Case studies
          </Link>

          <div className="nav-dropdown">
            <button
              type="button"
              className={groupIsCurrent(headerGroups[3].items) ? "nav-dropdown-trigger is-current" : "nav-dropdown-trigger"}
              aria-expanded={desktopOpen === "About"}
              aria-controls="desktop-nav-about"
              onClick={() => setDesktopOpen(desktopOpen === "About" ? null : "About")}
            >
              About<span aria-hidden="true">⌄</span>
            </button>
            {desktopOpen === "About" && (
              <div className="nav-dropdown-panel nav-dropdown-panel-right" id="desktop-nav-about">
                {headerGroups[3].items.map((item) => (
                  <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="header-contact-actions">
          <Link className="button button-dark header-cta" href="/contact">Contact us</Link>
          <a
            className="whatsapp-cta-icon"
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Contact Shiel Accountants on WhatsApp at ${siteConfig.whatsappDisplay}`}
            title="WhatsApp"
          >
            <WhatsAppIcon size={22} />
          </a>
        </div>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-nav${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile navigation">
          {headerGroups.slice(0, 3).map((group) => {
            const isOpen = mobileOpen === group.label;
            return (
              <div className="mobile-nav-group" key={group.label}>
                <button
                  type="button"
                  className="mobile-nav-group-trigger"
                  aria-expanded={isOpen}
                  onClick={() => setMobileOpen(isOpen ? null : group.label)}
                >
                  {group.label}<span aria-hidden="true">+</span>
                </button>
                {isOpen && (
                  <div>
                    {group.items.map((item) => (
                      <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link href="/case-studies" onClick={() => { setOpen(false); setMobileOpen(null); }}>Case studies</Link>

          <div className="mobile-nav-group">
            <button
              type="button"
              className="mobile-nav-group-trigger"
              aria-expanded={mobileOpen === "About"}
              onClick={() => setMobileOpen(mobileOpen === "About" ? null : "About")}
            >
              About<span aria-hidden="true">+</span>
            </button>
            {mobileOpen === "About" && (
              <div>
                {headerGroups[3].items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="mobile-contact-actions">
            <Link className="button button-dark" href="/contact" onClick={() => setOpen(false)}>Contact us</Link>
            <a
              className="whatsapp-cta-icon"
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label={`Contact Shiel Accountants on WhatsApp at ${siteConfig.whatsappDisplay}`}
              title="WhatsApp"
              onClick={() => setOpen(false)}
            >
              <WhatsAppIcon size={22} />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
