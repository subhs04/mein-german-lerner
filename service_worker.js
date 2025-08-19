const CACHE_NAME = 'german-hub-v1.0.3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './content/vocabulary/index.html',
  './content/vocabulary/profession_page.html',
  './content/vocabulary/professions.html',
  './content/vocabulary/w-words-verbs.html',
  './content/vocabulary/city-locations.html',
  './content/vocabulary/food_drinks_vehicles.html',
  './content/vocabulary/german_time_days.html',
  './content/vocabulary/family_classroomArticles.html',
  './content/grammar/index.html',
  './content/grammar/german_irregular_verbs.html',
  './content/grammar/Dativ.html',
  './content/grammar/trennbare_verben_note.html'
];

// Maximum cache age in milliseconds (1 hour)
const MAX_CACHE_AGE = 60 * 60 * 1000;

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache resources during install:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Helper function to check if cached response is fresh
function isCacheFresh(response) {
  if (!response) return false;
  
  const cachedDate = response.headers.get('date');
  if (!cachedDate) return false;
  
  const cacheTime = new Date(cachedDate).getTime();
  const now = Date.now();
  
  return (now - cacheTime) < MAX_CACHE_AGE;
}

// Fetch event - network-first strategy with cache freshness check
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    // Check cache first to see if we have fresh content
    caches.match(event.request)
      .then(cachedResponse => {
        // If we have fresh cached content, serve it but also update in background
        if (cachedResponse && isCacheFresh(cachedResponse)) {
          console.log('Serving fresh cache for:', event.request.url);
          
          // Update cache in background
          fetch(event.request)
            .then(response => {
              if (response && response.status === 200 && response.type === 'basic') {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, responseToCache));
              }
            })
            .catch(() => {}); // Silently fail background updates
          
          return cachedResponse;
        }
        
        // Try network first for stale or missing cache
        return fetch(event.request)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            console.log('Serving from network and updating cache:', event.request.url);
            
            // Clone the response for caching
            const responseToCache = response.clone();

            // Update cache with fresh content
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(error => {
            console.log('Network failed, serving from cache:', event.request.url);
            
            // Network failed, serve stale cache if available
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Return offline page for navigation requests when nothing in cache
            if (event.request.destination === 'document') {
              return caches.match('./index.html');
            }
            
            throw error;
          });
      })
  );
});

// Handle messages from the main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'FORCE_CACHE_REFRESH') {
    console.log('Force refreshing cache...');
    
    // Delete current cache and force fresh fetch
    caches.delete(CACHE_NAME)
      .then(() => {
        return caches.open(CACHE_NAME);
      })
      .then(() => {
        event.ports[0].postMessage({ success: true });
      })
      .catch(error => {
        console.error('Failed to refresh cache:', error);
        event.ports[0].postMessage({ success: false, error: error.message });
      });
  }
});

// Handle background sync for future features
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    // Add background sync logic here if needed
  }
});

// Handle push notifications for future features
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    console.log('Push notification received:', data);
    
    const options = {
      body: data.body,
      icon: '/assets/icon-192.png',
      badge: '/assets/icon-72.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('Notification click received.');
  
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});