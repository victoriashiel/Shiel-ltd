import type { Metadata } from "next";
import Link from "next/link";
import styles from "./non-resident-directors.module.css";
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
  title: "Accounting for Non-resident Directors",
  description:
    "Cross-border accounting, company tax, payroll and director support for non-resident directors with companies in Ireland, the UK or Gibraltar.",
  alternates: { canonical: "/who-we-help/non-resident-directors" },
  openGraph: {
    title: "Accounting for Non-resident Directors | Shiel Accountants",
    description:
      "Keep the company, director pay, personal tax and cross-border reporting coordinated when you live in a different country from the company.",
    url: "/who-we-help/non-resident-directors",
  },
};

const fit = [
  "You live in a different country from the company you direct.",
  "You want company accounts, director pay and personal tax considered together rather than in isolation.",
  "You travel between countries for work and need to know when local payroll or tax questions should be checked.",
  "You already have advisers in more than one country and want one clear accounting picture between them.",
] as const;

const answers = [
  {
    question: "Does living abroad change how the company is taxed?",
    answer:
      "Not automatically. The answer depends on the company, where it is managed, where activities take place and the rules of the countries involved. We keep the accounting facts organised and identify where local advice is needed.",
  },
  {
    question: "What about my director salary or fees?",
    answer:
      "Director pay can create payroll and personal-tax questions in more than one country. We can coordinate the company-side accounting and help make sure the relevant local treatment is checked before pay is processed.",
  },
  {
    question: "Can you work with my accountant or adviser abroad?",
    answer:
      "Yes. We can prepare the company records and information they need, reconcile the figures between advisers and avoid asking you to translate one set of accounts into another.",
  },
  {
    question: "Can you take over an existing company?",
    answer:
      "Yes. We can review the latest accounts, bookkeeping, payroll and filings, then map any cross-border points that need attention before the next deadline.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accounting for Non-resident Directors",
  url: `${siteConfig.url}/who-we-help/non-resident-directors`,
  description:
    "Cross-border accounting, company tax, payroll and director support for non-resident directors with companies in Ireland, the UK or Gibraltar.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function NonResidentDirectorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <AudienceHero
        eyebrow="Non-resident directors"
        title="Your company can be in one country while your life is in another."
        copy="We keep the company accounts, director pay, personal tax information and cross-border adviser handoffs connected, so important details do not disappear between jurisdictions."
        primaryLabel="See company pricing"
        primaryHref="#pricing"
        visual={
          <div className={styles.crossBorderVisual} role="img" aria-label="Illustration showing a director in one country connected to a company and advisers in another">
            <div className={styles.visualTop}>
              <span>Cross-border director</span>
              <strong>One accounting picture</strong>
            </div>

            <div className={styles.residenceCard}>
              <span>Director</span>
              <strong>Lives abroad</strong>
              <small>residence · travel · personal tax</small>
            </div>

            <div className={styles.connectionLine} aria-hidden="true" />

            <div className={styles.companyCard}>
              <span>Company</span>
              <strong>Accounts + payroll</strong>
              <small>books · filings · director pay</small>
            </div>

            <div className={styles.adviserRow}>
              <div><span>Local</span><strong>Company adviser</strong></div>
              <div><span>Abroad</span><strong>Personal adviser</strong></div>
            </div>
          </div>
        }
      />

      <AudienceProof
        items={[
          ["Cross-border", "accounting coordination"],
          ["1", "named accountant"],
          ["Direct", "WhatsApp access"],
          ["Fixed", "monthly fees"],
        ]}
      />

      <QuickFit title="This is probably for you if..." items={fit} />

      <section className={`section-pad ${styles.mapSection}`}>
        <div className={styles.mapLead}>
          <p className="eyebrow">What we map first</p>
          <h2>Before giving an answer, we separate the company facts from the director facts.</h2>
          <p>
            Residence, where duties are performed, how the director is paid and where the company operates can all
            matter. We organise those facts first, then keep the accounting and adviser handoffs aligned.
          </p>
          <Link className="text-link" href="/international-accounting">See international accounting <span aria-hidden="true">↗</span></Link>
        </div>

        <div className={styles.factMap}>
          <article><span>01</span><strong>Where you live</strong><small>Your residence and personal filing context.</small></article>
          <article><span>02</span><strong>Where you work</strong><small>Where director duties and business activity actually happen.</small></article>
          <article><span>03</span><strong>How you are paid</strong><small>Salary, fees, dividends and reimbursed business costs.</small></article>
          <article><span>04</span><strong>Where the company sits</strong><small>The company’s accounts, payroll and filing jurisdiction.</small></article>
        </div>
      </section>

      <section className={`section-pad ${styles.priceRoute}`} id="pricing">
        <div>
          <p className="eyebrow">Company pricing</p>
          <h2>Start with the country where the company is registered.</h2>
          <p>
            Our company packages cover the recurring accounting around the entity. Cross-border director work is
            scoped around the countries involved and the level of coordination required.
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
        eyebrow="Living abroad already?"
        title="Start with the facts, not assumptions about residency."
        copy="Tell us where you live, where the company is registered, how you are paid and which countries you work in. We can map the accounting side and identify what needs local specialist input."
      />
    </>
  );
}
