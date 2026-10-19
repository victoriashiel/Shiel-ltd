import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import styles from "./team.module.css";

const description = "Meet the people behind Shiel Accountants, covering strategic tax planning, personal and corporate tax, accounts and compliance.";

export const metadata: Metadata = {
  title: "Meet the team",
  description,
  alternates: { canonical: "/about/team" },
  openGraph: { title: "Meet the team | Shiel Accountants", description, url: "/about/team" },
  twitter: { card: "summary_large_image", title: "Meet the team | Shiel Accountants", description },
};

const team = [
  {
    id: "thomas-langford",
    name: "Thomas Langford",
    role: "Managing Partner",
    copy: "Thomas leads strategic tax planning and advice on complex structures. He brings the wider client position into focus and oversees quality review across the work.",
    specialties: ["Strategic tax planning", "Complex structures", "High-level client advice", "Quality review"],
  },
  {
    id: "amelia-fraser",
    name: "Amelia Fraser",
    role: "Senior Tax Consultant",
    copy: "Amelia focuses on the detail behind corporate tax decisions, from elections and reliefs to group structures and timing differences, with a particular focus on Gibraltar and cross-border tax optimisation.",
    specialties: ["Corporate tax elections & reliefs", "Group structures", "Timing differences", "Gibraltar tax", "Cross-border tax optimisation"],
  },
  {
    id: "daniel-brooks",
    name: "Daniel Brooks",
    role: "Tax Advisor",
    copy: "Daniel supports individuals and businesses with personal and corporate tax compliance and planning, helping them understand the reliefs and exemptions relevant to their position.",
    specialties: ["Personal tax compliance", "Corporate tax compliance", "Individual & business tax planning", "Reliefs & exemptions"],
  },
  {
    id: "elena-rossi",
    name: "Elena Rossi",
    role: "Accounts & Compliance Manager",
    copy: "Elena brings together the records, reporting and filings that keep accounts in order. Her work spans day-to-day bookkeeping, management accounts, VAT compliance and the supporting working papers.",
    specialties: ["Bookkeeping", "Management accounts", "VAT compliance", "Annual filings", "Working papers"],
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${siteConfig.url}/about/team#page`,
      url: `${siteConfig.url}/about/team`,
      name: "Meet the team | Shiel Accountants",
      description,
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      about: { "@id": `${siteConfig.url}/#organization` },
      mainEntity: team.map((person) => ({
        "@type": "Person",
        "@id": `${siteConfig.url}/about/team#${person.id}`,
        name: person.name,
        jobTitle: person.role,
        description: person.copy,
        image: `${siteConfig.url}/team/${person.id}.webp`,
        knowsAbout: person.specialties,
        worksFor: { "@id": `${siteConfig.url}/#organization` },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Meet the team", item: `${siteConfig.url}/about/team` },
      ],
    },
  ],
};

export default function TeamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
      <section className={`section-pad ${styles.hero}`} aria-labelledby="team-title">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Meet the team</span>
        </nav>
        <div className={styles.heroGrid}>
          <div>
            <p className="eyebrow">Meet the team</p>
            <h1 id="team-title">Good with numbers.<br /><span>Better with people.</span></h1>
          </div>
          <div className={styles.intro}>
            <p>Know who’s looking after your business.</p>
            <p>From everyday accounts to the tax decisions that shape what comes next, meet the people bringing the detail and the bigger picture together.</p>
            <a className="text-link" href="#our-team">Meet your team <span aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section id="our-team" className={`section-pad ${styles.teamSection}`} aria-labelledby="profiles-title">
        <div className={styles.sectionHeading}>
          <h2 id="profiles-title">The people behind Shiel.</h2>
          <p>Different specialties. One connected team.</p>
        </div>
        <div className={styles.grid}>
          {team.map((person, index) => (
            <article key={person.id} id={person.id} className={styles.card} aria-labelledby={`${person.id}-name`}>
              <div className={styles.portrait}>
                <Image src={`/team/${person.id}.webp`} alt={person.name} fill sizes="(max-width: 680px) calc(100vw - 28px), (max-width: 1100px) calc((100vw - 58px) / 2), 270px" preload={index < 2} />
              </div>
              <div className={styles.profile}>
                <p className={styles.role}>{person.role}</p>
                <h3 id={`${person.id}-name`}>{person.name}</h3>
                <p className={styles.bio}>{person.copy}</p>
                <div className={styles.specialties}>
                  <p className={styles.tagLabel}>Specialties</p>
                  <ul className={styles.tags} aria-label={`${person.name} specialties`}>
                    {person.specialties.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.approach}`} aria-labelledby="approach-title">
        <div>
          <p className="eyebrow">How we work together</p>
          <h2 id="approach-title">Your accounts don’t happen in isolation.</h2>
          <p>Neither should the advice. Bookkeeping, reporting and tax decisions need to reflect the same business and the same goals.</p>
        </div>
        <ol className={styles.steps}>
          <li><span aria-hidden="true">01</span><div><h3>Start with your situation.</h3><p>Tell us how you work, where you operate and what you need help with.</p></div></li>
          <li><span aria-hidden="true">02</span><div><h3>Bring the right expertise together.</h3><p>We connect the relevant accounts, compliance and tax input around your needs.</p></div></li>
          <li><span aria-hidden="true">03</span><div><h3>Make the next step clear.</h3><p>Understand what needs doing, what information is needed and how we can help.</p></div></li>
        </ol>
      </section>

      <section className={`section-pad ${styles.closing}`} aria-labelledby="contact-title">
        <div><p className="eyebrow">Let’s talk</p><h2 id="contact-title">Put a face to your next conversation.</h2><p>Tell us a little about your business. We’ll help you find the right place to start.</p></div>
        <div className={styles.actions}><Link href="/contact" className="button button-dark">Talk to the team <span aria-hidden="true">↗</span></Link><Link href="/packages" className="text-link">Explore our packages <span aria-hidden="true">↗</span></Link></div>
      </section>
    </>
  );
}
