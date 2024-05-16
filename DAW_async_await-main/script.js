// Claus
const keys = {
    api_key: 'ff3c9c2c2742a5233770a5e775a6a7d7',
    session_id: 'f67051eebbe7d4683d18cadca9b82a00ef50bc4d',
    account_id: '21215518',
    auth_token: ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjNjOWMyYzI3NDJhNTIzMzc3MGE1ZTc3NWE2YTdkNyIsInN1YiI6IjY2MWQ2MmU2ZTQ4ODYwMDE4NTNiOWVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AnjmH655qfelG865xIBdnWoBjwpTvkroioZm7vT6iQg'
}


let moviesResult = document.getElementById("moviesResult");

var total_pages = 0;
var current_page = 1;
var lastQuery = "";

async function setFav(id, favBool){
    moviesResult.innerHTML="";

    const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type':  keys.auth_token
        },
        body: JSON.stringify({media_type: 'movie', media_id: id, favorite: favBool})
    };
    let url = `https://api.themoviedb.org/3/account/${keys.account_id}/favorite`;
    let response = await fetch(url, options);
    let data = await response.json();

    console.log(`${id} marked as ${favBool}`)

    showFavs();
}

async function showFavs(){
    moviesResult.innerHTML="";

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: keys.auth_token
        }
    };
    let url = `https://api.themoviedb.org/3/account/${keys.account_id}/favorite/movies`;
    let response = await fetch(url, options);
    let data = await response.json();

    let movies = data.results;
    movies.forEach(movie => printMovie(movie, true, false));
}

async function searchMovies(query, clear){
    if (clear) {
        moviesResult.innerHTML="";
        current_page = 1;
    }
    clearInput();
    removeActive();
    lastQuery = query;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: keys.auth_token
        }
    };
    document.getElementById("loading").hidden = false;
    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${current_page}`;
    let response = await fetch(url, options);
    let data = await response.json();

    console.log(data)
    total_pages = data.total_pages;

    let movies = data.results;
    document.getElementById("loading").hidden = true;
    movies.forEach(async movie => {
        let url = `https://api.themoviedb.org/3/movie/${movie.id}/account_states`;
        let response = await fetch(url, options);
        let data = await response.json();

        if (data.favorite) printMovie(movie, true, false)
        else printMovie(movie, false, false)
        
    });
}



/* FUNCIONS D'INTERACCIÓ AMB EL DOM */

// Click Favorites
document.getElementById("showFavs").addEventListener("click", function(){
    removeActive();
    this.classList.add("active");

    showFavs();
})

// Click Watchlist
document.getElementById("showWatch").addEventListener("click", function(){
    removeActive();
    this.classList.add("active");

    //showWatch();
})

/* Funcions per detectar la cerca d'una pel·lícula */
// Intro a l'input
document.getElementById("search").addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchMovies(this.value, true);
    }
});

// Click a la lupa
document.querySelector(".searchBar i").addEventListener("click", ()=>searchMovies(document.getElementById("search").value, true));

// Netejar l'input
document.getElementById("search").addEventListener('click', ()=>clearInput()); 

function clearInput(){
    document.getElementById("search").value="";
}

// Elimina l'atribut active del menú
function removeActive(){
    document.querySelectorAll(".menu li a").forEach(el=>el.classList.remove("active"));
}

/* Funció per printar les pel·lícules */
function printMovie(movie, fav, watch){

    let favIcon = fav ? 'iconActive' : 'iconNoActive';
    let watchIcon = watch ? 'iconActive' : 'iconNoActive';

    moviesResult.innerHTML += `<div class="movie">
                                    <img src="https://image.tmdb.org/t/p/original${movie.poster_path}">
                                    <h3>${movie.original_title}</h3>
                                    <div class="buttons">
                                        <a id="fav" onClick="setFav(${movie.id}, ${!fav})"><i class="fa-solid fa-heart ${favIcon}"></i></a>
                                        <a id="watch" onClick="setWatch(${movie.id}, ${!watch})"><i class="fa-solid fa-eye ${watchIcon}"></i></a>
                                    </div>`;
}

// Scroll infinit
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight,clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1 && current_page<total_pages) {
        current_page++;
        searchMovies(lastQuery, false)
    }
});