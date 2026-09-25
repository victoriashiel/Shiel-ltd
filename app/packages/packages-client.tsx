"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./packages.module.css";
import { addOnGroups, recommendation, segments, type Segment } from "./packages-data";
import { companyPlanKeys, countryPackageConfig, localisePackageCopy, segmentSlugs, type PackageCountry } from "./package-country-config";

export function PackagesClient({
  initialCountry = null,
  initialSegment = null,
}: {
  initialCountry?: PackageCountry | null;
  initialSegment?: Segment | null;
}) {
  const router = useRouter();
  const [country, setCountry] = useState<PackageCountry | null>(initialCountry);
  const [segment, setSegment] = useState<Segment | null>(initialSegment);
  const [countryHint, setCountryHint] = useState<PackageCountry | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [finderOpen, setFinderOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const finderTriggerRef = useRef<HTMLElement | null>(null);
  const [finderSegment, setFinderSegment] = useState<Segment>("company");
  const [finderStartingOut, setFinderStartingOut] = useState(false);
  const [finderDormant, setFinderDormant] = useState(false);
  const [transactions, setTransactions] = useState(30);
  const [turnover, setTurnover] = useState(150_000);
  const [staff, setStaff] = useState(0);
  const [directors, setDirectors] = useState(1);
  const [platforms, setPlatforms] = useState<"one" | "multi">("one");
  const [complex, setComplex] = useState(false);

  const current = useMemo(() => segments.find((item) => item.id === segment) ?? null, [segment]);
  const selectedCountry = country ? countryPackageConfig[country] : null;
  const countryOptions = Object.entries(countryPackageConfig) as [PackageCountry, (typeof countryPackageConfig)[PackageCountry]][];
  const money = (value: number) => `${selectedCountry?.symbol ?? "€"}${value}`;
  const localise = (text: string) => country ? localisePackageCopy(country, text) : text;
  const displayPlans = useMemo(() => {
    if (!current || !country) return [];
    const config = countryPackageConfig[country];
    return current.plans.map((plan) => {
      if (current.id !== "company") return plan;
      const key = companyPlanKeys[plan.name];
      if (!key) return plan;
      const turnover = config.companyTurnover[key];
      const transactionPart = plan.limits.split("·")[0]?.trim();
      const directorPart = plan.limits.split("·").slice(2).join("·").trim();
      return {
        ...plan,
        name: plan.name.replace(/^LTD /, ""),
        price: config.companyPrices[key],
        limits: [transactionPart, `sales up to ${turnover}`, directorPart].filter(Boolean).join(" · "),
      };
    });
  }, [country, current]);
  const fit = recommendation({
    segment: finderSegment,
    startingOut: finderStartingOut,
    dormant: finderDormant,
    transactions,
    turnover,
    staff,
    directors,
    platforms,
    complex,
    companyThresholds: selectedCountry?.companyTurnoverValues,
    companyPrices: selectedCountry?.companyPrices,
    currencySymbol: selectedCountry?.symbol,
  });
  const fitDisplayName = fit.segment === "company" ? fit.name.replace(/^LTD /, "") : fit.name;

  useEffect(() => {
    setCountry(initialCountry);
    setSegment(initialSegment);
  }, [initialCountry, initialSegment]);

  useEffect(() => {
    if (initialCountry) {
      window.localStorage.setItem("shiel-package-country", initialCountry);
      return;
    }

    const saved = window.localStorage.getItem("shiel-package-country") as PackageCountry | null;
    if (saved && Object.prototype.hasOwnProperty.call(countryPackageConfig, saved)) {
      router.replace(`/packages/${saved}`, { scroll: false });
      return;
    }

    const language = navigator.language.toLowerCase();
    if (language === "en-ie") setCountryHint("ireland");
    else if (language === "en-gb") setCountryHint("united-kingdom");
  }, [initialCountry, router]);

  const chooseCountry = (next: PackageCountry) => {
    window.localStorage.setItem("shiel-package-country", next);
    const nextPath = segment
      ? `/packages/${next}/${segmentSlugs[segment]}`
      : `/packages/${next}`;
    router.push(nextPath, { scroll: false });
  };

  const chooseSegment = (next: Segment) => {
    if (!country) return;
    setExpanded(null);
    router.push(`/packages/${country}/${segmentSlugs[next]}`, { scroll: false });
  };

  const chooseFinderSegment = (next: Segment) => {
    setFinderSegment(next);
    setFinderStartingOut(false);
    setFinderDormant(false);
    setTransactions(
      next === "contractor" ? 15 :
      next === "sole-trader" ? 20 :
      next === "ecommerce" ? 50 :
      30,
    );
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
    chooseSegment(nextSegment.id);
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
            Packages are designed for companies in Ireland, the UK and Gibraltar. Choose the closest fit, or use the package finder if you are not sure where to start.
          </p>
          <div className={styles.heroActions}>
            <a className="button button-dark" href="#plans">See packages <span aria-hidden="true">↓</span></a>
            {country ? (
              <button className="button button-quiet" type="button" onClick={openFinder}>
                Find my package <span aria-hidden="true">↗</span>
              </button>
            ) : (
              <a className="button button-quiet" href="#plans">
                Choose your country <span aria-hidden="true">↓</span>
              </a>
            )}
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
            <p className="eyebrow">{country ? "Step 2" : "Step 1"}</p>
            <h2>{country ? "Now choose how you trade." : "Choose your country."}</h2>
          </div>
          {country && (
            <button className={styles.finderButton} type="button" onClick={openFinder}>
              Not sure? Find my package <span aria-hidden="true">→</span>
            </button>
          )}
        </div>

        <div className={styles.selectionStep}>
          <span>Country</span>
          <div className={styles.segmentTabs} role="tablist" aria-label="Country">
            {countryOptions.map(([id, item]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={country === id}
                className={`${country === id ? styles.activeTab : ""} ${!country && countryHint === id ? styles.hintedTab : ""}`}
                onClick={() => chooseCountry(id)}
              >
                {item.label === "United Kingdom" ? "UK" : item.label} <small>{item.symbol}</small>
              </button>
            ))}
          </div>
          {!country && <p className={styles.selectionPrompt}>Choose your country to see the right currency, terminology and package options.</p>}
        </div>

        {country && (
          <div className={styles.selectionStep}>
            <span>Trade type</span>
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
              onClick={() => chooseSegment(item.id)}
              onKeyDown={(event) => handleSegmentKeyDown(event, index)}
            >
              {item.label}
            </button>
          ))}
            </div>
          </div>
        )}

        {country && segment && current ? (
        <>
        <div className={styles.segmentIntro}>
          <p>{current.id === "company" && selectedCountry ? selectedCountry.companyIntro : localise(current.intro)}</p>
          {segment === "company" && <span>Every company plan also includes the core compliance work shown below.</span>}
        </div>

        {current.advisoryOffer && (
          <div className={styles.advisoryNote}>
            <span>Not sure which structure?</span>
            <p>{localise(current.advisoryOffer.strap)}</p>
            <Link
              href={{ pathname: "/contact", query: { enquiry: "Packages & pricing", package: current.advisoryOffer.name } }}
              data-cta="contractor-structure-review"
            >
              {current.advisoryOffer.name} · {localise(current.advisoryOffer.priceLabel)} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}

        <div className={styles.planGrid} data-count={displayPlans.length} role="tabpanel" id="package-panel" aria-labelledby={`package-tab-${segment}`} aria-live="polite">
          {displayPlans.map((plan) => {
            const isExpanded = expanded === plan.name;
            const tipId = `transaction-tip-${plan.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
            return (
              <article className={`${styles.planCard} ${plan.popular ? styles.popular : ""}`} key={plan.name}>
                <div className={styles.cardTop}>
                  <div>
                    {plan.popular && <span className={styles.popularBadge}>Most popular</span>}
                    <h3>{plan.name}</h3>
                    <p>{localise(plan.strap)}</p>
                  </div>
                  <div className={styles.price}>
                    <strong>{money(plan.price)}</strong>
                    <span>
                      {plan.priceNote ? `${localise(plan.priceNote)} · ` : ""}
                      {plan.billing === "one-off" ? "one-off" : "/ month"}
                    </span>
                  </div>
                </div>

                <ul className={styles.featureList}>
                  {plan.features.map((feature) => (
                    <li key={feature}><span aria-hidden="true">✓</span>{localise(feature)}</li>
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
                    {plan.details.map((detail) => <span key={detail}>✓ {localise(detail)}</span>)}
                  </div>
                )}

                <div className={styles.limits}>
                  <div className={styles.limitLabel}>
                    <span>{plan.limitsLabel ?? "Plan limits"}</span>
                    {!plan.limitsLabel && (
                      <button
                        className={styles.infoTip}
                        type="button"
                        aria-label="What counts as a transaction?"
                        aria-describedby={tipId}
                      >
                        i
                        <span id={tipId} role="tooltip">
                          An accounting transaction is a bank item, settlement, purchase invoice or expense entry processed in the books. For e-commerce, customer orders are not counted one by one. Small occasional overages do not force an immediate plan change.
                        </span>
                      </button>
                    )}
                  </div>
                  <p>{localise(plan.limits)}</p>
                </div>

                <Link
                  className={`button ${plan.popular ? "button-dark" : "button-quiet"} ${styles.cardButton}`}
                  href={{ pathname: "/contact", query: { enquiry: "Packages & pricing", package: plan.name } }}
                  data-cta="package-select"
                  data-package={plan.name}
                >
                  {plan.billing === "one-off" ? "Start here" : "Choose this plan"} <span aria-hidden="true">↗</span>
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
                {selectedCountry?.companyCommon.map((item) => <span key={item}>✓ {item}</span>)}
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
                      <tr><th>Plan</th><th>Dormant & Pre-trade</th><th>Starter</th><th>Growth</th><th>Scale</th></tr>
                    </thead>
                    <tbody>
                      <tr><th>Monthly fee</th><td>{money(selectedCountry?.companyPrices.dormant ?? 79)}</td><td>{money(selectedCountry?.companyPrices.starter ?? 179)}</td><td>{money(selectedCountry?.companyPrices.growth ?? 279)}</td><td>{money(selectedCountry?.companyPrices.scale ?? 449)}</td></tr>
                      <tr><th>Transactions</th><td>10</td><td>30</td><td>60</td><td>120</td></tr>
                      <tr><th>Sales / turnover</th><td>{selectedCountry?.companyTurnover.dormant}</td><td>{selectedCountry?.companyTurnover.starter}</td><td>{selectedCountry?.companyTurnover.growth}</td><td>{selectedCountry?.companyTurnover.scale}</td></tr>
                      <tr><th>Payroll</th><td>—</td><td>2 staff</td><td>6 staff</td><td>15 staff</td></tr>
                      <tr><th>Management reports</th><td>—</td><td>—</td><td>Quarterly</td><td>Monthly</td></tr>
                      <tr><th>Director personal tax return</th><td>1</td><td>1</td><td>2</td><td>3</td></tr>
                      <tr><th>Complex / group structures</th><td>—</td><td>—</td><td>—</td><td>Included</td></tr>
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
            <h3>Bespoke plans from {money(selectedCountry?.companyPrices.bespoke ?? 499)} / month.</h3>
          </div>
          <p>
            For higher volumes or more complex structures, we scope the work first and give you a fixed quote before anything starts.
            {segment === "company" && selectedCountry?.companyTurnover.bespokeNote ? ` ${selectedCountry.companyTurnover.bespokeNote}` : ""}
          </p>
          <Link
            className="button button-light"
            href={{ pathname: "/contact", query: { enquiry: "Packages & pricing", package: "Bespoke" } }}
            data-cta="package-bespoke"
          >
            Get a tailored quote <span aria-hidden="true">↗</span>
          </Link>
        </div>
        </>
        ) : country ? (
          <div className={styles.selectionEmpty}>
            <p className="eyebrow">Step 2</p>
            <h3>Choose your trade type to see packages.</h3>
            <p>Your country is set to {selectedCountry?.label}. The next choice determines which package set appears.</p>
          </div>
        ) : null}
      </section>

      {country && segment && current && (
      <>
      <section className={`section-pad ${styles.promiseSection}`}>
        <div className={styles.promiseCopy}>
          <p className="eyebrow">How it works</p>
          <h2>Clear enough to understand before you become a client.</h2>
          <p>The published limits keep the monthly fee fair. Small overages are charged separately rather than forcing an immediate package change.</p>
        </div>
        <div className={styles.promiseList}>
          {["Named accountant on every plan","1 business day response target","Deadline calendar and reminders","Annual tax-planning review","Tax and registry filings handled end to end"].map((promise, index) => (
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
                  <p key={service}><span>{localise(service)}</span><strong>{localise(price)}</strong></p>
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
        <small>{selectedCountry?.priceNote} Package suitability and scope are confirmed before onboarding.</small>
      </section>
      </>
      )}

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

            <div className={styles.finderField}>
              <span>Where are you in the journey?</span>
              <div className={styles.finderOptions}>
                <button type="button" className={!finderStartingOut ? styles.selectedOption : ""} onClick={() => setFinderStartingOut(false)}>Already trading</button>
                <button type="button" className={finderStartingOut ? styles.selectedOption : ""} onClick={() => setFinderStartingOut(true)}>Starting out</button>
              </div>
            </div>

            {!finderStartingOut && finderSegment === "company" && (
              <div className={styles.finderField}>
                <span>Is the company dormant or not yet trading?</span>
                <div className={styles.finderOptions}>
                  <button type="button" className={!finderDormant ? styles.selectedOption : ""} onClick={() => setFinderDormant(false)}>Trading</button>
                  <button type="button" className={finderDormant ? styles.selectedOption : ""} onClick={() => setFinderDormant(true)}>Dormant / pre-trade</button>
                </div>
              </div>
            )}

            {!finderStartingOut && (
              <div className={styles.finderField}>
                <span>Monthly accounting transactions</span>
                <div className={styles.finderOptions}>
                  {finderSegment === "ecommerce" ? (
                    <>
                      <button type="button" className={transactions === 50 ? styles.selectedOption : ""} onClick={() => setTransactions(50)}>Up to 50</button>
                      <button type="button" className={transactions === 100 ? styles.selectedOption : ""} onClick={() => setTransactions(100)}>51–100</button>
                      <button type="button" className={transactions === 200 ? styles.selectedOption : ""} onClick={() => setTransactions(200)}>101–200</button>
                      <button type="button" className={transactions === 201 ? styles.selectedOption : ""} onClick={() => setTransactions(201)}>200+</button>
                    </>
                  ) : finderSegment === "contractor" ? (
                    <>
                      <button type="button" className={transactions === 15 ? styles.selectedOption : ""} onClick={() => setTransactions(15)}>Up to 15</button>
                      <button type="button" className={transactions === 30 ? styles.selectedOption : ""} onClick={() => setTransactions(30)}>16–30</button>
                      <button type="button" className={transactions === 60 ? styles.selectedOption : ""} onClick={() => setTransactions(60)}>31–60</button>
                      <button type="button" className={transactions === 120 ? styles.selectedOption : ""} onClick={() => setTransactions(120)}>61–120</button>
                      <button type="button" className={transactions === 121 ? styles.selectedOption : ""} onClick={() => setTransactions(121)}>120+</button>
                    </>
                  ) : finderSegment === "sole-trader" ? (
                    <>
                      <button type="button" className={transactions === 20 ? styles.selectedOption : ""} onClick={() => setTransactions(20)}>Up to 20</button>
                      <button type="button" className={transactions === 60 ? styles.selectedOption : ""} onClick={() => setTransactions(60)}>21–60</button>
                      <button type="button" className={transactions === 150 ? styles.selectedOption : ""} onClick={() => setTransactions(150)}>61–150</button>
                      <button type="button" className={transactions === 151 ? styles.selectedOption : ""} onClick={() => setTransactions(151)}>150+</button>
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

            {!finderStartingOut && (
            <div className={styles.finderField}>
              <span>{finderSegment === "sole-trader" ? "Annual turnover" : "Annual sales"}</span>
              <div className={styles.finderOptions}>
                {finderSegment === "sole-trader" ? (
                  <>
                    <button type="button" className={turnover === 80_000 ? styles.selectedOption : ""} onClick={() => setTurnover(80_000)}>Up to {selectedCountry?.symbol ?? "€"}80k</button>
                    <button type="button" className={turnover === 200_000 ? styles.selectedOption : ""} onClick={() => setTurnover(200_000)}>{selectedCountry?.symbol ?? "€"}80k–{selectedCountry?.symbol ?? "€"}200k</button>
                    <button type="button" className={turnover === 500_000 ? styles.selectedOption : ""} onClick={() => setTurnover(500_000)}>{selectedCountry?.symbol ?? "€"}200k–{selectedCountry?.symbol ?? "€"}500k</button>
                    <button type="button" className={turnover === 500_001 ? styles.selectedOption : ""} onClick={() => setTurnover(500_001)}>{selectedCountry?.symbol ?? "€"}500k+</button>
                  </>
                ) : finderSegment === "ecommerce" ? (
                  <>
                    <button type="button" className={turnover === 150_000 ? styles.selectedOption : ""} onClick={() => setTurnover(150_000)}>Up to {selectedCountry?.symbol ?? "€"}150k</button>
                    <button type="button" className={turnover === 500_000 ? styles.selectedOption : ""} onClick={() => setTurnover(500_000)}>{selectedCountry?.symbol ?? "€"}150k–{selectedCountry?.symbol ?? "€"}500k</button>
                    <button type="button" className={turnover === 1_000_000 ? styles.selectedOption : ""} onClick={() => setTurnover(1_000_000)}>{selectedCountry?.symbol ?? "€"}500k–{selectedCountry?.symbol ?? "€"}1m</button>
                    <button type="button" className={turnover === 1_000_001 ? styles.selectedOption : ""} onClick={() => setTurnover(1_000_001)}>{selectedCountry?.symbol ?? "€"}1m+</button>
                  </>
                ) : finderSegment === "company" && selectedCountry ? (
                  <>
                    <button
                      type="button"
                      className={turnover === selectedCountry.companyTurnoverValues.dormant ? styles.selectedOption : ""}
                      onClick={() => setTurnover(selectedCountry.companyTurnoverValues.dormant)}
                    >
                      Up to {selectedCountry.companyTurnover.dormant}
                    </button>
                    <button
                      type="button"
                      className={turnover === selectedCountry.companyTurnoverValues.starter ? styles.selectedOption : ""}
                      onClick={() => setTurnover(selectedCountry.companyTurnoverValues.starter)}
                    >
                      {selectedCountry.companyTurnover.dormant}–{selectedCountry.companyTurnover.starter}
                    </button>
                    <button
                      type="button"
                      className={turnover === selectedCountry.companyTurnoverValues.growth ? styles.selectedOption : ""}
                      onClick={() => setTurnover(selectedCountry.companyTurnoverValues.growth)}
                    >
                      {selectedCountry.companyTurnover.starter}–{selectedCountry.companyTurnover.growth}
                    </button>
                    <button
                      type="button"
                      className={turnover === selectedCountry.companyTurnoverValues.scale ? styles.selectedOption : ""}
                      onClick={() => setTurnover(selectedCountry.companyTurnoverValues.scale)}
                    >
                      {selectedCountry.companyTurnover.growth}–{selectedCountry.companyTurnover.scale}
                    </button>
                    <button
                      type="button"
                      className={turnover === selectedCountry.companyTurnoverValues.scale + 1 ? styles.selectedOption : ""}
                      onClick={() => setTurnover(selectedCountry.companyTurnoverValues.scale + 1)}
                    >
                      {selectedCountry.companyTurnover.scale}+
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className={turnover === 150_000 ? styles.selectedOption : ""} onClick={() => setTurnover(150_000)}>Up to {selectedCountry?.symbol ?? "€"}150k</button>
                    <button type="button" className={turnover === 400_000 ? styles.selectedOption : ""} onClick={() => setTurnover(400_000)}>{selectedCountry?.symbol ?? "€"}150k–{selectedCountry?.symbol ?? "€"}400k</button>
                    <button type="button" className={turnover === 1_000_000 ? styles.selectedOption : ""} onClick={() => setTurnover(1_000_000)}>{selectedCountry?.symbol ?? "€"}400k–{selectedCountry?.symbol ?? "€"}1m</button>
                    <button type="button" className={turnover === 1_000_001 ? styles.selectedOption : ""} onClick={() => setTurnover(1_000_001)}>{selectedCountry?.symbol ?? "€"}1m+</button>
                  </>
                )}
              </div>
            </div>
            )}

            {!finderStartingOut && finderSegment === "ecommerce" && (
              <div className={styles.finderField}>
                <span>How many sales platforms do you use?</span>
                <div className={styles.finderOptions}>
                  <button type="button" className={platforms === "one" ? styles.selectedOption : ""} onClick={() => setPlatforms("one")}>One platform</button>
                  <button type="button" className={platforms === "multi" ? styles.selectedOption : ""} onClick={() => setPlatforms("multi")}>Multiple platforms</button>
                </div>
              </div>
            )}

            {!finderStartingOut && (finderSegment === "company" || finderSegment === "sole-trader" || finderSegment === "contractor") && (
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

            {!finderStartingOut && (finderSegment === "company" || finderSegment === "contractor") && (
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

            {!finderStartingOut && (finderSegment === "company" || finderSegment === "contractor") && (
              <div className={styles.finderField}>
                <span>Cash business, contractor withholding or group / corporate shareholders?</span>
                <div className={styles.finderOptions}>
                  <button type="button" className={!complex ? styles.selectedOption : ""} onClick={() => setComplex(false)}>No</button>
                  <button type="button" className={complex ? styles.selectedOption : ""} onClick={() => setComplex(true)}>Yes</button>
                </div>
              </div>
            )}

            <div className={styles.finderResult}>
              <span>Your likely fit</span>
              <strong>{fitDisplayName}</strong>
              <p>{localise(fit.priceLabel)}</p>
              <small>{localise(fit.reason)}</small>
              <div>
                <button type="button" className="button button-quiet" onClick={() => { chooseSegment(fit.segment); setFinderOpen(false); }}>{finderStartingOut ? "View setup offer" : "View package"}</button>
                <Link
                  className="button button-dark"
                  href={{ pathname: "/contact", query: { enquiry: "Packages & pricing", package: fitDisplayName } }}
                  data-cta="package-finder-contact"
                  data-package={fitDisplayName}
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
