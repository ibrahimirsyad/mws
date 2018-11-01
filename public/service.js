let staticCacheName = 'baimvar-v1';

self.addEventListener('install', function(event) {
    console.log('Installing...');

    // Create new caches
    let urlsToCaches = [
		'404.html',
		'app.js',
		'index.html',
		'manifest.json',
		'service.js',
		'style.css',
		'images\borobudur.jpg',
		'images\favicon.ico',
		'images\favicon256.ico',
		'images\gebang.jpg',
		'images\marker-icon.png',
		'images\marker-shadow.png',
		'images\monas.jpg',
		'images\prambanan.png',
		'images\profilepic2.jpeg',
		'images\profilepic3.jpeg',
		'images\icons\icon-128x128.png',
		'images\icons\icon-144x144.png',
		'images\icons\icon-152x152.png',
		'images\icons\icon-192x192.png',
		'images\icons\icon-384x384.png',
		'images\icons\icon-512x512.png',
		'images\icons\icon-72x72.png',
		'images\icons\icon-96x96.png',
		'leaflet\leaflet.css',
		'leaflet\leaflet.js',
		'leaflet\images\marker-icon-2x.png',
		'leaflet\images\marker-icon.png',
		'leaflet\images\marker-shadow.png',
		'project1\add2numbers.js',
		'project1\index.html',
		'project1\indexold.html',
		'project2\index.html',
		'project2\style.css',
		'project2\leaflet\leaflet.css',
		'project2\leaflet\leaflet.js',
		'project3\data.json',
		'project3\fetch.js',
		'project3\index.html',
		'project3\style.css',
		'project4\CODEOWNERS',
		'project4\index.html',
		'project4\README.md',
		'project4\restaurant.html',
		'project4\css\styles.css',
		'project4\data\restaurants.json',
		'project4\img\1.jpg',
		'project4\img\10.jpg',
		'project4\img\2.jpg',
		'project4\img\3.jpg',
		'project4\img\4.jpg',
		'project4\img\5.jpg',
		'project4\img\6.jpg',
		'project4\img\7.jpg',
		'project4\img\8.jpg',
		'project4\img\9.jpg',
		'project4\js\dbhelper.js',
		'project4\js\main.js',
		'project4\js\restaurant_info.js'
    ];

    event.waitUntil(
        caches.open(staticCacheName).then(function(cache) {
            return cache.addAll(urlsToCaches);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Activating...');

    // Update all caches
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('baimvar-') && cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    //console.log('Fetching...');

    event.respondWith(
        caches.match(event.request).then(function(response){
            //console.log(response);

            return response || fetch(event.request).then(function(response) {
                return caches.open(staticCacheName).then(function(cache) {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
        })
    );
});

	