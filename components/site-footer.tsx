import Link from "next/link";
import { Logo } from "@/components/logo";
import { RegionSelector } from "@/components/region-selector";
import { RegionAwarePackagesLink } from "@/components/region-aware-packages-link";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-lead">
          <Logo />
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
            {navigation.filter((item) => item.label !== "Packages").map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
            <RegionAwarePackagesLink />
          </div>
          <div>
            <p className="footer-label">Shiel Accountants</p>
            <Link href="/#about">About</Link>
            <Link href="/contact">Contact us</Link>
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
        <p>European based · Working internationally</p>
      </div>
    </footer>
  );
}
