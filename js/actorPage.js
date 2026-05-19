const params = new URLSearchParams(window.location.search);

const apiLink = `https://api.themoviedb.org/3/person/${params.get('id')}`;

const data = await fetch(apiLink, options) //on récupère les données du film ou de la série
    .then(res => res.json())
    .catch(err => console.error(err));

;

function afficherGenre(genre){
    switch(genre){
        case 1:
            return "Femme";
        case 2:
            return "Homme";
        case 3:
            return "Non binaire";
        default:
            return "Genre inconnu"  
    }
}

let portrait = document.querySelector("#portrait");
if (data.profile_path != null){
    portrait.src = `https://image.tmdb.org/t/p/original${data.profile_path}`;
}

let h2 = document.querySelector("h2");
let gnm = document.querySelector("#gnm");
    h2.innerHTML = `${data.name}`;
    gnm.innerHTML = afficherGenre(data.gender);
    if (data.birthday != null){
        gnm.innerHTML += `, ${prettyDate(data.birthday)}`;
    }
    if (data.deathday != null){
        gnm.innerHTML += ` - ${prettyDate(data.deathday)}`;
    }

let biographie = document.querySelector("#biographie");
if (data.biography == ""){
    biographie.innerHTML += "aucune biographie diponnible";
}
else{
    biographie.innerHTML += data.biography;
}