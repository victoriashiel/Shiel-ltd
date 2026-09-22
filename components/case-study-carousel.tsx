"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const caseStudies = [
  {
    src: "/case-studies/payroll-recovery-17200.webp",
    alt: "Shiel Accountants case study: historic payroll issues corrected and €17,200 recovered for the client.",
  },
  {
    src: "/case-studies/deadline-four-days.webp",
    alt: "Shiel Accountants case study: incomplete accounts taken over four days before the deadline and made filing-ready without an extension.",
  },
  {
    src: "/case-studies/overpaid-tax-11750.webp",
    alt: "Shiel Accountants case study: one review uncovered €11,750 of overpaid tax that the client could reclaim.",
  },
  {
    src: "/case-studies/tax-bill-8000-to-zero.webp",
    alt: "Shiel Accountants case study: a business expecting an €8,000 tax bill had a final liability of €0 after the treatment and available reliefs were reviewed.",
  },
];

export function CaseStudyCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-case-slide]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.caseSlide);
        if (Number.isFinite(index)) setActive(index);
      },
      { root: track, threshold: [0.55, 0.7, 0.85] },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-case-slide]"));
    const next = Math.max(0, Math.min(index, slides.length - 1));
    const target = slides[next];
    if (!target) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: target.offsetLeft - track.offsetLeft,
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
            disabled={active === caseStudies.length - 1}
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
              key={study.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`Case study ${index + 1} of ${caseStudies.length}`}
            >
              <Image
                src={study.src}
                alt={study.alt}
                width={360}
                height={450}
                sizes="(max-width: 780px) 82vw, (max-width: 1200px) 42vw, 420px"
                className="case-study-image"
              />
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
