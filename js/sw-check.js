if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../service-worker.js").then((message) => {
        console.log("Service Worker esta listo!");
    });
} else {
    console.log('Service Worker no es soportado!');
}