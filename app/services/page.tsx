import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Accountancy services",
  description: "Company accounts, tax and compliance, VAT, payroll, bookkeeping, management accounts and international accounting support from Shiel.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero section-pad compact-hero">
        <p className="eyebrow">Services</p>
        <h1>Accounting support that fits together.</h1>
        <p>Use us for a specific piece of work or as an ongoing finance partner. The aim is the same: reliable records, clear obligations and fewer loose ends between one deadline and the next.</p>
      </section>
      <section className="section-pad service-directory">
        {services.map((service, index) => (
          <Link className="directory-row reveal" href={`/services/${service.slug}`} key={service.slug}>
            <span className="directory-number">0{index + 1}</span>
            <div><p>{service.eyebrow}</p><h2>{service.title}</h2></div>
            <p className="directory-summary">{service.summary}</p>
            <span className="card-arrow" aria-hidden="true">↗</span>
          </Link>
        ))}
      </section>
      <section className="cta-panel section-pad reveal">
        <p className="eyebrow">Not sure what you need?</p><h2>Start with the situation, not the service name.</h2>
        <p>Tell us what you are trying to sort out and we can work backwards from there.</p>
        <Link className="button button-dark" href="/contact">Talk to us <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  );
}
