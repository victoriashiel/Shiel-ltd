"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./packages.module.css";

type Billing = "monthly" | "annual";
type Segment = "company" | "sole-trader" | "contractor" | "ecommerce";

type Plan = {
  name: string;
  strap: string;
  price: number;
  features: string[];
  limits: string;
  popular?: boolean;
  note?: string;
};

const segments: { id: Segment; label: string; intro: string; plans: Plan[] }[] = [
  {
    id: "company",
    label: "Limited companies",
    intro:
      "Company accounts, Corporation Tax, CRO filing, VAT, bookkeeping and director tax support in one monthly fee.",
    plans: [
      {
        name: "Dormant & Pre-trade",
        strap: "For newly formed, holding or dormant companies.",
        price: 79,
        features: [
          "Abridged or dormant accounts",
          "Nil CT1 and B1 filing",
          "RBO and CRO compliance",
          "1 director Form 11",
          "Named accountant",
        ],
        limits: "Up to 10 transactions / month · sales up to €10k · no payroll",
      },
      {
        name: "LTD Starter",
        strap: "For new and small trading companies.",
        price: 179,
        features: [
          "Monthly bookkeeping",
          "Payroll for up to 2 employees",
          "CT1, B1, VAT3 and RTD",
          "1 director Form 11",
          "Annual accountant review",
        ],
        limits: "Up to 30 transactions / month · sales up to €150k · 2 directors",
      },
      {
        name: "LTD Growth",
        strap: "For growing companies with staff and steady sales.",
        price: 279,
        popular: true,
        features: [
          "Everything in Starter",
          "Payroll for up to 6 employees",
          "Quarterly management accounts",
          "Quarterly review call",
          "VIES returns",
          "Form 11 for 2 directors",
        ],
        limits: "Up to 60 transactions / month · sales up to €400k · 3 directors",
      },
      {
        name: "LTD Scale",
        strap: "For established SMEs and more complex structures.",
        price: 449,
        features: [
          "Everything in Growth",
          "Payroll for up to 15 staff, including weekly runs",
          "Monthly management accounts and call",
          "Cash, RCT and group structures",
          "Form 11 for 3 directors",
          "Priority turnaround",
        ],
        limits: "Up to 120 transactions / month · sales up to €1m · 4 directors",
      },
    ],
  },
  {
    id: "sole-trader",
    label: "Sole traders",
    intro:
      "Straightforward bookkeeping and Form 11 support, with VAT and payroll available without forcing you into a company package.",
    plans: [
      {
        name: "Sole Trader Essentials",
        strap: "For freelancers and newer self-employed clients.",
        price: 99,
        features: [
          "Bookkeeping and receipt capture",
          "Form 11 and preliminary tax calculation",
          "VAT returns if registered",
          "Named accountant",
        ],
        limits: "Up to 30 transactions / month · turnover up to €80k",
      },
      {
        name: "Sole Trader Plus",
        strap: "For busy sole traders with staff or card payments.",
        price: 159,
        popular: true,
        features: [
          "Everything in Essentials",
          "Payroll for up to 2 employees",
          "Quarterly management summary",
          "Card, Stripe and SumUp feeds",
        ],
        limits: "Up to 80 transactions / month · turnover up to €250k",
      },
    ],
  },
  {
    id: "contractor",
    label: "Contractors",
    intro:
      "A lean company package for single-director contractors with one main client and a simple monthly invoicing pattern.",
    plans: [
      {
        name: "Contractor",
        strap: "For single-director companies with one client and a monthly invoice.",
        price: 119,
        features: [
          "Full company compliance: CT1, B1 and VAT",
          "Director payroll",
          "Director Form 11",
          "Expense and subsistence guidance",
          "Named accountant",
        ],
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
        features: [
          "1 sales platform",
          "Stripe or PayPal feeds",
          "VAT returns including OSS",
          "Annual accounts",
          "Named accountant",
        ],
        limits: "Sales up to €150k",
      },
      {
        name: "E-commerce Multi-channel",
        strap: "For sellers operating across several platforms or marketplaces.",
        price: 279,
        features: [
          "Multi-platform reconciliation",
          "OSS and IOSS",
          "Stock and COGS accounting",
          "Monthly margin report",
          "Named accountant",
        ],
        limits: "Sales up to €500k",
      },
    ],
  },
];

const addOns = [
  ["Extra employee on payroll", "€20 / month"],
  ["Transaction overage", "€15 per 10 extra / month"],
  ["Additional director Form 11", "€175 / year"],
  ["VAT / PAYE registration", "€125 each"],
  ["RBO registration", "€99"],
  ["Tax clearance certificate", "€65"],
  ["Urgent filing (under 5 days)", "€275"],
  ["Company formation + first-year bundle", "€199 + CRO fee"],
  ["Strike-off (voluntary)", "€325"],
  ["Catch-up bookkeeping", "€35 / hour"],
  ["Historical accounts", "From €650 / year"],
  ["Historical VAT returns", "From €120"],
  ["Non-resident director support", "Quote"],
  ["Registered office / company secretary", "Quote"],
];

const promises = [
  "Named accountant on every plan",
  "1 business day response target",
  "Deadline calendar and reminders",
  "Annual tax-planning review",
  "Revenue and CRO filings handled end to end",
];

