import type { Metadata } from "next";
import Link from "next/link";
import styles from "./limited-companies.module.css";
import {
  AnswerCards,
  AudienceClosing,
  AudienceHero,
  AudienceProof,
  QuickFit,
} from "@/components/who-we-help-sections";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting for Limited Companies",
  description:
    "Accounting, tax, bookkeeping, payroll and company compliance support for limited companies in Ireland, the UK and Gibraltar.",
  alternates: { canonical: "/who-we-help/limited-companies" },
  openGraph: {
    title: "Accounting for Limited Companies | Shiel Accountants",
    description:
      "One accountant for the company accounts, tax, bookkeeping, payroll and recurring compliance around the business.",
    url: "/who-we-help/limited-companies",
  },
};

const fit = [
  "You run a limited company and want the annual accounts and tax handled properly.",
  "You want bookkeeping, payroll and year-end work to use the same set of numbers.",
  "You are tired of chasing different people for company and director questions.",
  "You want fixed monthly pricing instead of a surprise bill after year-end.",
] as const;

const answers = [
  {
    question: "What do you actually handle?",
    answer:
      "Company accounts, business tax, bookkeeping, payroll, annual company filings and director-related tax work where it forms part of the engagement.",
  },
  {
    question: "Do I still need to do the bookkeeping?",
    answer:
      "Not if you want us to handle it. We can keep the records current through the year so the accounts are not rebuilt from scratch at year-end.",
  },
  {
    question: "Can you take over from my current accountant?",
    answer:
      "Yes. We can manage the handover, review the opening position and pick up the next filing cycle from the records already in place.",
  },
  {
    question: "Will I have one person to contact?",
    answer:
      "Yes. The aim is one named accountant who understands the company rather than a different person every time you have a question.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accounting for Limited Companies",
  url: `${siteConfig.url}/who-we-help/limited-companies`,
  description:
    "Accounting, tax, bookkeeping, payroll and company compliance support for limited companies in Ireland, the UK and Gibraltar.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function LimitedCompaniesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <AudienceHero
        eyebrow="Limited companies"
        title="One company. One accountant. Fewer loose ends."
        copy="Accounts, tax, bookkeeping, payroll and company compliance kept together, with one person who knows the business."
        primaryLabel="See limited-company pricing"
        primaryHref="#pricing"
        visual={
          <div className={styles.companyVisual} role="img" aria-label="Illustration showing the core accounting responsibilities around a limited company">
            <div className={styles.visualTop}>
              <span>Your company</span>
              <strong>Connected finance</strong>
            </div>

            <div className={styles.companyCore}>
              <span>Limited company</span>
              <strong>One set of numbers</strong>
              <small>kept consistent across the year</small>
            </div>

            <div className={styles.orbitGrid}>
              <div><span>01</span><strong>Accounts</strong></div>
              <div><span>02</span><strong>Tax</strong></div>
              <div><span>03</span><strong>Bookkeeping</strong></div>
              <div><span>04</span><strong>Payroll</strong></div>
            </div>
          </div>
        }
      />

      <AudienceProof
        items={[
          ["From €79/mo", "UK from £49/mo"],
          ["1", "named accountant"],
          ["Direct", "WhatsApp access"],
          ["Free", "accountant switching"],
        ]}
      />

      <QuickFit
        title="This is probably for you if..."
        items={fit}
      />

      <section className={`section-pad ${styles.snapshotSection}`}>
        <div className={styles.snapshotLead}>
          <p className="eyebrow">What we take off your plate</p>
          <h2>The recurring company finance work, in one place.</h2>
          <p>
            You should not need to remember which filing belongs to which adviser. We keep the annual and monthly
            work connected and tell you what we need from you.
          </p>
          <Link className="text-link" href="#pricing">See limited-company packages <span aria-hidden="true">↗</span></Link>
        </div>

        <div className={styles.snapshotStack}>
          <article><span>Monthly</span><strong>Books + payroll</strong><small>Keep the records current while the year is happening.</small></article>
          <article><span>Periodic</span><strong>Tax + reporting</strong><small>Prepare the returns and reconciliations that fall due during the year.</small></article>
          <article><span>Annual</span><strong>Accounts + company filing</strong><small>Close the year from the same records and complete the connected filings.</small></article>
        </div>
      </section>

      <section className={`section-pad ${styles.priceRoute}`} id="pricing">
        <div>
          <p className="eyebrow">Pricing</p>
          <h2>Start with your country, then choose the company size that fits.</h2>
          <p>
            Our limited-company packages are country-specific so the terminology, filing scope and currency match
            where the company is registered.
          </p>
        </div>
        <div className={styles.priceLinks}>
          <Link href="/packages/ireland/limited-company"><span>Ireland</span><strong>From €79 / month</strong><i>↗</i></Link>
          <Link href="/packages/united-kingdom/limited-company"><span>United Kingdom</span><strong>From £49 / month</strong><i>↗</i></Link>
          <Link href="/packages/gibraltar/limited-company"><span>Gibraltar</span><strong>From £69 / month</strong><i>↗</i></Link>
        </div>
      </section>

      <AnswerCards
        eyebrow="The questions we get most"
        title="The short answers."
        items={answers}
      />

      <AudienceClosing
        eyebrow="Already trading?"
        title="You do not need to wait until year-end to switch."
        copy="If the company is already operating, send us the latest accounts, bookkeeping records and any upcoming deadlines. We can tell you what the handover would involve."
      />
    </>
  );
}
