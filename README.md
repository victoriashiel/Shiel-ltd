# Shiel Accountants website

The public site for www.shiel.ltd: a static Next.js 16 export (React 19, Tailwind CSS 4, Motion) served from Cloudflare Workers static assets.

## Release state

- Production (`main`) runs the redesigned site from 29 October 2026.
- Backup of the previous site: `backup/pre-redesign-2026-10-29`, commit `a4d3de869004d84a87867f357b474006d0840030`.
- The redesign was built and reviewed in `victoriashiel/SGTESTONLY`, which keeps running at quillow.uk as a noindex preview. Make changes here once they are approved there.

## Build and verify

```sh
npm ci
npm run lint
npm run typecheck
npm run build        # production build: indexable, then scripts/check.mjs
npm run build:preview # same build with noindex, for previews
npm run preview      # serve out/ on http://localhost:4173
npx wrangler deploy --dry-run
```

`scripts/check.mjs` fails the build on a broken internal link, a missing or duplicate title or description, a page without exactly one `<h1>`, or any address from the previous site that no longer resolves. Addresses that moved are kept alive with 301s in `public/_redirects`.

## Deploy and rollback

The existing `shiel-ltd` Worker builds this repository. A push to `main` runs `npm run build` and deploys `out/` to the same Worker, so its custom domains stay as they are. There is no server code: enquiries go by WhatsApp or email, and security and cache headers live in `public/_headers`.

To roll back, promote the previous deployment of `shiel-ltd` in the Cloudflare dashboard, or restore `main` from the backup branch.

## Content

All copy lives in `lib/content.ts`, with prices in `lib/data/packages.json` and legal text in `lib/data/legal.json`. Headline words wrapped in `*asterisks*` render in the italic accent face.
