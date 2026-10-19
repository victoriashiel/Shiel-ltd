import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { siteConfig } from "@/lib/site";
import styles from "./site-footer.module.css";

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
    label: "Shiel",
    items: [
      ["Meet the team", "/about/team"],
      ["Monthly packages", "/packages"],
      ["Contact us", "/contact"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className={`site-footer ${styles.footer}`}>
      <div className="footer-shell">
        <div className="footer-lead">
          <Logo />
          <p>Accounts and tax support for businesses and individuals in Ireland, the UK and Gibraltar.</p>
          <div className="footer-contact-row">
            <a
              href={siteConfig.whatsappHref}
              className={styles.whatsapp}
              target="_blank"
              rel="noreferrer"
              aria-label={`WhatsApp Shiel Accountants on ${siteConfig.whatsappDisplay}`}
              title="WhatsApp"
            >
              <WhatsAppIcon size={19} /><span>WhatsApp us</span>
            </a>
          </div>
        </div>

        <nav className="footer-columns" aria-label="Footer navigation">
          {footerColumns.map((column) => (
            <div key={column.label}>
              <p className="footer-label">{column.label}</p>
              {column.items.map(([label, href]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div className="footer-partners">
        <p className="footer-label">Our Partners</p>
        <a
          href="https://www.sovereigntyglobal.org"
          target="_blank"
          rel="noopener"
          aria-label="Sovereignty Global"
        >
          <Image src="/partners/sovereignty-global.png" alt="Sovereignty Global" width={183} height={32} />
        </a>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
        <div className="footer-legal-links">
          <Link href="/privacy">Privacy</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/terms">Terms</Link>
        </div>

      </div>
    </footer>
  );
}
