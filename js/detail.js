if (localStorage.length < 25){
    let main = document.querySelector('main'),
        body = document.querySelector('body');

    main.remove();

    document.title = 'Error: not movie selected';
    body.style.cssText = "display: flex; justify-content: center; align-items:center; width: 100vw; height: 100vh; flex-direction: column-reverse";
    body.innerHTML += '<h1>NO MOVIE SELECTED</h1>';

} else {
    for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        //console.log(key + ":",value);
        create(key,value);
    }
}

function create(key,value) {
    let p = document.createElement('p');
    let content = document.querySelector('.content');

    switch (true){
        case key.includes('Poster'):
            document.querySelector('#poster').innerHTML = '<span class="text-red visually-hidden">Poster: </span>' + `<img class="img-fluid" src="${value}" alt="movie poster" />`;

            break;

        case key.includes('Title'):
            document.querySelector('h1').innerHTML = "Detail of: <br/>" + value;
            document.title = "Detail of: " + value;

            break;

        case key.includes('Plot'):

            document.querySelector('#plot').innerHTML = "<span class='text-red'>Movie Plot: </span> " + value;

            break;

        case key.includes('Ratings') || key.includes('Website') || key.includes('imdbVotes') || key.includes('Response') || key.includes('DVD') || key.includes('Type') || key.includes('imdbID') || key.includes('totalSeasons'):

            break;

        default:
            p.innerHTML = `<span class="text-red">${key}</span>` + ': ' + value;
            p.setAttribute('id',key.toLowerCase())
            content.appendChild(p);
    }
}