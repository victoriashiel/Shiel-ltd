import type { Metadata } from "next";
import Link from "next/link";
import styles from "./startups-new-companies.module.css";
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
  title: "Accounting for Startups & New Companies",
  description:
    "Company formation, tax registration, bookkeeping and accounting setup for startups and new companies in Ireland, the UK and Gibraltar.",
  alternates: { canonical: "/who-we-help/startups-new-companies" },
  openGraph: {
    title: "Accounting for Startups & New Companies | Shiel Accountants",
    description:
      "Set up the company, tax registrations, bookkeeping and first filing cycle properly from the start.",
    url: "/who-we-help/startups-new-companies",
  },
};

const fit = [
  "You are about to incorporate or have just formed the company.",
  "You want to know which registrations and finance systems need to be in place before trading starts.",
  "You need bookkeeping, payroll or tax set up before transactions begin to accumulate.",
  "You want an accountant involved early enough to prevent avoidable cleanup later.",
] as const;

const answers = [
  {
    question: "Should I speak to an accountant before incorporating?",
    answer:
      "Ideally, yes. Ownership, directors, expected activity and where the company will operate can affect the setup, so it is easier to check those points before the first filing is made.",
  },
  {
    question: "Can you handle the formation and the accounting?",
    answer:
      "We can coordinate the formation work where it falls within scope, then connect the tax registrations, bookkeeping, payroll and filing calendar so the company is ready to trade.",
  },
  {
    question: "When should the bookkeeping start?",
    answer:
      "From the first business transaction. Starting cleanly is much easier than rebuilding several months of bank activity, receipts and founder spending later.",
  },
  {
    question: "What if the company has not started trading yet?",
    answer:
      "That is still a useful time to set up the records, decide how founder costs will be handled and map the registrations and deadlines that will apply once trading begins.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accounting for Startups & New Companies",
  url: `${siteConfig.url}/who-we-help/startups-new-companies`,
  description:
    "Company formation, tax registration, bookkeeping and accounting setup for startups and new companies in Ireland, the UK and Gibraltar.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function StartupsNewCompaniesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <AudienceHero
        eyebrow="Startups & new companies"
        title="Start clean, before the first deadline appears."
        copy="We help new companies connect the formation, tax registrations, bookkeeping and first filing cycle from the beginning, so the finance setup grows with the business instead of trailing behind it."
        primaryLabel="See company pricing"
        primaryHref="#pricing"
        visual={
          <div className={styles.startupVisual} role="img" aria-label="Illustration showing a new company moving from formation through registrations and finance setup to trading">
            <div className={styles.visualTop}>
              <span>New company</span>
              <strong>Ready to trade</strong>
            </div>

            <div className={styles.launchTrack}>
              <div><span>01</span><strong>Form</strong><small>company · owners · directors</small></div>
              <i aria-hidden="true">→</i>
              <div><span>02</span><strong>Register</strong><small>tax · payroll · ownership</small></div>
              <i aria-hidden="true">→</i>
              <div><span>03</span><strong>Connect</strong><small>bank · books · deadlines</small></div>
            </div>

            <div className={styles.tradeCard}>
              <span>Status</span>
              <strong>Finance system ready</strong>
              <small>before the first month-end</small>
            </div>
          </div>
        }
      />

      <AudienceProof
        items={[
          ["From €79/mo", "UK from £49/mo"],
          ["Formation", "and finance setup"],
          ["1", "named accountant"],
          ["Direct", "WhatsApp access"],
        ]}
      />

      <QuickFit title="This is probably for you if..." items={fit} />

      <section className={`section-pad ${styles.launchSection}`}>
        <div className={styles.launchLead}>
          <p className="eyebrow">Before you start trading</p>
          <h2>The first month is easier when the finance setup already exists.</h2>
          <p>
            Once invoices, expenses and payroll begin, the company creates records immediately. We put the basic
            accounting structure in place early, so those records are usable from the start.
          </p>
          <Link className="text-link" href="/company-formation">See company formation support <span aria-hidden="true">↗</span></Link>
        </div>

        <div className={styles.launchBoard}>
          <article><span>Company</span><strong>Formation details</strong><small>Ownership, directors and registered company information.</small></article>
          <article><span>Tax</span><strong>Registrations</strong><small>The business taxes and employer registrations that apply to the setup.</small></article>
          <article><span>Finance</span><strong>Bookkeeping system</strong><small>Bank feeds, categories and records ready for the first transactions.</small></article>
          <article><span>Calendar</span><strong>First deadlines</strong><small>The company knows what is due before anything becomes urgent.</small></article>
        </div>
      </section>

      <section className={`section-pad ${styles.firstYearSection}`}>
        <div className={styles.firstYearHeader}>
          <p className="eyebrow">The first year</p>
          <h2>The setup should lead naturally into the first accounts.</h2>
          <p>
            Formation is not a separate project that ends when the certificate arrives. The same information should
            carry into bookkeeping, payroll, tax and the first year-end.
          </p>
        </div>

        <div className={styles.firstYearTrack} role="img" aria-label="First-year finance journey from formation to year-end accounts">
          <div><span>Day one</span><strong>Company formed</strong></div>
          <i aria-hidden="true" />
          <div><span>Trading</span><strong>Books stay current</strong></div>
          <i aria-hidden="true" />
          <div><span>During year</span><strong>Tax + payroll</strong></div>
          <i aria-hidden="true" />
          <div><span>Year end</span><strong>Accounts ready</strong></div>
        </div>
      </section>

      <section className={`section-pad ${styles.priceRoute}`} id="pricing">
        <div>
          <p className="eyebrow">Ongoing pricing</p>
          <h2>Choose the country where the company is being set up.</h2>
          <p>
            Company packages are country-specific so the recurring accounting, filing terminology and currency match
            the jurisdiction. Formation work can be scoped separately where required.
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
        eyebrow="Still at the idea stage?"
        title="That is early enough to get the accounting right."
        copy="Tell us where you plan to register the company, what it will do and who will own it. We can map the finance setup before the first transactions arrive."
      />
    </>
  );
}
