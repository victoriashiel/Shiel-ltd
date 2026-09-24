import Link from "next/link";
import { RegionSelector } from "@/components/region-selector";
import { RegionAwareLink } from "@/components/region-aware-link";
import { RegionAwareLogo } from "@/components/region-aware-logo";
import { RegionalFooterContext } from "@/components/regional-footer-context";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-lead">
          <RegionAwareLogo />
          <p>European-based accountants supporting businesses and individuals internationally.</p>
          <div className="footer-contact-row">
            <a
              href={siteConfig.whatsappHref}
              className="footer-icon-link"
              target="_blank"
              rel="noreferrer"
              aria-label={`WhatsApp Shiel Accountants on ${siteConfig.whatsappDisplay}`}
              title="WhatsApp"
            >
              <WhatsAppIcon size={22} />
            </a>
          </div>
        </div>

        <div className="footer-columns">
          <div>
            <p className="footer-label">Services</p>
            {navigation.map((item) => (
              <RegionAwareLink key={item.href} href={item.href}>{item.label}</RegionAwareLink>
            ))}
          </div>
          <div>
            <p className="footer-label">Shiel Accountants</p>
            <RegionAwareLink href="/#about">About</RegionAwareLink>
            <RegionAwareLink href="/contact">Contact us</RegionAwareLink>
            <div className="footer-region-select">
              <RegionSelector />
            </div>
          </div>
          <div>
            <p className="footer-label">Legal</p>
            <Link href="/privacy">Privacy</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
        <RegionalFooterContext />
      </div>
    </footer>
  );
}
