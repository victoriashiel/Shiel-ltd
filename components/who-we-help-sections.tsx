import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./who-we-help-sections.module.css";

export function AudienceHero({
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
        <Link href="/#services" className="back-link">← Who we help</Link>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className={styles.heroActions}>
          <Link className="button button-dark" href="/packages">See packages <span aria-hidden="true">↗</span></Link>
          <a className="text-link" href="#fit">Is this for me? <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      {visual}
    </section>
  );
}

export function QuickFit({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <section className={`section-pad ${styles.fitSection}`} id="fit">
      <div className={styles.fitLead}>
        <p className="eyebrow">Quick answer</p>
        <h2>{title}</h2>
      </div>
      <div className={styles.fitList}>
        {items.map((item) => (
          <div key={item}><span aria-hidden="true">✓</span><p>{item}</p></div>
        ))}
      </div>
    </section>
  );
}

export function AnswerCards({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: readonly { question: string; answer: string }[];
}) {
  return (
    <section className={`section-pad ${styles.answerSection}`}>
      <div className={styles.answerHeader}>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <div className={styles.answerGrid}>
        {items.map((item, index) => (
          <article key={item.question}>
            <span>0{index + 1}</span>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AudienceCountries({
  copy,
}: {
  copy: string;
}) {
  const countries = [
    ["Ireland", "/countries/ireland"],
    ["United Kingdom", "/countries/united-kingdom"],
    ["Gibraltar", "/countries/gibraltar"],
  ] as const;

  return (
    <section className={`section-pad ${styles.countrySection}`}>
      <div>
        <p className="eyebrow">Where are you based?</p>
        <h2>The local filing language changes. The support model does not.</h2>
        <p>{copy}</p>
      </div>
      <div className={styles.countryLinks}>
        {countries.map(([label, href]) => (
          <Link href={href} key={href}>{label}<span aria-hidden="true">↗</span></Link>
        ))}
        <Link href="/international-accounting">International<span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}

export function AudienceClosing({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className={`section-pad ${styles.closing}`}>
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
