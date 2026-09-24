import Link from "next/link";
import { internationalScenarioList, internationalScenarios, type InternationalScenarioSlug } from "@/lib/international-scenarios";
import { siteConfig } from "@/lib/site";
import { safeJsonLd } from "@/lib/seo";
import styles from "@/app/international-accounting/international.module.css";

export function InternationalScenariosGrid({
  basePath = "/international-accounting",
}: {
  basePath?: string;
}) {
  return (
    <section className={`section-pad ${styles.gridSection}`}>
      <div className={styles.heading}>
        <p className="eyebrow">Cross-border situations</p>
        <h2>Start with the situation, not the jurisdiction.</h2>
        <p>
          These are common cases where the company, owner, client or reporting obligation spans more than one country.
        </p>
      </div>
      <div className={styles.grid}>
        {internationalScenarioList.map((scenario) => (
          <Link key={scenario.slug} href={`${basePath}/${scenario.slug}`} className={styles.card}>
            <span>{scenario.eyebrow}</span>
            <h3>{scenario.title}</h3>
            <p>{scenario.summary}</p>
            <strong>See how we handle it →</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function InternationalScenarioPage({
  slug,
  regionPath,
  regionName,
}: {
  slug: InternationalScenarioSlug;
  regionPath?: string;
  regionName?: string;
}) {
  const scenario = internationalScenarios[slug];
  const basePath = regionPath ? `${regionPath}/international-accounting` : "/international-accounting";
  const contactPath = regionPath ? `${regionPath}/contact` : "/contact";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: scenario.title,
        description: scenario.summary,
        url: `${siteConfig.url}${basePath}/${scenario.slug}`,
        provider: { "@id": `${siteConfig.url}/#organization` },
        areaServed: scenario.relatedRegions,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          {
            "@type": "ListItem",
            position: 2,
            name: regionName ? `${regionName} international accounting` : "International accounting",
            item: `${siteConfig.url}${basePath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: scenario.eyebrow,
            item: `${siteConfig.url}${basePath}/${scenario.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />

      <section className={`section-pad ${styles.detailHero}`}>
        <Link href={basePath} className={styles.backLink}>← {regionName ? `${regionName} international accounting` : "International accounting"}</Link>
        <p className="eyebrow">{scenario.eyebrow}</p>
        <h1>{scenario.title}</h1>
        <p>{scenario.summary}</p>
      </section>

      <section className={`section-pad ${styles.detailSplit}`}>
        <div>
          <p className="eyebrow">Who this is for</p>
          <h2>When the accounting no longer fits neatly in one country.</h2>
          <p>{scenario.whoItIsFor}</p>
        </div>
        <div className={styles.handlePanel}>
          <p className={styles.panelLabel}>What we can coordinate</p>
          <ul>
            {scenario.handle.map((item) => (
              <li key={item}><span aria-hidden="true">✓</span>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`section-pad ${styles.questionsSection}`}>
        <div>
          <p className="eyebrow">What we establish first</p>
          <h2>The facts that determine the accounting workflow.</h2>
        </div>
        <div className={styles.questionList}>
          {scenario.questions.map((question, index) => (
            <div key={question}>
              <span>0{index + 1}</span>
              <p>{question}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`section-pad ${styles.regionsStrip}`}>
        <p>Relevant regions</p>
        <div>
          {scenario.relatedRegions.map((region) => <span key={region}>{region}</span>)}
        </div>
      </section>

      <section className={`section-pad ${styles.detailCta}`}>
        <p className="eyebrow">Tell us the structure</p>
        <h2>We can work out the accounting route from there.</h2>
        <p>
          Send the company location, where the owners or directors live, and the countries that currently create filing or reporting obligations.
        </p>
        <Link
          className="button button-dark"
          href={{ pathname: contactPath, query: { enquiry: "International accounting" } }}
        >
          Discuss the situation <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
