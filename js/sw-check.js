if('serviceWorker' in navigator){
    navigator.serviceWorker.register('../service-worker.js')
        .then((message) => {
            console.log('Service Worker ready');
        });
} else {
    console.log('Service worker obsolete');
}