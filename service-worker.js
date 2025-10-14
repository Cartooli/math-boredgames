// Service Worker for MathBored PWA
const CACHE_NAME = 'mathbored-v4'; // UPDATED VERSION - aggressive cache busting
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './app.js?v=4',
  './data.js?v=4'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('🔧 Service Worker installing:', CACHE_NAME);
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Opened cache:', CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('❌ Cache installation failed:', err);
      })
  );
});

// Fetch event - Network first, fall back to cache strategy for better updates
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response before caching
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request);
      })
  );
});

// Activate event - clean up old caches and take control immediately
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker activating:', CACHE_NAME);
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    Promise.all([
      // Delete old caches
      caches.keys().then(cacheNames => {
        console.log('📦 Found caches:', cacheNames);
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all pages immediately
      self.clients.claim()
    ])
  ).then(() => {
    console.log('✅ Service Worker activated and controlling pages');
  });
});

