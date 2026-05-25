const CACHE = 'fp-portfolio-gtp-2026-v2';
const ASSETS = [
  './', './index.html', './style.css', './app.js', './manifest.json',
  './assets/img/perfil.png', './assets/cv-francisco-pinto.html',
  './viewer3d/index.html', './viewerAR/index.html', './viewerVR/index.html'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(() => {});
    return response;
  }).catch(() => caches.match('./index.html'))));
});
