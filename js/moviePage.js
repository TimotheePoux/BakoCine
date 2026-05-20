const params = new URLSearchParams(window.location.search); //On récupère les variables dans l'adresse

const apiLink = `https://api.themoviedb.org/3/${params.get('type')}/${params.get('id')}`;   //On récupère les informations du film ou de la série grace aux variables récupérées au préalable

const data = await fetch(apiLink+endApiLink, options) //Pn récupère les données du film ou de la série
    .then(res => res.json())
    .catch(err => console.error(err));

function convertRuntime(time){                 //Fonction qui prend en paramètre un nombre de minutes et qui renvoie une chaine de charactere avec le temps en heures et en minutes
    let runtime = `${(time - time%60)/60}h`;
    if (time%60 < 10){
        runtime += `0`
    }
    runtime += `${time%60}`
    return runtime;
}

//On remplace les valeurs par défaut de la page par les informations fournies par l'API
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
//Condition nécessaire car on ne va pas fournir les memes informations si on a un film ou une série
if (params.get('type') == 'movie'){
    h2.innerHTML = `${data.title} (${data.release_date.slice(0,4)})`;
    dgd.innerHTML = `${prettyDate(data.release_date)}`;
    if (genres != ""){
        dgd.innerHTML += ` - ${genres.slice(0,genres.length-2)}`;
    }
    if (data.runtime != 0){
        dgd.innerHTML += ` - ${convertRuntime(data.runtime)}`;
    }
}
else{
    h2.innerHTML = `${data.name} (${data.first_air_date.slice(0,4)})`;
    dgd.innerHTML = `${prettyDate(data.first_air_date)}`;
    if (genres != ""){
        dgd.innerHTML += ` - ${genres.slice(0,genres.length-2)}`;
    }
    if (data.number_of_episodes != 0){
        dgd.innerHTML += ` - ${data.number_of_episodes} episodes`;
    }
}

let synopsis = document.querySelector("#synopsis");
if (data.overview == ""){
    synopsis.innerHTML += "aucun synopsis diponnible";      //Valeur par défaut si on a pas de synopsis
}
else{
    synopsis.innerHTML += data.overview;
}

let list = document.querySelector(".list");
const dataCredits = await fetch(`${apiLink}/credits${endApiLink}`, options) //On récupère les données des crédits du film ou de la série
    .then(res => res.json())
    .catch(err => console.error(err));

if (dataCredits.cast.length == 0){
     list.innerHTML = `<p class = "zero_resultat">Aucun acteur recensé</p>` //Valeur par défaut si on ne trouve aucun acteur
}
else{
    let limit = dataCredits.cast.length;
    if (limit > 8){ //On affiche au maximum 8 acteurs
        limit = 8;
    }
    for (let i = 0; i < limit; i++){ 
        let profilePath = "./media/poster.webp";
        if (dataCredits.cast[i].profile_path != null){
            profilePath = `https://image.tmdb.org/t/p/original${dataCredits.cast[i].profile_path}`;
        }
        list.innerHTML +=`
            <article>
            <a href = "./actor.html?id=${dataCredits.cast[i].id}">
                <img src = "${profilePath}" alt="Portrait" class = "poster">
            </a>
            <p class = "movieTitle">${dataCredits.cast[i].name}</p>
            <p class = "movieDate">${dataCredits.cast[i].character}</p>
            </article>
        `;
    }
}