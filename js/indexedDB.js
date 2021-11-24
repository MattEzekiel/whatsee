/*
const indexedDB = window.indexedDB;
const add = document.querySelector('#add');

/!**
 * IndexDB
 *!/
if(indexedDB){
    let db;
    const request = indexedDB.open('wishlist',1);
    request.onsuccess = () => {
        db = request.result;
        // console.log('OPEN',db);
        readData();
    }

    request.onupgradeneeded = () => {
        db = request.result;
        // console.log('Create',db);
        const objetStore = db.createObjectStore('movies',{
            keyPath:'movieTitle'
        })
    }

    request.onerror = (error) => {
        console.log('Error',error);
    }

    if (add){
        add.addEventListener('click',() => {

            const data = {
                movieTitle: localStorage.getItem('Title'),
                moviePoster: localStorage.getItem('Poster')
            }

            /!*console.log(data);*!/
            addData(data);
            movieAdded();

        })
    }

    const addData = (data) => {
      const transaction = db.transaction(['movies'],'readwrite');
      const objetStore = transaction.objectStore('movies');
      const request = objetStore.add(data);
      readData();
    }

    const readData = () => {
        const transaction = db.transaction(['movies'],'readonly');
        const objetStore = transaction.objectStore('movies');
        const request = objetStore.openCursor();
        const fragment = document.createDocumentFragment();
        const section = document.querySelector('#movies');

        request.onsuccess = (e) => {
            const cursor = e.target.result;
            console.log("cursor results:",cursor)

            if(cursor){
                let movieTitle = document.createElement('h3'),
                    moviePoster = document.createElement('img'),
                    movieDiv = document.createElement('div');

                movieTitle.textContent = cursor.value.movieTitle;
                moviePoster.setAttribute('src',cursor.value.moviePoster);
                moviePoster.setAttribute('alt',cursor.value.movieTitle + " Poster");
                movieDiv.setAttribute('class','movie');

                movieDiv.appendChild(moviePoster);
                movieDiv.appendChild(movieTitle);
                fragment.appendChild(movieDiv);

                cursor.continue();
            } else {
                if (cursor != null){
                    section.innerHTML = '<h2>Last movies added:</h2>';
                    section.appendChild(fragment);
                    // console.log('No more data');

                    displayMovies();
                } else {
                    section.innerHTML = '<h2>No movies added</h2>';
                }
            }
        }
    }

    function movieAdded() {
        let div = document.createElement('div');
        let span = document.createElement('span');
        let body = document.querySelector('body');
        let img = '<img src="assets/close-circle.svg" alt="close error" class="close-icon" onclick="borrar()">';


        div.classList.add('added-movie');
        span.innerText = "Movie added to WishList";
        div.appendChild(span);
        div.innerHTML += img;
        body.prepend(div);
    }

    function displayMovies(){
        let movies = document.querySelectorAll('.movie');
        let home = document.querySelector('#home');

        if (home){
            for (let i = 4; i < movies.length; i++){
                movies[i].remove();
            }
            if (movies.length === 0){
                let section = document.querySelector('#movies');
                section.innerHTML = '<h2>No movies added yet</h2>';
            }
        }

    }

}*/

let db,btn;

function init(){
    db = new Dexie('Movies');
    btn = document.querySelector('#add');

    if (btn){
        btn.addEventListener('submit', addMovieDB);
        btn.addEventListener('click', showMovie);
    }

    db.version(1).stores({
        movies:
            `movieTitle`
    });

    db.open()
        .then(refeshView)
}

function addMovieDB(event) {
    event.preventDefault();
    db.movies.bulkPut([
        {movieTitle: localStorage.getItem('Title'), moviePoster: localStorage.getItem('Poster')}
    ])
        .then(movieAdded)
}

function showMovie(event) {
    event.preventDefault();
    console.log('click');
}

function refeshView() {

}

function movieAdded() {
    let div = document.createElement('div');
    let span = document.createElement('span');
    let body = document.querySelector('body');
    let img = '<img src="assets/close-circle.svg" alt="close error" class="close-icon" onclick="borrar()">';

    div.classList.add('added-movie');
    span.innerText = "Movie added to WishList";
    div.appendChild(span);
    div.innerHTML += img;
    body.prepend(div);
}

window.onload = function () {
    init();
}