// ═══════════════════════════════════════════════════════════════
//  Bitezzy Service Worker
//  Strategy: Cache-First for static assets, Network-First for API
// ═══════════════════════════════════════════════════════════════

const CACHE_NAME = "bitezzy-v1";
const STATIC_CACHE_NAME = "bitezzy-static-v1";
const API_CACHE_NAME = "bitezzy-api-v1";

// Assets to pre-cache on install
const PRECACHE_ASSETS = ["/", "/index.html", "/manifest.json"];

// Patterns that should NEVER be cached
const NEVER_CACHE = [
  /\/api\//,
  /chrome-extension/,
  /extensions/i,
  /^chrome:\/\//i,
  /\/socket\.io\//,
];

// API origin — requests here get Network-First treatment
const API_ORIGINS = ["https://api.bitezzy.store"];

// ──────────────────────────────────────────────
//  INSTALL — Pre-cache critical shell assets
// ──────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

// ──────────────────────────────────────────────
//  ACTIVATE — Clean up old caches
// ──────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  const validCaches = [CACHE_NAME, STATIC_CACHE_NAME, API_CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => !validCaches.includes(name))
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

// ──────────────────────────────────────────────
//  FETCH — Route requests through strategies
// ──────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip patterns that should never be cached
  if (NEVER_CACHE.some((pattern) => pattern.test(request.url))) return;

  // Skip cross-origin requests that are not explicitly whitelisted
  const isApiRequest =
    API_ORIGINS.some((origin) => request.url.startsWith(origin)) ||
    url.pathname.startsWith("/api/");

  if (isApiRequest) {
    // ── Network-First for API calls ──
    event.respondWith(networkFirst(request, API_CACHE_NAME));
  } else if (
    request.destination === "document" ||
    request.headers.get("accept")?.includes("text/html")
  ) {
    // ── Network-First for HTML pages (SPA navigation) ──
    event.respondWith(networkFirstHTML(request));
  } else {
    // ── Cache-First for static assets (JS, CSS, images, fonts) ──
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  }
});

// ══════════════════════════════════════════════
//  STRATEGY: Cache-First
//  Serve from cache; fetch & update if missing
// ══════════════════════════════════════════════
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    fetchAndCache(request, cache);
    return cachedResponse;
  }

  return fetchAndCache(request, cache);
}

// ══════════════════════════════════════════════
//  STRATEGY: Network-First (for API)
//  Try network; fall back to cache on failure
// ══════════════════════════════════════════════
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const networkResponse = await fetch(request);

    // Only cache successful responses
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    const cachedResponse = await cache.match(request);
    return cachedResponse || offlineFallback();
  }
}

// ══════════════════════════════════════════════
//  STRATEGY: Network-First for HTML (SPA)
//  Falls back to cached /index.html for offline
// ══════════════════════════════════════════════
async function networkFirstHTML(request) {
  const cache = await caches.open(STATIC_CACHE_NAME);

  try {
    const networkResponse = await fetch(request);

    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    // Serve cached page or app shell for SPA offline support
    const cachedPage = await cache.match(request);
    if (cachedPage) return cachedPage;

    // Fall back to index.html for client-side routing to work offline
    const appShell = await cache.match("/index.html");
    return appShell || offlineFallback();
  }
}

// ──────────────────────────────────────────────
//  HELPER: Fetch, cache, and return response
// ──────────────────────────────────────────────
async function fetchAndCache(request, cache) {
  try {
    const networkResponse = await fetch(request);

    if (
      networkResponse &&
      networkResponse.status === 200 &&
      networkResponse.type !== "opaque"
    ) {
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch {
    return offlineFallback();
  }
}

// ──────────────────────────────────────────────
//  HELPER: Generic offline fallback response
// ──────────────────────────────────────────────
function offlineFallback() {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>You're Offline – Bitezzy</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: system-ui, sans-serif;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%);
        color: #1c1917;
        text-align: center;
        padding: 2rem;
      }
      .icon { font-size: 5rem; margin-bottom: 1.5rem; }
      h1 { font-size: 2rem; font-weight: 800; margin-bottom: 0.75rem; color: #c2410c; }
      p { font-size: 1rem; color: #78716c; max-width: 360px; line-height: 1.6; margin-bottom: 2rem; }
      a {
        display: inline-block;
        background: linear-gradient(to right, #f97316, #ef4444);
        color: white;
        font-weight: 700;
        padding: 0.75rem 2rem;
        border-radius: 9999px;
        text-decoration: none;
        box-shadow: 0 4px 14px rgba(249,115,22,0.4);
        transition: transform 0.2s;
      }
      a:hover { transform: translateY(-2px); }
    </style>
  </head>
  <body>
    <div class="icon">🍳</div>
    <h1>You're Offline</h1>
    <p>It looks like you've lost your internet connection. Reconnect to continue exploring Bitezzy recipes!</p>
    <a href="/">Try Again</a>
  </body>
</html>`,
    {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}
