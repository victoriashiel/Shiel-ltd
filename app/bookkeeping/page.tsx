import type { Metadata } from "next";
import Link from "next/link";
import styles from "./bookkeeping.module.css";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bookkeeping",
  description:
    "Ongoing bookkeeping, reconciliations and finance records for businesses in Ireland, the UK and Gibraltar.",
  alternates: { canonical: "/bookkeeping" },
  openGraph: {
    title: "Bookkeeping | Shiel Accountants",
    description:
      "Clean, current bookkeeping that keeps bank activity, sales, costs, tax and year-end accounts connected.",
    url: "/bookkeeping",
  },
};

const workflow = [
  {
    step: "01",
    title: "Capture",
    copy: "Bring bank activity, invoices, receipts and payment-platform data into one consistent bookkeeping flow.",
  },
  {
    step: "02",
    title: "Code",
    copy: "Categorise transactions properly so the records reflect what actually happened in the business.",
  },
  {
    step: "03",
    title: "Reconcile",
    copy: "Match bank, card, tax and control-account balances so unresolved items do not build up in the background.",
  },
  {
    step: "04",
    title: "Use",
    copy: "Turn current books into cleaner VAT, payroll, reporting and year-end work rather than repeating the same clean-up later.",
  },
] as const;

const scope = [
  ["Transaction bookkeeping", "Day-to-day sales, purchases, expenses and bank activity recorded consistently."],
  ["Bank reconciliations", "Bank and card balances checked against the ledger so differences are caught early."],
  ["Payment-platform feeds", "Stripe, PayPal and similar settlements mapped cleanly rather than posted as unexplained lump sums."],
  ["Supplier & customer balances", "Open invoices and credits kept visible so the ledger remains useful between year ends."],
  ["VAT-ready records", "Transactions coded in a way that supports accurate VAT or indirect-tax reporting where applicable."],
  ["Month-end review", "Recurring checks that catch duplicates, missing entries and balance-sheet issues before they become year-end problems."],
] as const;

