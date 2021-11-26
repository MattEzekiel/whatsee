let db,btn;

/**
 * Initialized
 */
function init(){
    db = new Dexie('Wishlist');
    btn = document.querySelector('#add');
    document.body.addEventListener("click", deletear);

    if (btn){
        btn.addEventListener('click', addMovieDB);
    }

    db.version(1).stores({
        movies:
            `movieTitle`
    });

    db.open()
        .then(refreshView)
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
        .then(refreshView)
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

    if (movies.length > 0){
        movies.forEach(function (movie){
            let movieTitle = document.createElement('h3'),
                moviePoster = document.createElement('img'),
                movieDiv = document.createElement('div'),
                erase = document.createElement('button'),
                span = document.createElement('span');

            // span.innerHTML = "delete";
            erase.setAttribute('id',movie.movieTitle);
            erase.setAttribute('class','delete');
            movieTitle.textContent = movie.movieTitle;
            moviePoster.setAttribute('src',movie.moviePoster);
            moviePoster.setAttribute('alt',movie.movieTitle + " Poster");
            movieDiv.setAttribute('class','movie');
            erase.innerHTML="Delete";

            movieDiv.appendChild(moviePoster);
            movieDiv.appendChild(movieTitle);
            movieDiv.appendChild(erase);
            fragment.appendChild(movieDiv);
        })
        section.innerHTML = '<h2>All movies added:</h2>';
        section.appendChild(fragment);

    } else {
        section.innerHTML = '<h2>No movies added:</h2>';
    }
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
        const h2 = document.querySelectorAll('h2');
        movies.length !== 0 ? h2[1].innerText = "Last movie/s added:" : null;
    }
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

function deletear(event) {
    let id;
    if (event.target.hasAttribute('id') && event.target.classList.contains('delete')){
        event.preventDefault();

        id = event.target.getAttribute("id");

        //Por alguna razón no refresca, una razón más para odiar js

        db.movies.where('movieTitle').equals(id).delete()
            .then(refreshView)
        /*window.location.reload();*/
    }
}

/**
 *
 * @returns Database to {Array}
 */
function refreshView() {
    return db.movies.toArray()
    .then(showMovie)
    .then(random);
}


/**
 * Starts
 */
window.onload = function () {
    init();
}
