const staticCacheName = 'mrshareman';

self.addEventListener('install', function (e) {
	e.waitUntil(
		caches.open(staticCacheName).then(function (cache) {
			return cache.addAll([
				"/mr-shareman/",
				"/mr-shareman/index.html",
				"/mr-shareman/style.css",
				"/mr-shareman/script.js"
			]);
		})
	);
});

self.addEventListener('fetch', function (event) {
	console.log("event.request.url", event.request.url);

	event.respondWith(
		caches.match(event.request).then(function (response) {
			return response || fetch(event.request);
		})
	);
});

// THANKS to https://www.geeksforgeeks.org/making-a-simple-pwa-under-5-minutes/
// FIX for GH Pages - THANKS to https://gist.github.com/kosamari/7c5d1e8449b2fbc97d372675f16b566e
