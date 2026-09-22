# Shiel Ltd website

Modern accountancy website for Shiel Ltd, built with Next.js 16.3, React 19.3 and Tailwind CSS 4.3.

## Environment

Copy .env.example to .env.local and update values where needed.

NEXT_PUBLIC_SITE_URL is the canonical production URL.
NEXT_PUBLIC_CONTACT_EMAIL is the enquiry address. The current fallback is hello@shiel.ltd and should be confirmed before launch.
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION and NEXT_PUBLIC_BING_SITE_VERIFICATION are optional webmaster verification tokens.

## SEO

The application includes route-specific metadata, canonical URLs, sitemap.xml, robots.txt, Open Graph metadata and image generation, Organization/Service/BreadcrumbList JSON-LD, semantic HTML, internal links, a web manifest and app icon.

## Performance and accessibility

Pages are server-rendered by default. There is no runtime animation library. Motion uses CSS with reduced-motion support. Navigation and forms include keyboard focus states, and the layout includes skip navigation and mobile behaviour.

## Content guardrail

The current copy only uses facts supplied for Shiel: European based, global service coverage and 10+ years of experience across different regions. Do not add regulated-profession memberships, office addresses, client counts or performance claims unless verified.

## Contact form

The form currently prepares an email in the visitor's email client. This avoids collecting enquiry data into an unconfigured third-party service. Replace the mailto handoff once a server-side email provider or form endpoint is selected.