const countries = [
  {
    name: "Ireland",
    href: "/countries/ireland",
    note: "Irish bookkeeping aligned with Revenue, VAT and local filing requirements.",
  },
  {
    name: "United Kingdom",
    href: "/countries/united-kingdom",
    note: "UK bookkeeping aligned with HMRC, VAT and Companies House workflows.",
  },
  {
    name: "Gibraltar",
    href: "/countries/gibraltar",
    note: "Gibraltar bookkeeping aligned with local tax, payroll and annual filing requirements.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Bookkeeping",
  serviceType: "Bookkeeping and reconciliations",
  url: `${siteConfig.url}/bookkeeping`,
  description:
    "Ongoing bookkeeping, reconciliations and finance records for businesses in Ireland, the UK and Gibraltar.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function BookkeepingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />

      <section className={`section-pad ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <Link href="/#services" className="back-link">← Services</Link>
          <p className="eyebrow">Bookkeeping</p>
          <h1>Books you can actually use during the year.</h1>
          <p>
            We keep the day-to-day records current, reconciled and connected to the rest of the finance work.
            That means fewer surprises at VAT time, fewer year-end clean-ups and a clearer view of what the
            business is doing now.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-dark" href="/packages">See packages <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="#countries">Choose your country <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className={styles.ledgerVisual} aria-label="Illustration of bookkeeping records being reconciled">
          <div className={styles.visualHeader}>
            <span>Monthly books</span>
            <strong>Reconciled</strong>
          </div>

          <div className={styles.ledgerRows}>
            <div>
              <span>Bank account</span>
              <strong>Matched</strong>
            </div>
            <div>
              <span>Card & expenses</span>
              <strong>Reviewed</strong>
            </div>
            <div>
              <span>Sales platforms</span>
              <strong>Mapped</strong>
            </div>
            <div>
              <span>Tax control accounts</span>
              <strong>Checked</strong>
            </div>
          </div>

          <div className={styles.balanceBar}>
            <div>
              <span>Unreconciled items</span>
              <strong>0</strong>
            </div>
            <div className={styles.barTrack} aria-hidden="true">
              <span />
            </div>
            <small>Clean books before month end</small>
          </div>
        </div>
      </section>

      <section className={`section-pad ${styles.flowSection}`}>
        <div className={styles.sectionIntro}>
          <p className="eyebrow">The bookkeeping cycle</p>
          <h2>Good books are a process, not a year-end repair job.</h2>
          <p>
            The cleanest finance function is repetitive in the right way: collect the data, code it properly,
            reconcile the balances and use the result for the next decision or filing.
          </p>
        </div>

        <div className={styles.workflow} aria-label="Bookkeeping workflow">
          {workflow.map((item, index) => (
            <article className={styles.workflowStep} key={item.step}>
              <div className={styles.stepTop}>
                <span>{item.step}</span>
                {index < workflow.length - 1 && <i aria-hidden="true">→</i>}
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.scopeSection}`}>
        <div className={styles.scopeHeader}>
          <div>
            <p className="eyebrow">Typical scope</p>
            <h2>What we keep under control each month.</h2>
          </div>
          <p>
            The exact bookkeeping setup depends on how you get paid, how many accounts and platforms you use,
            and whether VAT, payroll or e-commerce feeds are part of the picture.
          </p>
        </div>

        <div className={styles.scopeGrid}>
          {scope.map(([title, copy], index) => (
            <article className={styles.scopeCard} key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.systemSection}`}>
        <div className={styles.systemCopy}>
          <p className="eyebrow">One bookkeeping system</p>
          <h2>The books should feed the rest of the finance work.</h2>
          <p>
            When the ledger is current, the same records can support VAT, payroll checks, management reporting,
            tax work and year-end accounts. That avoids paying twice for the same clean-up.
          </p>
          <Link className="text-link" href="/accounts">See accounts support <span aria-hidden="true">↗</span></Link>
        </div>

        <div className={styles.systemMap} aria-label="Diagram showing bookkeeping connected to other finance work">
          <div className={styles.systemCore}>
            <span>Core records</span>
            <strong>Bookkeeping</strong>
          </div>
          <div className={`${styles.systemNode} ${styles.nodeA}`}>VAT / indirect tax</div>
          <div className={`${styles.systemNode} ${styles.nodeB}`}>Payroll checks</div>
          <div className={`${styles.systemNode} ${styles.nodeC}`}>Management reporting</div>
          <div className={`${styles.systemNode} ${styles.nodeD}`}>Year-end accounts</div>
          <span className={`${styles.systemLine} ${styles.lineA}`} aria-hidden="true" />
          <span className={`${styles.systemLine} ${styles.lineB}`} aria-hidden="true" />
          <span className={`${styles.systemLine} ${styles.lineC}`} aria-hidden="true" />
          <span className={`${styles.systemLine} ${styles.lineD}`} aria-hidden="true" />
        </div>
      </section>

      <section className={`section-pad ${styles.healthSection}`}>
        <div className={styles.healthHeader}>
          <p className="eyebrow">Bookkeeping health check</p>
          <h2>What clean books should look like.</h2>
        </div>

        <div className={styles.healthGrid}>
          <article>
            <span className={styles.healthStatus}>Current</span>
            <h3>Bank balances agree</h3>
            <p>The ledger and bank statement should tell the same story at the reconciliation date.</p>
          </article>
          <article>
            <span className={styles.healthStatus}>Explained</span>
            <h3>Suspense is minimal</h3>
            <p>Unclear payments and receipts are resolved rather than left in temporary accounts for months.</p>
          </article>
          <article>
            <span className={styles.healthStatus}>Connected</span>
            <h3>Tax balances make sense</h3>
            <p>VAT, payroll tax and other control accounts are checked against the relevant filings or reports.</p>
          </article>
        </div>
      </section>

      <section className={`section-pad ${styles.countrySection}`} id="countries">
        <div className={styles.countryHeader}>
          <p className="eyebrow">Country-specific bookkeeping</p>
          <h2>The ledger is universal. The reporting around it is not.</h2>
          <p>
            Choose the country relevant to your business to see the local tax and filing context. If you operate
            across several jurisdictions, start with International.
          </p>
        </div>

        <div className={styles.countryGrid}>
          {countries.map((country) => (
            <Link className={styles.countryCard} href={country.href} key={country.name}>
              <div>
                <span>Country guide</span>
                <h3>{country.name}</h3>
                <p>{country.note}</p>
              </div>
              <strong aria-hidden="true">↗</strong>
            </Link>
          ))}
          <Link className={`${styles.countryCard} ${styles.internationalCard}`} href="/international-accounting">
            <div>
              <span>Cross-border</span>
              <h3>International</h3>
              <p>For businesses using several currencies, entities, banks or local advisers.</p>
            </div>
            <strong aria-hidden="true">↗</strong>
          </Link>
        </div>
      </section>

      <section className={`section-pad ${styles.closing}`}>
        <div>
          <p className="eyebrow">Books behind?</p>
          <h2>We can clean up the past and then keep the process current.</h2>
          <p>
            If the bookkeeping has fallen behind, we can review the existing ledger, identify the clean-up work
            and agree where the ongoing monthly process should begin.
          </p>
        </div>
        <div className={styles.closingActions}>
          <Link className="button button-dark" href="/contact">Talk to us <span aria-hidden="true">↗</span></Link>
          <Link className="button button-quiet" href="/packages">View pricing</Link>
        </div>
      </section>
    </>
  );
}
