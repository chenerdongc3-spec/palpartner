const CACHE_NAME = 'sleep-companion-v1.0.1';
const RUNTIME_CACHE = 'sleep-companion-runtime-v1';

// 核心静态资源 - 安装时缓存
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 需要缓存的路由
const CACHE_ROUTES = [
  '/',
  '/collection',
  '/sleep',
  '/wake-up',
  '/dream-item',
  '/interrupted'
];

// 安装事件 - 缓存核心资源
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('[SW] Core assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache core assets:', error);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
            })
            .map((cacheName) => {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch 事件 - 网络请求拦截
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 只处理同源 GET 请求
  if (request.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  // 对于导航请求（页面请求），使用 Network First 策略
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 缓存成功的响应
          const responseClone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // 网络失败时从缓存返回
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match('/');
          });
        })
    );
    return;
  }

  // 对于静态资源，使用 Cache First 策略
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('[SW] Serving from cache:', url.pathname);
          return cachedResponse;
        }

        // 缓存未命中，从网络获取
        return fetch(request)
          .then((response) => {
            // 只缓存成功的响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 克隆响应用于缓存
            const responseClone = response.clone();

            // 缓存静态资源
            caches.open(RUNTIME_CACHE).then((cache) => {
              // 只缓存特定类型的资源
              if (shouldCache(url.pathname)) {
                console.log('[SW] Caching new resource:', url.pathname);
                cache.put(request, responseClone);
              }
            });

            return response;
          })
          .catch((error) => {
            console.error('[SW] Fetch failed:', error);
            // 可以返回一个离线页面或默认资源
            return caches.match('/');
          });
      })
  );
});

// 判断是否应该缓存该资源
function shouldCache(pathname) {
  // 缓存 JS、CSS、图片、字体等静态资源
  const cacheExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.woff', '.woff2', '.ttf', '.eot'];
  return cacheExtensions.some(ext => pathname.endsWith(ext)) || 
         pathname.includes('/assets/') ||
         pathname.includes('/icons/');
}

// 处理消息事件
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// 后台同步（可选）
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'sync-dreams') {
    event.waitUntil(
      // 同步梦境收藏数据
      syncDreamData()
    );
  }
});

// 同步数据的辅助函数
async function syncDreamData() {
  try {
    console.log('[SW] Syncing dream data...');
    // 这里可以添加实际的同步逻辑
    return Promise.resolve();
  } catch (error) {
    console.error('[SW] Sync failed:', error);
    throw error;
  }
}

// 推送通知（可选）
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');
  
  const title = 'Sleep Companion';
  const options = {
    body: event.data ? event.data.text() : 'Time to rest! 🌙',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'sleep-reminder',
    requireInteraction: false,
    data: {
      url: '/',
      dateOfArrival: Date.now()
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// 通知点击事件
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');
  
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // 如果已有窗口打开，聚焦它
        for (let client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // 否则打开新窗口
        if (clients.openWindow) {
          return clients.openWindow(event.notification.data.url || '/');
        }
      })
  );
});