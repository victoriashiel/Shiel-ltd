export const internationalScenarioSlugs = [
  "non-resident-directors",
  "overseas-company-owners",
  "gibraltar-spain",
  "uk-ireland-to-uae",
  "international-contractors",
  "multi-country-vat-oss",
] as const;

export type InternationalScenarioSlug = (typeof internationalScenarioSlugs)[number];

export type InternationalScenario = {
  slug: InternationalScenarioSlug;
  eyebrow: string;
  title: string;
  summary: string;
  whoItIsFor: string;
  handle: string[];
  questions: string[];
  relatedRegions: string[];
};

export const internationalScenarios: Record<InternationalScenarioSlug, InternationalScenario> = {
  "non-resident-directors": {
    slug: "non-resident-directors",
    eyebrow: "Non-resident directors",
    title: "Accounting coordination when a company director lives somewhere else.",
    summary:
      "Keep the company accounts, director payroll, personal reporting and adviser handovers connected when the director and company are not based in the same country.",
    whoItIsFor:
      "Directors who live outside the country where their company is registered, or who are moving while keeping an existing company.",
    handle: [
      "Company bookkeeping and statutory accounts",
      "Director payroll and reimbursement records",
      "Personal-return information packs",
      "Cross-border adviser coordination",
      "Residence and ownership fact gathering",
      "Multi-currency records where needed",
    ],
    questions: [
      "Where is the company incorporated and where does the director actually live?",
      "Is the director taking salary, dividends, reimbursements or pension contributions?",
      "Does another adviser need a year-end or payroll information pack?",
      "Has the director recently moved or changed tax residence?",
    ],
    relatedRegions: ["Ireland", "United Kingdom", "UAE", "Gibraltar", "Spain"],
  },
  "overseas-company-owners": {
    slug: "overseas-company-owners",
    eyebrow: "Overseas owners",
    title: "Local company accounts with an owner based abroad.",
    summary:
      "Handle the local entity properly while keeping the owner-level information organised for whichever country the shareholder or founder lives in.",
    whoItIsFor:
      "Founders and shareholders who own an Irish, UK, UAE, Gibraltar or Spanish company while living in another jurisdiction.",
    handle: [
      "Local statutory accounting",
      "Shareholder and director records",
      "Dividend and remuneration schedules",
      "Year-end information packs for overseas advisers",
      "Multi-currency bookkeeping",
      "Group or related-company coordination",
    ],
    questions: [
      "Where is the company registered?",
      "Where do the owners and directors live?",
      "How are profits being extracted from the company?",
      "Are there related companies or transactions in another country?",
    ],
    relatedRegions: ["Ireland", "United Kingdom", "UAE", "Gibraltar", "Spain"],
  },
  "gibraltar-spain": {
    slug: "gibraltar-spain",
    eyebrow: "Gibraltar + Spain",
    title: "Accounting support when the business is in Gibraltar and life is in Spain.",
    summary:
      "Keep the Gibraltar company records and filings clean while coordinating the information needed where directors, owners, staff or activity also touch Spain.",
    whoItIsFor:
      "Gibraltar company owners, directors and self-employed clients who live in Spain or have meaningful Spanish business activity.",
    handle: [
      "Gibraltar bookkeeping and accounts",
      "CT1 and company filing support",
      "Payroll and reimbursement records",
      "Spanish adviser information packs",
      "Cross-border transaction schedules",
      "Multi-currency records",
    ],
    questions: [
      "Where do the directors and owners live?",
      "Where is the work actually carried out?",
      "Does the business employ or pay anyone in Spain?",
      "Which adviser is handling the Spanish-side filings?",
    ],
    relatedRegions: ["Gibraltar", "Spain"],
  },
  "uk-ireland-to-uae": {
    slug: "uk-ireland-to-uae",
    eyebrow: "Moving to the UAE",
    title: "Keep the old company organised while the owner moves to the UAE.",
    summary:
      "A move to the UAE does not make the existing UK or Irish company disappear. We keep the home-country accounts and reporting moving while coordinating the information needed for the new UAE position.",
    whoItIsFor:
      "Owners moving from Ireland or the UK to the UAE while retaining a company, investment income or continuing business activity at home.",
    handle: [
      "Ongoing UK or Irish company accounts",
      "Director payroll and dividend records",
      "UAE bookkeeping where a new entity is created",
      "Departure-year information packs",
      "Cross-border adviser coordination",
      "Management reporting across entities",
    ],
    questions: [
      "Is the original company remaining active?",
      "Where will management and day-to-day work take place after the move?",
      "Will a UAE company also be established?",
      "What salary, dividends or other income will continue from the original company?",
    ],
    relatedRegions: ["Ireland", "United Kingdom", "UAE"],
  },
  "international-contractors": {
    slug: "international-contractors",
    eyebrow: "International contractors",
    title: "Contractor accounting when the client, company and contractor are in different places.",
    summary:
      "Bring invoicing, payroll, expenses, VAT and company compliance into one workflow when a contractor works internationally or invoices overseas clients.",
    whoItIsFor:
      "Consultants, technology contractors, remote professionals and project-based workers operating through a company or self-employed structure.",
    handle: [
      "Bookkeeping and invoicing records",
      "Director or owner payroll",
      "Expense and reimbursement records",
      "VAT treatment information gathering",
      "Company and personal filing coordination",
      "Overseas-client reconciliation",
    ],
    questions: [
      "Where is the contractor actually working from?",
      "Where is the company established?",
      "Where are the main clients located?",
      "Is the work billed business-to-business or through a platform or agency?",
    ],
    relatedRegions: ["Ireland", "United Kingdom", "UAE", "Gibraltar", "Spain"],
  },
  "multi-country-vat-oss": {
    slug: "multi-country-vat-oss",
    eyebrow: "VAT across borders",
    title: "Keep multi-country VAT and sales records reconciled to the books.",
    summary:
      "For businesses selling, buying or operating across several jurisdictions, the accounting records need to support the VAT filings rather than being reconstructed after the fact.",
    whoItIsFor:
      "E-commerce businesses, service companies and internationally trading businesses dealing with more than one VAT jurisdiction.",
    handle: [
      "Platform and payment-processor reconciliation",
      "VAT control accounts",
      "OSS and IOSS bookkeeping support",
      "Country-by-country sales schedules",
      "Information packs for local VAT advisers",
      "Period-end reconciliation to filed returns",
    ],
    questions: [
      "Where are customers located?",
      "Which VAT registrations already exist?",
      "Are sales made through marketplaces or directly?",
      "Which adviser or filing agent handles each local registration?",
    ],
    relatedRegions: ["Ireland", "United Kingdom", "Spain", "Gibraltar", "UAE"],
  },
};

export const internationalScenarioList = internationalScenarioSlugs.map(
  (slug) => internationalScenarios[slug],
);

export function isInternationalScenarioSlug(value: string): value is InternationalScenarioSlug {
  return internationalScenarioSlugs.includes(value as InternationalScenarioSlug);
}
