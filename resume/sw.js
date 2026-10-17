// Retires the service worker of the old standalone resume site, which was
// registered at this URL with scope /resume/. Browsers keep a service worker
// whose script now 404s, so this replacement removes itself and its caches,
// then reloads open resume tabs so they get the live page. Leaves Chirpy's
// caches (named chirpy-*) alone.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k.startsWith('resume-cache-')).map((k) => caches.delete(k)))
      )
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll({ type: 'window' }))
      .then((clients) => clients.forEach((client) => client.navigate(client.url)))
  );
});
