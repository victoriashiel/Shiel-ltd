"use client";

import Link from "next/link";
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./packages.module.css";
import { addOnGroups, commonCompany, recommendation, segments, type Segment } from "./packages-data";

export function PackagesClient() {
  const [segment, setSegment] = useState<Segment>("company");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const finderTriggerRef = useRef<HTMLElement | null>(null);
  const [finderSegment, setFinderSegment] = useState<Segment>("company");
  const [finderDormant, setFinderDormant] = useState(false);
  const [transactions, setTransactions] = useState(30);
  const [turnover, setTurnover] = useState(150_000);
  const [staff, setStaff] = useState(0);
  const [directors, setDirectors] = useState(1);
  const [platforms, setPlatforms] = useState<"one" | "multi">("one");
  const [complex, setComplex] = useState(false);

  const current = useMemo(() => segments.find((item) => item.id === segment) ?? segments[0], [segment]);
  const fit = recommendation({
    segment: finderSegment,
    dormant: finderDormant,
    transactions,
    turnover,
    staff,
    directors,
    platforms,
    complex,
  });

  const chooseFinderSegment = (next: Segment) => {
    setFinderSegment(next);
    setFinderDormant(false);
    setTransactions(next === "contractor" ? 15 : 30);
    setTurnover(next === "sole-trader" ? 80_000 : 150_000);
    setStaff(0);
    setDirectors(1);
    setPlatforms("one");
    setComplex(false);
  };

  const openFinder = () => {
    finderTriggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setFinderOpen(true);
  };

  const closeFinder = () => {
    setFinderOpen(false);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (finderOpen && !dialog.open) {
      dialog.showModal();
      requestAnimationFrame(() => {
        dialog.querySelector<HTMLElement>("[data-finder-initial]")?.focus();
      });
    }

    if (!finderOpen && dialog.open) {
      dialog.close();
    }
  }, [finderOpen]);

  const handleDialogClose = () => {
    setFinderOpen(false);
    finderTriggerRef.current?.focus();
  };

  const handleSegmentKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = segments.length - 1;
    let nextIndex = index;

    if (event.key === "ArrowRight") nextIndex = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") nextIndex = index === 0 ? last : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = last;
    else return;

    event.preventDefault();
    const nextSegment = segments[nextIndex];
    setSegment(nextSegment.id);
    setExpanded(null);
    document.getElementById(`package-tab-${nextSegment.id}`)?.focus();
  };

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
            <button className="button button-quiet" type="button" onClick={openFinder}>
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

      <section className={`section-pad ${styles.plansSection}`} id="plans">
        <div className={styles.controlsHeader}>
          <div>
            <p className="eyebrow">Choose your setup</p>
            <h2>Start with how you trade.</h2>
          </div>
          <button className={styles.finderButton} type="button" onClick={openFinder}>
            Not sure? Find my package <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className={styles.segmentTabs} role="tablist" aria-label="Business type">
          {segments.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`package-tab-${item.id}`}
              aria-controls="package-panel"
              aria-selected={segment === item.id}
              tabIndex={segment === item.id ? 0 : -1}
              className={segment === item.id ? styles.activeTab : ""}
              onClick={() => { setSegment(item.id); setExpanded(null); }}
              onKeyDown={(event) => handleSegmentKeyDown(event, index)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={styles.segmentIntro}>
          <p>{current.intro}</p>
          {segment === "company" && <span>Every company plan also includes the core compliance work shown below.</span>}
        </div>

        {current.setupOffer && (
          <aside className={styles.setupOffer} aria-label={`${current.setupOffer.name} setup offer`}>
            <div className={styles.setupOfferLead}>
              <span>Starting out?</span>
              <h3>{current.setupOffer.name}</h3>
              <p>{current.setupOffer.strap}</p>
            </div>
            <div className={styles.setupOfferIncludes}>
              {current.setupOffer.includes.map((item) => <span key={item}>✓ {item}</span>)}
            </div>
            <div className={styles.setupOfferAction}>
              <strong>{current.setupOffer.priceLabel}</strong>
              <Link
                className="button button-quiet"
                href={{ pathname: "/contact", query: { enquiry: "Packages & pricing", package: current.setupOffer.name } }}
                data-cta="setup-offer"
                data-package={current.setupOffer.name}
              >
                Start here <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </aside>
        )}

        <div className={styles.planGrid} data-count={current.plans.length} role="tabpanel" id="package-panel" aria-labelledby={`package-tab-${segment}`} aria-live="polite">
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
                  <div className={styles.limitLabel}>
                    <span>Plan limits</span>
                    <button className={styles.infoTip} type="button" aria-label="What counts as a transaction?">
                      i
                      <span role="tooltip">
                        A transaction is an individual income or expense entry processed in the books. Internal transfers and corrections are not normally counted as separate trading transactions. Small occasional overages do not force an immediate plan change.
                      </span>
                    </button>
                  </div>
                  <p>{plan.limits}</p>
                </div>

                <Link
                  className={`button ${plan.popular ? "button-dark" : "button-quiet"} ${styles.cardButton}`}
                  href={{ pathname: "/contact", query: { enquiry: "Packages & pricing", package: plan.name } }}
                  data-cta="package-select"
                  data-package={plan.name}
                >
                  Choose this plan <span aria-hidden="true">↗</span>
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
                      <tr><th>Plan</th><th>Dormant & Holding</th><th>Starter</th><th>Growth</th><th>Scale</th></tr>
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
          <Link
            className="button button-light"
            href={{ pathname: "/contact", query: { enquiry: "Packages & pricing", package: "Bespoke" } }}
            data-cta="package-bespoke"
          >
            Get a tailored quote <span aria-hidden="true">↗</span>
          </Link>
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
        <button className="button button-dark" type="button" onClick={openFinder}>Find my package <span aria-hidden="true">↗</span></button>
        <small>Prices shown exclude VAT where applicable. Package suitability and scope are confirmed before onboarding.</small>
      </section>

      <dialog
        ref={dialogRef}
        className={styles.finderDialog}
        aria-labelledby="finder-title"
        onCancel={(event) => {
          event.preventDefault();
          closeFinder();
        }}
        onClose={handleDialogClose}
        onMouseDown={(event) => {
          if (event.currentTarget === event.target) closeFinder();
        }}
      >
        <div className={styles.finderModal}>
          <button className={styles.modalClose} type="button" aria-label="Close package finder" onClick={closeFinder}>×</button>
            <p className={`eyebrow ${styles.finderEyebrow}`}>Package finder</p>
            <h2 id="finder-title" tabIndex={-1} data-finder-initial>Find the closest fit.</h2>
            <p className={styles.finderIntro}>This is a guide to the published packages, not an accounting assessment. We confirm the scope before onboarding.</p>

            <div className={styles.finderField}>
              <span>How do you trade?</span>
              <div className={styles.finderOptions}>
                {segments.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={finderSegment === item.id ? styles.selectedOption : ""}
                    onClick={() => chooseFinderSegment(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {finderSegment === "company" && (
              <div className={styles.finderField}>
                <span>Is the company dormant or pre-trade?</span>
                <div className={styles.finderOptions}>
                  <button type="button" className={!finderDormant ? styles.selectedOption : ""} onClick={() => setFinderDormant(false)}>Trading</button>
                  <button type="button" className={finderDormant ? styles.selectedOption : ""} onClick={() => setFinderDormant(true)}>Dormant / pre-trade</button>
                </div>
              </div>
            )}

            {finderSegment !== "ecommerce" && (
              <div className={styles.finderField}>
                <span>Monthly transactions</span>
                <div className={styles.finderOptions}>
                  {finderSegment === "contractor" ? (
                    <>
                      <button type="button" className={transactions === 15 ? styles.selectedOption : ""} onClick={() => setTransactions(15)}>Up to 15</button>
                      <button type="button" className={transactions === 30 ? styles.selectedOption : ""} onClick={() => setTransactions(30)}>16–30</button>
                      <button type="button" className={transactions === 60 ? styles.selectedOption : ""} onClick={() => setTransactions(60)}>31–60</button>
                      <button type="button" className={transactions === 120 ? styles.selectedOption : ""} onClick={() => setTransactions(120)}>61–120</button>
                      <button type="button" className={transactions === 121 ? styles.selectedOption : ""} onClick={() => setTransactions(121)}>120+</button>
                    </>
                  ) : finderSegment === "sole-trader" ? (
                    <>
                      <button type="button" className={transactions === 30 ? styles.selectedOption : ""} onClick={() => setTransactions(30)}>Up to 30</button>
                      <button type="button" className={transactions === 80 ? styles.selectedOption : ""} onClick={() => setTransactions(80)}>31–80</button>
                      <button type="button" className={transactions === 81 ? styles.selectedOption : ""} onClick={() => setTransactions(81)}>80+</button>
                    </>
                  ) : (
                    <>
                      <button type="button" className={transactions === 10 ? styles.selectedOption : ""} onClick={() => setTransactions(10)}>Up to 10</button>
                      <button type="button" className={transactions === 30 ? styles.selectedOption : ""} onClick={() => setTransactions(30)}>11–30</button>
                      <button type="button" className={transactions === 60 ? styles.selectedOption : ""} onClick={() => setTransactions(60)}>31–60</button>
                      <button type="button" className={transactions === 120 ? styles.selectedOption : ""} onClick={() => setTransactions(120)}>61–120</button>
                      <button type="button" className={transactions === 121 ? styles.selectedOption : ""} onClick={() => setTransactions(121)}>120+</button>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className={styles.finderField}>
              <span>{finderSegment === "sole-trader" ? "Annual turnover" : "Annual sales"}</span>
              <div className={styles.finderOptions}>
                {finderSegment === "sole-trader" ? (
                  <>
                    <button type="button" className={turnover === 80_000 ? styles.selectedOption : ""} onClick={() => setTurnover(80_000)}>Up to €80k</button>
                    <button type="button" className={turnover === 250_000 ? styles.selectedOption : ""} onClick={() => setTurnover(250_000)}>€80k–€250k</button>
                    <button type="button" className={turnover === 250_001 ? styles.selectedOption : ""} onClick={() => setTurnover(250_001)}>€250k+</button>
                  </>
                ) : finderSegment === "ecommerce" ? (
                  <>
                    <button type="button" className={turnover === 150_000 ? styles.selectedOption : ""} onClick={() => setTurnover(150_000)}>Up to €150k</button>
                    <button type="button" className={turnover === 500_000 ? styles.selectedOption : ""} onClick={() => setTurnover(500_000)}>€150k–€500k</button>
                    <button type="button" className={turnover === 500_001 ? styles.selectedOption : ""} onClick={() => setTurnover(500_001)}>€500k+</button>
                  </>
                ) : (
                  <>
                    {finderSegment === "company" && <button type="button" className={turnover === 10_000 ? styles.selectedOption : ""} onClick={() => setTurnover(10_000)}>Up to €10k</button>}
                    <button type="button" className={turnover === 150_000 ? styles.selectedOption : ""} onClick={() => setTurnover(150_000)}>Up to €150k</button>
                    <button type="button" className={turnover === 400_000 ? styles.selectedOption : ""} onClick={() => setTurnover(400_000)}>€150k–€400k</button>
                    <button type="button" className={turnover === 1_000_000 ? styles.selectedOption : ""} onClick={() => setTurnover(1_000_000)}>€400k–€1m</button>
                    <button type="button" className={turnover === 1_000_001 ? styles.selectedOption : ""} onClick={() => setTurnover(1_000_001)}>€1m+</button>
                  </>
                )}
              </div>
            </div>

            {finderSegment === "ecommerce" && (
              <div className={styles.finderField}>
                <span>How many sales platforms do you use?</span>
                <div className={styles.finderOptions}>
                  <button type="button" className={platforms === "one" ? styles.selectedOption : ""} onClick={() => setPlatforms("one")}>One platform</button>
                  <button type="button" className={platforms === "multi" ? styles.selectedOption : ""} onClick={() => setPlatforms("multi")}>Multiple platforms</button>
                </div>
              </div>
            )}

            {(finderSegment === "company" || finderSegment === "sole-trader" || finderSegment === "contractor") && (
              <div className={styles.finderField}>
                <span>Employees on payroll</span>
                <div className={styles.finderOptions}>
                  <button type="button" className={staff === 0 ? styles.selectedOption : ""} onClick={() => setStaff(0)}>None</button>
                  <button type="button" className={staff === 2 ? styles.selectedOption : ""} onClick={() => setStaff(2)}>1–2</button>
                  {finderSegment === "company" && <button type="button" className={staff === 6 ? styles.selectedOption : ""} onClick={() => setStaff(6)}>3–6</button>}
                  {finderSegment === "company" && <button type="button" className={staff === 15 ? styles.selectedOption : ""} onClick={() => setStaff(15)}>7–15</button>}
                  <button type="button" className={staff === 16 ? styles.selectedOption : ""} onClick={() => setStaff(16)}>{finderSegment === "company" ? "15+" : "3+"}</button>
                </div>
              </div>
            )}

            {(finderSegment === "company" || finderSegment === "contractor") && (
              <div className={styles.finderField}>
                <span>Directors</span>
                <div className={styles.finderOptions}>
                  {[1, 2, 3, 4, 5].map((count) => (
                    <button key={count} type="button" className={directors === count ? styles.selectedOption : ""} onClick={() => setDirectors(count)}>
                      {count === 5 ? "5+" : count}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {(finderSegment === "company" || finderSegment === "contractor") && (
              <div className={styles.finderField}>
                <span>Cash business, RCT or group / corporate shareholders?</span>
                <div className={styles.finderOptions}>
                  <button type="button" className={!complex ? styles.selectedOption : ""} onClick={() => setComplex(false)}>No</button>
                  <button type="button" className={complex ? styles.selectedOption : ""} onClick={() => setComplex(true)}>Yes</button>
                </div>
              </div>
            )}

            <div className={styles.finderResult}>
              <span>Your likely fit</span>
              <strong>{fit.name}</strong>
              <p>{fit.priceLabel}</p>
              <small>{fit.reason}</small>
              <div>
                <button type="button" className="button button-quiet" onClick={() => { setSegment(fit.segment); setFinderOpen(false); document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" }); }}>View package</button>
                <Link
                  className="button button-dark"
                  href={{ pathname: "/contact", query: { enquiry: "Packages & pricing", package: fit.name } }}
                  data-cta="package-finder-contact"
                  data-package={fit.name}
                >
                  Speak to us <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
        </div>
      </dialog>
    </>
  );
}
