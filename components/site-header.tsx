"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isCurrent = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const groupIsCurrent = (items: readonly { href: string }[]) =>
    items.some((item) => isCurrent(item.href));

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-shell">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {headerGroups.slice(0, 3).map((group) => (
            <details className="nav-dropdown" key={group.label}>
              <summary className={groupIsCurrent(group.items) ? "is-current" : ""}>
                {group.label}<span aria-hidden="true">⌄</span>
              </summary>
              <div className="nav-dropdown-panel">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}

          <Link href="/case-studies" aria-current={isCurrent("/case-studies") ? "page" : undefined}>
            Case studies
          </Link>

          <details className="nav-dropdown">
            <summary className={groupIsCurrent(headerGroups[3].items) ? "is-current" : ""}>
              About<span aria-hidden="true">⌄</span>
            </summary>
            <div className="nav-dropdown-panel nav-dropdown-panel-right">
              {headerGroups[3].items.map((item) => (
                <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
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
          {headerGroups.slice(0, 3).map((group) => (
            <details className="mobile-nav-group" key={group.label}>
              <summary>{group.label}<span aria-hidden="true">+</span></summary>
              <div>
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
          ))}

          <Link href="/case-studies" onClick={() => setOpen(false)}>Case studies</Link>

          <details className="mobile-nav-group">
            <summary>About<span aria-hidden="true">+</span></summary>
            <div>
              {headerGroups[3].items.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </details>

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
