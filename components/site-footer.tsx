import Link from "next/link";
import { Logo } from "@/components/logo";
import { services } from "@/lib/services";
import { navigation, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-lead">
          <Logo />
          <p>European-based accountancy for businesses and individuals working across borders.</p>
          <Link href="/contact" className="text-link">Start a conversation <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="footer-columns">
          <div>
            <p className="footer-label">Explore</p>
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </div>
          <div>
            <p className="footer-label">Services</p>
            {services.slice(0, 4).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>{service.title}</Link>
            ))}
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
        <p>European based · Internationally focused</p>
      </div>
    </footer>
  );
}
