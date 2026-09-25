import type { Metadata } from "next";
import Link from "next/link";
import styles from "./contractors-freelancers.module.css";
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
  title: "Accounting for Contractors & Freelancers",
  description:
    "Accounting, tax, bookkeeping and director-pay support for contractors and freelancers in Ireland, the UK and Gibraltar.",
  alternates: { canonical: "/who-we-help/contractors-freelancers" },
  openGraph: {
    title: "Accounting for Contractors & Freelancers | Shiel Accountants",
    description:
      "Accounting support for contractors and freelancers with multiple clients, variable income and director or personal tax questions.",
    url: "/who-we-help/contractors-freelancers",
  },
};

const fit = [
  "You invoice one or more clients and want the accounting handled without chasing deadlines.",
  "Your income varies and you want a clearer view of what is available after tax and business costs.",
  "You trade through a company and need pay, expenses and year-end work kept connected.",
  "Your contracts, clients or working location change and you want the accounting implications checked.",
] as const;

const answers = [
  {
    question: "Can you handle more than one client or contract?",
    answer:
      "Yes. Support can scale with the number of contracts, transaction volume and the amount of bookkeeping or review you need.",
  },
  {
    question: "Do you deal with director salary and expenses?",
    answer:
      "Yes, where you operate through a company. Payroll, expenses, mileage and director-related tax can sit within the same accounting workflow.",
  },
  {
    question: "What if I work in more than one country?",
    answer:
      "We can coordinate the accounting and flag where local tax or specialist advice is needed, rather than duplicating records across jurisdictions.",
  },
  {
    question: "Can you take over mid-contract?",
    answer:
      "Yes. We can review the current books, payroll and filings, then agree a clean cut-over point without waiting for the contract to end.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accounting for Contractors & Freelancers",
  url: `${siteConfig.url}/who-we-help/contractors-freelancers`,
  description:
    "Accounting, tax, bookkeeping and director-pay support for contractors and freelancers in Ireland, the UK and Gibraltar.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function ContractorsFreelancersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <AudienceHero
        eyebrow="Contractors & freelancers"
        title="Keep the contracts moving. Keep the numbers clean."
        copy="We keep variable income, client invoices, expenses, director pay and year-end work in one accounting process, so each new contract does not create more admin."
        primaryLabel="See contractor pricing"
        primaryHref="#pricing"
        visual={
          <div className={styles.contractVisual} role="img" aria-label="Illustration showing contractor income from multiple clients flowing into one accounting system">
            <div className={styles.visualTop}>
              <span>Contractor view</span>
              <strong>One finance picture</strong>
            </div>

            <div className={styles.clientFlow}>
              <div><span>Client A</span><strong>Invoice</strong></div>
              <div><span>Client B</span><strong>Invoice</strong></div>
              <div><span>Client C</span><strong>Invoice</strong></div>
            </div>

            <div className={styles.flowLine} aria-hidden="true" />

            <div className={styles.contractCore}>
              <span>One accounting system</span>
              <strong>Income · expenses · pay · tax</strong>
              <small>all reconciled back to the same records</small>
            </div>
          </div>
        }
      />

      <AudienceProof
        items={[
          ["From €129/mo", "UK from £99/mo"],
          ["1", "named accountant"],
          ["Direct", "WhatsApp access"],
          ["Fixed", "monthly fees"],
        ]}
      />

      <QuickFit title="This is probably for you if..." items={fit} />

      <section className={`section-pad ${styles.controlSection}`}>
        <div className={styles.controlLead}>
          <p className="eyebrow">The moving parts</p>
          <h2>Contracting is simple until the money starts moving in different directions.</h2>
          <p>
            Client income, expenses, payroll and personal withdrawals stay visible in one place, so a new contract
            does not create another accounting system.
          </p>
          <Link className="text-link" href="#pricing">See contractor packages <span aria-hidden="true">↗</span></Link>
        </div>

        <div className={styles.controlBoard}>
          <article><span>Income</span><strong>Client invoices</strong><small>Track what is billed, paid and still outstanding.</small></article>
          <article><span>Business costs</span><strong>Expenses</strong><small>Keep deductible business spending documented and organised.</small></article>
          <article><span>Owner pay</span><strong>Salary + drawings</strong><small>Keep business cash and personal withdrawals clearly separated.</small></article>
          <article><span>Year end</span><strong>Accounts + tax</strong><small>Close the year from the same records used throughout it.</small></article>
        </div>
      </section>

      <section className={`section-pad ${styles.priceRoute}`} id="pricing">
        <div>
          <p className="eyebrow">Pricing</p>
          <h2>Choose your country, then the level of contractor support you need.</h2>
          <p>
            Setup is available separately. Ongoing packages scale with contract complexity, bookkeeping volume and
            the amount of director or cross-border support required.
          </p>
        </div>
        <div className={styles.priceLinks}>
          <Link href="/packages/ireland/contractor"><span>Ireland</span><strong>From €129 / month</strong><i>↗</i></Link>
          <Link href="/packages/united-kingdom/contractor"><span>United Kingdom</span><strong>From £99 / month</strong><i>↗</i></Link>
          <Link href="/packages/gibraltar/contractor"><span>Gibraltar</span><strong>From £119 / month</strong><i>↗</i></Link>
        </div>
      </section>

      <AnswerCards
        eyebrow="The questions we get most"
        title="The short answers."
        items={answers}
      />

      <AudienceClosing
        eyebrow="New contract starting?"
        title="Get the accounting sorted before the admin piles up."
        copy="Tell us how you trade, how many clients you have and whether you use a company. We can point you to the right setup and package."
      />
    </>
  );
}
