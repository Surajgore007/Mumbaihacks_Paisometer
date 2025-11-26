const CACHE_NAME = "pwa-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => 
      cache.addAll(["/", "/index.html", "/manifest.json"])
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});