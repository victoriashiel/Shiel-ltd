"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RegionSelector } from "@/components/region-selector";
import { RegionAwareLink } from "@/components/region-aware-link";
import { RegionAwareLogo } from "@/components/region-aware-logo";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { navigation, siteConfig } from "@/lib/site";

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

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-shell">
        <RegionAwareLogo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <RegionAwareLink key={item.href} href={item.href}>
              {item.label}
            </RegionAwareLink>
          ))}
        </nav>
        <div className="header-contact-actions">
          <RegionSelector compact />
          <RegionAwareLink className="button button-dark header-cta" href="/contact">Contact us</RegionAwareLink>
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
          {navigation.map((item) => (
            <RegionAwareLink key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </RegionAwareLink>
          ))}
          <div className="mobile-region-selector">
            <RegionSelector />
          </div>
          <div className="mobile-contact-actions">
            <RegionAwareLink className="button button-dark" href="/contact" onClick={() => setOpen(false)}>Contact us</RegionAwareLink>
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
