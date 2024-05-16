
const keys = {
    api_key: 'ff3c9c2c2742a5233770a5e775a6a7d7',
    session_id: 'f67051eebbe7d4683d18cadca9b82a00ef50bc4d',
    account_id: '21215518',
    auth_token: ' Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjNjOWMyYzI3NDJhNTIzMzc3MGE1ZTc3NWE2YTdkNyIsInN1YiI6IjY2MWQ2MmU2ZTQ4ODYwMDE4NTNiOWVhZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AnjmH655qfelG865xIBdnWoBjwpTvkroioZm7vT6iQg'
}

let moviesResult = document.getElementById("moviesResult");


function setFav(id, favBool){
    moviesResult.innerHTML="";

    showFavs();
}

function showFavs(){
    moviesResult.innerHTML="";

}

function searchMovies(query){
    clearInput();
    removeActive();
}


async function showFavs(){
    moviesResult.innerHTML="";
    const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${keys.api_key}&session_id=${keys.session_id}`);
    const data = await response.json();
    data.results.forEach(movie => printMovie(movie, true, false));
}

async function setFav(id, favBool){
    const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${keys.api_key}&session_id=${keys.session_id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "media_type": "movie",
            "media_id": id,
            "favorite": favBool
        })
    });
    const data = await response.json();
    console.log(`id ${id} marked as ${data.status_message}`);
    showFavs();
}

async function searchMovies(query){
    moviesResult.innerHTML = ""; // Limpia los resultados anteriores
    clearInput();
    removeActive();
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${keys.api_key}&query=${query}`);
    const data = await response.json();
    data.results.forEach(movie => printMovie(movie, false, false)); // Imprime solo los resultados de la búsqueda
}
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
        searchMovies(this.value);
    }
});

// Click a la lupa
document.querySelector(".searchBar i").addEventListener("click", ()=>searchMovies(document.getElementById("search").value));

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

