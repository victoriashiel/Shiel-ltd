import type { Metadata } from "next";
import styles from "./payroll.module.css";
import {
  ServiceClosing,
  ServiceCountries,
  ServiceHero,
  ServiceHub,
  ServiceProcess,
  ServiceScope,
} from "@/components/service-page-sections";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payroll",
  description:
    "Payroll processing, employer reporting and director payroll support for businesses in Ireland, the UK and Gibraltar.",
  alternates: { canonical: "/payroll" },
  openGraph: {
    title: "Payroll | Shiel Accountants",
    description:
      "Reliable payroll built around clear cut-offs, clean employee data and connected employer reporting.",
    url: "/payroll",
  },
};

const workflow = [
  {
    step: "01",
    title: "Collect",
    copy: "Capture starters, leavers, pay changes, leave, expenses and other payroll inputs before the cut-off.",
  },
  {
    step: "02",
    title: "Calculate",
    copy: "Run gross-to-net pay and apply the relevant deductions, employer charges and payroll settings.",
  },
  {
    step: "03",
    title: "Review",
    copy: "Check the payroll before release so unusual movements and employee changes are caught before payment.",
  },
  {
    step: "04",
    title: "Report",
    copy: "Complete the employer reporting, retain the payroll records and keep the figures connected to the books.",
  },
] as const;

const scope = [
  ["Regular payroll runs", "Recurring payroll processing for employees and directors on the agreed pay cycle."],
  ["Starters & leavers", "New joiners, departures and employee changes reflected in the payroll records from the correct period."],
  ["Variable pay", "Bonuses, commissions, overtime, reimbursements and other changing inputs included before the cut-off."],
  ["Director payroll", "Payroll for owner-directors where salary forms part of the wider company and personal tax position."],
  ["Employer reporting", "The payroll submissions and employer-side records required by the relevant tax authority."],
  ["Payroll reconciliations", "Payroll totals checked back to the ledger so wages, deductions and employer costs agree with the accounts."],
] as const;

const countries = [
  {
    name: "Ireland",
    href: "/countries/ireland",
    note: "Irish payroll, PAYE and Revenue reporting terminology.",
  },
  {
    name: "United Kingdom",
    href: "/countries/united-kingdom",
    note: "UK payroll, PAYE and HMRC employer-reporting terminology.",
  },
  {
    name: "Gibraltar",
    href: "/countries/gibraltar",
    note: "Gibraltar payroll, PAYE and Income Tax Office reporting terminology.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Payroll",
  serviceType: "Payroll processing and employer reporting",
  url: `${siteConfig.url}/payroll`,
  description:
    "Payroll processing, employer reporting and director payroll support for businesses in Ireland, the UK and Gibraltar.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function PayrollPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />

      <ServiceHero
        eyebrow="Payroll"
        title="Payroll that runs on a process, not a last-minute message."
        copy="We handle recurring payroll and employer reporting with clear cut-offs, consistent employee data and a review before each run. The reporting language changes by country; the underlying control process should not."
        visual={
          <div className={styles.payrollVisual} role="img" aria-label="Illustration showing a payroll run moving from employee changes to approved and reported payroll">
            <div className={styles.visualHeader}>
              <span>Payroll run</span>
              <strong>Ready to process</strong>
            </div>

            <div className={styles.payrollTimeline}>
              <div className={styles.timelineItem}>
                <span>01</span>
                <div>
                  <strong>Changes received</strong>
                  <small>starters · leavers · pay · leave</small>
                </div>
                <i>Done</i>
              </div>
              <div className={styles.timelineItem}>
                <span>02</span>
                <div>
                  <strong>Payroll calculated</strong>
                  <small>gross pay · deductions · employer costs</small>
                </div>
                <i>Done</i>
              </div>
              <div className={styles.timelineItem}>
                <span>03</span>
                <div>
                  <strong>Review complete</strong>
                  <small>movement checks · exceptions · approval</small>
                </div>
                <i>Done</i>
              </div>
            </div>

            <div className={styles.payrollOutput}>
              <div>
                <span>Next</span>
                <strong>Pay + report</strong>
              </div>
              <small>payroll records stay connected to the ledger</small>
            </div>
          </div>
        }
      />

      <ServiceProcess
        eyebrow="The payroll cycle"
        title="A reliable payroll starts before payday."
        copy="The important control points happen before money leaves the bank: gather the changes, calculate correctly, review the movements and then complete the reporting."
        steps={workflow}
        ariaLabel="Payroll workflow"
      />

      <ServiceScope
        title="What sits inside the payroll process."
        copy="The exact scope depends on headcount, pay frequency, variable pay and how much employee administration sits around each run."
        items={scope}
      />

      <ServiceHub
        eyebrow="Payroll does not sit on its own"
        title="The payroll figures should agree with the rest of the business."
        copy="Wages, employer costs, payroll deductions and director pay all feed into the bookkeeping and year-end accounts. Keeping the same figures connected prevents avoidable reconciliation work later."
        linkHref="/bookkeeping"
        linkLabel="See bookkeeping support"
        ariaLabel="Diagram showing payroll connected to related accounting work"
        coreEyebrow="Every pay cycle"
        coreTitle="Payroll"
        nodes={["Employee changes", "Employer reporting", "Bookkeeping", "Year-end accounts"]}
      />

      <section className={`section-pad ${styles.controlSection}`}>
        <div className={styles.controlHeader}>
          <p className="eyebrow">A better payroll handoff</p>
          <h2>Three moments matter in every pay cycle.</h2>
          <p>
            Most payroll problems are not caused by the calculation itself. They come from late information,
            unclear approval or records that never make it back into the accounts.
          </p>
        </div>

        <div className={styles.controlGrid}>
          <article>
            <span>Before cut-off</span>
            <h3>Changes are complete</h3>
            <p>New starters, leavers, variable pay, leave and reimbursements are submitted in one agreed window.</p>
          </article>
          <article>
            <span>Before payment</span>
            <h3>The run is reviewed</h3>
            <p>Large movements and unusual deductions are checked before the final payroll is released.</p>
          </article>
          <article>
            <span>After payroll</span>
            <h3>The books are updated</h3>
            <p>Payroll totals and employer costs are carried into the accounting records so the ledger stays current.</p>
          </article>
        </div>
      </section>

      <ServiceCountries
        eyebrow="Country-specific payroll"
        title="The payroll process is consistent. The reporting rules are local."
        copy="Choose the country where the payroll is operated to see the relevant terminology and employer-reporting context. For cross-border teams or directors, start with International."
        countries={countries}
        internationalCopy="For businesses with employees, directors or payroll obligations spanning more than one jurisdiction."
      />

      <ServiceClosing
        eyebrow="Payroll already running?"
        title="We can take over without disrupting the next pay cycle."
        copy="Send us the latest payroll reports, employee list and current pay schedule. We can review the setup, agree a clean cut-over point and keep the next run moving."
      />
    </>
  );
}
