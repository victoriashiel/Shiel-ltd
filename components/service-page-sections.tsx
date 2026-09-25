import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./service-page-sections.module.css";
import { ServiceRevealObserver } from "./service-reveal-observer";

export type ServiceStep = {
  step: string;
  title: string;
  copy: string;
};

export type ServiceScopeItem = readonly [title: string, copy: string];

export type ServiceCountry = {
  name: string;
  href: string;
  note: string;
};

export function ServiceHero({
  eyebrow,
  title,
  copy,
  visual,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  visual: ReactNode;
}) {
  return (
    <>
      <ServiceRevealObserver />
      <section className={`section-pad ${styles.hero}`} data-service-reveal>
      <div className={styles.heroCopy}>
        <Link href="/#services" className="back-link">← Services</Link>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className={styles.heroActions}>
          <Link className="button button-dark" href="/packages">See packages <span aria-hidden="true">↗</span></Link>
          <a className="text-link" href="#countries">Choose your country <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      {visual}
      </section>
    </>
  );
}

export function ServiceProcess({
  eyebrow,
  title,
  copy,
  steps,
  ariaLabel,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  steps: readonly ServiceStep[];
  ariaLabel: string;
}) {
  return (
    <section className={`section-pad ${styles.flowSection}`} data-service-reveal>
      <div className={styles.sectionIntro}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>

      <div className={styles.workflow} aria-label={ariaLabel}>
        {steps.map((item, index) => (
          <article className={styles.workflowStep} key={item.step}>
            <div className={styles.stepTop}>
              <span>{item.step}</span>
              {index < steps.length - 1 && <i aria-hidden="true">→</i>}
            </div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServiceScope({
  eyebrow = "Typical scope",
  title,
  copy,
  items,
}: {
  eyebrow?: string;
  title: string;
  copy: string;
  items: readonly ServiceScopeItem[];
}) {
  return (
    <section className={`section-pad ${styles.scopeSection}`} data-service-reveal>
      <div className={styles.scopeHeader}>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <p>{copy}</p>
      </div>

      <div className={styles.scopeGrid}>
        {items.map(([itemTitle, itemCopy], index) => (
          <article className={styles.scopeCard} key={itemTitle}>
            <span>0{index + 1}</span>
            <h3>{itemTitle}</h3>
            <p>{itemCopy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ServiceHub({
  eyebrow,
  title,
  copy,
  linkHref,
  linkLabel,
  ariaLabel,
  coreEyebrow,
  coreTitle,
  nodes,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  linkHref: string;
  linkLabel: string;
  ariaLabel: string;
  coreEyebrow: string;
  coreTitle: string;
  nodes: readonly [string, string, string, string];
}) {
  return (
    <section className={`section-pad ${styles.hubSection}`} data-service-reveal>
      <div className={styles.hubCopy}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
        <Link className="text-link" href={linkHref}>{linkLabel} <span aria-hidden="true">↗</span></Link>
      </div>

      <div className={styles.hubMap} role="img" aria-label={ariaLabel}>
        <div className={styles.hubCore}>
          <span>{coreEyebrow}</span>
          <strong>{coreTitle}</strong>
        </div>
        <div className={`${styles.hubNode} ${styles.nodeTop}`}>{nodes[0]}</div>
        <div className={`${styles.hubNode} ${styles.nodeLeft}`}>{nodes[1]}</div>
        <div className={`${styles.hubNode} ${styles.nodeRight}`}>{nodes[2]}</div>
        <div className={`${styles.hubNode} ${styles.nodeBottom}`}>{nodes[3]}</div>
        <span className={`${styles.connector} ${styles.lineTop}`} aria-hidden="true" />
        <span className={`${styles.connector} ${styles.lineLeft}`} aria-hidden="true" />
        <span className={`${styles.connector} ${styles.lineRight}`} aria-hidden="true" />
        <span className={`${styles.connector} ${styles.lineBottom}`} aria-hidden="true" />
      </div>
    </section>
  );
}

export function ServiceCountries({
  eyebrow,
  title,
  copy,
  countries,
  internationalCopy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  countries: readonly ServiceCountry[];
  internationalCopy: string;
}) {
  return (
    <section className={`section-pad ${styles.countrySection}`} id="countries" data-service-reveal>
      <div className={styles.countryHeader}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>

      <div className={styles.countryGrid}>
        {countries.map((country) => (
          <Link
            className={styles.countryCard}
            href={country.href}
            key={country.name}
            data-country={country.name === "United Kingdom" ? "uk" : country.name.toLowerCase()}
          >
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
            <p>{internationalCopy}</p>
          </div>
          <strong aria-hidden="true">↗</strong>
        </Link>
      </div>
    </section>
  );
}

export function ServiceClosing({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className={`section-pad ${styles.closing}`} data-service-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className={styles.closingActions}>
        <Link className="button button-dark" href="/contact">Talk to us <span aria-hidden="true">↗</span></Link>
        <Link className="button button-quiet" href="/packages">View pricing</Link>
      </div>
    </section>
  );
}
