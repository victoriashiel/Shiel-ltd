export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  outcomes: string[];
  included: string[];
};

export const services: Service[] = [
  {
    slug: "tax-compliance",
    title: "Tax & compliance",
    eyebrow: "Tax, accounts & filings",
    summary: "Keep the statutory side of the business organised, current and properly connected to the underlying numbers.",
    description: "We support businesses and individuals with the recurring accounting and tax work that keeps obligations under control. That includes company accounts, tax returns, VAT and the practical preparation behind each filing.",
    outcomes: ["Clear upcoming obligations", "Reliable filing-ready records", "Fewer last-minute surprises"],
    included: ["Company accounts", "Business and personal tax compliance", "VAT returns and reconciliations", "Compliance calendars", "Year-end adjustments and review"],
  },
  {
    slug: "bookkeeping-payroll",
    title: "Bookkeeping & payroll",
    eyebrow: "Ongoing finance operations",
    summary: "Accurate day-to-day records and dependable payroll, without waiting until year-end to discover what needs fixing.",
    description: "We keep the recurring finance work moving so the books remain usable throughout the year. Transactions, reconciliations, payroll and regular reporting are handled as one connected process rather than isolated admin tasks.",
    outcomes: ["Cleaner books throughout the year", "Predictable payroll cycles", "More useful current reporting"],
    included: ["Transaction bookkeeping", "Bank and balance-sheet reconciliations", "Payroll processing", "Starter, leaver and pay-change updates", "Management reporting support"],
  },
  {
    slug: "advisory-growth",
    title: "Advisory & growth",
    eyebrow: "Numbers for decisions",
    summary: "Turn the accounting into useful information for pricing, cash flow, planning and the next stage of the business.",
    description: "Once the underlying records are reliable, the numbers can do more than satisfy a deadline. We help owners understand performance, cash movement and the financial effect of the decisions they are considering.",
    outcomes: ["Better visibility on performance", "Clearer cash-flow planning", "More informed business decisions"],
    included: ["Management accounts", "Cash-flow reporting and forecasting", "Budget and variance review", "Margin and cost analysis", "Finance support for growth decisions"],
  },
  {
    slug: "international-accounting",
    title: "International accounting",
    eyebrow: "Cross-border support",
    summary: "Accounting coordination for clients whose work, companies, income or obligations do not stop at one border.",
    description: "Shiel Accountants is European based and works internationally. We help keep the accounting and reporting picture coherent when several countries are involved, while working alongside jurisdiction-specific specialists where their input is required.",
    outcomes: ["One clearer financial picture", "Better coordination across advisers", "Less duplicated work between jurisdictions"],
    included: ["Cross-border accounting coordination", "Multi-currency bookkeeping support", "Information packs for local advisers", "International reporting workflows", "Entity and residency fact gathering for adviser handover"],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));
