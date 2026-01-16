self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("debateos").then(cache =>
      cache.addAll(["./", "./index.html"])
    )
  );
});
