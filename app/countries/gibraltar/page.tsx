import type { Metadata } from "next";
import styles from "./gibraltar.module.css";
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
  title: "Accountants in Gibraltar",
  description:
    "Gibraltar accounting, Corporate Tax, Companies House, bookkeeping, payroll and director support for companies, sole traders, contractors and e-commerce businesses.",
  alternates: { canonical: "/countries/gibraltar" },
  openGraph: {
    title: "Accountants in Gibraltar | Shiel Accountants",
    description:
      "Gibraltar accounting support covering the Income Tax Office, Companies House, bookkeeping, payroll and year-end filings, with fixed monthly packages.",
    url: "/countries/gibraltar",
  },
};

const facts = [
  {
    value: "15%",
    label: "Standard Corporation Tax",
    note: "The standard Gibraltar Corporation Tax rate for most companies is 15%. Certain utility and dominant-market businesses are taxed differently.",
  },
  {
    value: "CT1",
    label: "Corporate Tax Return",
    note: "Gibraltar companies within scope file a Corporate Tax Return with the Income Tax Office.",
  },
  {
    value: "Annual",
    label: "Companies House return",
    note: "Companies House Gibraltar provides for annual-return filing as part of the company’s recurring statutory obligations.",
  },
  {
    value: "Annual",
    label: "Accounts filing",
    note: "Companies House Gibraltar also provides an annual-accounts filing route through its e-Registry.",
  },
] as const;

const services = [
  {
    title: "Annual accounts",
    copy: "Year-end accounts prepared from the same records used for company tax and Companies House filing work.",
    href: "/accounts",
  },
  {
    title: "Tax",
    copy: "Corporate Tax, director personal tax and practical support around Income Tax Office registrations and returns.",
    href: "/tax",
  },
  {
    title: "Bookkeeping",
    copy: "Current bookkeeping and bank reconciliation so the year-end accounts are built from records that already make sense.",
    href: "/bookkeeping",
  },
  {
    title: "Payroll",
    copy: "PAYE and employer reporting support kept connected to the bookkeeping and year-end accounting records.",
    href: "/payroll",
  },
  {
    title: "Company formation",
    copy: "Formation support followed by Income Tax Office, ownership and finance setup so the company is ready to operate.",
    href: "/company-formation",
  },
  {
    title: "Advisory",
    copy: "Management reporting, cash-flow planning and financial support for businesses using Gibraltar as their operating base.",
    href: "/advisory",
  },
] as const;

const prices = [
  {
    label: "Limited company",
    price: "From £69 / month",
    note: "From dormant and pre-trade through to established companies with payroll and management reporting.",
    href: "/packages/gibraltar/limited-company",
  },
  {
    label: "Sole trader",
    price: "From £79 / month",
    note: "Ongoing bookkeeping and tax support, with a separate one-off setup option from £129.",
    href: "/packages/gibraltar/sole-trader",
  },
  {
    label: "Contractor",
    price: "From £119 / month",
    note: "For contractor setups, with a separate one-off contractor setup available from £179.",
    href: "/packages/gibraltar/contractor",
  },
  {
    label: "E-commerce",
    price: "From £169 / month",
    note: "For online sellers, with finance setup available separately from £229.",
    href: "/packages/gibraltar/ecommerce",
  },
] as const;

const answers = [
  {
    question: "Do you handle both Income Tax Office and Companies House work?",
    answer:
      "Yes. Where it is included in the engagement, we keep the annual accounts, Corporate Tax Return and Companies House filing cycle connected rather than treating them as unrelated tasks.",
  },
  {
    question: "Can you take over from another Gibraltar accountant?",
    answer:
      "Yes. We can review the latest accounts, tax position and records, agree what is needed for the handover and pick up the next filing cycle.",
  },
  {
    question: "Do you work with directors who live outside Gibraltar?",
    answer:
      "Yes. We can keep the Gibraltar company accounting organised and coordinate with overseas advisers where the director’s residence or personal tax adds another jurisdiction.",
  },
  {
    question: "Does Gibraltar have the same VAT setup as the UK or Ireland?",
    answer:
      "No. Gibraltar should not be treated as if it follows the same domestic VAT framework as the UK or Ireland. Where cross-border indirect tax is relevant, we review the actual transaction flow and countries involved.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accounting services in Gibraltar",
  url: `${siteConfig.url}/countries/gibraltar`,
  areaServed: "Gibraltar",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
};

export default function GibraltarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <CountryHero
        eyebrow="Gibraltar"
        title="Gibraltar accounting with the local filings kept together."
        copy="We connect the bookkeeping, payroll, annual accounts, Corporate Tax and Companies House work, so the company’s records carry through the year instead of being rebuilt around each deadline."
        visual={
          <div className={styles.gibraltarVisual} role="img" aria-label="Illustration showing Gibraltar bookkeeping feeding Income Tax Office and Companies House filings">
            <div className={styles.visualTop}>
              <span>Gibraltar company finance</span>
              <strong>Connected</strong>
            </div>
            <div className={styles.ledgerCard}>
              <span>During the year</span>
              <strong>Books + PAYE</strong>
              <small>current records and reconciliations</small>
            </div>
            <div className={styles.splitLine} aria-hidden="true" />
            <div className={styles.filingRow}>
              <div><span>Income Tax Office</span><strong>CT1 + tax</strong><small>company tax filings</small></div>
              <div><span>Companies House</span><strong>Return + accounts</strong><small>annual company filings</small></div>
            </div>
          </div>
        }
      />

      <CountryFacts title="The Gibraltar company filing picture, at a glance." items={facts} />

      <CountryServices
        title="The recurring Gibraltar work, handled as one accounting system."
        copy="The service pages explain each area in detail; the Gibraltar layer keeps the terminology and filing context specific to the Income Tax Office and Companies House."
        items={services}
      />

      <CountryPricing
        title="Gibraltar pricing, without leaving the country page."
        copy="Choose the type of business you run to see the full package breakdown. These are the same prices used on the Packages page, shown here so the decision can stay within the Gibraltar journey."
        plans={prices}
        note="Government filing fees and other third-party charges are excluded unless stated. Package limits and inclusions are shown on the detailed pricing pages."
      />

      <CountryAnswers title="What Gibraltar clients usually want to know." items={answers} />

      <CountryClosing
        title="Tell us what is due next."
        copy="If you already have a Gibraltar company or self-employed setup, send us the latest accounts, records and upcoming deadline. We can tell you what the handover would involve."
      />
    </>
  );
}
