/* Frenchcore Academy service worker: precaches the whole app so it runs offline.
   Bump VERSION whenever any file below changes, so installed apps pick up the update. */
const VERSION = "fca-v1";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "fonts/fonts.css",
  "fonts/atkinson-hyperlegible-1.woff2",
  "fonts/atkinson-hyperlegible-2.woff2",
  "fonts/atkinson-hyperlegible-3.woff2",
  "fonts/big-shoulders-display-1.woff2",
  "fonts/jetbrains-mono-1.woff2",
  "icons/icon.svg",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    // Network first for the page, so updates arrive when online; cached copy when offline.
    e.respondWith(
      fetch(req).then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put("index.html", copy));
        }
        return res;
      }).catch(() => caches.match("index.html"))
    );
    return;
  }
  e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
});
