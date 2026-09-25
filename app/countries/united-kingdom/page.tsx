import type { Metadata } from "next";
import styles from "./united-kingdom.module.css";
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
  title: "Accountants in the United Kingdom",
  description:
    "UK accounting, Corporation Tax, Companies House, bookkeeping, payroll and Self Assessment support for companies, sole traders, contractors and e-commerce businesses.",
  alternates: { canonical: "/countries/united-kingdom" },
  openGraph: {
    title: "Accountants in the United Kingdom | Shiel Accountants",
    description:
      "UK accounting support covering HMRC, Companies House, bookkeeping, payroll, tax and year-end filings, with fixed monthly packages.",
    url: "/countries/united-kingdom",
  },
};

const facts = [
  {
    value: "19%–25%",
    label: "Corporation Tax",
    note: "Small-profits and main rates, with Marginal Relief potentially applying between the relevant thresholds.",
  },
  {
    value: "CT600",
    label: "Company Tax Return",
    note: "The company tax return used for Corporation Tax reporting to HMRC.",
  },
  {
    value: "Annual",
    label: "Companies House accounts",
    note: "Companies, including dormant companies, file annual accounts with Companies House.",
  },
  {
    value: "12 months",
    label: "Confirmation statement cycle",
    note: "At least one confirmation statement is filed in each 12-month review period.",
  },
] as const;

const services = [
  {
    title: "Statutory accounts",
    copy: "Year-end accounts prepared for the company and kept aligned with the Corporation Tax and Companies House filing cycle.",
    href: "/accounts",
  },
  {
    title: "Tax",
    copy: "Corporation Tax, director Self Assessment, VAT and practical support around HMRC registrations and returns.",
    href: "/tax",
  },
  {
    title: "Bookkeeping",
    copy: "Current bookkeeping, bank reconciliations and records that remain usable before the year-end accounts are prepared.",
    href: "/bookkeeping",
  },
  {
    title: "Payroll",
    copy: "UK payroll and employer reporting kept connected to the bookkeeping and year-end accounting records.",
    href: "/payroll",
  },
  {
    title: "Company formation",
    copy: "Companies House formation support followed by HMRC, ownership and finance setup where required.",
    href: "/company-formation",
  },
  {
    title: "Advisory",
    copy: "Management reporting, cash-flow planning and finance support for business decisions beyond compliance.",
    href: "/advisory",
  },
] as const;

const prices = [
  {
    label: "Limited company",
    price: "From £49 / month",
    note: "From dormant and pre-trade through to established companies with payroll and management reporting.",
    href: "/packages/united-kingdom/limited-company",
  },
  {
    label: "Sole trader",
    price: "From £59 / month",
    note: "Ongoing bookkeeping and Self Assessment support, with a separate one-off setup option from £99.",
    href: "/packages/united-kingdom/sole-trader",
  },
  {
    label: "Contractor",
    price: "From £99 / month",
    note: "For contractor companies, with a separate one-off contractor setup available from £149.",
    href: "/packages/united-kingdom/contractor",
  },
  {
    label: "E-commerce",
    price: "From £149 / month",
    note: "For online sellers, with finance setup available separately from £199.",
    href: "/packages/united-kingdom/ecommerce",
  },
] as const;

const answers = [
  {
    question: "Do you handle both HMRC and Companies House work?",
    answer:
      "Yes. Where it is included in the engagement, we keep the statutory accounts, CT600 and Companies House filing cycle connected rather than treating each item as a separate project.",
  },
  {
    question: "Can you take over from another UK accountant?",
    answer:
      "Yes. We can review the latest accounts, tax position and bookkeeping, agree the handover information needed and pick up the next filing cycle.",
  },
  {
    question: "Do you support directors as well as the company?",
    answer:
      "Yes. Director payroll and Self Assessment can be included where relevant, so the company and personal-tax sides do not have to be managed in isolation.",
  },
  {
    question: "Can you help with a UK company if I live abroad?",
    answer:
      "Yes. We can keep the UK company accounting organised and coordinate with overseas advisers where residence, duties or personal tax create another jurisdictional layer.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accounting services in the United Kingdom",
  url: `${siteConfig.url}/countries/united-kingdom`,
  areaServed: "United Kingdom",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function UnitedKingdomPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <CountryHero
        eyebrow="United Kingdom"
        title="UK accounting that keeps HMRC and Companies House in sync."
        copy="We connect bookkeeping, payroll, statutory accounts, Corporation Tax and Companies House filings so one set of records carries through the year."
        visual={
          <div className={styles.ukVisual} role="img" aria-label="Illustration showing the UK Corporation Tax range and the two-track HMRC and Companies House filing system">
            <div className={styles.visualTop}>
              <span>UK company finance</span>
              <strong>HMRC + Companies House</strong>
            </div>
            <div className={styles.taxBand}>
              <div className={styles.taxBandLabels}>
                <span>Small profits</span>
                <strong>19% → 25%</strong>
                <span>Main rate</span>
              </div>
              <div className={styles.taxBandBar}><i /></div>
              <small>Marginal Relief can apply between the relevant profit thresholds</small>
            </div>
            <div className={styles.ukFilingGrid}>
              <div><span>HMRC</span><strong>CT600 + tax</strong><small>Corporation Tax reporting</small></div>
              <div><span>Companies House</span><strong>Accounts + confirmation</strong><small>statutory company filings</small></div>
            </div>
          </div>
        }
      />

      <CountryFacts title="The UK filing picture, at a glance." items={facts} variant="uk" />

      <CountryServices
        title="The recurring UK work, kept under one accounting relationship."
        copy="The underlying work stays connected, while the UK layer keeps HMRC and Companies House terminology specific."
        items={services}
      />

      <CountryPricing
        title="UK prices, in one place."
        copy="Choose the type of business you run, then open the detailed package only if you need the full inclusions and limits."
        plans={prices}
        variant="uk"
        note="Prices exclude VAT where applicable. Package limits and inclusions are shown on the detailed pricing pages."
      />

      <CountryAnswers title="What UK clients usually want to know." items={answers} />

      <CountryClosing
        title="Tell us what is due next."
        copy="If you already have a UK company or self-employed setup, send us the latest accounts, records and upcoming deadline. We can tell you what the handover would involve."
      />
    </>
  );
}
