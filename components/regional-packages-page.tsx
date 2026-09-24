import Link from "next/link";
import { formatRegionalPrice, regionalPackages } from "@/lib/regional-packages";
import { regionContent } from "@/lib/region-content";
import { regions, type RegionSlug } from "@/lib/regions";
import styles from "@/app/[region]/packages/regional-packages.module.css";

export function RegionalPackagesPage({ slug }: { slug: RegionSlug }) {
  const region = regions[slug];
  const content = regionContent[slug];
  const packageSet = regionalPackages[slug];

  return (
    <>
      <section className={`section-pad ${styles.hero}`}>
        <Link className={styles.backLink} href={region.path}>← {region.name}</Link>
        <p className="eyebrow">{region.name} packages</p>
        <h1>Accounting packages built for {region.name}.</h1>
        <p>
          Local scope, local currency and published workload limits. Choose the closest fit and we will confirm the package before onboarding.
        </p>
      </section>

      <section className={`section-pad ${styles.pricingSection}`}>
        <div className={styles.pricingGrid}>
          {packageSet.packages.map((item) => (
            <article className={`${styles.card} ${item.popular ? styles.popular : ""}`} key={item.name}>
              {item.popular && <span className={styles.badge}>Popular</span>}
              <div className={styles.cardTop}>
                <h2>{item.name}</h2>
                <p>{item.strap}</p>
                <div className={styles.price}>
                  <strong>{formatRegionalPrice(packageSet.currency, item.price)}</strong>
                  <span>{item.billing === "one-off" ? "one-off" : "/ month"}</span>
                </div>
              </div>

              <ul>
                {item.features.map((feature) => (
                  <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>
                ))}
              </ul>

              {item.limit && (
                <div className={styles.limit}>
                  <span>Published scope</span>
                  <p>{item.limit}</p>
                </div>
              )}

              <Link
                className={`button ${item.popular ? "button-dark" : "button-quiet"} ${styles.cardButton}`}
                href={{
                  pathname: "/contact",
                  query: { region: slug, enquiry: "Packages & pricing", package: item.name },
                }}
              >
                Ask about this package <span aria-hidden="true">↗</span>
              </Link>
            </article>
          ))}
        </div>

        <div className={styles.scopeNote}>
          <div>
            <p className="eyebrow">Scope notes</p>
            <h2>What the published price assumes.</h2>
          </div>
          <p>{packageSet.note}</p>
        </div>
      </section>

      <section className={`section-pad ${styles.localContext}`}>
        <div>
          <p className="eyebrow">Local compliance</p>
          <h2>The package is built around the filings behind the business.</h2>
          <p>
            {content.intro}
          </p>
        </div>
        <div className={styles.localList}>
          {content.compliance.map((item) => (
            <div key={item.title}>
              <span>{item.label}</span>
              <strong>{item.title}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.bespoke}`}>
        <p className="eyebrow">Cross-border or more complex?</p>
        <h2>We can scope it instead of forcing it into a standard package.</h2>
        <p>
          Multi-country ownership, higher bookkeeping volume, group structures, specialist VAT or unusually complex reporting are quoted before work starts.
        </p>
        <div className={styles.actions}>
          <Link
            className="button button-dark"
            href={{ pathname: "/contact", query: { region: slug, enquiry: "Packages & pricing", package: "Bespoke" } }}
          >
            Get a tailored quote <span aria-hidden="true">↗</span>
          </Link>
          <Link className="button button-quiet" href={region.path}>
            Back to {region.name} services
          </Link>
        </div>
      </section>
    </>
  );
}
