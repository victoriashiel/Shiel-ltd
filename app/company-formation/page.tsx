import type { Metadata } from "next";
import styles from "./company-formation.module.css";
import {
  ServiceClosing,
  ServiceCountries,
  ServiceHero,
  ServiceHub,
  ServiceProcess,
  ServiceScope,
} from "@/components/service-page-sections";
import { safeJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Company Formation",
  description:
    "Company formation and launch support for businesses in Ireland, the UK and Gibraltar, with the accounting setup connected from day one.",
  alternates: { canonical: "/company-formation" },
  openGraph: {
    title: "Company Formation | Shiel Accountants",
    description:
      "Set up the company, registrations and accounting foundations together rather than fixing the structure after trading begins.",
    url: "/company-formation",
  },
};

const workflow = [
  {
    step: "01",
    title: "Define",
    copy: "Confirm who will own and run the company, what it will do and which jurisdiction is relevant before any filing is started.",
  },
  {
    step: "02",
    title: "Form",
    copy: "Prepare the incorporation information, company details and registry filing needed to establish the entity.",
  },
  {
    step: "03",
    title: "Register",
    copy: "Set up the tax, payroll, beneficial ownership and other registrations that apply once the company exists.",
  },
  {
    step: "04",
    title: "Launch",
    copy: "Put the bookkeeping, bank feeds, payroll and compliance calendar in place so the first transaction starts cleanly.",
  },
] as const;

const scope = [
  ["Formation filing", "Preparation of the core information needed to register the company in the chosen jurisdiction."],
  ["Ownership & directors", "Company ownership, director and officer information organised correctly for the formation process."],
  ["Tax registrations", "The relevant business tax registrations prepared once the company is incorporated."],
  ["Payroll setup", "Director or employee payroll registration and setup where the company will operate payroll."],
  ["Beneficial ownership", "Support with the ownership disclosure or register required in the relevant jurisdiction."],
  ["Finance setup", "Opening bookkeeping structure, bank feeds and a filing calendar so the company starts with usable records."],
] as const;

const countries = [
  {
    name: "Ireland",
    href: "/countries/ireland",
    note: "Irish company formation, CRO, Revenue and beneficial-ownership context.",
  },
  {
    name: "United Kingdom",
    href: "/countries/united-kingdom",
    note: "UK company formation, Companies House, HMRC and ownership-reporting context.",
  },
  {
    name: "Gibraltar",
    href: "/countries/gibraltar",
    note: "Gibraltar company formation, Companies House and local tax-registration context.",
  },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Company Formation",
  serviceType: "Company formation and accounting setup",
  url: `${siteConfig.url}/company-formation`,
  description:
    "Company formation and launch support for businesses in Ireland, the UK and Gibraltar, with the accounting setup connected from day one.",
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
  },
  areaServed: ["Ireland", "United Kingdom", "Gibraltar"],
};

