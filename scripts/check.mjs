// Checks the static export in out/ before deploy. Exits non-zero on any error.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = 'out';
const errors = [];
const warn = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);

// Every URL in the live shiel.ltd sitemap must exist so rankings carry over.
const LIVE = [
  '/', '/tax-compliance', '/bookkeeping-payroll', '/advisory-growth', '/international-accounting', '/accounts', '/tax', '/bookkeeping', '/payroll', '/advisory', '/company-formation',
  '/who-we-help/limited-companies', '/who-we-help/sole-traders', '/who-we-help/contractors-freelancers', '/who-we-help/ecommerce-sellers', '/who-we-help/non-resident-directors', '/who-we-help/startups-new-companies',
  '/countries/ireland', '/countries/united-kingdom', '/countries/gibraltar', '/packages',
  ...['ireland', 'united-kingdom', 'gibraltar'].flatMap((c) => [`/packages/${c}`, ...['limited-company', 'sole-trader', 'contractor', 'ecommerce'].map((s) => `/packages/${c}/${s}`)]),
  '/about', '/about/team', '/contact', '/privacy', '/cookies', '/terms',
  // Older addresses from the previous site, kept alive with redirects.
  '/insights', '/services/tax-compliance', '/services/bookkeeping-payroll', '/services/advisory-growth', '/services/international-accounting',
  '/services/company-accounts', '/services/vat', '/services/payroll', '/services/bookkeeping-management-accounts',
];

const walk = (dir) => readdirSync(dir).flatMap((f) => (statSync(join(dir, f)).isDirectory() ? walk(join(dir, f)) : [join(dir, f)]));
const files = walk(OUT);
const html = files.filter((f) => f.endsWith('.html') && !f.endsWith('offline.html'));
const routeOf = (f) => '/' + relative(OUT, f).replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
const exists = (path) => {
  const p = path.replace(/[#?].*$/, '').replace(/\/$/, '') || '/';
  if (p === '/') return existsSync(join(OUT, 'index.html'));
  return existsSync(join(OUT, `${p}.html`)) || existsSync(join(OUT, p, 'index.html')) || existsSync(join(OUT, p));
};

// Live URLs may also be retired with a 301 in _redirects, as long as the target exists.
const redirects = new Map(
  (existsSync(join(OUT, '_redirects')) ? readFileSync(join(OUT, '_redirects'), 'utf8') : '')
    .split('\n')
    .map((l) => l.trim().split(/\s+/))
    .filter((p) => p.length >= 2 && p[0].startsWith('/'))
    .map(([from, to]) => [from, to]),
);
for (const path of LIVE) {
  if (exists(path)) continue;
  const to = redirects.get(path);
  if (!to) err(path, 'live URL is missing from the build');
  else if (!exists(to)) err(path, `redirects to ${to}, which is missing from the build`);
}

const titles = new Map();
const descriptions = new Map();

for (const file of html) {
  const page = routeOf(file);
  if (page === '/404' || page === '/_not-found') continue;
  const src = readFileSync(file, 'utf8');
  const body = src.replace(/<script[\s\S]*?<\/script>/g, '');

  const h1 = (body.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) err(page, `${h1} <h1> elements`);

  const title = src.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, '&');
  if (!title) err(page, 'missing <title>');
  else {
    if (title.length > 65) warn.push(`${page}: title ${title.length} chars: ${title}`);
    if (titles.has(title)) err(page, `duplicate title with ${titles.get(title)}`);
    titles.set(title, page);
  }

  const desc = src.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) err(page, 'missing meta description');
  else {
    if (desc.length > 165) warn.push(`${page}: description ${desc.length} chars`);
    if (descriptions.has(desc)) err(page, `duplicate description with ${descriptions.get(desc)}`);
    descriptions.set(desc, page);
  }

  if (!/<link rel="canonical"/.test(src)) err(page, 'missing canonical');
  if (!/property="og:image"/.test(src)) err(page, 'missing og:image');
  const og = src.match(/property="og:image" content="https:\/\/www\.shiel\.ltd([^"]+)"/)?.[1];
  if (og && !exists(og)) err(page, `og image not generated: ${og}`);

  for (const m of src.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      err(page, 'invalid JSON-LD');
    }
  }

  const ids = [...body.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) err(page, `duplicate ids: ${[...new Set(dup)].join(', ')}`);

  for (const m of body.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) err(page, 'image without alt');

  for (const m of body.matchAll(/<a\b[^>]*href="(\/[^"]*)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (href.startsWith('/_next') || href.startsWith('//')) continue;
    if (!exists(href)) err(page, `broken link ${href}`);
  }
}

for (const f of ['sitemap.xml', 'robots.txt', 'manifest.webmanifest', 'search.json', 'llms.txt', 'sw.js', 'offline.html', '_headers', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/maskable-512.png', 'og/home.png'])
  if (!existsSync(join(OUT, f))) err('/', `missing ${f}`);

const sitemap = existsSync(join(OUT, 'sitemap.xml')) ? readFileSync(join(OUT, 'sitemap.xml'), 'utf8') : '';
for (const m of sitemap.matchAll(/<loc>https:\/\/www\.shiel\.ltd([^<]*)<\/loc>/g)) if (!exists(m[1] || '/')) err('sitemap', `lists missing page ${m[1]}`);

console.log(`Checked ${html.length} pages.`);
if (warn.length) console.log(`\nWarnings (${warn.length}):\n  ${warn.join('\n  ')}`);
if (errors.length) {
  console.error(`\nErrors (${errors.length}):\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log('All checks passed.');
