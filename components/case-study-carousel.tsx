"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type CaseStudy = {
  id: string;
  label: string;
  body: ReactNode;
  tagline?: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "payroll",
    label: "Historic payroll issues corrected and €17,200 recovered for the client.",
    body: (
      <>
        <p className="cs-lead">We corrected historic payroll issues and</p>
        <p className="cs-figure">€17,200</p>
        <p className="cs-accent cs-accent-lg">recovered</p>
        <p className="cs-lead">for the client.</p>
      </>
    ),
  },
  {
    id: "deadline",
    label: "Incomplete accounts taken over four days before the deadline and made filing-ready without an extension.",
    body: (
      <>
        <p className="cs-lead">We took over a set of incomplete accounts</p>
        <p className="cs-figure cs-figure-caps">4 DAYS</p>
        <p className="cs-lead">before the deadline and got the company</p>
        <p className="cs-caps cs-caps-accent">FILING-READY</p>
        <p className="cs-caps">
          WITHOUT AN EXTENSION<span className="cs-dot">.</span>
        </p>
      </>
    ),
  },
  {
    id: "overpaid",
    label: "One review uncovered €11,750 of overpaid tax that the client could reclaim.",
    body: (
      <>
        <p className="cs-lead">One review uncovered</p>
        <p className="cs-figure">€11,750</p>
        <p className="cs-of">
          of <strong className="cs-accent">overpaid tax</strong>
        </p>
        <p className="cs-small">
          that the client had not realised they could <strong className="cs-accent">reclaim</strong>.
        </p>
      </>
    ),
  },
  {
    id: "zero",
    label: "A business expecting an €8,000 tax bill had a final liability of €0 after the treatment and reliefs were reviewed.",
    body: (
      <>
        <p className="cs-kicker">FROM</p>
        <p className="cs-figure cs-figure-muted">€8,000</p>
        <p className="cs-kicker cs-kicker-to">TO</p>
        <p className="cs-figure cs-figure-xl">€0</p>
        <p className="cs-small">
          A business was expecting an €8,000 tax bill. After reviewing the treatment and available reliefs, the
          final liability was <strong className="cs-accent">€0</strong>.
        </p>
      </>
    ),
    tagline: "Clearer numbers. Brighter tomorrows.",
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className={`cs-card cs-card-${study.id}`}>
      <span className="sr-only">{study.label}</span>
      <div aria-hidden="true" className="cs-inner">
        <div className="cs-brand">
          <span className="cs-wordmark">
            SHIEL<span className="cs-dot">.</span>
          </span>
          <span className="cs-sub">ACCOUNTANTS</span>
        </div>
        <div className="cs-body">{study.body}</div>
        <div className="cs-foot">
          <span className="cs-url">SHIEL.LTD</span>
          {study.tagline ? <span className="cs-tagline">{study.tagline}</span> : null}
        </div>
        <span className="cs-badge">
          S<span className="cs-dot">.</span>
        </span>
      </div>
    </article>
  );
}

export function CaseStudyCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const [atEnd, setAtEnd] = useState(false);

  const getSlides = () =>
    Array.from(trackRef.current?.querySelectorAll<HTMLElement>("[data-case-slide]") ?? []);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = getSlides();
    const end = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    let nearest = 0;
    let best = Infinity;
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - track.scrollLeft - slides[0].offsetLeft);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setAtEnd(end);
    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  function goTo(index: number) {
    const track = trackRef.current;
    const slides = getSlides();
    const next = Math.max(0, Math.min(index, slides.length - 1));
    const target = slides[next];
    if (!track || !target) return;
    setActive(next);
    setAtEnd(next === slides.length - 1);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: target.offsetLeft - slides[0].offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }

  return (
    <section className="case-study-section section-pad" aria-labelledby="case-study-title">
      <div className="case-study-heading">
        <div>
          <p className="eyebrow">Client results</p>
          <h2 id="case-study-title">What changed when we looked closer.</h2>
          <p>
            A few examples of the difference a review, correction or well-timed intervention can make.
          </p>
        </div>

        <div className="case-study-controls" aria-label="Case study controls">
          <span className="case-study-counter" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous case study"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => goTo(active + 1)}
            disabled={atEnd}
            aria-label="Next case study"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        className="case-study-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Shiel Accountants client case studies"
      >
        <ul className="case-study-track" ref={trackRef}>
          {caseStudies.map((study, index) => (
            <li
              className="case-study-slide"
              data-case-slide={index}
              key={study.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Case study ${index + 1} of ${caseStudies.length}`}
            >
              <CaseStudyCard study={study} />
            </li>
          ))}
        </ul>
      </div>

      <p className="case-study-disclaimer">
        Outcomes depend on each client&apos;s circumstances and the rules that apply to them.
      </p>
    </section>
  );
}
