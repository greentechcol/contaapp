// ════════════════════════════════════════════════════════════════
//  ContaApp — Service Worker v1
//  Estrategia: Cache-first para assets, Network-first para datos
// ════════════════════════════════════════════════════════════════

const CACHE_NAME = 'contaapp-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
];

// ── Instalación: precachear todos los assets ─────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// ── Activación: limpiar cachés viejos ────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ── Fetch: Cache-first para assets locales ───────────────────────
self.addEventListener('fetch', event => {
  // No interceptar peticiones de Firebase (Firestore, Auth)
  const url = event.request.url;
  if (url.includes('firestore.googleapis.com') ||
      url.includes('firebase') ||
      url.includes('gstatic.com/firebasejs')) {
    return; // dejar pasar sin interceptar
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Cachear respuestas exitosas de CDN
        if (response.ok && (url.includes('jsdelivr') || url.includes('cdnjs'))) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => cached); // si falla la red, devolver caché
    })
  );
});
