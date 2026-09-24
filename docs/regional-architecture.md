# Shiel regional architecture

## Goal

Keep `shiel.ltd` as the global/default site while providing indexable, self-contained regional pages for:

- Ireland — `/ireland`
- United Kingdom — `/uk`
- UAE — `/uae`
- Gibraltar — `/gibraltar`
- Spain — `/spain`

The regional pages must be discoverable without geolocation, use self-referencing canonicals, and expose reciprocal `hreflang` annotations. The global page remains the `x-default`.

## SEO rules

1. Never automatically redirect users to a regional URL based on IP.
2. Regional pages use distinct URLs and locally relevant content.
3. Each regional page uses a self-referencing canonical.
4. Equivalent regional pages link to each other with `hreflang`.
5. `x-default` points to the global version.
6. Geolocation is used only to suggest a region, never to hide or replace crawlable content.
7. All regional URLs are included in the sitemap.

Initial English locale mapping:

- Ireland: `en-IE`
- UK: `en-GB`
- UAE: `en-AE`
- Gibraltar: `en-GI`
- Spain: `en-ES`

If a Spanish-language Spain page is added later, it should receive a separate `es-ES` URL rather than changing the English page in place.

## Cloudflare strategy

This repository is a full-stack Next.js application: it contains route handlers and does not use `output: "export"`. Do not add a Cloudflare Pages `functions/_middleware.js` layer unless the deployment is explicitly converted to a static Pages architecture.

For regional suggestions:

1. Enable Cloudflare IP geolocation / visitor-location headers.
2. Read `CF-IPCountry` in a small server route.
3. Return only a country/region code and mark the response private/no-store.
4. A client-side region prompt uses that response to suggest the relevant regional URL.
5. Store the visitor's explicit region choice locally so the prompt does not repeat.
6. Never vary the main HTML response or cache key by country.

This keeps the global and regional HTML deterministic for search engines and avoids country-specific HTML leaking through shared caches.

## Deployment architecture

Cloudflare's current recommended deployment path for full-stack Next.js is Workers. For new migrations, Cloudflare currently recommends vinext; existing OpenNext deployments can remain on OpenNext until compatibility is verified.

The repository currently contains no `wrangler.jsonc`, `wrangler.toml`, vinext config, OpenNext config, or Pages Functions directory. The exact Cloudflare dashboard deployment adapter therefore cannot be established from repository source alone.

Do not migrate the production deployment merely to implement regionalisation. First establish the current Cloudflare project type and build command. Regional URL architecture and SEO can be implemented independently.

## Data model

`lib/regions.ts` is the single source of truth for:

- regional slug
- display name
- ISO country code
- locale/hreflang value
- default local currency
- canonical regional path

Regional page content will live in a separate typed content model so headers, sitemap entries, contact forms, and metadata do not duplicate strings.

## Planned passes

### Pass 1 — architecture
- typed region registry
- deployment audit
- SEO/geolocation decision

### Pass 2 — regional page system
- dynamic region route/template
- region-specific metadata
- hreflang and canonical helpers
- sitemap support
- regional structured data

### Pass 3 — Ireland reference implementation
- locally relevant service copy
- Irish packages
- Revenue/CRO terminology
- FAQs and conversion path

### Pass 4 — region selection
- region selector
- Cloudflare country suggestion endpoint
- non-forced suggestion banner
- remembered visitor choice
- contact-form region preselection

### Pass 5 — UK, UAE, Gibraltar, Spain
- researched local obligations and terminology
- region-specific packages/services where appropriate
- regional FAQs and CTAs

### Pass 6 — cross-border landing pages
- non-resident directors
- overseas owners
- Gibraltar/Spain
- UK/Ireland to UAE
- international contractors
- multi-country VAT/OSS

### Pass 7 — validation
- CI checks for region URLs and hreflang reciprocity
- structured-data validation
- sitemap review
- Search Console submission
- live desktop/mobile QA
