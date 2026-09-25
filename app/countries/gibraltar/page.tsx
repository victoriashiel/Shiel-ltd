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
    note: "Standard rate for most companies; certain utility and dominant-market businesses are taxed differently.",
  },
  {
    value: "CT1",
    label: "Corporate Tax Return",
    note: "The Corporate Tax Return filed with the Income Tax Office where applicable.",
  },
  {
    value: "Annual",
    label: "Companies House return",
    note: "Annual-return filing forms part of the recurring Companies House cycle.",
  },
  {
    value: "Annual",
    label: "Accounts filing",
    note: "Annual accounts can also be filed through the Companies House e-Registry.",
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
        copy="We connect bookkeeping, PAYE, annual accounts, Corporate Tax and Companies House work so the same records carry through the year."
        visual={
          <div className={styles.gibraltarVisual} role="img" aria-label="Illustration showing Gibraltar's 15 percent standard Corporation Tax rate, no domestic VAT framework and local filing routes">
            <div className={styles.visualTop}>
              <span>Gibraltar company finance</span>
              <strong>Local framework</strong>
            </div>
            <div className={styles.ratePanel}>
              <div>
                <span>Standard Corporation Tax</span>
                <strong>15%</strong>
              </div>
              <div className={styles.vatMarker}>
                <span>Domestic VAT</span>
                <strong>Not UK / Ireland VAT</strong>
                <small>cross-border treatment depends on the transaction</small>
              </div>
            </div>
            <div className={styles.gibFilingGrid}>
              <div><span>Income Tax Office</span><strong>CT1 + tax</strong></div>
              <div><span>Companies House</span><strong>Return + accounts</strong></div>
            </div>
          </div>
        }
      />

      <CountryFacts title="The Gibraltar filing picture, at a glance." items={facts} variant="gibraltar" />

      <CountryServices
        title="The recurring Gibraltar work, handled as one accounting system."
        copy="The underlying work stays connected, while the Gibraltar layer keeps the Income Tax Office and Companies House terminology specific."
        items={services}
      />

      <CountryPricing
        title="Gibraltar prices, in one place."
        copy="Choose the type of business you run, then open the detailed package only if you need the full inclusions and limits."
        plans={prices}
        variant="gibraltar"
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
