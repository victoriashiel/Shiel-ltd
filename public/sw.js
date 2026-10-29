// Shiel service worker: caches static assets and visited public pages so the
// site opens quickly and shows an offline page when there is no connection.
const VERSION = 'shiel-v4';
const STATIC = `${VERSION}-static`;
const PAGES = `${VERSION}-pages`;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(STATIC).then((c) => c.addAll(['/offline.html', '/icon.svg', '/icons/icon-192.png'])).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('shiel-') && !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Hashed build assets never change, so cache-first is safe.
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ||
          fetch(request).then((res) => {
            // Clone before handing the response back; its body can only be read once.
            if (res.ok) {
              const copy = res.clone();
              event.waitUntil(caches.open(STATIC).then((c) => c.put(request, copy)));
            }
            return res;
          }),
      ),
    );
    return;
  }

  // Pages: network first, falling back to the cached copy, then the offline page.
  // Contact and anything with a query string are never cached.
  if (request.mode === 'navigate') {
    const cacheable = !url.search && !url.pathname.startsWith('/contact');
    event.respondWith(
      fetch(request)
        .then((res) => {
          if (cacheable && res.ok) {
            const copy = res.clone();
            event.waitUntil(caches.open(PAGES).then((c) => c.put(request, copy)));
          }
          return res;
        })
        .catch(() => caches.match(request).then((hit) => hit || caches.match('/offline.html'))),
    );
  }
});
