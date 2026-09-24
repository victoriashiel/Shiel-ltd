import type { RegionSlug } from "@/lib/regions";

export type RegionPageContent = {
  slug: RegionSlug;
  eyebrow: string;
  title: string;
  intro: string;
  reviewed: string;
  services: {
    title: string;
    description: string;
    items: string[];
  }[];
  compliance: {
    label: string;
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
};

export const regionContent: Record<RegionSlug, RegionPageContent> = {
  ireland: {
    slug: "ireland",
    eyebrow: "Ireland",
    title: "Accounting for businesses, contractors and founders in Ireland.",
    intro:
      "Irish bookkeeping, payroll, tax and company compliance handled as one connected service, with support for clients whose work or ownership also crosses borders.",
    reviewed: "Reviewed September 2026",
    services: [
      {
        title: "Limited companies",
        description: "Year-end accounts, Corporation Tax and CRO compliance supported by bookkeeping that stays usable throughout the year.",
        items: ["Annual financial statements", "CT1 and preliminary tax", "B1 annual return", "VAT, PAYE and RCT where relevant"],
      },
      {
        title: "Sole traders",
        description: "A practical route from registration through bookkeeping and the annual self-assessment cycle.",
        items: ["Income Tax registration", "Bookkeeping and records", "Form 11", "VAT or PAYE where relevant"],
      },
      {
        title: "Contractors",
        description: "Accounting for personal limited companies and contractors who want payroll, expenses and filings handled together.",
        items: ["Director payroll", "Company accounts and CT1", "Director Form 11", "Expenses and reimbursements"],
      },
      {
        title: "International owners",
        description: "Irish accounting coordinated with overseas ownership, residence or advisers where more than one jurisdiction is involved.",
        items: ["Irish entity compliance", "Cross-border information packs", "Multi-currency records", "Adviser coordination"],
      },
    ],
    compliance: [
      {
        label: "Revenue",
        title: "Corporation Tax",
        description: "Irish companies file Corporation Tax returns through ROS using Form CT1 under the applicable filing and payment timetable.",
      },
      {
        label: "CRO",
        title: "Annual return",
        description: "Irish companies have an Annual Return Date and file Form B1 with the Companies Registration Office within the statutory filing window.",
      },
      {
        label: "Self-assessment",
        title: "Form 11",
        description: "Sole traders and other individuals within self-assessment file their annual Income Tax return through Revenue, generally using ROS.",
      },
      {
        label: "Ongoing taxes",
        title: "VAT, PAYE & RCT",
        description: "Registrations and recurring returns depend on how the business operates, employs people and what work it carries out.",
      },
    ],
    faqs: [
      {
        question: "When is an Irish company's CT1 due?",
        answer:
          "For most companies, the Corporation Tax return and balance of tax are due nine months after the end of the accounting period, with electronic filing and payment generally due by the 23rd day of that month.",
      },
      {
        question: "When is a B1 annual return due?",
        answer:
          "A company has an Annual Return Date (ARD). The annual return must be filed with the CRO within 56 days of the date to which the return is made up.",
      },
      {
        question: "Do sole traders need to register with Revenue?",
        answer:
          "Yes. A person becoming a sole trader must register for tax. Depending on the business, additional registrations can include VAT, Employer PAYE or RCT.",
      },
      {
        question: "Can Shiel help if I live outside Ireland but own an Irish company?",
        answer:
          "Yes. We can handle the Irish accounting and compliance work and coordinate the information needed by overseas advisers where another jurisdiction also has to be considered.",
      },
    ],
  },
  uk: {
    slug: "uk",
    eyebrow: "United Kingdom",
    title: "UK accounting for companies, contractors and internationally mobile owners.",
    intro:
      "UK statutory accounts, Corporation Tax, bookkeeping, payroll and personal tax support, with a clear route for contractors and owners who live or work across borders.",
    reviewed: "Reviewed September 2026",
    services: [
      {
        title: "Limited companies",
        description: "Ongoing bookkeeping and year-end compliance for UK companies, including the core Companies House and HMRC filings.",
        items: ["Statutory annual accounts", "Company Tax Return / CT600", "Confirmation statement", "VAT and PAYE where relevant"],
      },
      {
        title: "Sole traders",
        description: "Bookkeeping and Self Assessment support for freelancers and self-employed clients operating in the UK.",
        items: ["Self Assessment", "Bookkeeping", "VAT where registered", "Tax-payment planning"],
      },
      {
        title: "Contractors",
        description: "Fixed-scope accounting for contractor limited companies, with payroll and personal tax brought into the same workflow.",
        items: ["Director payroll", "Statutory accounts + CT600", "Self Assessment", "VAT and expenses guidance"],
      },
      {
        title: "Overseas owners",
        description: "UK entity compliance coordinated with residence, ownership and reporting questions elsewhere.",
        items: ["UK company compliance", "Non-UK owner information packs", "Multi-currency bookkeeping", "Adviser coordination"],
      },
    ],
    compliance: [
      {
        label: "Companies House",
        title: "Annual accounts",
        description: "Private companies generally file annual accounts with Companies House, with the normal ongoing deadline nine months after the financial year end.",
      },
      {
        label: "HMRC",
        title: "Company Tax Return",
        description: "A Company Tax Return includes the CT600, company accounts and tax computations and is normally filed within 12 months of the accounting period end.",
      },
      {
        label: "Companies House",
        title: "Confirmation statement",
        description: "Every company, including dormant and non-trading companies, must file a confirmation statement at least once every year.",
      },
      {
        label: "Individuals",
        title: "Self Assessment",
        description: "Sole traders, directors and other individuals may need a Self Assessment return depending on their circumstances.",
      },
    ],
    faqs: [
      {
        question: "What are the main UK limited-company deadlines?",
        answer:
          "For an established private company, annual accounts are normally due nine months after the financial year end, Corporation Tax is usually payable nine months and one day after the accounting period end, and the Company Tax Return is generally due within 12 months.",
      },
      {
        question: "Is the confirmation statement the same as the annual accounts?",
        answer:
          "No. The confirmation statement confirms key company information held by Companies House; annual accounts are a separate filing.",
      },
      {
        question: "Can you handle a contractor limited company?",
        answer:
          "Yes. The contractor scope can combine company accounts, CT600, director payroll, VAT where registered and the director's Self Assessment.",
      },
      {
        question: "Can you work with a UK company whose owner lives abroad?",
        answer:
          "Yes. We can handle the UK accounting work and coordinate with local advisers where the owner's residence creates obligations in another country.",
      },
    ],
  },
  uae: {
    slug: "uae",
    eyebrow: "UAE",
    title: "UAE accounting built around Corporate Tax, VAT and usable monthly books.",
    intro:
      "Bookkeeping, Corporate Tax and VAT support for mainland, free-zone and internationally owned businesses, with reporting designed to stay useful throughout the year.",
    reviewed: "Reviewed September 2026",
    services: [
      {
        title: "UAE companies",
        description: "Monthly bookkeeping and year-end tax compliance for operating companies across the Emirates.",
        items: ["Monthly bookkeeping", "Corporate Tax support", "VAT where registered", "Financial statements"],
      },
      {
        title: "Free-zone businesses",
        description: "Accounting records and Corporate Tax workflows that recognise the extra questions free-zone businesses may need to document.",
        items: ["Bookkeeping", "Corporate Tax return", "Qualifying-status information support", "Related-party records where relevant"],
      },
      {
        title: "Freelancers & consultants",
        description: "Lean accounting support for individuals and small businesses that need clean records and tax compliance without a large finance function.",
        items: ["Bookkeeping", "Corporate Tax where applicable", "VAT where applicable", "Expense records"],
      },
      {
        title: "International founders",
        description: "UAE books coordinated with overseas companies, owners and advisers where the wider structure crosses borders.",
        items: ["Multi-currency bookkeeping", "Management reporting", "Cross-border information packs", "Adviser coordination"],
      },
    ],
    compliance: [
      {
        label: "FTA",
        title: "Corporate Tax return",
        description: "Taxable persons generally file the Corporate Tax return and pay Corporate Tax due within nine months from the end of the relevant tax period.",
      },
      {
        label: "FTA",
        title: "VAT returns",
        description: "VAT-registered businesses file VAT returns and make related VAT payments within 28 days from the end of the tax period.",
      },
      {
        label: "Records",
        title: "Accounting records",
        description: "Corporate Tax taxpayers must maintain records supporting their return information; the FTA states relevant records should generally be retained for at least seven years.",
      },
      {
        label: "Reporting",
        title: "Financial statements",
        description: "Reliable accounting records underpin Corporate Tax, VAT and management reporting even where an audit is not required for every business.",
      },
    ],
    faqs: [
      {
        question: "When is a UAE Corporate Tax return due?",
        answer:
          "The FTA requires taxable persons to file the return and pay Corporate Tax due within nine months from the end of the relevant tax period.",
      },
      {
        question: "When are UAE VAT returns due?",
        answer:
          "Once registered for VAT, the return and related payment are generally due within 28 days from the end of the tax period.",
      },
      {
        question: "Do free-zone companies still need accounting records?",
        answer:
          "Yes. Free-zone status does not remove the need for reliable accounting records or the need to assess the company's Corporate Tax position.",
      },
      {
        question: "Can you support a UAE company with owners in Europe or the UK?",
        answer:
          "Yes. We can keep the UAE books and reporting organised and coordinate information with advisers dealing with owner-level or overseas-company obligations.",
      },
    ],
  },
  gibraltar: {
    slug: "gibraltar",
    eyebrow: "Gibraltar",
    title: "Gibraltar accounting for local companies, owners and cross-border businesses.",
    intro:
      "Bookkeeping, company accounts, tax returns and payroll support for Gibraltar businesses, with particular attention to clients whose ownership or activity also reaches Spain, the UK or elsewhere.",
    reviewed: "Reviewed September 2026",
    services: [
      {
        title: "Gibraltar companies",
        description: "Accounting records and year-end compliance for locally registered companies.",
        items: ["Bookkeeping", "Company accounts", "CT1 tax return", "Companies House filings"],
      },
      {
        title: "Payroll",
        description: "Payroll records and employer reporting integrated with the company's books.",
        items: ["Payroll processing", "PAYE records", "Employer annual reporting", "Reconciliations"],
      },
      {
        title: "Self-employed",
        description: "Bookkeeping and tax-return support for self-employed individuals operating from Gibraltar.",
        items: ["Bookkeeping", "Income and expense records", "Tax return support", "Payment planning"],
      },
      {
        title: "Cross-border owners",
        description: "Gibraltar accounts coordinated with advisers where residence, ownership or activity also involves Spain or the UK.",
        items: ["Gibraltar compliance", "Cross-border information packs", "Multi-currency records", "Adviser coordination"],
      },
    ],
    compliance: [
      {
        label: "Income Tax Office",
        title: "Company tax return",
        description: "A Gibraltar company submits a complete company tax return, including CT1 and the required accounts and computations, within the applicable statutory timetable.",
      },
      {
        label: "Deadline",
        title: "Nine-month filing window",
        description: "The Income Tax Office states that a company tax return is due within nine months after the end of the month in which the accounting period ends.",
      },
      {
        label: "Companies House",
        title: "Company filings",
        description: "Gibraltar companies have separate Companies House filing obligations in addition to their tax-return obligations.",
      },
      {
        label: "Employers",
        title: "PAYE reporting",
        description: "Employers have payroll and annual reporting obligations to the Income Tax Office where they employ staff.",
      },
    ],
    faqs: [
      {
        question: "When is a Gibraltar company tax return due?",
        answer:
          "The Gibraltar Income Tax Office states that the complete company tax return is due within nine months after the end of the month in which the accounting period ends.",
      },
      {
        question: "What forms part of a complete company tax return?",
        answer:
          "The Income Tax Office describes the return as including the CT1, the required company accounts and, where there is assessable income, a tax computation. PAYE reconciliation can also be required in relevant cases.",
      },
      {
        question: "Can you handle payroll as well as the company accounts?",
        answer:
          "Yes. Payroll can be kept within the same accounting workflow so the wage records and year-end accounts reconcile properly.",
      },
      {
        question: "Can you coordinate Gibraltar and Spain issues?",
        answer:
          "Yes. We can handle the Gibraltar accounting work and coordinate the information needed by Spanish advisers where the owner or activity creates Spanish considerations.",
      },
    ],
  },
  spain: {
    slug: "spain",
    eyebrow: "Spain",
    title: "Accounting and tax support for autónomos, Spanish companies and international owners.",
    intro:
      "Bookkeeping, recurring tax filings and year-end support for businesses in Spain, with a practical route for English-speaking owners and cross-border situations.",
    reviewed: "Reviewed September 2026",
    services: [
      {
        title: "Autónomos",
        description: "Ongoing records and recurring tax support for self-employed clients operating in Spain.",
        items: ["Bookkeeping", "IVA records and returns", "IRPF payments where applicable", "Annual tax support"],
      },
      {
        title: "Spanish companies",
        description: "Bookkeeping and recurring compliance for Spanish companies, including Corporate Income Tax workflows.",
        items: ["Bookkeeping", "Modelo 200", "VAT / Modelo 303", "Periodic withholding returns where relevant"],
      },
      {
        title: "Payroll & reporting",
        description: "Finance records coordinated with payroll and other recurring business reporting.",
        items: ["Payroll coordination", "Expense records", "Bank reconciliations", "Management reporting"],
      },
      {
        title: "International owners",
        description: "Spanish accounting coordinated with foreign companies or advisers where ownership and residence cross borders.",
        items: ["Spanish entity records", "Cross-border information packs", "Multi-currency bookkeeping", "Adviser coordination"],
      },
    ],
    compliance: [
      {
        label: "IVA",
        title: "Modelo 303",
        description: "Businesses within the Spanish VAT system may file periodic VAT returns using Modelo 303, with the frequency depending on their circumstances.",
      },
      {
        label: "IRPF",
        title: "Self-employed payments",
        description: "Autónomos can have recurring IRPF payment obligations, including Modelo 130 in cases where it applies.",
      },
      {
        label: "Companies",
        title: "Modelo 200",
        description: "Modelo 200 is the general Corporate Income Tax return used for Spanish companies and is filed electronically.",
      },
      {
        label: "Records",
        title: "VAT & IRPF books",
        description: "The Spanish Tax Agency provides standard electronic formats for VAT and IRPF record books used to support recurring filings.",
      },
    ],
    faqs: [
      {
        question: "What is Modelo 303?",
        answer:
          "Modelo 303 is the recurring VAT self-assessment used by businesses within the Spanish VAT system. The filing frequency depends on the taxpayer's position.",
      },
      {
        question: "What is Modelo 200?",
        answer:
          "Modelo 200 is the general Corporate Income Tax return for Spanish companies and is filed electronically with the Agencia Tributaria.",
      },
      {
        question: "Do all autónomos file exactly the same forms?",
        answer:
          "No. The forms depend on the activity, VAT treatment, withholding position and tax regime, so the recurring filing set needs to be confirmed at onboarding.",
      },
      {
        question: "Can you support an English-speaking owner in Spain?",
        answer:
          "Yes. We can organise the Spanish accounting workflow and coordinate with other advisers where the owner's wider tax or company position involves another country.",
      },
    ],
  },
};
