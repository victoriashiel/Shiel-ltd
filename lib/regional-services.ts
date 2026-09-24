import type { RegionSlug } from "@/lib/regions";

export const regionalServiceSlugs = [
  "tax-compliance",
  "bookkeeping-payroll",
  "advisory-growth",
  "international-accounting",
] as const;

export type RegionalServiceSlug = (typeof regionalServiceSlugs)[number];

export type RegionalServiceContent = {
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  outcomes: string[];
  included: string[];
  localContext: string[];
};

export const regionalServices: Record<
  RegionSlug,
  Record<RegionalServiceSlug, RegionalServiceContent>
> = {
  ie: {
    "tax-compliance": {
      title: "Tax & compliance in Ireland",
      eyebrow: "Revenue + CRO",
      summary: "Irish accounts and filings kept connected to the books throughout the year.",
      description: "We handle the recurring company and personal compliance work around Revenue and the CRO, including the preparation behind each filing so deadlines do not become year-end reconstruction exercises.",
      outcomes: ["Clear Irish filing calendar", "Records ready for Revenue and CRO work", "Fewer last-minute corrections"],
      included: ["Annual financial statements", "CT1 and Corporation Tax support", "B1 annual return", "Form 11", "VAT3 / RTD where registered", "RCT and PAYE where relevant"],
      localContext: ["Revenue Online Service (ROS)", "Companies Registration Office (CRO)", "RBO maintenance", "Irish self-assessment"],
    },
    "bookkeeping-payroll": {
      title: "Bookkeeping & payroll in Ireland",
      eyebrow: "Ongoing Irish finance operations",
      summary: "Monthly books and payroll that stay usable between filing deadlines.",
      description: "We reconcile the day-to-day records, payroll and balance-sheet accounts so the numbers used for VAT, payroll, management reporting and year-end accounts remain aligned.",
      outcomes: ["Cleaner monthly records", "Reliable payroll cycles", "Better visibility before year end"],
      included: ["Transaction bookkeeping", "Bank and balance-sheet reconciliations", "Irish payroll processing", "Starter / leaver / pay-change updates", "ERR support where applicable", "Management reporting"],
      localContext: ["PAYE Modernisation", "Enhanced Reporting Requirements where applicable", "VAT control accounts", "Irish bank and payment feeds"],
    },
    "advisory-growth": {
      title: "Advisory & growth in Ireland",
      eyebrow: "Irish business decisions",
      summary: "Use reliable Irish accounts to make better decisions about cash, margins and growth.",
      description: "Once the underlying books are current, we turn them into management information for pricing, cash-flow planning, hiring and investment decisions.",
      outcomes: ["More useful management information", "Clearer cash-flow planning", "Better-informed growth decisions"],
      included: ["Management accounts", "Cash-flow forecasting", "Budget and variance review", "Margin analysis", "Director remuneration modelling inputs", "Finance support for growth plans"],
      localContext: ["EUR reporting", "Irish payroll and tax cash-flow timing", "Revenue liabilities in forecasts", "Company-owner planning inputs"],
    },
    "international-accounting": {
      title: "International accounting from Ireland",
      eyebrow: "Ireland + overseas",
      summary: "Coordinate Irish accounting when the owner, client, company or income also touches another country.",
      description: "We keep the Irish entity and accounting records organised while preparing the information needed by overseas advisers and other entities in the wider structure.",
      outcomes: ["One clearer financial picture", "Less duplicated adviser work", "Better cross-border handovers"],
      included: ["Irish entity compliance", "Multi-currency bookkeeping", "Director and shareholder schedules", "Information packs for overseas advisers", "Cross-border transaction records", "International reporting coordination"],
      localContext: ["Irish company owners living abroad", "Non-resident directors", "UK / UAE / Spain connections", "Multi-country VAT and OSS"],
    },
  },
  uk: {
    "tax-compliance": {
      title: "Tax & compliance in the UK",
      eyebrow: "HMRC + Companies House",
      summary: "UK statutory accounts, Corporation Tax and recurring filings kept under control.",
      description: "We connect the bookkeeping to the filings that matter for UK companies and self-employed clients so accounts, CT600, VAT, payroll and Self Assessment are prepared from consistent records.",
      outcomes: ["Clear Companies House and HMRC deadlines", "Filing-ready UK records", "Less year-end reconstruction"],
      included: ["Statutory annual accounts", "Company Tax Return / CT600", "Confirmation statement support", "Self Assessment", "VAT returns where registered", "PAYE support"],
      localContext: ["Companies House", "HM Revenue & Customs", "Self Assessment", "UK VAT and PAYE"],
    },
    "bookkeeping-payroll": {
      title: "Bookkeeping & payroll in the UK",
      eyebrow: "UK finance operations",
      summary: "Current bookkeeping and payroll for companies, contractors and owner-managed businesses.",
      description: "We keep bank feeds, transactions, payroll and reconciliations moving throughout the year so statutory accounts and tax filings are built from current records.",
      outcomes: ["Current digital books", "Predictable payroll cycles", "Cleaner statutory-account preparation"],
      included: ["Monthly bookkeeping", "Bank reconciliations", "Director and employee payroll", "RTI-ready payroll records", "VAT bookkeeping", "Management reporting"],
      localContext: ["PAYE / RTI", "UK VAT control accounts", "Companies House-ready records", "GBP and multi-currency books"],
    },
    "advisory-growth": {
      title: "Advisory & growth in the UK",
      eyebrow: "UK management reporting",
      summary: "Use current UK books to understand cash, performance and the financial effect of growth decisions.",
      description: "We provide management reporting and forward-looking finance support for owners who need more than annual statutory accounts.",
      outcomes: ["Clearer performance visibility", "Stronger cash-flow planning", "More informed hiring and investment decisions"],
      included: ["Management accounts", "Cash-flow forecasts", "Budget review", "Margin analysis", "Scenario planning", "Finance support for growth"],
      localContext: ["GBP reporting", "Corporation Tax cash-flow timing", "Payroll-cost visibility", "Owner-managed company reporting"],
    },
    "international-accounting": {
      title: "International accounting from the UK",
      eyebrow: "UK + overseas",
      summary: "Keep UK company compliance connected when owners, directors or operations sit abroad.",
      description: "We handle the UK accounting layer and coordinate information for overseas advisers where ownership, residence or business activity crosses borders.",
      outcomes: ["Cleaner UK / overseas handovers", "More consistent entity records", "Less duplicated work"],
      included: ["UK company compliance", "Multi-currency bookkeeping", "Non-resident owner information packs", "Director remuneration records", "Cross-border transaction schedules", "Adviser coordination"],
      localContext: ["UK owners moving abroad", "Non-resident directors", "UK / UAE structures", "International contractors"],
    },
  },
  ae: {
    "tax-compliance": {
      title: "Tax & compliance in the UAE",
      eyebrow: "FTA + Corporate Tax",
      summary: "UAE Corporate Tax, VAT and accounting records managed as one connected workflow.",
      description: "We keep the bookkeeping and supporting records organised for Corporate Tax and VAT, with attention to the extra documentation questions that can arise for free-zone and internationally owned businesses.",
      outcomes: ["Clear FTA filing calendar", "Tax-ready accounting records", "Better support for year-end reporting"],
      included: ["Corporate Tax return support", "VAT returns where registered", "Monthly bookkeeping", "Financial statements", "Tax control reconciliations", "Supporting schedules"],
      localContext: ["Federal Tax Authority", "UAE Corporate Tax", "VAT", "Free-zone documentation where relevant"],
    },
    "bookkeeping-payroll": {
      title: "Bookkeeping & payroll in the UAE",
      eyebrow: "UAE finance operations",
      summary: "Monthly bookkeeping, reconciliations and payroll support for UAE businesses.",
      description: "We keep the finance records current across bank accounts, payment platforms and currencies so Corporate Tax, VAT and management reporting are built from reliable books.",
      outcomes: ["Current monthly books", "Cleaner VAT and tax reconciliations", "Better management visibility"],
      included: ["Monthly bookkeeping", "Bank reconciliations", "Multi-currency records", "Payroll support", "VAT control accounts", "Management reporting"],
      localContext: ["AED reporting", "Free-zone and mainland entities", "Multi-currency banking", "FTA-ready records"],
    },
    "advisory-growth": {
      title: "Advisory & growth in the UAE",
      eyebrow: "UAE management reporting",
      summary: "Management information for founders who need more than compliance bookkeeping.",
      description: "We turn the monthly books into cash-flow, margin and performance information for UAE businesses that are hiring, expanding or operating across several entities.",
      outcomes: ["Clearer cash position", "Better monthly reporting", "More useful growth planning"],
      included: ["Management accounts", "Cash-flow forecasting", "Budget review", "Margin analysis", "Multi-entity reporting support", "Finance support for growth"],
      localContext: ["AED and multi-currency reporting", "Corporate Tax cash-flow planning", "Free-zone / mainland reporting", "International founder structures"],
    },
    "international-accounting": {
      title: "International accounting from the UAE",
      eyebrow: "UAE + overseas",
      summary: "Coordinate UAE accounting with companies, owners and advisers in other countries.",
      description: "We keep the UAE books and tax workflow organised while coordinating information with UK, Irish, Spanish, Gibraltar or other advisers where the wider structure crosses borders.",
      outcomes: ["Cleaner multi-country reporting", "Better adviser coordination", "Consistent records across entities"],
      included: ["UAE entity accounting", "Multi-currency bookkeeping", "Overseas adviser packs", "Cross-border transaction schedules", "Owner remuneration records", "Group reporting support"],
      localContext: ["UK / Ireland to UAE moves", "International founders", "Overseas-owned UAE companies", "Multi-entity structures"],
    },
  },
  gi: {
    "tax-compliance": {
      title: "Tax & compliance in Gibraltar",
      eyebrow: "Income Tax Office + Companies House",
      summary: "Gibraltar company accounts, CT1 and recurring compliance kept connected to the books.",
      description: "We handle the accounting records and year-end preparation behind Gibraltar company tax and Companies House obligations, with payroll support where the business employs staff.",
      outcomes: ["Clear Gibraltar filing calendar", "Year-end records ready earlier", "Better alignment between payroll and accounts"],
      included: ["Company accounts", "CT1 support", "Companies House filing support", "PAYE records", "Bookkeeping", "Year-end reconciliations"],
      localContext: ["Gibraltar Income Tax Office", "Companies House Gibraltar", "PAYE", "GIP and multi-currency records"],
    },
    "bookkeeping-payroll": {
      title: "Bookkeeping & payroll in Gibraltar",
      eyebrow: "Gibraltar finance operations",
      summary: "Bookkeeping and payroll records kept current throughout the year.",
      description: "We reconcile transactions, payroll and balance-sheet accounts so company accounts, tax filings and management reporting are based on reliable monthly records.",
      outcomes: ["Cleaner monthly books", "Better payroll reconciliation", "Less year-end catch-up"],
      included: ["Monthly bookkeeping", "Bank reconciliations", "Payroll processing", "PAYE records", "Management reporting", "Multi-currency bookkeeping"],
      localContext: ["GIP and GBP activity", "Payroll reconciliations", "Companies House-ready records", "Cross-border bank activity"],
    },
    "advisory-growth": {
      title: "Advisory & growth in Gibraltar",
      eyebrow: "Management reporting",
      summary: "Use current books to understand performance, cash and the effect of growth decisions.",
      description: "We provide management accounts and planning support for Gibraltar businesses that need more useful information than the statutory year end alone.",
      outcomes: ["Clearer performance reporting", "Better cash planning", "More informed business decisions"],
      included: ["Management accounts", "Cash-flow forecasts", "Budget review", "Margin analysis", "Multi-currency reporting", "Finance support for growth"],
      localContext: ["GIP / GBP reporting", "Payroll-cost visibility", "Cross-border cash flows", "International ownership"],
    },
    "international-accounting": {
      title: "International accounting from Gibraltar",
      eyebrow: "Gibraltar + overseas",
      summary: "Coordinate Gibraltar accounts when owners, directors or activity also connect to Spain, the UK or elsewhere.",
      description: "We keep the Gibraltar accounting layer organised while coordinating the information needed by advisers in Spain, the UK and other jurisdictions.",
      outcomes: ["Cleaner cross-border handovers", "More consistent accounting records", "Less duplicated work"],
      included: ["Gibraltar entity compliance", "Multi-currency bookkeeping", "Spanish adviser packs", "Director and owner schedules", "Cross-border transaction records", "Adviser coordination"],
      localContext: ["Gibraltar / Spain", "UK-connected owners", "Non-resident directors", "International groups"],
    },
  },
  es: {
    "tax-compliance": {
      title: "Tax & compliance in Spain",
      eyebrow: "AEAT + recurring filings",
      summary: "Spanish bookkeeping and recurring tax filings organised around the actual business activity.",
      description: "We keep the records needed for IVA, IRPF-related filings and company tax support current so recurring returns are based on reconciled books.",
      outcomes: ["Clear Spanish filing workflow", "Better supporting records", "Less quarter-end catch-up"],
      included: ["Modelo 303 where applicable", "Modelo 200 support", "IRPF payment filings where applicable", "Withholding returns where relevant", "Bookkeeping", "Year-end tax support"],
      localContext: ["Agencia Tributaria (AEAT)", "IVA", "IRPF", "Impuesto sobre Sociedades"],
    },
    "bookkeeping-payroll": {
      title: "Bookkeeping & payroll in Spain",
      eyebrow: "Spanish finance operations",
      summary: "Monthly records that support IVA, payroll coordination and year-end tax work.",
      description: "We keep invoices, bank activity and tax control accounts reconciled throughout the year, with payroll information coordinated where the business employs staff.",
      outcomes: ["Cleaner monthly records", "Better IVA reconciliations", "More usable management information"],
      included: ["Monthly bookkeeping", "Bank reconciliations", "IVA records", "Payroll coordination", "Withholding control accounts", "Management reporting"],
      localContext: ["EUR reporting", "Modelo 303 support", "Spanish invoice records", "Payroll and withholding coordination"],
    },
    "advisory-growth": {
      title: "Advisory & growth in Spain",
      eyebrow: "Spanish management reporting",
      summary: "Turn Spanish bookkeeping into useful information for pricing, cash and growth.",
      description: "We produce management reporting for autónomos and Spanish companies that need a clearer view of margins, cash flow and operating performance.",
      outcomes: ["Clearer profitability", "Better cash-flow planning", "More informed growth decisions"],
      included: ["Management accounts", "Cash-flow forecasting", "Budget review", "Margin analysis", "Cost analysis", "Finance support for growth"],
      localContext: ["EUR reporting", "IVA cash-flow effects", "Payroll-cost visibility", "International owner reporting"],
    },
    "international-accounting": {
      title: "International accounting from Spain",
      eyebrow: "Spain + overseas",
      summary: "Coordinate Spanish accounting when owners, companies or income also connect to another country.",
      description: "We keep the Spanish accounting and recurring reporting organised while preparing the information needed by advisers handling overseas companies, owners or income.",
      outcomes: ["Cleaner adviser handovers", "More consistent multi-country records", "Less duplicated work"],
      included: ["Spanish bookkeeping", "Multi-currency records", "Overseas adviser packs", "Cross-border transaction schedules", "Owner and director information", "Group reporting support"],
      localContext: ["Spain / Gibraltar", "UK or Irish company owners in Spain", "International contractors", "Multi-country VAT / OSS"],
    },
  },
};

export function isRegionalServiceSlug(value: string): value is RegionalServiceSlug {
  return regionalServiceSlugs.includes(value as RegionalServiceSlug);
}
