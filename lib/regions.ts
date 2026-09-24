export const regionSlugs = ["ie", "uk", "ae", "gi", "es"] as const;

export type RegionSlug = (typeof regionSlugs)[number];

export type RegionConfig = {
  slug: RegionSlug;
  name: string;
  countryCode: "IE" | "GB" | "AE" | "GI" | "ES";
  locale: "en-IE" | "en-GB" | "en-AE" | "en-GI" | "en-ES";
  defaultCurrency: "EUR" | "GBP" | "AED" | "GIP";
  path: `/${RegionSlug}`;
};

export const regions: Record<RegionSlug, RegionConfig> = {
  ie: {
    slug: "ie",
    name: "Ireland",
    countryCode: "IE",
    locale: "en-IE",
    defaultCurrency: "EUR",
    path: "/ie",
  },
  uk: {
    slug: "uk",
    name: "United Kingdom",
    countryCode: "GB",
    locale: "en-GB",
    defaultCurrency: "GBP",
    path: "/uk",
  },
  ae: {
    slug: "ae",
    name: "UAE",
    countryCode: "AE",
    locale: "en-AE",
    defaultCurrency: "AED",
    path: "/ae",
  },
  gi: {
    slug: "gi",
    name: "Gibraltar",
    countryCode: "GI",
    locale: "en-GI",
    defaultCurrency: "GIP",
    path: "/gi",
  },
  es: {
    slug: "es",
    name: "Spain",
    countryCode: "ES",
    locale: "en-ES",
    defaultCurrency: "EUR",
    path: "/es",
  },
};

export const regionList = regionSlugs.map((slug) => regions[slug]);

export const regionByCountryCode = Object.fromEntries(
  regionList.map((region) => [region.countryCode, region]),
) as Record<RegionConfig["countryCode"], RegionConfig>;

export const legacyRegionPaths = {
  "/ireland": "/ie",
  "/uae": "/ae",
  "/gibraltar": "/gi",
  "/spain": "/es",
} as const;

export function isRegionSlug(value: string): value is RegionSlug {
  return regionSlugs.includes(value as RegionSlug);
}

export function getRegionAlternates() {
  return {
    "en-IE": regions.ie.path,
    "en-GB": regions.uk.path,
    "en-AE": regions.ae.path,
    "en-GI": regions.gi.path,
    "en-ES": regions.es.path,
    "x-default": "/",
  } as const;
}
