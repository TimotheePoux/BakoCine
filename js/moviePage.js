const params = new URLSearchParams(window.location.search);

const apiLink = `https://api.themoviedb.org/3/${params.get('type')}/${params.get('id')}`;

const data = await fetch(apiLink, options) //on récupère les données du film ou de la série
    .then(res => res.json())
    .catch(err => console.error(err));

function convertRuntime(time){
    let runtime = `${(time - time%60)/60}h`;
    if (time%60 < 10){
        runtime += `0`
    }
    runtime += `${time%60}`
    return runtime;
}

let presentation = document.querySelector("#presentation")
presentation.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`;

let poster = document.querySelector("#poster");
if (data.poster_path != null){
    poster.src = `https://image.tmdb.org/t/p/original${data.poster_path}`;
}

let movieNote = document.querySelector(".movieNote");
movieNote.innerHTML = `${Math.round(data.vote_average*10)}%`;

let h2 = document.querySelector("h2");
let dgd = document.querySelector("#dgd");
let genres = "";
data.genres.forEach(genre => {
    genres += `${genre.name}, `;
});
if (params.get('type') == 'movie'){
    h2.innerHTML = `${data.title} (${data.release_date.slice(0,4)})`;
    dgd.innerHTML = `${prettyDate(data.release_date)} - ${genres.slice(0,genres.length-2)} - ${convertRuntime(data.runtime)}`;
}
else{
    h2.innerHTML = `${data.name} (${data.first_air_date.slice(0,4)})`;
    dgd.innerHTML = `${prettyDate(data.first_air_date)} - ${genres.slice(0,genres.length-2)} - ${data.number_of_episodes} episodes`;
}

let list = document.querySelector(".list");
const dataCredits = await fetch(`${apiLink}/credits`, options) //on récupère les données des crédits du film ou de la série
    .then(res => res.json())
    .catch(err => console.error(err));
console.log(dataCredits);
if (dataCredits.cast.length == 0){
     list.innerHTML = `<p class = "zero_resultat">Aucun acteur recensé</p>`
}
else{
    for (let i = 0; i < 8; i++){
        let profilePath = "./media/poster.webp";
        if (dataCredits.cast[i].profile_path != null){
            profilePath = `https://image.tmdb.org/t/p/original${dataCredits.cast[i].profile_path}`;
        }
        list.innerHTML +=`
            <article>
            <a href = "">
                <img src = "${profilePath}" alt="Portrait" class = "poster">
            </a>
            <p class = "movieTitle">${dataCredits.cast[i].name}</p>
            <p class = "movieDate">${dataCredits.cast[i].character}</p>
            </article>
        `;
    }
}

let synopsis = document.querySelector("#synopsis");
synopsis.innerHTML += await translate(data.overview);