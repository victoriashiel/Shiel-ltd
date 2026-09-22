import Link from "next/link";
import { CaseStudyCarousel } from "@/components/case-study-carousel";
import { FinanceCanvas } from "@/components/finance-canvas";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
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
            <div className="contact-cta-pair">
              <Link className="button button-dark" href="/contact">
                Contact us <span aria-hidden="true">↗</span>
              </Link>
              <a
                className="whatsapp-cta-icon"
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`Contact Shiel Accountants on WhatsApp at ${siteConfig.whatsappDisplay}`}
                title="WhatsApp"
              >
                <WhatsAppIcon size={22} />
              </a>
            </div>
            <a className="button button-quiet" href="#services">Explore services <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-note">Use the contact form and we’ll come back to you directly.</p>
        </div>
        <FinanceCanvas />
      </section>

      <section className="proof-strip" aria-label="Shiel Accountants at a glance">
        <div><strong>10+</strong><span>years of experience</span></div>
        <div><strong>Europe</strong><span>our operating base</span></div>
        <div><strong>Global</strong><span>international client support</span></div>
        <div><strong>Practical</strong><span>problem-solving support</span></div>
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

      <CaseStudyCarousel />

      <section className="dark-panel section-pad" id="about">
        <div className="dark-copy reveal">
          <p className="eyebrow">What sets us apart</p>
          <h2>We look beyond the obvious treatment.</h2>
          <p>
            Compliance is only part of the job. We look closely at the rules, reliefs, elections, timing and
            structure around the numbers to see whether there is a better legitimate outcome.
          </p>
        </div>
        <div className="dark-cards">
          <article className="persona-card reveal">
            <span>Question the default</span>
            <h3>If there is another valid treatment worth considering, we want to find it.</h3>
          </article>
          <article className="persona-card reveal">
            <span>See the whole picture</span>
            <h3>Tax, payroll, structure and cross-border issues are not always separate problems.</h3>
          </article>
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
        <div className="contact-cta-pair">
          <Link className="button button-dark" href="/contact">
            Contact us <span aria-hidden="true">↗</span>
          </Link>
          <a
            className="whatsapp-cta-icon"
            href={siteConfig.whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Contact Shiel Accountants on WhatsApp at ${siteConfig.whatsappDisplay}`}
            title="WhatsApp"
          >
            <WhatsAppIcon size={22} />
          </a>
        </div>
      </section>
    </>
  );
}
