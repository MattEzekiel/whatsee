if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../service-worker.js").then((message) => {
        // console.log("Service Worker esta listo!");
    });
} else {
    console.log('Service Worker no es soportado!');
}

window.addEventListener('offline', event => {
    /*console.log('Estoy Offline!');*/
    let status = document.querySelector('.status'),
        statusText = document.querySelector('.status-text');
    status.classList.replace('online','offline');
    statusText.innerHTML = "Offline";
})

window.addEventListener('online', event =>{
    // console.log('Estoy online');
    let status = document.querySelector('.status'),
        statusText = document.querySelector('.status-text');
    status.classList.replace('offline','online');
    statusText.innerHTML = "Online";
})

if (!navigator.onLine){
    // console.log('Sin conexión!');
    let status = document.querySelector('.status'),
        statusText = document.querySelector('.status-text');
    status.classList.replace('online','offline');
    statusText.innerHTML = "Offline";
}