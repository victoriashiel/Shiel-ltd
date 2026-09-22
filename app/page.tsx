import Link from "next/link";
import { FinanceCanvas } from "@/components/finance-canvas";
import { services } from "@/lib/services";

const faqs = [
  {
    question: "Can you work with us if we are based outside Europe?",
    answer: "Yes. Shiel is European based but supports clients internationally. Where a matter needs jurisdiction-specific legal or tax advice, we can coordinate the accounting information with the appropriate local specialist rather than pretending one firm can replace every local adviser.",
  },
  {
    question: "Do we have to move all of our accounting to Shiel?",
    answer: "No. We can take on a defined piece of work, support an existing finance function, or handle an ongoing set of services. The scope should match what your business actually needs.",
  },
  {
    question: "What do you need before you can quote?",
    answer: "Usually the entity or individual involved, the countries connected to the work, the services you need, your current records and any upcoming deadlines. If something is unclear, we can establish that during the first conversation.",
  },
  {
    question: "Can you help when more than one jurisdiction is involved?",
    answer: "Yes. Cross-border work is one of the situations the firm is designed for. We keep the accounting and reporting picture coherent and work alongside local specialists where their jurisdiction-specific input is required.",
  },
  {
    question: "Do you only work with companies?",
    answer: "No. We work with companies, founders, contractors and individuals where the accounting or tax work fits our scope and experience.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> European based · Working internationally</p>
          <h1>Accounting that keeps up with where you do business.</h1>
          <p className="hero-intro">More than a decade of accounting experience across different regions, with practical support for companies, founders and individuals whose finances do not fit neatly inside one border.</p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/contact">Talk to us <span aria-hidden="true">↗</span></Link>
            <Link className="button button-quiet" href="/services">Explore services <span aria-hidden="true">→</span></Link>
          </div>
          <p className="hero-note">Clear scope. Straight answers. Work that gets finished properly.</p>
        </div>
        <FinanceCanvas />
      </section>

      <section className="proof-strip" aria-label="Shiel at a glance">
        <div><strong>10+</strong><span>years of experience</span></div>
        <div><strong>Europe</strong><span>our operating base</span></div>
        <div><strong>Global</strong><span>client support</span></div>
        <div><strong>One view</strong><span>accounts, tax and reporting</span></div>
      </section>

      <section className="section-pad service-section">
        <div className="section-heading reveal">
          <p className="eyebrow">What we do</p>
          <h2>The finance work you need, connected properly.</h2>
          <p>Year-end should not be the first time anyone has looked closely at the numbers. We can support the routine work, the filings and the decisions in between.</p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <Link href={`/services/${service.slug}`} className="service-card reveal" key={service.slug} style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}>
              <span className="service-index">0{index + 1}</span>
              <div><p className="card-eyebrow">{service.eyebrow}</p><h3>{service.title}</h3><p>{service.summary}</p></div>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dark-panel section-pad">
        <div className="dark-copy reveal">
          <p className="eyebrow">Built for how business works now</p>
          <h2>Your financial picture should travel with you.</h2>
          <p>Businesses sell online, founders move, teams work remotely and income can arrive from several places. The accounting still needs one coherent set of records behind it.</p>
          <Link href="/services/international-accounting" className="text-link light-link">See international accounting <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="dark-cards">
          <article className="persona-card reveal"><span>For companies</span><h3>Keep the core finance function under control.</h3><p>Accounts, VAT, payroll, bookkeeping and management reporting organised around the way your company actually operates.</p></article>
          <article className="persona-card reveal"><span>For founders & contractors</span><h3>Make the structure easier to understand.</h3><p>Clear records and reporting when your income, company or working pattern crosses jurisdictions.</p></article>
        </div>
      </section>

      <section className="section-pad split-section">
        <div className="section-heading reveal">
          <p className="eyebrow">How we work</p>
          <h2>Start with what is actually happening.</h2>
        </div>
        <div className="process-list">
          <article className="process-row reveal"><span>01</span><h3>Tell us where things stand.</h3><p>We start with your current setup, deadlines, records and the jurisdictions involved.</p></article>
          <article className="process-row reveal"><span>02</span><h3>Agree the work before it starts.</h3><p>You get a clear scope so you know what we are handling, what we need from you and what comes next.</p></article>
          <article className="process-row reveal"><span>03</span><h3>Keep the information moving.</h3><p>Once onboarded, we build a practical rhythm for records, filings and regular communication.</p></article>
          <article className="process-row reveal"><span>04</span><h3>Stay ahead of the next deadline.</h3><p>Ongoing clients get continuity rather than having to rebuild the context each time something is due.</p></article>
        </div>
      </section>

      <section className="section-pad international-section">
        <div className="world-grid" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="international-copy reveal">
          <p className="eyebrow">European base · International perspective</p>
          <h2>Cross-border does not need to mean fragmented.</h2>
          <p>Where local jurisdiction-specific advice is needed, we can work alongside the relevant specialist while keeping the accounting information organised. You get fewer duplicated requests and a clearer overall picture.</p>
          <Link className="button button-light" href="/contact">Discuss your setup <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="section-pad insights-preview">
        <div className="section-heading reveal"><p className="eyebrow">Useful, not noisy</p><h2>Accounting notes for people running businesses.</h2></div>
        <div className="insight-grid">
          <article className="insight-card reveal"><span>Management accounts</span><h3>What should you actually look at each month?</h3><p>A practical guide to the figures that matter once annual accounts are not enough.</p></article>
          <article className="insight-card reveal"><span>Cross-border</span><h3>What to prepare before speaking to advisers in two countries.</h3><p>The information that saves time when more than one jurisdiction is involved.</p></article>
          <article className="insight-card reveal"><span>VAT</span><h3>When VAT becomes an operational issue, not just a filing.</h3><p>Why sales location, invoices and cash timing need to match the return.</p></article>
        </div>
        <Link href="/insights" className="text-link">View insights <span aria-hidden="true">→</span></Link>
      </section>

      <section className="section-pad faq-section">
        <div className="section-heading reveal">
          <p className="eyebrow">Common questions</p>
          <h2>What clients usually want to know first.</h2>
          <p>Enough detail to decide whether it makes sense to speak, without turning the website into a technical manual.</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details className="faq-item reveal" key={faq.question}>
              <summary>
                <span>{faq.question}</span>
                <span className="faq-plus" aria-hidden="true">+</span>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta-panel section-pad reveal">
        <p className="eyebrow">Need a clearer setup?</p>
        <h2>Tell us what you are dealing with.</h2>
        <p>We will come back to you with the right next step and whether we are a sensible fit for the work.</p>
        <Link className="button button-dark" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  );
}
