"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./packages.module.css";

type Segment = "company" | "sole-trader" | "contractor" | "ecommerce";

type Plan = {
  name: string;
  strap: string;
  price: number;
  features: string[];
  details: string[];
  limits: string;
  popular?: boolean;
};

const segments: { id: Segment; label: string; intro: string; plans: Plan[] }[] = [
  {
    id: "company",
    label: "Limited company",
    intro:
      "Company accounts, Corporation Tax, CRO filing, VAT, bookkeeping and director tax support in one monthly fee.",
    plans: [
      {
        name: "Dormant & Pre-trade",
        strap: "For newly formed, holding or dormant companies.",
        price: 79,
        features: ["Abridged or dormant accounts", "Nil CT1 and B1 filing", "RBO and CRO compliance", "1 director Form 11"],
        details: ["Named accountant", "Cloud bookkeeping software", "Bank feeds where relevant", "Deadline calendar and reminders"],
        limits: "Up to 10 transactions / month · sales up to €10k · no payroll",
      },
      {
        name: "LTD Starter",
        strap: "For new and small trading companies.",
        price: 179,
        features: ["Monthly bookkeeping", "Payroll for up to 2 employees", "CT1, B1, VAT3 and RTD", "1 director Form 11"],
        details: ["Annual accountant review", "Named accountant", "Cloud bookkeeping software", "Bank feeds", "RBO maintenance"],
        limits: "Up to 30 transactions / month · sales up to €150k · 2 directors",
      },
      {
        name: "LTD Growth",
        strap: "For growing companies with staff and steady sales.",
        price: 279,
        popular: true,
        features: ["Everything in Starter", "Payroll for up to 6 employees", "Quarterly management accounts", "VIES returns"],
        details: ["Quarterly review call", "Form 11 for 2 directors", "Named accountant", "Cloud bookkeeping software", "Bank feeds", "RBO maintenance"],
        limits: "Up to 60 transactions / month · sales up to €400k · 3 directors",
      },
      {
        name: "LTD Scale",
        strap: "For established SMEs and more complex structures.",
        price: 449,
        features: ["Everything in Growth", "Payroll for up to 15 staff", "Monthly management accounts", "Cash, RCT and group structures"],
        details: ["Weekly payroll runs where needed", "Monthly review call", "Form 11 for 3 directors", "Priority turnaround", "Named accountant"],
        limits: "Up to 120 transactions / month · sales up to €1m · 4 directors",
      },
    ],
  },
  {
    id: "sole-trader",
    label: "Sole trader",
    intro:
      "Straightforward bookkeeping and Form 11 support, with VAT and payroll included where the plan calls for it.",
    plans: [
      {
        name: "Sole Trader Essentials",
        strap: "For freelancers and newer self-employed clients.",
        price: 99,
        features: ["Bookkeeping and receipt capture", "Form 11 and preliminary tax calculation", "VAT returns if registered", "Named accountant"],
        details: ["Deadline reminders", "Cloud bookkeeping", "Support with routine Revenue queries"],
        limits: "Up to 30 transactions / month · turnover up to €80k",
      },
      {
        name: "Sole Trader Plus",
        strap: "For busy sole traders with staff or card payments.",
        price: 159,
        popular: true,
        features: ["Everything in Essentials", "Payroll for up to 2 employees", "Quarterly management summary", "Card, Stripe and SumUp feeds"],
        details: ["Named accountant", "Cloud bookkeeping", "Deadline reminders"],
        limits: "Up to 80 transactions / month · turnover up to €250k",
      },
    ],
  },
  {
    id: "contractor",
    label: "Contractor",
    intro:
      "A lean company package for single-director contractors with one main client and a simple monthly invoicing pattern.",
    plans: [
      {
        name: "Contractor",
        strap: "For single-director companies with one client and a monthly invoice.",
        price: 119,
        features: ["Full company compliance: CT1, B1 and VAT", "Director payroll", "Director Form 11", "Expense and subsistence guidance"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline calendar and reminders"],
        limits: "Up to 15 transactions / month · sales up to €150k",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    intro:
      "Built for online sellers that need platform reconciliation and EU VAT handled alongside the year-end accounts.",
    plans: [
      {
        name: "E-commerce Launch",
        strap: "For one-platform sellers getting the finance side organised.",
        price: 179,
        features: ["1 sales platform", "Stripe or PayPal feeds", "VAT returns including OSS", "Annual accounts"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline reminders"],
        limits: "Sales up to €150k",
      },
      {
        name: "E-commerce Multi-channel",
        strap: "For sellers operating across several platforms or marketplaces.",
        price: 279,
        features: ["Multi-platform reconciliation", "OSS and IOSS", "Stock and COGS accounting", "Monthly margin report"],
        details: ["Named accountant", "Cloud bookkeeping", "Bank feeds", "Deadline reminders"],
        limits: "Sales up to €500k",
      },
    ],
  },
];

const commonCompany = [
  "Dedicated accountant",
  "Cloud bookkeeping software",
  "Bank feeds",
  "Annual financial statements",
  "Corporation Tax return (CT1)",
  "CRO Annual Return (B1)",
  "VAT3 and RTD returns",
  "RBO maintenance",
  "Director Form 11",
];

const addOnGroups = [
  {
    title: "Payroll & people",
    items: [["Extra employee on payroll", "€20 / month"], ["Additional director Form 11", "€175 / year"]],
  },
  {
    title: "Registrations & Revenue",
    items: [["VAT / PAYE registration", "€125 each"], ["RBO registration", "€99"], ["Tax clearance certificate", "€65"]],
  },
  {
    title: "Catch-up & historical work",
    items: [["Catch-up bookkeeping", "€35 / hour"], ["Historical accounts", "From €650 / year"], ["Historical VAT returns", "From €120"], ["Urgent filing (under 5 days)", "€275"]],
  },
  {
    title: "Company changes",
    items: [["Company formation + first-year bundle", "€199 + CRO fee"], ["Strike-off (voluntary)", "€325"], ["Non-resident director support", "Quote"], ["Registered office / company secretary", "Quote"]],
  },
];

function recommendation(segment: Segment, transactions: string, staff: string) {
  if (segment === "contractor") return { name: "Contractor", price: 119 };
  if (segment === "ecommerce") return transactions === "high" ? { name: "E-commerce Multi-channel", price: 279 } : { name: "E-commerce Launch", price: 179 };
  if (segment === "sole-trader") return transactions === "high" || staff === "yes" ? { name: "Sole Trader Plus", price: 159 } : { name: "Sole Trader Essentials", price: 99 };
  if (transactions === "very-low") return { name: "Dormant & Pre-trade", price: 79 };
  if (transactions === "high" || staff === "large") return { name: "LTD Scale", price: 449 };
  if (transactions === "medium" || staff === "yes") return { name: "LTD Growth", price: 279 };
  return { name: "LTD Starter", price: 179 };
}

export function PackagesClient() {
  const [segment, setSegment] = useState<Segment>("company");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const [finderSegment, setFinderSegment] = useState<Segment>("company");
  const [transactions, setTransactions] = useState("low");
  const [staff, setStaff] = useState("no");

  const current = useMemo(() => segments.find((item) => item.id === segment) ?? segments[0], [segment]);
  const fit = recommendation(finderSegment, transactions, staff);

  return (
    <>
      <section className={`section-pad ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Packages</p>
          <h1>Accounting that fits the business you actually run.</h1>
          <p>
            Clear monthly pricing, published limits and a named accountant from day one.
            Choose the closest fit, or use the package finder if you are not sure where to start.
          </p>
          <div className={styles.heroActions}>
            <a className="button button-dark" href="#plans">See packages <span aria-hidden="true">↓</span></a>
            <button className="button button-quiet" type="button" onClick={() => setFinderOpen(true)}>
              Find my package <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        <div className={styles.heroPanel}>
          <span className={styles.panelKicker}>Simple by design</span>
          <strong>One monthly fee. A clear scope. No forced upgrade because one month gets busy.</strong>
          <div className={styles.miniGrid}>
            <span>Named accountant</span>
            <span>30 days&apos; notice</span>
            <span>Free switching support</span>
            <span>Quarterly limit review</span>
          </div>
        </div>
      </section>

      <section className={styles.trustBar} aria-label="Package service standards">
        <span>Named accountant</span>
        <span>Cloud bookkeeping</span>
        <span>Bank feeds</span>
        <span>Deadline reminders</span>
      </section>

      <section className={`section-pad ${styles.plansSection}`} id="plans">
        <div className={styles.controlsHeader}>
          <div>
            <p className="eyebrow">Choose your setup</p>
            <h2>Start with how you trade.</h2>
          </div>
          <button className={styles.finderButton} type="button" onClick={() => setFinderOpen(true)}>
            Not sure? Find my package <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className={styles.segmentTabs} role="tablist" aria-label="Business type">
          {segments.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={segment === item.id}
              className={segment === item.id ? styles.activeTab : ""}
              onClick={() => { setSegment(item.id); setExpanded(null); }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={styles.segmentIntro}>
          <p>{current.intro}</p>
          {segment === "company" && <span>Every company plan also includes the core compliance work shown below.</span>}
        </div>

        <div className={styles.planGrid} data-count={current.plans.length} role="tabpanel" aria-live="polite">
          {current.plans.map((plan) => {
            const isExpanded = expanded === plan.name;
            return (
              <article className={`${styles.planCard} ${plan.popular ? styles.popular : ""}`} key={plan.name}>
                <div className={styles.cardTop}>
                  <div>
                    {plan.popular && <span className={styles.popularBadge}>Most popular</span>}
                    <h3>{plan.name}</h3>
                    <p>{plan.strap}</p>
                  </div>
                  <div className={styles.price}>
                    <strong>€{plan.price}</strong>
                    <span>/ month</span>
                  </div>
                </div>

                <ul className={styles.featureList}>
                  {plan.features.map((feature) => (
                    <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>
                  ))}
                </ul>

                <button
                  className={styles.expandButton}
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() => setExpanded(isExpanded ? null : plan.name)}
                >
                  {isExpanded ? "Show less" : "View everything included"} <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                </button>

                {isExpanded && (
                  <div className={styles.expandedDetails}>
                    {plan.details.map((detail) => <span key={detail}>✓ {detail}</span>)}
                  </div>
                )}

                <div className={styles.limits}>
                  <span>Plan limits</span>
                  <p>{plan.limits}</p>
                </div>

                <Link className={`button ${plan.popular ? "button-dark" : "button-quiet"} ${styles.cardButton}`} href="/contact">
                  Choose {plan.name} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            );
          })}
        </div>

        {segment === "company" && (
          <>
            <div className={styles.includedBlock}>
              <div>
                <p className="eyebrow">Included with every company plan</p>
                <h3>The core compliance work is already covered.</h3>
              </div>
              <div className={styles.includedGrid}>
                {commonCompany.map((item) => <span key={item}>✓ {item}</span>)}
              </div>
            </div>

            <div className={styles.compareWrap}>
              <button className={styles.compareButton} type="button" onClick={() => setCompareOpen((v) => !v)} aria-expanded={compareOpen}>
                <span>{compareOpen ? "Hide plan comparison" : "Compare company plans"}</span>
                <span aria-hidden="true">{compareOpen ? "−" : "+"}</span>
              </button>
              {compareOpen && (
                <div className={styles.comparisonScroller}>
                  <table className={styles.comparisonTable}>
                    <thead>
                      <tr><th>Plan</th><th>Dormant</th><th>Starter</th><th>Growth</th><th>Scale</th></tr>
                    </thead>
                    <tbody>
                      <tr><th>Monthly fee</th><td>€79</td><td>€179</td><td>€279</td><td>€449</td></tr>
                      <tr><th>Transactions</th><td>10</td><td>30</td><td>60</td><td>120</td></tr>
                      <tr><th>Sales / turnover</th><td>€10k</td><td>€150k</td><td>€400k</td><td>€1m</td></tr>
                      <tr><th>Payroll</th><td>—</td><td>2 staff</td><td>6 staff</td><td>15 staff</td></tr>
                      <tr><th>Management accounts</th><td>—</td><td>—</td><td>Quarterly</td><td>Monthly</td></tr>
                      <tr><th>Director Form 11</th><td>1</td><td>1</td><td>2</td><td>3</td></tr>
                      <tr><th>RCT / group structures</th><td>—</td><td>—</td><td>—</td><td>Included</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        <div className={styles.bespoke}>
          <div>
            <span className={styles.panelKicker}>More complex?</span>
            <h3>Bespoke plans from €499 / month.</h3>
          </div>
          <p>
            For higher volumes or more complex structures, we scope the work first and give you a fixed quote before anything starts.
          </p>
          <Link className="button button-light" href="/contact">Get a tailored quote <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className={`section-pad ${styles.promiseSection}`}>
        <div className={styles.promiseCopy}>
          <p className="eyebrow">How it works</p>
          <h2>Clear enough to understand before you become a client.</h2>
          <p>The published limits keep the monthly fee fair. Small overages are charged separately rather than forcing an immediate package change.</p>
        </div>
        <div className={styles.promiseList}>
          {["Named accountant on every plan","1 business day response target","Deadline calendar and reminders","Annual tax-planning review","Revenue and CRO filings handled end to end"].map((promise, index) => (
            <div key={promise}><span>0{index + 1}</span><strong>{promise}</strong></div>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.addOnsSection}`}>
        <div className={styles.addOnsIntro}>
          <p className="eyebrow">Add-ons & one-off work</p>
          <h2>Need something outside the package?</h2>
          <p>Open the relevant section to see the common fees. Catch-up or unusual work is quoted before we start.</p>
        </div>
        <div className={styles.addOnAccordion}>
          {addOnGroups.map((group) => (
            <details key={group.title}>
              <summary><span>{group.title}</span><span aria-hidden="true">+</span></summary>
              <div>
                {group.items.map(([service, price]) => (
                  <p key={service}><span>{service}</span><strong>{price}</strong></p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.closing}`}>
        <p className="eyebrow">Need a steer?</p>
        <h2>You do not need to work out the right package yourself.</h2>
        <p>Tell us how the business operates and we will point you to the closest fit before you commit.</p>
        <button className="button button-dark" type="button" onClick={() => setFinderOpen(true)}>Find my package <span aria-hidden="true">↗</span></button>
        <small>Prices shown exclude VAT where applicable. Package suitability and scope are confirmed before onboarding.</small>
      </section>

      {finderOpen && (
        <div className={styles.modalBackdrop} role="presentation" onMouseDown={(e) => { if (e.currentTarget === e.target) setFinderOpen(false); }}>
          <div className={styles.finderModal} role="dialog" aria-modal="true" aria-labelledby="finder-title">
            <button className={styles.modalClose} type="button" aria-label="Close package finder" onClick={() => setFinderOpen(false)}>×</button>
            <p className="eyebrow">Package finder</p>
            <h2 id="finder-title">Find the closest fit.</h2>
            <p className={styles.finderIntro}>This is a guide to the published packages, not an accounting assessment. We confirm the scope before onboarding.</p>

            <div className={styles.finderField}>
              <span>How do you trade?</span>
              <div className={styles.finderOptions}>
                {segments.map((item) => (
                  <button key={item.id} type="button" className={finderSegment === item.id ? styles.selectedOption : ""} onClick={() => setFinderSegment(item.id)}>{item.label}</button>
                ))}
              </div>
            </div>

            <div className={styles.finderField}>
              <span>Roughly how much monthly activity?</span>
              <div className={styles.finderOptions}>
                <button type="button" className={transactions === "very-low" ? styles.selectedOption : ""} onClick={() => setTransactions("very-low")}>Very little / dormant</button>
                <button type="button" className={transactions === "low" ? styles.selectedOption : ""} onClick={() => setTransactions("low")}>Low</button>
                <button type="button" className={transactions === "medium" ? styles.selectedOption : ""} onClick={() => setTransactions("medium")}>Moderate</button>
                <button type="button" className={transactions === "high" ? styles.selectedOption : ""} onClick={() => setTransactions("high")}>High</button>
              </div>
            </div>

            {(finderSegment === "company" || finderSegment === "sole-trader") && (
              <div className={styles.finderField}>
                <span>Do you have staff?</span>
                <div className={styles.finderOptions}>
                  <button type="button" className={staff === "no" ? styles.selectedOption : ""} onClick={() => setStaff("no")}>No</button>
                  <button type="button" className={staff === "yes" ? styles.selectedOption : ""} onClick={() => setStaff("yes")}>Small team</button>
                  {finderSegment === "company" && <button type="button" className={staff === "large" ? styles.selectedOption : ""} onClick={() => setStaff("large")}>Larger team</button>}
                </div>
              </div>
            )}

            <div className={styles.finderResult}>
              <span>Your likely fit</span>
              <strong>{fit.name}</strong>
              <p>€{fit.price} / month</p>
              <div>
                <button type="button" className="button button-quiet" onClick={() => { setSegment(finderSegment); setFinderOpen(false); document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" }); }}>View package</button>
                <Link className="button button-dark" href="/contact">Speak to us <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
