import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./country-page-sections.module.css";

export function CountryHero({
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
    <section className={`section-pad ${styles.hero}`}>
      <div className={styles.heroCopy}>
        <Link href="/#services" className="back-link">← Countries</Link>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className={styles.heroActions}>
          <a className="button button-dark" href="#pricing">See prices <span aria-hidden="true">↓</span></a>
          <Link className="text-link" href="/contact">Talk to us <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      {visual}
    </section>
  );
}

export function CountryFacts({
  title,
  items,
}: {
  title: string;
  items: readonly { value: string; label: string; note: string }[];
}) {
  return (
    <section className={`section-pad ${styles.factSection}`}>
      <div className={styles.factLead}>
        <p className="eyebrow">The quick version</p>
        <h2>{title}</h2>
      </div>
      <div className={styles.factGrid}>
        {items.map((item) => (
          <article key={item.label}>
            <strong>{item.value}</strong>
            <h3>{item.label}</h3>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CountryServices({
  title,
  copy,
  items,
}: {
  title: string;
  copy: string;
  items: readonly { title: string; copy: string; href: string }[];
}) {
  return (
    <section className={`section-pad ${styles.serviceSection}`}>
      <div className={styles.serviceLead}>
        <p className="eyebrow">What we handle</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className={styles.serviceList}>
        {items.map((item, index) => (
          <Link href={item.href} key={item.title}>
            <span>0{index + 1}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </div>
            <strong aria-hidden="true">↗</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CountryPricing({
  title,
  copy,
  plans,
  note,
}: {
  title: string;
  copy: string;
  plans: readonly { label: string; price: string; note: string; href: string }[];
  note: string;
}) {
  return (
    <section className={`section-pad ${styles.pricingSection}`} id="pricing">
      <div className={styles.pricingHeader}>
        <p className="eyebrow">Pricing</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className={styles.priceGrid}>
        {plans.map((plan) => (
          <Link href={plan.href} key={plan.label}>
            <span>{plan.label}</span>
            <strong>{plan.price}</strong>
            <p>{plan.note}</p>
            <i aria-hidden="true">View packages ↗</i>
          </Link>
        ))}
      </div>
      <p className={styles.priceNote}>{note}</p>
    </section>
  );
}

export function CountryAnswers({
  title,
  items,
}: {
  title: string;
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <section className={`section-pad ${styles.answerSection}`}>
      <div className={styles.answerHeader}>
        <p className="eyebrow">Common questions</p>
        <h2>{title}</h2>
      </div>
      <div className={styles.answerList}>
        {items.map((item) => (
          <article key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CountryClosing({
  title,
  copy,
}: {
  title: string;
  copy: string;
}) {
  return (
    <section className={`section-pad ${styles.closing}`}>
      <div>
        <p className="eyebrow">Need a local accountant?</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <div className={styles.closingActions}>
        <Link className="button button-dark" href="/contact">Talk to us <span aria-hidden="true">↗</span></Link>
        <a className="button button-quiet" href="#pricing">View pricing</a>
      </div>
    </section>
  );
}
