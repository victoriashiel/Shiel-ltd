import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { safeJsonLd } from "@/lib/seo";
import styles from "./story.module.css";

const description = "A family business built around yours. Discover why Shiel Accountants brings personal attention and transparent fees to small and growing companies.";
export const metadata: Metadata = {
  title: "Our story", description,
  alternates: { canonical: "/about" },
  openGraph: { title: "Our story | Shiel Accountants", description, url: "/about" },
  twitter: { card: "summary_large_image", title: "Our story | Shiel Accountants", description },
};
const people = [
  ["thomas-langford", "Thomas Langford"],
  ["victoria-locke", "Victoria Locke"],
  ["amelia-fraser", "Amelia Fraser"],
  ["daniel-brooks", "Daniel Brooks"],
  ["elena-rossi", "Elena Rossi"],
] as const;
const promises = [
  ["Clear communication", "Know where things stand, what we need from you and what happens next."],
  ["Timely work", "Year-end accounts, tax returns and statutory filings kept moving throughout the year."],
  ["Transparent fees", "Fees agreed in advance, reflecting the needs of an owner-managed company."],
] as const;
const schema = {
  "@context": "https://schema.org", "@type": "AboutPage",
  "@id": `${siteConfig.url}/about#page`, url: `${siteConfig.url}/about`,
  name: "Our story | Shiel Accountants", description,
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: { "@id": `${siteConfig.url}/#organization` },
};
export default function OurStoryPage() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
    <section className={`section-pad ${styles.hero}`} aria-labelledby="story-title">
      <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Our story</span></nav>
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Our story</p>
          <h1 id="story-title">A family business.<br /><span>Built around yours.</span></h1>
          <p>Shiel is our family name. Looking after your company is personal to us.</p>
          <a href="#why-shiel" className="text-link">How it started <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.teamVisual}>
          <p className={styles.visualLabel}>One connected team</p>
          <div className={styles.bigNumber}><strong>12</strong><span>people.<br />Across Europe.</span></div>
          <div className={styles.peopleDots} aria-hidden="true">{Array.from({length:12}, (_, i) => <span key={i} />)}</div>
          <div className={styles.visualFoot}><strong>Family-run.</strong><span>Personally involved.</span></div>
        </div>
      </div>
    </section>

    <section id="why-shiel" className={`section-pad ${styles.origin}`} aria-labelledby="origin-title">
      <div><p className="eyebrow">01 / A better choice</p><h2 id="origin-title">Small company.<br /><span>Proper attention.</span></h2></div>
      <div className={styles.prose}>
        <p className={styles.lead}>We started Shiel because small and growing companies deserve more choice.</p>
        <p>Too often, that choice comes down to large firms whose fees are out of reach, or online packages that offer little personal attention.</p>
        <p>We set out to provide qualified accountants who understand each client’s business, at a price that reflects the needs of an owner-managed company.</p>
      </div>
    </section>

    <section className={`section-pad ${styles.family}`} aria-labelledby="family-title">
      <div className={styles.familyIntro}><p className="eyebrow">02 / The name behind the work</p><h2 id="family-title">Our name is on it.<br /><span>So we care how it’s done.</span></h2></div>
      <div className={styles.familyBody}>
        <p>Shiel is our family name, and it remains a family business today. Members of the family oversee the running of the firm behind the scenes, while our five client-facing accountants work directly with you throughout the year.</p>
        <div className={styles.reach}><span>Based across Europe</span><p>Supporting companies in the <strong>UK, Ireland and Gibraltar</strong>, as well as clients further afield.</p></div>
      </div>
    </section>

    <section className={`section-pad ${styles.people}`} aria-labelledby="people-title">
      <div className={styles.peopleHeader}><div><p className="eyebrow">03 / People you’ll get to know</p><h2 id="people-title">Five faces.<br />A whole team behind them.</h2></div><p>Personal attention means working directly with people who know your business, throughout the year.</p></div>
      <div className={styles.portraits}>{people.map(([id,name]) => <div key={id}><div className={styles.photo}><Image src={`/team/${id}.webp`} alt={name} fill sizes="(max-width: 600px) 42vw, 18vw" /></div><p>{name}</p></div>)}</div>
      <Link className="text-link" href="/about/team">Meet your accountants <span aria-hidden="true">↗</span></Link>
    </section>

    <section className={`section-pad ${styles.care}`} aria-labelledby="care-title">
      <p className="eyebrow">04 / The standard we work to</p>
      <h2 id="care-title">Your company.<br /><span>The care we give our own.</span></h2>
      <p className={styles.careIntro}>We take care of year-end accounts, tax returns and statutory filings so that your company remains compliant and you can focus on running your business.</p>
      <div className={styles.promises}>{promises.map(([title,copy], i) => <article key={title}><span className={styles.promiseNumber}>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className={`section-pad ${styles.closing}`} aria-labelledby="next-title"><div><p className="eyebrow">Let’s get to know your business</p><h2 id="next-title">Tell us what you’re building.</h2><p>We’ll talk through what you need and agree the fees before the work begins.</p></div><div className={styles.actions}><Link className="button button-dark" href="/contact">Talk to Shiel <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/packages">Explore monthly packages <span aria-hidden="true">↗</span></Link></div></section>
  </>;
}
