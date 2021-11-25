const form = document.querySelector('form');
const input = document.querySelector('input');
const button = document.querySelector('button');
const API = "e8586c8d";
let Movie = '';
const url = `https://www.omdbapi.com/?apikey=${API}`;

/**
 * Enable/Disable button
 */
input.addEventListener('keyup', () => {
    if(input.value.length > 0){
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled','disabled');
    }
})

/**
 * form listener
 */
form.addEventListener('submit', function (e) {
    e.preventDefault();
    searchMovie();
})

/**
 * @uses for search a movie
 */
function searchMovie() {
    Movie = input.value;
    URL = url + `&t=${Movie}&plot=full`;
    fetch(URL)
        .then(function (response) {
            return response.json()
        })
        .then(function (theJson){
            console.log(theJson);
            setLocalStorage(theJson);
            showHome(theJson);
        })
        .catch(function (error){
            console.log("Error:",error);
        })
}


/**
 * LocalStorage set
 * @param movie
 */
function setLocalStorage(movie) {
    for (const property in movie){
        localStorage.setItem(`${property}`,`${movie[property]}`);
    }
}

/**
 * Show in home
 * @param json
 */
let showHome = function (json) {
    if (!json.Error){
        input.value = '';
        let title = document.querySelector('#movieTitle');
        let plot = document.querySelector('#plot');
        let year = document.querySelector('#year');
        let genre = document.querySelector('#genre');
        let img = document.querySelector('picture');

        title.innerHTML = "Title: " + json.Title;
        plot.innerHTML = "Plot: " + json.Plot.substring(0,200) + " <a href='detail.html'>[...]. See more</a>";
        year.innerHTML = "Year: " + json.Year;
        genre.innerHTML = "Genre: " + json.Genre;
        img.innerHTML = '<img src="'+ json.Poster +'" alt="'+ json.Title +' poster">';
    } else {
        let div = document.createElement('div');
        let span = document.createElement('span');
        let body = document.querySelector('body');
        let img = '<img src="assets/close-circle.svg" alt="close error" class="close-icon" onclick="borrar()">';


        div.classList.add('error-movie');
        span.innerText = json.Error;
        div.appendChild(span);
        div.innerHTML += img;
        body.prepend(div);

    }
}

/**
 * @uses for delete errors
 */
function borrar() {
    let closeIcons = document.querySelectorAll('.close-icon');
    for (let i = 0; i < closeIcons.length; i++){
        closeIcons[i].addEventListener('click', () => {
            let padre = closeIcons[i].parentNode;
            padre.classList.add('opacidad');

            setTimeout(function () {
                padre.parentNode.removeChild(padre);
            },1000)
        })
    }
}