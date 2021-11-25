let db,btn;

/**
 * Initialized
 */
function init(){
    db = new Dexie('Movies');
    btn = document.querySelector('#add');

    if (btn){
        btn.addEventListener('click', addMovieDB);
    }

    db.version(1).stores({
        movies:
            `movieTitle`
    });

    db.open()
        .then(refeshView)
}

/**
 * Adding movies
 * @param event
 */
function addMovieDB(event) {
    event.preventDefault();
    db.movies.bulkPut([
        {movieTitle: localStorage.getItem('Title'), moviePoster: localStorage.getItem('Poster')}
    ])
        .then(movieAdded)
        .then(refeshView)
        .then(showMovie)
        .then(random)
}

/**
 * Show all movies
 * @param movies
 */
function showMovie(movies) {
    const fragment = document.createDocumentFragment();
    const section = document.querySelector('#movies');

    movies.forEach(function (movie){
        let movieTitle = document.createElement('h3'),
            moviePoster = document.createElement('img'),
            movieDiv = document.createElement('div');

        movieTitle.textContent = movie.movieTitle;
        moviePoster.setAttribute('src',movie.moviePoster);
        moviePoster.setAttribute('alt',movie.movieTitle + " Poster");
        movieDiv.setAttribute('class','movie');

        movieDiv.appendChild(moviePoster);
        movieDiv.appendChild(movieTitle);
        fragment.appendChild(movieDiv);
    })
    section.innerHTML = '<h2>All movies added:</h2>';
    section.appendChild(fragment);
}

/**
 *
 * @returns Database to {Array}
 */
function refeshView() {
    return db.movies.toArray()
    .then(showMovie)
        .then(random)
}

/**
 * Create Notification
 */
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

/**
 * Starts
 */
window.onload = function () {
    init();
}

/**
 * Detect if home, show only 4
 */
function random() {
    let movies = document.querySelectorAll('.movie');
    const home = document.querySelector('#home');

    if(home){
        for (let i = 4; i < movies.length; i++){
            movies[i].remove();
        }
        const h2 = document.querySelector('h2');
        h2.innerText = "Last movies added:";
    }
}