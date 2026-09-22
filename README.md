# Shiel Ltd website

Modern accountancy website for Shiel Accountants, built with Next.js 16.3, React 19.3 and Tailwind CSS 4.3.

## Environment

Copy .env.example to .env.local and update values where needed.

NEXT_PUBLIC_SITE_URL is the canonical production URL.
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION and NEXT_PUBLIC_BING_SITE_VERIFICATION are optional webmaster verification tokens.

Contact-form delivery is intentionally server-only. Configure CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_EMAIL_API_TOKEN in the deployment environment. Never expose these values through NEXT_PUBLIC_ variables.

## SEO

The application includes route-specific metadata, canonical URLs, sitemap.xml, robots.txt, Open Graph metadata and image generation, AccountingService/Service/BreadcrumbList JSON-LD, semantic HTML, internal links, a web manifest and app icon.

## Performance and accessibility

Pages are server-rendered by default. There is no runtime animation library. Motion uses CSS with reduced-motion support. Navigation and forms include keyboard focus states, and the layout includes skip navigation and mobile behaviour.

## Content guardrail

The current copy only uses facts supplied for Shiel: European based, global service coverage and 10+ years of experience across different regions. Do not add regulated-profession memberships, office addresses, client counts or performance claims unless verified.

## Contact form

The browser submits enquiries to /api/contact. The route validates and limits form fields, uses a honeypot for basic bot filtering, and sends the enquiry server-side through Cloudflare Email Service.

The recipient address is never rendered into HTML, structured data or client-side JavaScript. It is supplied at runtime through CONTACT_TO_EMAIL.

Cloudflare Email Service requirements:
- onboard shiel.ltd under Email Service > Email Sending
- create an API token with Email Sending: Edit permission
- set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_EMAIL_API_TOKEN as server-side deployment secrets
- set CONTACT_TO_EMAIL to the private recipient mailbox
- set CONTACT_FROM_EMAIL to a sender on the onboarded shiel.ltd domain

The API sets Reply-To to the visitor's supplied email address so replies can be sent directly from the received enquiry.


## Design system

The visual system uses a warm near-white base, deep ink, mineral teal, jade/sage and a restrained clay accent. The palette is informed by 2026 colour direction while keeping the interface appropriate for professional financial services. Colour is concentrated in hierarchy, data visuals and interaction states rather than applied decoratively everywhere.

The interface uses native CSS view transitions and scroll-driven animation where supported, with reduced-motion, reduced-transparency and increased-contrast fallbacks. No client-side animation library is required.

## Build quality

GitHub Actions runs linting, TypeScript checks and a production Next.js build on every push and pull request. Actions are pinned to immutable release SHAs. The project targets the current Next.js 16.3 Active LTS line on Node.js 24.


## Core site structure

The customer journey is intentionally focused around five commercial pages:

- Home
- Tax & Compliance
- Bookkeeping & Payroll
- Advisory & Growth
- International Accounting

Privacy, Cookies and Terms remain available as utility pages in the footer. Legacy marketing and service URLs redirect into the focused structure so existing links do not dead-end.

The contact form is the primary enquiry route. WhatsApp remains available as a secondary contact method and can be changed through NEXT_PUBLIC_WHATSAPP_DISPLAY and NEXT_PUBLIC_WHATSAPP_URL.
