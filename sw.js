self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("Worddies").then(cache => {
      cache.addAll([
        "./",
        "https://fonts.googleapis.com/css?family=Lato",
        "https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2",
        "https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXiWtFCc.woff2",
        "./dist/css/styles.min.css",
        "./dist/js/bundle.min.js"
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheList => {
      return cacheList
        .filter(staleCaches => !staleCaches.includes("Worddies"))
        .map(deleteCache => caches.delete(deleteCache));
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open("Worddies").then(cache => {
      console.log(event.request);
      return cache.match(event.request).then(cacheResponse => {
        return (
          cacheResponse ||
          fetch(event.request).then(networkResponse => {
            return caches.open("Worddies").then(cache => {
              if (event.request.destination) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            });
          })
        );
      });
    })
  );
});
