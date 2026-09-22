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
    slug: "company-accounts",
    title: "Company accounts",
    eyebrow: "Year-end accounts",
    summary: "Accounts prepared properly, explained clearly and delivered without a last-minute scramble.",
    description: "We prepare annual accounts with a practical eye on the wider business. That means clean records, sensible year-end adjustments and a clear view of what the numbers are telling you before anything is filed.",
    outcomes: ["Clear year-end position", "Filing-ready accounts", "Useful review of key movements"],
    included: ["Year-end accounts preparation", "Balance sheet and profit-and-loss review", "Reconciliations and adjustments", "Director/shareholder queries", "Filing support where applicable"],
  },
  {
    slug: "tax-compliance",
    title: "Tax & compliance",
    eyebrow: "Tax returns and deadlines",
    summary: "Structured tax and compliance support built around where you operate and what you actually do.",
    description: "Tax work is most useful when it is connected to the accounts, cash flow and decisions being made throughout the year. We keep obligations organised and explain what is due, when and why.",
    outcomes: ["Fewer surprises", "Clear deadlines", "Practical planning around liabilities"],
    included: ["Business tax return preparation", "Tax provision reviews", "Compliance calendars", "Payment planning", "Liaison support with relevant authorities"],
  },
  {
    slug: "vat",
    title: "VAT",
    eyebrow: "Registration and returns",
    summary: "VAT support for businesses that need the treatment, records and returns to line up.",
    description: "We help businesses understand their VAT position, prepare returns from reliable records and deal with the practical issues that appear when sales, suppliers or customers cross borders.",
    outcomes: ["Accurate returns", "Cleaner VAT records", "Better visibility on cash impact"],
    included: ["Registration support", "Periodic VAT returns", "VAT control account reconciliations", "Transaction treatment reviews", "Cross-border VAT coordination"],
  },
  {
    slug: "payroll",
    title: "Payroll",
    eyebrow: "Payroll operations",
    summary: "Reliable payroll processing with the filings, records and employee outputs kept together.",
    description: "We run payroll as an operational process rather than an isolated calculation. Employee changes, statutory deductions and reporting are kept organised so each pay period is easier to manage.",
    outcomes: ["Predictable payroll cycles", "Organised employee records", "Clear payroll liabilities"],
    included: ["Regular payroll processing", "Starter and leaver updates", "Statutory deductions", "Payroll reports", "Year-end payroll support"],
  },
  {
    slug: "bookkeeping-management-accounts",
    title: "Bookkeeping & management accounts",
    eyebrow: "Ongoing finance function",
    summary: "Better records during the year, with management information you can actually use.",
    description: "Good bookkeeping should make year-end easier and current decisions better. We keep the underlying records in shape, reconcile the key balances and can turn them into regular management reporting.",
    outcomes: ["Cleaner ledgers", "Current numbers", "More useful monthly or quarterly reporting"],
    included: ["Transaction bookkeeping", "Bank and balance-sheet reconciliations", "Receivables and payables review", "Management accounts", "Cash-flow and margin reporting"],
  },
  {
    slug: "international-accounting",
    title: "International accounting",
    eyebrow: "Cross-border support",
    summary: "Accounting coordination for clients whose work, companies, income or obligations do not stop at one border.",
    description: "Cross-border clients often need someone to see the whole picture while local specialists handle jurisdiction-specific points. We help organise the accounting, reporting and information flow so the pieces connect.",
    outcomes: ["One clearer financial picture", "Better coordination across advisers", "Less duplication between jurisdictions"],
    included: ["Cross-border accounting coordination", "Multi-currency bookkeeping support", "Information packs for local advisers", "Residency and entity fact gathering", "International reporting workflows"],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));
