import Link from "next/link";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { siteConfig } from "@/lib/site";

const footerColumns = [
  {
    label: "Services",
    items: [
      ["Accounts", "/accounts"],
      ["Tax", "/tax"],
      ["Bookkeeping", "/bookkeeping"],
      ["Payroll", "/payroll"],
      ["Advisory", "/advisory"],
      ["Company formation", "/company-formation"],
    ],
  },
  {
    label: "Countries",
    items: [
      ["Ireland", "/countries/ireland"],
      ["United Kingdom", "/countries/united-kingdom"],
      ["Gibraltar", "/countries/gibraltar"],
      ["Other countries", "/international-accounting"],
    ],
  },
  {
    label: "Who we help",
    items: [
      ["Limited companies", "/who-we-help/limited-companies"],
      ["Sole traders", "/who-we-help/sole-traders"],
      ["Contractors", "/who-we-help/contractors-freelancers"],
      ["E-commerce", "/who-we-help/ecommerce-sellers"],
      ["Non-resident directors", "/who-we-help/non-resident-directors"],
      ["Startups", "/who-we-help/startups-new-companies"],
    ],
  },
  {
    label: "Resources",
    items: [
      ["Guides", "/guides"],
      ["Tax deadlines", "/tax-deadlines"],
      ["FAQ", "/faq"],
      ["Compare Shiel", "/compare-shiel"],
    ],
  },
  {
    label: "Company",
    items: [
      ["About", "/about"],
      ["Case studies", "/case-studies"],
      ["Packages", "/packages"],
      ["Switching accountant", "/switching-accountant"],
      ["Contact", "/contact"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-shell">
        <div className="footer-lead">
          <Logo />
          <p>Serving companies in Ireland, the UK and Gibraltar.</p>
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
          {footerColumns.map((column) => (
            <div key={column.label}>
              <p className="footer-label">{column.label}</p>
              {column.items.map(([label, href]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
        <div className="footer-legal-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/terms">Terms</Link>
        </div>
        <p>Serving companies in Ireland, the UK and Gibraltar</p>
      </div>
    </footer>
  );
}
