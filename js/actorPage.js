const params = new URLSearchParams(window.location.search); //On récupère les variables dans l'adresse

const apiLink = `https://api.themoviedb.org/3/person/${params.get('id')}`;  //On récupère le lien de l'acteur à partir d'un id

const data = await fetch(apiLink+endApiLink, options)
    .then(res => res.json())
    .catch(err => console.error(err));

;

function afficherGenre(genre){ //Fonction qui prend en parametre un nombre et qui renvoie le genre associé
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
    if (data.birthday != null){                             //On rajoute les dates de naissance et de morts uniquement si on les a
        gnm.innerHTML += `, ${prettyDate(data.birthday)}`;
    }
    if (data.deathday != null){
        gnm.innerHTML += ` - ${prettyDate(data.deathday)}`;
    }

let biographie = document.querySelector("#biographie");
if (data.biography == ""){
    biographie.innerHTML += "Aucune biographie diponnible"; //Placeholder si on a pas de biographie
}
else{
    biographie.innerHTML += data.biography;
}