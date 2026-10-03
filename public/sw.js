// Trainfo Service Worker for PWA
const CACHE_NAME = 'trainfo-cache-v1';

// コアアセットの初期キャッシュリスト
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './logo.svg',
  './manifest.webmanifest',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/icon-maskable-512x512.png',
  './icons/apple-touch-icon-180x180.png',
  './icons/favicon-32x32.png',
];

// インストール時: コアアセットをキャッシュ
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Precache asset failure (skipped):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// アクティベート時: 古いバージョンのキャッシュを削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('trainfo-cache-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// フェッチ時: Stale-While-Revalidate または Cache-First 戦略
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // GETリクエスト以外はそのままネットワークへ
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Chrome拡張機能や非HTTPスキーマは除外
  if (!url.protocol.startsWith('http')) return;

  // 地図タイル（tile.openstreetmap.org）のキャッシュ（Network First with Cache Fallback）
  if (url.hostname.includes('tile.openstreetmap.org')) {
    event.respondWith(
      caches.open('trainfo-tiles').then((cache) => {
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => cache.match(request));
      })
    );
    return;
  }

  // アプリケーションアセット（HTML/JS/CSS/画像/フォント等）
  // ネットワークを優先しつつキャッシュを更新する Stale-While-Revalidate 戦略
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch((err) => {
            // オフライン時、HTMLへのリクエストなら cachedResponse または index.html を返す
            if (request.mode === 'navigate') {
              return cachedResponse || cache.match('./index.html') || cache.match('./');
            }
            throw err;
          });

        // キャッシュがあれば即座に返し、バックグラウンドでネットワーク更新 (Stale-While-Revalidate)
        return cachedResponse || fetchPromise;
      });
    })
  );
});
