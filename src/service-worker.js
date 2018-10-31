self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.suppressWarnings()
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

workbox.routing.registerNavigationRoute('/index.html')

workbox.routing.registerRoute(/^https:\/\/fonts.(?:googleapis|gstatic).com\/(.*)/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60
            })
        ]
    }),
    'GET')

workbox.routing.registerRoute(/^http:\/\/localhost:5000\/static\/media\/(.*)/,
    workbox.strategies.cacheFirst({
        cacheName: 'media-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60
            })
        ]
    }),
    'GET')

workbox.routing.registerRoute(/^http:\/\/localhost:5000\/css\/(.*)/,
    workbox.strategies.cacheFirst({
        cacheName: 'media-css-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 7 * 24 * 60 * 60
            })
        ]
    }),
    'GET')

workbox.routing.registerRoute(/^http:\/\/localhost:5000\/static\/css\/(.*)/,
    workbox.strategies.cacheFirst({
        cacheName: 'css-cache',
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 30 * 24 * 60 * 60
            })
        ]
    }),
    'GET')

// http://192.168.241.35:8085/vmovil/serviceRESTMovil/movil/datos/
workbox.routing.registerRoute(/^http:\/\/192.168.241.35:8085\/vmovil\/serviceRESTMovil\/movil\/datos\/(.*)/,
    workbox.strategies.staleWhileRevalidate(), 'GET')