function priceFor(price: number, billing: Billing) {
  if (billing === "monthly") return { amount: `€${price}`, suffix: "/ month" };
  return { amount: `€${price * 11}`, suffix: "/ year" };
}

export function PackagesClient() {
  const [segment, setSegment] = useState<Segment>("company");
  const [billing, setBilling] = useState<Billing>("monthly");

  const current = useMemo(
    () => segments.find((item) => item.id === segment) ?? segments[0],
    [segment],
  );

  return (
    <>
      <section className={`section-pad ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Packages</p>
          <h1>Know what your accounting will cost.</h1>
          <p>
            Clear monthly packages for the work most businesses need repeatedly. Pick the
            closest fit now; if your structure or volume is unusual, we will quote it before
            anything starts.
          </p>
          <div className={styles.heroActions}>
            <a className="button button-dark" href="#plans">
              See packages <span aria-hidden="true">↓</span>
            </a>
            <Link className="button button-quiet" href="/contact">
              Ask which plan fits <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <div className={styles.heroPanel} aria-label="What every ongoing package includes">
          <span className={styles.panelKicker}>Built into the relationship</span>
          <strong>Named accountant. Clear limits. No long-term lock-in.</strong>
          <div className={styles.miniGrid}>
            <span>Free switching</span>
            <span>30 days&apos; notice</span>
            <span>1 month free annually</span>
            <span>No forced upgrades</span>
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

          <div className={styles.billingToggle} role="group" aria-label="Billing frequency">
            <button
              type="button"
              className={billing === "monthly" ? styles.activeToggle : ""}
              aria-pressed={billing === "monthly"}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={billing === "annual" ? styles.activeToggle : ""}
              aria-pressed={billing === "annual"}
              onClick={() => setBilling("annual")}
            >
              Annual <span>1 month free</span>
            </button>
          </div>
        </div>

        <div className={styles.segmentTabs} role="tablist" aria-label="Business type">
          {segments.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={segment === item.id}
              className={segment === item.id ? styles.activeTab : ""}
              onClick={() => setSegment(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={styles.segmentIntro}>
          <p>{current.intro}</p>
          {segment === "company" && (
            <span>
              Every company package includes annual financial statements, CT1, B1, VAT3 and
              RTD returns, RBO maintenance and cloud bookkeeping software.
            </span>
          )}
        </div>

        <div
          className={styles.planGrid}
          data-count={current.plans.length}
          role="tabpanel"
          aria-live="polite"
        >
          {current.plans.map((plan) => {
            const price = priceFor(plan.price, billing);
            return (
              <article
                className={`${styles.planCard} ${plan.popular ? styles.popular : ""}`}
                key={plan.name}
              >
                <div className={styles.cardTop}>
                  <div>
                    {plan.popular && <span className={styles.popularBadge}>Most popular</span>}
                    <h3>{plan.name}</h3>
                    <p>{plan.strap}</p>
                  </div>
                  <div className={styles.price}>
                    <strong>{price.amount}</strong>
                    <span>{price.suffix}</span>
                    {billing === "annual" && <small>Equivalent to 11 monthly payments</small>}
                  </div>
                </div>

                <ul className={styles.featureList}>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span aria-hidden="true">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

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

        <div className={styles.bespoke}>
          <div>
            <span className={styles.panelKicker}>More complex?</span>
            <h3>Bespoke plans start from €499 / month.</h3>
          </div>
          <p>
            For higher transaction volumes, more complex structures or requirements outside
            the published limits, we scope the work first and give you a fixed quote.
          </p>
          <Link className="button button-light" href="/contact">
            Get a tailored quote <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className={`section-pad ${styles.promiseSection}`}>
        <div className={styles.promiseCopy}>
          <p className="eyebrow">How the packages work</p>
          <h2>Predictable where it should be. Flexible where it needs to be.</h2>
          <p>
            The limits are there so the fee stays fair, not to push you into a more expensive
            package the moment one month is busier than usual.
          </p>
        </div>
        <div className={styles.promiseList}>
          {promises.map((promise, index) => (
            <div key={promise}>
              <span>0{index + 1}</span>
              <strong>{promise}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.addOnsSection}`}>
        <div className={styles.addOnsIntro}>
          <p className="eyebrow">Add-ons & one-off work</p>
          <h2>No mystery extras.</h2>
          <p>
            If something sits outside your package, the common fees are published below.
            Catch-up or unusual work is quoted before we start.
          </p>
        </div>

        <details className={styles.addOnsDetails}>
          <summary>
            <span>View add-on prices</span>
            <span className={styles.plus} aria-hidden="true">+</span>
          </summary>
          <div className={styles.addOnGrid}>
            {addOns.map(([service, price]) => (
              <div className={styles.addOnRow} key={service}>
                <span>{service}</span>
                <strong>{price}</strong>
              </div>
            ))}
          </div>
        </details>
      </section>

      <section className={`section-pad ${styles.closing}`}>
        <p className="eyebrow">Need a steer?</p>
        <h2>You do not need to diagnose the right package yourself.</h2>
        <p>
          Tell us how the business operates, roughly how much activity you have and what needs
          to be filed. We will point you to the closest fit before you commit.
        </p>
        <Link className="button button-dark" href="/contact">
          Talk to us <span aria-hidden="true">↗</span>
        </Link>
        <small>
          Prices shown exclude VAT where applicable. Package suitability and scope are
          confirmed before onboarding.
        </small>
      </section>
    </>
  );
}
