import type { Metadata } from "next";
import styles from "./ireland.module.css";
import {
  CountryAnswers,
  CountryClosing,
  CountryFacts,
  CountryHero,
  CountryPricing,
  CountryServices,
} from "@/components/country-page-sections";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accountants in Ireland",
  description:
    "Accounting, Corporation Tax, CRO filings, bookkeeping, payroll and tax support for Irish companies, sole traders, contractors and e-commerce businesses.",
  alternates: { canonical: "/countries/ireland" },
  openGraph: {
    title: "Accountants in Ireland | Shiel Accountants",
    description:
      "Irish accounting support covering Revenue, CRO, bookkeeping, payroll, tax and year-end filings, with fixed monthly packages.",
    url: "/countries/ireland",
  },
};

const facts = [
  {
    value: "12.5%",
    label: "Trading Corporation Tax",
    note: "Standard rate for trading income; other income can be taxed differently.",
  },
  {
    value: "CT1",
    label: "Company tax return",
    note: "The company tax return filed with Revenue for the accounting period.",
  },
  {
    value: "B1",
    label: "CRO Annual Return",
    note: "The annual company return filed with the CRO, including for non-trading companies.",
  },
  {
    value: "56 days",
    label: "CRO filing window",
    note: "The usual filing window after the company’s Annual Return Date.",
  },
] as const;

const services = [
  {
    title: "Company accounts",
    copy: "Year-end accounts prepared from the same records used for Corporation Tax and the CRO filing cycle.",
    href: "/accounts",
  },
  {
    title: "Tax",
    copy: "Corporation Tax, personal tax, VAT and practical support around Irish Revenue registrations and returns.",
    href: "/tax",
  },
  {
    title: "Bookkeeping",
    copy: "Current bookkeeping, bank reconciliation and records that remain usable throughout the year.",
    href: "/bookkeeping",
  },
  {
    title: "Payroll",
    copy: "Irish payroll processing and employer reporting kept connected to the bookkeeping and year-end accounts.",
    href: "/payroll",
  },
  {
    title: "Company formation",
    copy: "Formation support followed by Revenue, ownership and finance setup so the company starts cleanly.",
    href: "/company-formation",
  },
  {
    title: "Advisory",
    copy: "Management reporting, cash-flow planning and financial support for business decisions as the company grows.",
    href: "/advisory",
  },
] as const;

const prices = [
  {
    label: "Limited company",
    price: "From €79 / month",
    note: "From dormant and pre-trade through to established companies with payroll and management reporting.",
    href: "/packages/ireland/limited-company",
  },
  {
    label: "Sole trader",
    price: "From €99 / month",
    note: "Ongoing bookkeeping and tax support, with a separate one-off setup option from €149.",
    href: "/packages/ireland/sole-trader",
  },
  {
    label: "Contractor",
    price: "From €129 / month",
    note: "For contractor companies, with a separate one-off contractor setup available from €199.",
    href: "/packages/ireland/contractor",
  },
  {
    label: "E-commerce",
    price: "From €179 / month",
    note: "For online sellers, with finance setup available separately from €249.",
    href: "/packages/ireland/ecommerce",
  },
] as const;

const answers = [
  {
    question: "Do you handle both Revenue and CRO work?",
    answer:
      "Yes. Where it is included in the engagement, we keep the accounts, Corporation Tax return and CRO annual-return cycle connected rather than treating each filing as a separate job.",
  },
  {
    question: "Can you take over from another Irish accountant?",
    answer:
      "Yes. We can review the latest accounts and tax position, agree the handover information needed and pick up the next bookkeeping, payroll or filing cycle.",
  },
  {
    question: "Do you work with sole traders as well as companies?",
    answer:
      "Yes. We support limited companies, sole traders, contractors and e-commerce businesses, with separate package structures for each.",
  },
  {
    question: "Can you help if part of the business is outside Ireland?",
    answer:
      "Yes. We can coordinate the Irish accounting with overseas advisers and identify where jurisdiction-specific advice or additional registrations may be needed.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accounting services in Ireland",
  url: `${siteConfig.url}/countries/ireland`,
  areaServed: "Ireland",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function IrelandPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <CountryHero
        eyebrow="Ireland"
        title="Irish accounting without the filing-day scramble."
        copy="We keep Revenue, CRO, bookkeeping, payroll and year-end work connected, so one set of records carries through the year."
        visual={
          <div className={styles.irelandVisual} role="img" aria-label="Illustration showing the Irish accounting year moving from live books into Revenue and CRO filings">
            <div className={styles.visualTop}>
              <span>Irish company year</span>
              <strong>Revenue + CRO</strong>
            </div>
            <div className={styles.yearTrack}>
              <div className={styles.trackStage}>
                <span>01</span>
                <strong>Books stay current</strong>
                <small>bank · costs · payroll</small>
              </div>
              <div className={styles.trackLine} aria-hidden="true" />
              <div className={styles.trackStage}>
                <span>02</span>
                <strong>Year-end closes</strong>
                <small>accounts · reconciliations</small>
              </div>
              <div className={styles.trackLine} aria-hidden="true" />
              <div className={styles.trackStage}>
                <span>03</span>
                <strong>Filings follow</strong>
                <small>CT1 · B1 · accounts</small>
              </div>
            </div>
            <div className={styles.authorityRow}>
              <div><span>Revenue</span><strong>Tax</strong></div>
              <div><span>CRO</span><strong>Company filing</strong></div>
            </div>
          </div>
        }
      />

      <CountryFacts title="The Irish filing picture, at a glance." items={facts} variant="ireland" />

      <CountryServices
        title="One local accounting relationship across the recurring work."
        copy="The underlying work stays connected, while the Irish layer keeps the Revenue and CRO terminology specific."
        items={services}
      />

      <CountryPricing
        title="Irish prices, in one place."
        copy="Choose the type of business you run, then open the detailed package only if you need the full inclusions and limits."
        plans={prices}
        variant="ireland"
        note="Prices exclude VAT where applicable. Package limits and inclusions are shown on the detailed pricing pages."
      />

      <CountryAnswers title="What Irish clients usually want to know." items={answers} />

      <CountryClosing
        title="Tell us what is due next."
        copy="If you already have an Irish company or self-employed setup, send us the latest accounts, records and upcoming deadline. We can tell you what the handover would involve."
      />
    </>
  );
}
