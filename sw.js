// IQBAL FASHION ADMIN SERVICE WORKER (V1 - PWA & PUSH NOTIFICATIONS)
const CACHE_NAME = 'iqbalfashion-admin-v4';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          console.log('Clearing old admin cache:', cache);
          return caches.delete(cache);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// PUSH EVENT HANDLER (FIRES EVEN WHEN PWA APP IS CLOSED)
self.addEventListener('push', (event) => {
  let data = { 
    title: 'NEW IQBAL FASHION ORDER!', 
    body: 'New customer order received on Iqbal Fashion!', 
    icon: '/images/logo.png',
    badge: '/images/logo.png' 
  };
  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch(e) {
    if (event.data) data.body = event.data.text();
  }

  const options = {
    body: data.body || 'New customer order received!',
    icon: data.icon || '/images/logo.png',
    badge: data.badge || '/images/logo.png',
    vibrate: [200, 100, 200, 100, 200],
    data: { url: '/orders.html' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'NEW IQBAL FASHION ORDER!', options)
  );
});

// NOTIFICATION CLICK HANDLER (OPENS ADMIN ORDERS PAGE)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data ? event.notification.data.url : '/orders.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (let client of clientList) {
        if (client.url.includes(targetUrl) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Never cache Supabase API or storage calls in admin panel
  if (url.hostname.includes('supabase.co')) {
    event.respondWith(
    fetch(event.request, { cache: 'no-cache' }));
    return;
  }

  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
