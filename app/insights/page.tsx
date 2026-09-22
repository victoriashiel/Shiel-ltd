import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights",
  description: "Practical accounting notes from Shiel on management accounts, VAT, compliance and cross-border finance.",
  alternates: { canonical: "/insights" },
};

const topics = [
  ["Management accounts", "What should you actually look at each month?", "A practical view of cash, margin, debtors and the other figures that become useful before year-end."],
  ["Cross-border", "What to prepare before speaking to advisers in two countries.", "A clean information pack can save repeated questions and help each adviser understand the same underlying facts."],
  ["VAT", "When VAT becomes an operational issue, not just a filing.", "The return is only the end of the process. Sales location, evidence, invoicing and cash timing need to work before that."],
  ["Bookkeeping", "The balance-sheet accounts that are worth reconciling every month.", "Why control accounts and reconciliations make year-end faster and management reporting more trustworthy."],
  ["Payroll", "What changes should feed into payroll before the cut-off?", "A simple process for starters, leavers, pay changes and deductions can remove most last-minute corrections."],
  ["Year-end", "What to have ready before your annual accounts start.", "The records, statements and explanations that keep an accounts job moving rather than sitting in a query list."],
];

export default function InsightsPage() {
  return (
    <>
      <section className="page-hero section-pad compact-hero"><p className="eyebrow">Insights</p><h1>Useful notes, written for the person running the business.</h1><p>Short explanations of the accounting and finance issues that tend to create work, delay or confusion.</p></section>
      <section className="section-pad insight-directory">
        {topics.map(([tag, title, copy], index) => <article className="insight-row reveal" key={title}><span className="directory-number">0{index + 1}</span><div><p>{tag}</p><h2>{title}</h2><p className="insight-copy">{copy}</p><span className="coming-soon">Article in preparation</span></div></article>)}
      </section>
    </>
  );
}
