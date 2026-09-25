import type { Metadata } from "next";
import styles from "./tax.module.css";
import { safeJsonLd } from "@/lib/seo";
import { ServiceClosing, ServiceCountries, ServiceHero, ServiceHub, ServiceProcess, ServiceScope } from "@/components/service-page-sections";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tax",
  description:
    "Business and personal tax support for companies, owners and self-employed clients in Ireland, the UK and Gibraltar.",
  alternates: { canonical: "/tax" },
  openGraph: {
    title: "Tax | Shiel Accountants",
    description:
      "Tax compliance and planning built around the same records used for your accounts and day-to-day finance.",
    url: "/tax",
  },
};

const taxFlow = [
  {
    step: "01",
    title: "Understand",
    copy: "Start with the business, the owner and the transactions rather than jumping straight to a form.",
  },
  {
    step: "02",
    title: "Calculate",
    copy: "Work from reconciled figures, apply the relevant tax treatment and identify anything that needs clarification.",
  },
  {
    step: "03",
    title: "Review",
    copy: "Check the position before filing, including payments due, available reliefs and any connected personal tax points.",
  },
  {
    step: "04",
    title: "File",
    copy: "Submit the relevant return and keep the payment dates, records and supporting schedules together.",
  },
] as const;

const scope = [
  ["Business tax returns", "Annual business tax compliance based on the final accounting figures for the period."],
  ["Personal tax returns", "Tax return support for directors, sole traders and other individuals where it forms part of the engagement."],
  ["VAT & indirect tax", "Registration, return preparation and reconciliations where the business is required to operate a VAT or similar system."],
  ["Payroll taxes", "The employer-side tax reporting that sits alongside payroll and year-end accounts."],
  ["Tax registrations", "Help with the registrations needed when a business starts, changes structure or takes on new obligations."],
  ["Tax planning", "Forward-looking reviews around timing, remuneration, expenses and business decisions before the deadline has already passed."],
] as const;

const countries = [
  {
    name: "Ireland",
    href: "/countries/ireland",
    note: "Revenue, Corporation Tax, Form 11, VAT, PAYE and Irish filing terminology.",
  },
  {
    name: "United Kingdom",
    href: "/countries/united-kingdom",
    note: "HMRC, Corporation Tax, Self Assessment, VAT and UK payroll tax terminology.",
  },
  {
    name: "Gibraltar",
    href: "/countries/gibraltar",
    note: "Income Tax Office, corporate and personal tax, PAYE and Gibraltar filing terminology.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tax",
  serviceType: "Tax compliance and tax planning",
  url: `${siteConfig.url}/tax`,
  description:
    "Business and personal tax support for companies, owners and self-employed clients in Ireland, the UK and Gibraltar.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function TaxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />

      <ServiceHero
        eyebrow="Tax"
        title="Tax work that starts with the numbers, not the deadline."
        copy="We handle recurring business and personal tax work alongside the accounting records that support it. The exact return names, filing systems and deadlines vary by country; the underlying process should still be organised, evidence-based and easy to follow."
        visual={
          <>
            <div className={styles.taxVisual} aria-label="Illustration showing tax figures flowing from records to return and payment">
            <div className={styles.visualHeader}>
            <span>Tax position</span>
            <strong>Connected</strong>
            </div>
            
            <div className={styles.visualFlow}>
            <div className={styles.sourceCard}>
            <span>Source</span>
            <strong>Accounts & records</strong>
            <small>sales · costs · payroll · adjustments</small>
            </div>
            
            <div className={styles.flowArrow} aria-hidden="true">↓</div>
            
            <div className={styles.taxSplit}>
            <div>
            <span>Business</span>
            <strong>Tax return</strong>
            </div>
            <div>
            <span>Owner</span>
            <strong>Personal tax</strong>
            </div>
            </div>
            
            <div className={styles.flowArrow} aria-hidden="true">↓</div>
            
            <div className={styles.outputCard}>
            <span>Outcome</span>
            <strong>Filed + scheduled</strong>
            <small>return · payment · supporting records</small>
            </div>
            </div>
            </div>
          </>
        }
      />

      <ServiceProcess
        eyebrow="How the work should flow"
        title="A tax return is the end of the process, not the beginning."
        copy="Better tax work comes from having the facts, records and accounting treatment clear before the return is prepared. That keeps the filing connected to what actually happened in the business."
        steps={taxFlow}
        ariaLabel="Tax workflow"
      />

      <ServiceScope
        title="Tax work rarely lives in one box."
        copy="The right combination depends on how you trade, where the business is registered, whether you employ people and whether the owner has a separate personal filing obligation."
        items={scope}
      />

      <ServiceHub
        eyebrow="One business, several tax touchpoints"
        title="The useful view is the whole tax picture."
        copy="A business tax return can connect to payroll, VAT or indirect tax, director remuneration, personal tax and the year-end accounts. Looking at each in isolation creates avoidable gaps."
        linkHref="/accounts"
        linkLabel="See accounts support"
        ariaLabel="Diagram showing connected tax obligations"
        coreEyebrow="Core position"
        coreTitle="Business tax"
        nodes={["Year-end accounts", "Payroll taxes", "VAT / indirect tax", "Owner / director tax"]}
      />

      <section className={`section-pad ${styles.planningSection}`}>
        <div className={styles.planningHeader}>
          <p className="eyebrow">Compliance + planning</p>
          <h2>Filing the return is only half the job.</h2>
        </div>

        <div className={styles.planningGrid}>
          <article>
            <span>Before the deadline</span>
            <h3>Planning</h3>
            <p>
              Review remuneration, timing, expected profits, major costs and changes in the business while there
              is still time to make a decision.
            </p>
          </article>
          <article>
            <span>At the deadline</span>
            <h3>Compliance</h3>
            <p>
              Finalise the figures, prepare the relevant return, check the supporting records and make the filing
              position clear.
            </p>
          </article>
          <article>
            <span>After filing</span>
            <h3>Next steps</h3>
            <p>
              Keep payment dates, registrations and future obligations visible so the next filing cycle starts
              from a cleaner position.
            </p>
          </article>
        </div>
      </section>


      <section className={`section-pad ${styles.editorialSection}`} data-service-reveal>
        <div className={styles.editorialHeader}>
          <p className="eyebrow">Tax through the year</p>
          <h2>The best time to think about tax is before the return is due.</h2>
          <p>A useful tax process has planning points throughout the year instead of one concentrated rush at filing time.</p>
        </div>
        <div className={styles.taxTimeline} role="img" aria-label="Tax cycle from planning through activity, review and filing">
          {[
            ["Plan", "Expected profit, remuneration and major decisions"],
            ["Record", "Transactions and supporting evidence stay current"],
            ["Review", "Position checked before the deadline"],
            ["File", "Return, payment and records completed together"],
          ].map(([title, copy], index) => (
            <div className={styles.taxMilestone} key={title}>
              <span>0{index + 1}</span>
              <div><strong>{title}</strong><small>{copy}</small></div>
            </div>
          ))}
        </div>
      </section>

      <ServiceCountries
        eyebrow="Country-specific tax"
        title="The rules and filing language change by jurisdiction."
        copy="Choose the country relevant to the business to see the local terminology and tax framework. If more than one country is involved, start with International."
        countries={countries}
        internationalCopy="For businesses, owners or income streams that cross more than one tax jurisdiction."
      />

      <ServiceClosing
        eyebrow="Need us to take over?"
        title="We can pick up the current tax position without starting from zero."
        copy="Send us the latest accounts, filed returns and any correspondence you already have. We can review the current position, identify what is still open and set out the next actions before work starts."
      />
    </>
  );
}
