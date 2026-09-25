import type { Metadata } from "next";
import styles from "./advisory.module.css";
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
  title: "Advisory",
  description:
    "Management reporting, cash-flow planning and financial decision support for businesses in Ireland, the UK and Gibraltar.",
  alternates: { canonical: "/advisory" },
  openGraph: {
    title: "Advisory | Shiel Accountants",
    description:
      "Use the accounting to understand performance, cash flow and the financial effect of the decisions ahead.",
    url: "/advisory",
  },
};

const workflow = [
  {
    step: "01",
    title: "Measure",
    copy: "Start with reliable current figures rather than assumptions, stale reports or year-end numbers that are already out of date.",
  },
  {
    step: "02",
    title: "Explain",
    copy: "Turn the movements into a clear story: what changed, what caused it and which parts of the business are driving the result.",
  },
  {
    step: "03",
    title: "Model",
    copy: "Test the financial effect of pricing, hiring, investment, expansion or other decisions before committing to them.",
  },
  {
    step: "04",
    title: "Decide",
    copy: "Use the numbers to choose the next action, then carry the assumptions into the next reporting cycle.",
  },
] as const;

const scope = [
  ["Management accounts", "Regular reporting that shows profit, cash movement, margins and the balances that matter before year-end."],
  ["Cash-flow forecasting", "Forward-looking cash projections built around expected receipts, payments and known commitments."],
  ["Budgeting & variance", "Budgets that can be compared with actual performance so material gaps are visible early."],
  ["Margin analysis", "A clearer view of which products, services, customers or channels are actually contributing to profit."],
  ["Decision modelling", "Scenario work for hiring, pricing, investment, funding, expansion or other significant business decisions."],
  ["Owner reporting", "A concise management view for directors and owners who need useful information rather than another accounting pack."],
] as const;

const countries = [
  {
    name: "Ireland",
    href: "/countries/ireland",
    note: "Advisory built around Irish accounting, tax and company-reporting context.",
  },
  {
    name: "United Kingdom",
    href: "/countries/united-kingdom",
    note: "Advisory aligned with UK accounting, tax and reporting context.",
  },
  {
    name: "Gibraltar",
    href: "/countries/gibraltar",
    note: "Advisory aligned with Gibraltar accounting, tax and reporting context.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Advisory",
  serviceType: "Management reporting and financial advisory",
  url: `${siteConfig.url}/advisory`,
  description:
    "Management reporting, cash-flow planning and financial decision support for businesses in Ireland, the UK and Gibraltar.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function AdvisoryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />

      <ServiceHero
        eyebrow="Advisory"
        title="Use the numbers before the decision, not after it."
        copy="We turn current accounting data into management information you can actually use: what is changing, where cash is going, what is driving margin and what a decision is likely to do to the numbers."
        visual={
          <div className={styles.advisoryVisual} role="img" aria-label="Illustration showing business performance, cash and margin indicators feeding into a decision">
            <div className={styles.visualHeader}>
              <span>Decision view</span>
              <strong>Current</strong>
            </div>

            <div className={styles.metricGrid}>
              <div>
                <span>Revenue</span>
                <strong>↑ 8.4%</strong>
                <small>vs prior period</small>
              </div>
              <div>
                <span>Gross margin</span>
                <strong>31.6%</strong>
                <small>current mix</small>
              </div>
              <div>
                <span>Cash runway</span>
                <strong>6.8 mo</strong>
                <small>at current plan</small>
              </div>
              <div>
                <span>Debtors</span>
                <strong>24 days</strong>
                <small>average collection</small>
              </div>
            </div>

            <div className={styles.decisionCard}>
              <span>Scenario</span>
              <strong>Can we hire now?</strong>
              <div className={styles.decisionBars} aria-hidden="true">
                <i style={{ width: "76%" }} />
                <i style={{ width: "61%" }} />
                <i style={{ width: "84%" }} />
              </div>
              <small>model the effect on cash, margin and monthly overhead before committing</small>
            </div>
          </div>
        }
      />

      <ServiceProcess
        eyebrow="From reporting to action"
        title="The useful part of advisory is what happens after the report."
        copy="A management pack only earns its place if it helps explain the business and improves a decision. The process starts with current figures and ends with a clear next action."
        steps={workflow}
        ariaLabel="Advisory workflow"
      />

      <ServiceScope
        title="What advisory can include."
        copy="The right mix depends on the decision you are trying to make, the quality of the underlying records and how often you need a management view."
        items={scope}
      />

      <ServiceHub
        eyebrow="One management view"
        title="Good advisory connects the operating numbers."
        copy="Profit, cash, margin and working capital move together. Looking at one measure without the others can make a healthy business look weak, or a weak business look healthier than it is."
        linkHref="/bookkeeping"
        linkLabel="See bookkeeping support"
        ariaLabel="Diagram showing advisory connected to core business measures"
        coreEyebrow="Management view"
        coreTitle="Decision support"
        nodes={["Cash flow", "Margins", "Working capital", "Profitability"]}
      />

      <section className={`section-pad ${styles.scenarioSection}`}>
        <div className={styles.scenarioHeader}>
          <p className="eyebrow">Questions the numbers should answer</p>
          <h2>Advisory should be specific enough to change a decision.</h2>
          <p>
            Rather than producing more reporting for its own sake, we focus on the questions that affect cash,
            capacity, pricing and the next stage of the business.
          </p>
        </div>

        <div className={styles.scenarioGrid}>
          <article>
            <span>Pricing</span>
            <h3>What happens if we raise prices?</h3>
            <p>Model the effect on margin, volume and cash rather than relying on a percentage increase in isolation.</p>
          </article>
          <article>
            <span>Hiring</span>
            <h3>Can the business afford the next hire?</h3>
            <p>Look at salary, employer costs, cash timing and the revenue or capacity the role needs to support.</p>
          </article>
          <article>
            <span>Growth</span>
            <h3>Which part of the business deserves more investment?</h3>
            <p>Compare contribution, cash conversion and operating effort before allocating more budget or headcount.</p>
          </article>
          <article>
            <span>Cash</span>
            <h3>Why is profit up while cash is down?</h3>
            <p>Separate timing, debtors, stock, tax, capital spend and other working-capital movements from operating performance.</p>
          </article>
        </div>
      </section>

      <ServiceCountries
        eyebrow="Country context"
        title="Advisory travels well. The accounting framework underneath it is local."
        copy="Choose the relevant country if the decision depends on local tax, company or reporting rules. For businesses spanning several jurisdictions, start with International."
        countries={countries}
        internationalCopy="For businesses whose management reporting, entities or decision-making spans more than one jurisdiction."
      />

      <ServiceClosing
        eyebrow="Need a clearer view?"
        title="Bring us the decision, not a list of reports."
        copy="Tell us what you are trying to decide, what numbers you already have and where the uncertainty sits. We can shape the reporting around the question instead of producing information you do not use."
      />
    </>
  );
}
