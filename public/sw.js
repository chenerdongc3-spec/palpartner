const CACHE_NAME = 'sleep-companion-v1.0.0';
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  // 这些文件会在构建时生成，需要根据实际构建结果调整
  // '/assets/index.css',
  // '/assets/index.js',
];

// 动态缓存的资源
const DYNAMIC_CACHE_URLS = [
  '/collection',
  '/sleep',
  '/wake-up',
  '/dream-item',
  '/interrupted'
];

// 安装事件 - 缓存核心资源
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching core files');
        // 只缓存确定存在的文件
        return cache.addAll([
          '/',
          '/manifest.json'
        ]);
      })
      .then(() => {
        console.log('Service Worker: Core files cached');
        // 强制激活新的 Service Worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Cache failed', error);
      })
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        // 立即控制所有客户端
        return self.clients.claim();
      })
  );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') {
    return;
  }

  // 跳过非同源请求
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // 如果缓存中有，直接返回
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return cachedResponse;
        }

        // 否则从网络获取
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // 检查响应是否有效
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // 克隆响应，因为响应流只能使用一次
            const responseToCache = response.clone();

            // 缓存新的响应
            caches.open(CACHE_NAME)
              .then((cache) => {
                // 只缓存特定类型的资源
                const url = event.request.url;
                if (url.includes('/assets/') || 
                    url.endsWith('.html') || 
                    url.endsWith('.css') || 
                    url.endsWith('.js') ||
                    DYNAMIC_CACHE_URLS.some(path => url.includes(path))) {
                  console.log('Service Worker: Caching new resource', url);
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed', error);
            
            // 如果是导航请求且网络失败，返回离线页面
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            throw error;
          });
      })
  );
});

// 处理消息事件
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 后台同步（如果支持）
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // 这里可以添加后台同步逻辑，比如同步梦境收藏数据
      Promise.resolve()
    );
  }
});

// 推送通知（如果需要）
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'Sleep time reminder!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open App',
        icon: '/icons/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Sleep Companion', options)
  );
});

// 处理通知点击
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});