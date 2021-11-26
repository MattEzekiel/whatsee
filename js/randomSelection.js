let db,btn;

/**
 * Initialized
 */
function init(){
    db = new Dexie('Wishlist');
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
    section.innerHTML = '<h2>Movie Selected:</h2>';
    section.appendChild(fragment);
}

/**
 *
 * @returns Database to {Array}
 */
function refeshView() {
    return db.movies.toArray()
        .then(showMovie);
}


/**
 * Starts
 */
window.onload = function () {
    init();
}

function random() {
    const all = document.querySelectorAll('.movie');
    /*console.log("ALL",all)*/
    for ( let i = 0; i < all.length; i++){
        all[i].classList.add('remove');
    }
    let random = Math.floor(Math.random() * all.length);
    all[random].classList.remove('remove');
    all[random].classList.add('show');
    let erase = document.querySelectorAll('.remove');
    for (let i = 0; i < erase.length; i++){
        erase[i].remove();
    }
    var confettiSettings = { target: 'my-canvas' };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(function () {
        random();
    },1000)
})