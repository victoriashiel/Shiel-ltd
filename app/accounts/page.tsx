import type { Metadata } from "next";
import styles from "./accounts.module.css";
import { safeJsonLd } from "@/lib/seo";
import { ServiceClosing, ServiceCountries, ServiceHero, ServiceHub, ServiceProcess, ServiceScope } from "@/components/service-page-sections";
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

      <ServiceHero
        eyebrow="Accounts"
        title="Year-end accounts without the year-end scramble."
        copy="We prepare annual accounts from the underlying records, resolve the loose ends and keep the related tax and registry work connected. The exact filing names vary by country; the job is the same: get the numbers right before anything is submitted."
        visual={
          <>
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
          </>
        }
      />

      <ServiceProcess
        eyebrow="From records to filed accounts"
        title="A cleaner year-end is mostly about sequence."
        copy="The accounts should not be a separate exercise that starts from scratch. They should be the final stage of records that have been collected, checked and explained."
        steps={workflow}
        ariaLabel="Accounts workflow"
      />

      <ServiceScope
        title="What sits inside the accounts work."
        copy="The exact filing forms change between Ireland, the UK and Gibraltar, so the main service stays generic and the jurisdiction-specific requirements sit in the country layer."
        items={scope}
      />

      <ServiceHub
        eyebrow="One set of numbers"
        title="The accounts sit in the middle of several obligations."
        copy="Finalising the accounts affects more than the PDF you sign. The same figures often feed into tax, registry filings, director reporting and the opening balances for the next year."
        linkHref="/tax"
        linkLabel="See tax support"
        ariaLabel="Diagram showing year-end accounts connected to related work"
        coreEyebrow="One final set"
        coreTitle="Year-end accounts"
        nodes={["Business tax return", "Registry filing", "Director reporting", "Next-year opening balances"]}
      />

      <section className={`section-pad ${styles.editorialSection}`} data-service-reveal>
        <div className={styles.editorialHeader}>
          <p className="eyebrow">The year-end close</p>
          <h2>Five stages. One final set of numbers.</h2>
          <p>The strongest year-end process keeps each stage visible, so unresolved items are dealt with before they reach the final accounts.</p>
        </div>
        <div className={styles.closeJourney} role="img" aria-label="Year-end close from raw records through to connected filings">
          {[
            ["01", "Raw records", "Bank, sales, costs and payroll"],
            ["02", "Reconciled", "Balances checked and explained"],
            ["03", "Adjusted", "Year-end entries posted"],
            ["04", "Final accounts", "One agreed set of figures"],
            ["05", "Connected filings", "Tax and registry work follows"],
          ].map(([step, title, copy]) => (
            <div className={styles.journeyStage} key={step}>
              <span>{step}</span>
              <strong>{title}</strong>
              <small>{copy}</small>
            </div>
          ))}
        </div>
      </section>

      <ServiceCountries
        eyebrow="Country-specific requirements"
        title="Same accounting process. Different filing language."
        copy="Choose the country your company is registered in to see the terminology and requirements that apply there. For multi-country situations, use International."
        countries={countries}
        internationalCopy="For businesses whose accounting or reporting involves more than one jurisdiction."
      />

      <ServiceClosing
        eyebrow="Already have an accountant?"
        title="Switch without rebuilding everything yourself."
        copy="We can take over the records, review what is already filed and handle the accountant-to-accountant handover so the next set of accounts starts from a clear position."
      />
    </>
  );
}