export default function CompanyFormationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }}
      />

      <ServiceHero
        eyebrow="Company formation"
        title="Start with the structure you actually need."
        copy="We connect the incorporation, registrations and finance setup from the beginning so the company is ready to trade cleanly rather than becoming an accounting repair job a few months later."
        visual={
          <div className={styles.formationVisual} role="img" aria-label="Illustration showing a new company moving from incorporation to ready-to-trade status">
            <div className={styles.visualHeader}>
              <span>New company</span>
              <strong>Setup path</strong>
            </div>

            <div className={styles.formationPath}>
              <div className={styles.pathCard}>
                <span>01</span>
                <div>
                  <strong>Company formed</strong>
                  <small>entity · owners · directors</small>
                </div>
                <i>✓</i>
              </div>
              <div className={styles.pathCard}>
                <span>02</span>
                <div>
                  <strong>Registrations in place</strong>
                  <small>tax · payroll · ownership</small>
                </div>
                <i>✓</i>
              </div>
              <div className={styles.pathCard}>
                <span>03</span>
                <div>
                  <strong>Finance system ready</strong>
                  <small>books · bank feeds · deadlines</small>
                </div>
                <i>✓</i>
              </div>
            </div>

            <div className={styles.readyCard}>
              <span>Status</span>
              <strong>Ready to trade</strong>
              <small>with the accounting foundations already connected</small>
            </div>
          </div>
        }
      />

      <ServiceProcess
        eyebrow="From idea to trading company"
        title="Formation is only useful if the company is ready for what comes next."
        copy="Registering the entity is one step. The cleaner setup connects the company, tax registrations, payroll and bookkeeping before the first invoice or expense creates avoidable admin."
        steps={workflow}
        ariaLabel="Company formation workflow"
      />

      <ServiceScope
        title="What the formation work can include."
        copy="The exact scope depends on the jurisdiction, ownership structure, directors and whether the company will need payroll, tax or other registrations from the outset."
        items={scope}
      />

      <ServiceHub
        eyebrow="Formation is the starting point"
        title="A new company immediately creates connected obligations."
        copy="The incorporation affects tax, ownership reporting, payroll and the accounting records. Handling those as one setup is more efficient than treating each as a separate task after trading begins."
        linkHref="/accounts"
        linkLabel="See accounts support"
        ariaLabel="Diagram showing company formation connected to related setup work"
        coreEyebrow="New entity"
        coreTitle="Company formation"
        nodes={["Tax registrations", "Ownership reporting", "Payroll setup", "Bookkeeping"]}
      />

      <section className={`section-pad ${styles.readinessSection}`} data-service-reveal>
        <div className={styles.readinessHeader}>
          <p className="eyebrow">Before the first invoice</p>
          <h2>A formed company and a ready company are not the same thing.</h2>
          <p>
            The most useful setup work happens in the gap between receiving the incorporation documents and
            actually trading. That is where the recurring finance process should be put in place.
          </p>
        </div>

        <div className={styles.readinessGrid}>
          <article>
            <span>Identity</span>
            <h3>Ownership is clear</h3>
            <p>Directors, owners and control information are documented consistently from the start.</p>
          </article>
          <article>
            <span>Compliance</span>
            <h3>Registrations are mapped</h3>
            <p>The company knows which tax, payroll and ownership registrations apply and when they become relevant.</p>
          </article>
          <article>
            <span>Finance</span>
            <h3>The books are ready</h3>
            <p>Banking, bookkeeping categories and record-keeping are set up before transactions start accumulating.</p>
          </article>
          <article>
            <span>Calendar</span>
            <h3>Deadlines are visible</h3>
            <p>The first annual, tax and employer deadlines are captured before they become urgent.</p>
          </article>
        </div>
      </section>

      <section className={`section-pad ${styles.editorialSection}`} data-service-reveal>
        <div className={styles.editorialHeader}>
          <p className="eyebrow">From idea to operating company</p>
          <h2>Incorporation is the middle of the journey, not the finish line.</h2>
          <p>The visual below separates the legal formation from the practical setup needed before the business starts trading.</p>
        </div>
        <div className={styles.launchPath} role="img" aria-label="Journey from business idea through company formation to an operating finance system">
          <div className={styles.launchStage}><span>Idea</span><strong>Structure</strong><small>owners · directors · jurisdiction</small></div>
          <div className={styles.launchLink} aria-hidden="true" />
          <div className={styles.launchStage}><span>Entity</span><strong>Formation</strong><small>registry filing · company details</small></div>
          <div className={styles.launchLink} aria-hidden="true" />
          <div className={styles.launchStage}><span>Setup</span><strong>Registrations</strong><small>tax · payroll · ownership</small></div>
          <div className={styles.launchLink} aria-hidden="true" />
          <div className={`${styles.launchStage} ${styles.launchStageActive}`}><span>Operating</span><strong>Ready to trade</strong><small>books · banking · deadlines</small></div>
        </div>
      </section>

      <ServiceCountries
        eyebrow="Choose where to form"
        title="The formation process is local to the jurisdiction."
        copy="Choose the country where the company will be registered to see the relevant registry, tax and ownership context. If the owners, activity or structure cross borders, start with International."
        countries={countries}
        internationalCopy="For founders deciding between jurisdictions or setting up a company with cross-border ownership, activity or reporting."
      />

      <ServiceClosing
        eyebrow="Starting a company?"
        title="Set up the company and the finance process together."
        copy="Tell us where you plan to operate, who will own the company and what the business will do. We can map the formation and accounting setup before the first filing is made."
      />
    </>
  );
}
