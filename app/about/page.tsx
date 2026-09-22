import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "About Shiel, a European-based accountancy business with more than 10 years of experience across different regions and international client work.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero section-pad compact-hero about-hero">
        <p className="eyebrow">About Shiel</p>
        <h1>Accountancy shaped by more than one market.</h1>
        <p>Shiel is European based and works with clients internationally. Our experience has been built over more than a decade across different regions, business types and ways of working.</p>
      </section>
      <section className="section-pad about-story">
        <div className="large-statement reveal"><p>That background matters when the answer is not sitting in one tidy box.</p></div>
        <div className="story-copy reveal">
          <p>Many clients now earn, hire, sell or operate across borders. Their accounting needs someone who can keep the core records coherent while understanding when a local specialist needs to be brought into the conversation.</p>
          <p>We are not trying to make accountancy sound mysterious. The job is to understand the facts, keep the records reliable, meet the obligations and explain what matters in language you can use.</p>
        </div>
      </section>
      <section className="dark-panel section-pad values-panel">
        <div className="section-heading reveal"><p className="eyebrow">How we think about the work</p><h2>Good accountancy reduces friction.</h2></div>
        <div className="principle-grid">
          <article className="persona-card reveal"><span>Context first</span><h3>Understand the business before moving the numbers around.</h3></article>
          <article className="persona-card reveal"><span>Plain language</span><h3>Explain the position without hiding behind terminology.</h3></article>
          <article className="persona-card reveal"><span>Continuity</span><h3>Keep enough context that every deadline does not start from zero.</h3></article>
        </div>
      </section>
      <section className="cta-panel section-pad reveal"><p className="eyebrow">Work with Shiel</p><h2>Tell us what your current setup looks like.</h2><p>We will tell you what we can handle and where specialist local input may be needed.</p><Link href="/contact" className="button button-dark">Talk to us <span aria-hidden="true">↗</span></Link></section>
    </>
  );
}
