import type { Metadata } from "next";
import styles from "./bookkeeping.module.css";
import { safeJsonLd } from "@/lib/seo";
import { ServiceClosing, ServiceCountries, ServiceHero, ServiceHub, ServiceProcess, ServiceScope } from "@/components/service-page-sections";
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

      <ServiceHero
        eyebrow="Bookkeeping"
        title="Books you can actually use during the year."
        copy="We keep the day-to-day records current, reconciled and connected to the rest of the finance work. That means fewer surprises at filing time, fewer year-end clean-ups and a clearer view of what the business is doing now."
        visual={
          <>
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
          </>
        }
      />

      <ServiceProcess
        eyebrow="The bookkeeping cycle"
        title="Good books are a process, not a year-end repair job."
        copy="The cleanest finance function is repetitive in the right way: collect the data, code it properly, reconcile the balances and use the result for the next decision or filing."
        steps={workflow}
        ariaLabel="Bookkeeping workflow"
      />

      <ServiceScope
        title="What we keep under control each month."
        copy="The exact bookkeeping setup depends on how you get paid, how many accounts and platforms you use, and whether VAT, payroll or e-commerce feeds are part of the picture."
        items={scope}
      />

      <ServiceHub
        eyebrow="One bookkeeping system"
        title="The books should feed the rest of the finance work."
        copy="When the ledger is current, the same records can support VAT, payroll checks, management reporting, tax work and year-end accounts. That avoids paying twice for the same clean-up."
        linkHref="/accounts"
        linkLabel="See accounts support"
        ariaLabel="Diagram showing bookkeeping connected to other finance work"
        coreEyebrow="Core records"
        coreTitle="Bookkeeping"
        nodes={["VAT / indirect tax", "Payroll checks", "Management reporting", "Year-end accounts"]}
      />

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


      <ServiceCountries
        eyebrow="Country-specific bookkeeping"
        title="The ledger is universal. The reporting around it is not."
        copy="Choose the country relevant to your business to see the local tax and filing context. If you operate across several jurisdictions, start with International."
        countries={countries}
        internationalCopy="For businesses using several currencies, entities, banks or local advisers."
      />

      <ServiceClosing
        eyebrow="Books behind?"
        title="We can clean up the past and then keep the process current."
        copy="If the bookkeeping has fallen behind, we can review the existing ledger, identify the clean-up work and agree where the ongoing monthly process should begin."
      />
    </>
  );
}
