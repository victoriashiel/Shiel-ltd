import Link from "next/link";
import { Logo } from "@/components/logo";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-lead">
          <Logo />
          <p>European-based accountants supporting businesses and individuals internationally.</p>
          <a
            href={siteConfig.whatsappHref}
            className="text-link"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp {siteConfig.whatsappDisplay} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="footer-columns">
          <div>
            <p className="footer-label">Services</p>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <div>
            <p className="footer-label">Shiel Accountants</p>
            <a href="/#about">About</a>
            <a href="/#contact">Contact</a>
            <a href={siteConfig.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
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
