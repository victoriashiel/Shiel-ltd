import type { Metadata } from "next";
import Link from "next/link";
import styles from "./accounts.module.css";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounts",
  description:
    "Year-end accounts, filing-ready records and connected compliance support for companies in Ireland, the UK and Gibraltar.",
  alternates: { canonical: "/accounts" },
  openGraph: {
    title: "Accounts | Shiel Accountants",
    description:
      "Year-end accounts built from clean records, with the tax and registry work kept connected.",
    url: "/accounts",
  },
};

const workflow = [
  {
    step: "01",
    title: "Collect",
    copy: "Bring together the bookkeeping, bank records, payroll information and anything unusual from the year.",
  },
  {
    step: "02",
    title: "Reconcile",
    copy: "Check the balances, clear unexplained items and make sure the underlying records agree.",
  },
  {
    step: "03",
    title: "Review",
    copy: "Apply the year-end adjustments, review the figures and resolve questions before filing starts.",
  },
  {
    step: "04",
    title: "File",
    copy: "Prepare the accounts and connect the relevant tax and registry filings for your jurisdiction.",
  },
] as const;

const scope = [
  ["Year-end accounts", "A complete annual set of accounts prepared from the underlying books and records."],
  ["Balance-sheet review", "Bank, tax, payroll, debtor, creditor and other balances checked before sign-off."],
  ["Year-end adjustments", "Accruals, prepayments, depreciation and other accounting adjustments where relevant."],
  ["Tax-ready figures", "The numbers organised so the business tax return can follow from the same final accounts."],
  ["Registry filing support", "The annual company filing kept aligned with the accounts where the jurisdiction requires it."],
  ["Director queries", "Clear explanations where a balance, expense or transaction needs input before completion."],
] as const;

const countries = [
  {
    name: "Ireland",
    href: "/countries/ireland",
    note: "Irish company accounts, CRO filings and Revenue terminology.",
  },
  {
    name: "United Kingdom",
    href: "/countries/united-kingdom",
    note: "UK statutory accounts, Companies House and HMRC terminology.",
  },
  {
    name: "Gibraltar",
    href: "/countries/gibraltar",
    note: "Gibraltar annual accounts, Companies House and tax-office requirements.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accounts",
  serviceType: "Year-end accounts and annual accounting",
  url: `${siteConfig.url}/accounts`,
  description:
    "Year-end accounts, filing-ready records and connected compliance support for companies in Ireland, the UK and Gibraltar.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function AccountsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />

      <section className={`section-pad ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <Link href="/#services" className="back-link">← Services</Link>
          <p className="eyebrow">Accounts</p>
          <h1>Year-end accounts without the year-end scramble.</h1>
          <p>
            We prepare annual accounts from the underlying records, resolve the loose ends and keep the
            related tax and registry work connected. The exact filing names vary by country; the job is the
            same: get the numbers right before anything is submitted.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-dark" href="/packages">See packages <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="#countries">Choose your country <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className={styles.closeVisual} aria-label="Illustration showing records becoming filing-ready accounts">
          <div className={styles.visualTopline}>
            <span>Year-end close</span>
            <strong>Filing ready</strong>
          </div>
          <div className={styles.visualLedger}>
            <div><span>Bank & cash</span><i>Reconciled</i></div>
            <div><span>Sales & costs</span><i>Reviewed</i></div>
            <div><span>Payroll & tax</span><i>Matched</i></div>
            <div><span>Year-end entries</span><i>Posted</i></div>
          </div>
          <div className={styles.visualOutput}>
            <span>Final output</span>
            <strong>Accounts</strong>
            <small>ready for the connected filings</small>
          </div>
        </div>
      </section>

      <section className={`section-pad ${styles.flowSection}`}>
        <div className={styles.sectionIntro}>
          <p className="eyebrow">From records to filed accounts</p>
          <h2>A cleaner year-end is mostly about sequence.</h2>
          <p>
            The accounts should not be a separate exercise that starts from scratch. They should be the
            final stage of records that have been collected, checked and explained.
          </p>
        </div>

        <div className={styles.workflow} aria-label="Accounts workflow">
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
            <h2>What sits inside the accounts work.</h2>
          </div>
          <p>
            The exact filing forms change between Ireland, the UK and Gibraltar, so we keep the main service
            description generic and show the jurisdiction-specific requirements separately.
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

      <section className={`section-pad ${styles.connectedSection}`}>
        <div className={styles.connectedCopy}>
          <p className="eyebrow">One set of numbers</p>
          <h2>The accounts sit in the middle of several obligations.</h2>
          <p>
            Finalising the accounts affects more than the PDF you sign. The same figures often feed into tax,
            registry filings, director reporting and the opening balances for the next year.
          </p>
          <Link className="text-link" href="/tax">See tax support <span aria-hidden="true">↗</span></Link>
        </div>

        <div className={styles.connectionMap} aria-label="Diagram showing year-end accounts connected to related work">
          <div className={`${styles.connectionNode} ${styles.nodeTop}`}>Business tax return</div>
          <div className={`${styles.connectionNode} ${styles.nodeLeft}`}>Registry filing</div>
          <div className={styles.connectionCore}>
            <span>One final set</span>
            <strong>Year-end accounts</strong>
          </div>
          <div className={`${styles.connectionNode} ${styles.nodeRight}`}>Director reporting</div>
          <div className={`${styles.connectionNode} ${styles.nodeBottom}`}>Next-year opening balances</div>
          <span className={`${styles.connector} ${styles.lineTop}`} aria-hidden="true" />
          <span className={`${styles.connector} ${styles.lineLeft}`} aria-hidden="true" />
          <span className={`${styles.connector} ${styles.lineRight}`} aria-hidden="true" />
          <span className={`${styles.connector} ${styles.lineBottom}`} aria-hidden="true" />
        </div>
      </section>

      <section className={`section-pad ${styles.countrySection}`} id="countries">
        <div className={styles.countryHeader}>
          <p className="eyebrow">Country-specific requirements</p>
          <h2>Same accounting process. Different filing language.</h2>
          <p>
            Choose the country your company is registered in to see the terminology and requirements that
            apply there. For multi-country situations, use International.
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
              <p>For businesses whose accounting or reporting involves more than one jurisdiction.</p>
            </div>
            <strong aria-hidden="true">↗</strong>
          </Link>
        </div>
      </section>

      <section className={`section-pad ${styles.closing}`}>
        <div>
          <p className="eyebrow">Already have an accountant?</p>
          <h2>Switch without rebuilding everything yourself.</h2>
          <p>
            We can take over the records, review what is already filed and handle the accountant-to-accountant
            handover so the next set of accounts starts from a clear position.
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
