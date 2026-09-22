import Link from "next/link";
import { FinanceCanvas } from "@/components/finance-canvas";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

const faqs = [
  {
    question: "Do you work with clients outside Europe?",
    answer: "Yes. Shiel Accountants is European based and supports clients internationally. Where local jurisdiction-specific advice is required, we can work alongside the relevant specialist while keeping the accounting information organised.",
  },
  {
    question: "Can you handle the bookkeeping and payroll as well as year-end work?",
    answer: "Yes. Ongoing bookkeeping and payroll are core services, and keeping those records clean during the year usually makes the tax and year-end work much more straightforward.",
  },
  {
    question: "What does advisory and growth support include?",
    answer: "It can include management accounts, cash-flow reporting, budgets, margin analysis and finance input around business decisions. The scope depends on what you are trying to understand or improve.",
  },
  {
    question: "Can you help when more than one country is involved?",
    answer: "Yes. Cross-border accounting is one of the firm's main areas of focus. We help keep the numbers and information flow coherent when several jurisdictions or advisers are involved.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero section-pad">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> European based · Working internationally</p>
          <h1>Accounting that keeps up with your business.</h1>
          <p className="hero-intro">
            Shiel Accountants brings more than 10 years of experience across different regions to tax,
            compliance, bookkeeping, payroll, advisory work and international accounting.
          </p>
          <div className="hero-actions">
            <Link className="button button-dark" href="/contact">
              Contact us <span aria-hidden="true">↗</span>
            </Link>
            <a className="button button-quiet" href="#services">Explore services <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-note">Email {siteConfig.email} or use the contact form.</p>
        </div>
        <FinanceCanvas />
      </section>

      <section className="proof-strip" aria-label="Shiel Accountants at a glance">
        <div><strong>10+</strong><span>years of experience</span></div>
        <div><strong>Europe</strong><span>our operating base</span></div>
        <div><strong>Global</strong><span>international client support</span></div>
        <div><strong>Direct</strong><span>WhatsApp access for queries</span></div>
      </section>

      <section className="section-pad service-section" id="services">
        <div className="section-heading reveal">
          <p className="eyebrow">What we do</p>
          <h2>Four areas. One joined-up view of the numbers.</h2>
          <p>
            The work is organised around the parts of accountancy that most often need to speak to each other:
            compliance, day-to-day finance, decision support and international coordination.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <Link
              href={`/${service.slug}`}
              className="service-card reveal"
              key={service.slug}
              style={{ "--delay": `${index * 55}ms` } as React.CSSProperties}
            >
              <span className="service-index">0{index + 1}</span>
              <div>
                <p className="card-eyebrow">{service.eyebrow}</p>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </div>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="dark-panel section-pad" id="about">
        <div className="dark-copy reveal">
          <p className="eyebrow">More than a decade across different regions</p>
          <h2>Experience matters more when the setup is not standard.</h2>
          <p>
            Shiel Accountants works with businesses, founders, contractors and individuals whose finances can
            span companies, countries and different stages of growth. The aim is to keep the core accounting
            clear while knowing when a local specialist needs to be part of the picture.
          </p>
        </div>
        <div className="dark-cards">
          <article className="persona-card reveal">
            <span>For established businesses</span>
            <h3>Keep finance, payroll and compliance moving without losing sight of performance.</h3>
          </article>
          <article className="persona-card reveal">
            <span>For mobile clients</span>
            <h3>Keep the records coherent when work, income or companies cross borders.</h3>
          </article>
        </div>
      </section>

      <section className="section-pad split-section">
        <div className="section-heading reveal">
          <p className="eyebrow">How we work</p>
          <h2>Start with the situation, then define the work.</h2>
        </div>
        <div className="process-list">
          <article className="process-row reveal">
            <span>01</span><h3>Send us the outline.</h3>
            <p>A WhatsApp message with where you are based, what needs attention and any immediate deadline is enough to start.</p>
          </article>
          <article className="process-row reveal">
            <span>02</span><h3>We establish the scope.</h3>
            <p>We look at the records, entities and jurisdictions involved, then set out what we can handle and what we need from you.</p>
          </article>
          <article className="process-row reveal">
            <span>03</span><h3>The work gets organised.</h3>
            <p>Recurring tasks, filings and reporting are given a practical rhythm so the next deadline is not a restart from zero.</p>
          </article>
        </div>
      </section>

      <section className="section-pad international-section">
        <div className="world-grid" aria-hidden="true"><span /><span /><span /><span /><span /></div>
        <div className="international-copy reveal">
          <p className="eyebrow">European base · International accounting</p>
          <h2>One accounting picture, even when more than one country is involved.</h2>
          <p>
            We can coordinate the records and reporting across borders and work with jurisdiction-specific
            advisers where their local input is needed.
          </p>
          <Link className="button button-light" href="/international-accounting">
            International accounting <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="section-pad faq-section">
        <div className="section-heading reveal">
          <p className="eyebrow">Common questions</p>
          <h2>The things worth establishing before the work starts.</h2>
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
        <p className="eyebrow">Have a query?</p>
        <h2>Tell us what you need help with.</h2>
        <p>Choose the closest enquiry type, give us the essentials and we can take it from there.</p>
        <Link className="button button-dark" href="/contact">
          Contact us <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  );
}
