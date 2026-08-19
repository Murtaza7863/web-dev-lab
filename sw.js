const VERSION = "webdev-lab-v17";
const ASSETS = [
  "./",
  "./index.html",
  "./css/app.css",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./js/store.js",
  "./js/game.js",
  "./js/mock-api.js",
  "./js/app.js",
  "./js/check.js",
  "./js/pipeline.js",
  "./js/tracks/start.js",
  "./js/tracks/html.js",
  "./js/tracks/swe.js",
  "./js/tracks/css.js",
  "./js/tracks/js.js",
  "./js/tracks/git.js",
  "./js/tracks/http.js",
  "./js/tracks/crud.js",
  "./js/tracks/spring.js",
  "./js/tracks/pwa.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(VERSION);
      for (const asset of ASSETS) {
        try {
          await cache.add(asset);
        } catch {
          /* skip missing */
        }
      }
    })(),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.pathname.includes("/api/")) return;
  event.respondWith(
    caches.match(event.request).then((hit) => {
      if (hit) return hit;
      return fetch(event.request).catch(() => caches.match("./index.html"));
    }),
  );
});
