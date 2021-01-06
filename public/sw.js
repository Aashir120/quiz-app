let cacheData = "website";

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((Data) => {
            Data.addAll([
                "/static/js/bundle.js",
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "index.html",
                "/",
            ])
        }).catch((err) => {
            console.log("err", err)
        })
    )
})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then((result) => {
                console.log("result", result)
                if (result) {
                    return result;
                }
            })
        )
    }
})