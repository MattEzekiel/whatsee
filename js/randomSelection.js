const indexedDB = window.indexedDB;

/**
 * IndexDB
 */
if(indexedDB){
    let db;
    const request = indexedDB.open('wishlist',1);
    request.onsuccess = () => {
        db = request.result;
        console.log('OPEN',db);
        readData();
    }

    request.onupgradeneeded = () => {
        db = request.result;
        console.log('Create',db);
        const objetStore = db.createObjectStore('movies',{
            keyPath:'movieTitle'
        })
    }

    request.onerror = (error) => {
        console.log('Error',error);
    }

    const readData = () => {
        const transaction = db.transaction(['movies'],'readonly');
        const objetStore = transaction.objectStore('movies');
        const request = objetStore.openCursor();
        const fragment = document.createDocumentFragment();
        const section = document.querySelector('#movies');

        request.onsuccess = (e) => {
            const cursor = e.target.result;

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
                section.innerHTML = '<h2>Movie selected:</h2>';
                section.appendChild(fragment);
                console.log('No more data');
            }
        }
    }

    function random() {
        const all = document.querySelectorAll('.movie');
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

}