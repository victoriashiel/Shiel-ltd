import type { Metadata } from "next";
import Link from "next/link";
import styles from "./sole-traders.module.css";
import {
  AnswerCards,
  AudienceClosing,
  AudienceCountries,
  AudienceHero,
  QuickFit,
} from "@/components/who-we-help-sections";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting for Sole Traders",
  description:
    "Accounting, tax and bookkeeping support for sole traders in Ireland, the UK and Gibraltar.",
  alternates: { canonical: "/who-we-help/sole-traders" },
  openGraph: {
    title: "Accounting for Sole Traders | Shiel Accountants",
    description:
      "Simple accounting and tax support for sole traders who want the books, returns and deadlines kept under control.",
    url: "/who-we-help/sole-traders",
  },
};

const fit = [
  "You are self-employed and want someone else to keep the tax and accounting deadlines straight.",
  "Your income and expenses are getting too messy to manage in spreadsheets or bank statements.",
  "You want to know what to set aside for tax before the bill arrives.",
  "You want a simple fixed-fee setup without paying for company-level complexity you do not need.",
] as const;

const answers = [
  {
    question: "What do you actually handle?",
    answer:
      "Bookkeeping, annual accounts or income-and-expense records where relevant, personal tax returns, registrations and recurring filing support based on the jurisdiction.",
  },
  {
    question: "Do I need bookkeeping every month?",
    answer:
      "Not always. The right frequency depends on transaction volume, VAT or indirect-tax obligations and how current you want the numbers to be.",
  },
  {
    question: "Can you tell me what to put aside for tax?",
    answer:
      "Yes. Once the records are current, we can give you a much clearer estimate of the likely tax position instead of waiting until the return is due.",
  },
  {
    question: "What if I should be a limited company instead?",
    answer:
      "We can flag when the current setup is no longer a good fit and talk through the accounting implications before you change structure.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accounting for Sole Traders",
  url: `${siteConfig.url}/who-we-help/sole-traders`,
  description:
    "Accounting, tax and bookkeeping support for sole traders in Ireland, the UK and Gibraltar.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function SoleTradersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <AudienceHero
        eyebrow="Sole traders"
        title="Keep the business simple without losing track of the numbers."
        copy="We help sole traders keep the books current, understand what is likely to be due and get the annual tax work filed without turning the business into an admin project."
        visual={
          <div className={styles.soleVisual} role="img" aria-label="Illustration showing money in, business costs, tax set-aside and filing">
            <div className={styles.visualTop}>
              <span>Simple setup</span>
              <strong>Clear numbers</strong>
            </div>

            <div className={styles.moneyFlow}>
              <div><span>Money in</span><strong>Income</strong></div>
              <i aria-hidden="true">↓</i>
              <div><span>Business spend</span><strong>Expenses</strong></div>
              <i aria-hidden="true">↓</i>
              <div className={styles.moneyResult}><span>What matters</span><strong>Profit + tax position</strong></div>
            </div>
          </div>
        }
      />

      <QuickFit
        title="This is probably for you if..."
        items={fit}
      />

      <section className={`section-pad ${styles.simpleSection}`}>
        <div className={styles.simpleLead}>
          <p className="eyebrow">What we keep simple</p>
          <h2>You send us the records. We turn them into the numbers you need.</h2>
          <p>
            Sole-trader accounting should not feel like company administration. The goal is to keep the records
            clean enough that tax, cash and deadlines are easy to understand.
          </p>
          <Link className="text-link" href="/packages">See sole-trader packages <span aria-hidden="true">↗</span></Link>
        </div>

        <div className={styles.simpleFlow} role="img" aria-label="Sole trader accounting flow from records to tax return">
          <div><span>1</span><strong>Send records</strong><small>bank activity · invoices · expenses</small></div>
          <i aria-hidden="true">→</i>
          <div><span>2</span><strong>Books updated</strong><small>income and costs organised</small></div>
          <i aria-hidden="true">→</i>
          <div><span>3</span><strong>Tax clear</strong><small>return prepared · position explained</small></div>
        </div>
      </section>

      <AnswerCards
        eyebrow="The questions we get most"
        title="The short answers."
        items={answers}
      />

      <section className={`section-pad ${styles.priceRoute}`}>
        <div>
          <p className="eyebrow">Pricing</p>
          <h2>Choose the country, then the level of support you need.</h2>
          <p>
            Sole-trader packages are kept separate from company packages so you are not paying for work that does
            not apply to your setup.
          </p>
        </div>
        <div className={styles.priceLinks}>
          <Link href="/packages/ireland/sole-trader"><span>Ireland</span><strong>From €99 / month</strong><i>↗</i></Link>
          <Link href="/packages/united-kingdom/sole-trader"><span>United Kingdom</span><strong>From £59 / month</strong><i>↗</i></Link>
          <Link href="/packages/gibraltar/sole-trader"><span>Gibraltar</span><strong>From £79 / month</strong><i>↗</i></Link>
        </div>
      </section>

      <AudienceCountries copy="Choose the country where you are registered or filing for the local tax and reporting context." />

      <AudienceClosing
        eyebrow="Already self-employed?"
        title="You do not need perfect records before you contact us."
        copy="Send us what you have and tell us what is due next. We can work out what needs cleaning up and what the ongoing process should look like."
      />
    </>
  );
}
