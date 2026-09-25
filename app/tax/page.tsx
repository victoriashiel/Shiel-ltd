import type { Metadata } from "next";
import Link from "next/link";
import styles from "./tax.module.css";
import { safeJsonLd } from "@/lib/seo";
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

      <section className={`section-pad ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <Link href="/#services" className="back-link">← Services</Link>
          <p className="eyebrow">Tax</p>
          <h1>Tax work that starts with the numbers, not the deadline.</h1>
          <p>
            We handle recurring business and personal tax work alongside the accounting records that support it.
            The exact return names, filing systems and deadlines vary by country; the underlying process should
            still be organised, evidence-based and easy to follow.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button-dark" href="/packages">See packages <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="#countries">Choose your country <span aria-hidden="true">↓</span></a>
          </div>
        </div>

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
      </section>

      <section className={`section-pad ${styles.flowSection}`}>
        <div className={styles.sectionIntro}>
          <p className="eyebrow">How the work should flow</p>
          <h2>A tax return is the end of the process, not the beginning.</h2>
          <p>
            Better tax work comes from having the facts, records and accounting treatment clear before the
            return is prepared. That keeps the filing connected to what actually happened in the business.
          </p>
        </div>

        <div className={styles.workflow} aria-label="Tax workflow">
          {taxFlow.map((item, index) => (
            <article className={styles.workflowStep} key={item.step}>
              <div className={styles.stepTop}>
                <span>{item.step}</span>
                {index < taxFlow.length - 1 && <i aria-hidden="true">→</i>}
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
            <h2>Tax work rarely lives in one box.</h2>
          </div>
          <p>
            The right combination depends on how you trade, where the business is registered, whether you employ
            people and whether the owner has a separate personal filing obligation.
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

      <section className={`section-pad ${styles.taxMapSection}`}>
        <div className={styles.taxMapCopy}>
          <p className="eyebrow">One business, several tax touchpoints</p>
          <h2>The useful view is the whole tax picture.</h2>
          <p>
            A business tax return can connect to payroll, VAT or indirect tax, director remuneration, personal
            tax and the year-end accounts. Looking at each in isolation creates avoidable gaps.
          </p>
          <Link className="text-link" href="/accounts">See accounts support <span aria-hidden="true">↗</span></Link>
        </div>

        <div className={styles.taxMap} aria-label="Diagram showing connected tax obligations">
          <div className={styles.taxCore}>
            <span>Core position</span>
            <strong>Business tax</strong>
          </div>
          <div className={`${styles.taxNode} ${styles.nodeA}`}>Year-end accounts</div>
          <div className={`${styles.taxNode} ${styles.nodeB}`}>Payroll taxes</div>
          <div className={`${styles.taxNode} ${styles.nodeC}`}>VAT / indirect tax</div>
          <div className={`${styles.taxNode} ${styles.nodeD}`}>Owner / director tax</div>
          <span className={`${styles.taxLine} ${styles.lineA}`} aria-hidden="true" />
          <span className={`${styles.taxLine} ${styles.lineB}`} aria-hidden="true" />
          <span className={`${styles.taxLine} ${styles.lineC}`} aria-hidden="true" />
          <span className={`${styles.taxLine} ${styles.lineD}`} aria-hidden="true" />
        </div>
      </section>

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

      <section className={`section-pad ${styles.countrySection}`} id="countries">
        <div className={styles.countryHeader}>
          <p className="eyebrow">Country-specific tax</p>
          <h2>The rules and filing language change by jurisdiction.</h2>
          <p>
            Choose the country relevant to the business to see the local terminology and tax framework. If more
            than one country is involved, start with International.
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
              <p>For businesses, owners or income streams that cross more than one tax jurisdiction.</p>
            </div>
            <strong aria-hidden="true">↗</strong>
          </Link>
        </div>
      </section>

      <section className={`section-pad ${styles.closing}`}>
        <div>
          <p className="eyebrow">Need us to take over?</p>
          <h2>We can pick up the current tax position without starting from zero.</h2>
          <p>
            Send us the latest accounts, filed returns and any correspondence you already have. We can review the
            current position, identify what is still open and set out the next actions before work starts.
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
