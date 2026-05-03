// ════════════════════════════════════════════════════════════════
//  ContaApp — Service Worker v4
//  Estrategia: Network-first para HTML/CSS, Cache-first para CDN
// ════════════════════════════════════════════════════════════════

const CACHE_NAME = 'contaapp-v5';  // ← cambiar versión fuerza limpieza del caché viejo
const CDN_ASSETS = [
  './index.html',
  './negocio.html',
  './personal.html',
  './styles.css',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
];

// ── Instalación: cachear solo CDN (HTML/CSS se piden frescos) ────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CDN_ASSETS))
  );
  self.skipWaiting();
});

// ── Activación: borrar TODOS los cachés anteriores ───────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => {
        console.log('[SW] Eliminando caché viejo:', k);
        return caches.delete(k);
      }))
    ).then(() => self.clients.claim())
  );
});

// ── Fetch ────────────────────────────────────────────────────────
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // No interceptar Firebase
  if (url.includes('firestore.googleapis.com') ||
      url.includes('identitytoolkit') ||
      url.includes('firebase') ||
      url.includes('gstatic.com/firebasejs')) {
    return;
  }

  // CDN: Cache-first
  if (url.includes('jsdelivr.net') || url.includes('cdnjs.cloudflare.com')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // HTML y CSS: Network-first → caché como fallback offline
  if (url.includes('index.html') || url.includes('styles.css') || url.endsWith('/') || url.endsWith('.html')) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Todo lo demás
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
