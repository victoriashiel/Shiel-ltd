# Shiel regional architecture

## Goal

Run one global Shiel site and five complete regional site experiences from the same Next.js codebase.

A visitor who enters a regional site should stay inside that regional namespace while navigating equivalent pages.

Regional namespaces:

- Ireland — `/ie`
- United Kingdom — `/uk`
- UAE — `/ae`
- Gibraltar — `/gi`
- Spain — `/es`

Global remains the neutral/default experience at `/`.

## Route model

Global:

- `/`
- `/tax-compliance`
- `/bookkeeping-payroll`
- `/advisory-growth`
- `/international-accounting`
- `/packages`
- `/contact`

Each region mirrors the same primary journey:

- `/{region}`
- `/{region}/tax-compliance`
- `/{region}/bookkeeping-payroll`
- `/{region}/advisory-growth`
- `/{region}/international-accounting`
- `/{region}/packages`
- `/{region}/contact`

The visible experience is therefore a complete regional website. The implementation is not five duplicated codebases: shared components render region-specific content and configuration.

## Navigation rules

1. Logo returns to the active regional homepage.
2. Primary navigation stays within the active regional namespace.
3. Packages and Contact remain regional.
4. Region switching preserves the equivalent page whenever that page exists.
5. If no equivalent mirrored route exists, switching region falls back to the target regional homepage.
6. Global legal pages remain global unless a jurisdiction-specific legal page is required later.

Examples:

- `/uk/bookkeeping-payroll` → switch to Ireland → `/ie/bookkeeping-payroll`
- `/ae/packages` → switch to Spain → `/es/packages`
- `/gi/contact` → switch to Global → `/contact`

## URL migration

The earlier long-form regional roots are permanent redirects:

- `/ireland/:path*` → `/ie/:path*`
- `/uae/:path*` → `/ae/:path*`
- `/gibraltar/:path*` → `/gi/:path*`
- `/spain/:path*` → `/es/:path*`

UK remains `/uk`.

## SEO rules

1. Never force an automatic IP redirect.
2. Every regional page has its own crawlable URL.
3. Each regional page uses a self-referencing canonical.
4. Equivalent pages expose reciprocal `hreflang`.
5. The global equivalent is `x-default`.
6. The sitemap contains global and mirrored regional pages.
7. Regional content uses local terminology, filing scope and currency rather than translated labels over identical content.
8. Geolocation is used only to suggest a region.

Examples for Tax & compliance:

- `/tax-compliance` — x-default
- `/ie/tax-compliance` — en-IE
- `/uk/tax-compliance` — en-GB
- `/ae/tax-compliance` — en-AE
- `/gi/tax-compliance` — en-GI
- `/es/tax-compliance` — en-ES

If a Spanish-language version is added later, it should receive a separate `es-ES` content route rather than changing the English Spain page in place.

## Cloudflare strategy

This is a full-stack Next.js application, not a static export.

Do not add a Pages `functions/_middleware.js` layer unless the production deployment is explicitly converted to a static Pages architecture.

Regional suggestion flow:

1. Cloudflare supplies `CF-IPCountry`.
2. `/api/region` maps the country to a supported region.
3. The response is private/no-store.
4. A client-side prompt offers the equivalent regional page.
5. Explicit user choice is stored locally.
6. The primary HTML response does not vary by country.

This avoids cache contamination and preserves crawlable deterministic URLs.

## Data model

Single sources of truth:

- `lib/regions.ts` — region paths, locales, country codes and currencies
- `lib/regional-routing.ts` — page-preserving switching rules
- `lib/region-content.ts` — local compliance and FAQ content
- `lib/regional-services.ts` — mirrored service-page content
- `lib/regional-packages.ts` — local packages and currency
- `docs/regional-pricing-benchmarks.md` — pricing rationale and review triggers

## Delivery passes

### Pass A — regional namespace
- short regional paths
- permanent redirects from temporary long paths
- route-preservation helpers
- reciprocal metadata foundation

### Pass B — regional shell
- region-aware logo
- region-aware header/footer
- mirrored service routes
- mirrored contact routes
- page-preserving region switching

### Pass C — regional homepages
- full homepage experience per market
- local service messaging
- local FAQs
- local package routes
- shared visual system

### Pass D — content localisation
- research each jurisdiction
- local service scope
- local filings and terminology
- local package economics
- local case studies as evidence becomes available

### Pass E — international scenarios
- non-resident directors
- overseas owners
- Gibraltar / Spain
- UK or Ireland to UAE
- international contractors
- multi-country VAT / OSS

### Pass F — validation
- route tests
- hreflang reciprocity tests
- sitemap review
- structured-data validation
- Cloudflare geolocation QA
- Search Console submission
- desktop/mobile visual QA
