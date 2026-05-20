const apiLinkBase = 'https://api.themoviedb.org/3/'; //lien de l'api que l'on va agrémenter en fonction de ce que l'on veut chercher
const white = "#ffffff"
const color = "#032541"
let buttons = [];   //liste qui stocke les boutons de filtrage
let lists = [];     //liste qui stocke les listes de films/séries/tendances
lists[0] = document.querySelector('#tendances');
buttons[0] = lists[0].querySelectorAll('button');
lists[1] = document.querySelector('#tv');
buttons[1] = lists[1].querySelectorAll('button');
lists[2] = document.querySelector('#films');
buttons[2] = lists[2].querySelectorAll('button');

const trending = await fetch(`${apiLinkBase}trending/all/day${endApiLink}`, options) //On récupère la liste des tendances
  .then(res => res.json())
  .catch(err => console.error(err));

let search = document.querySelector('#search');
search.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${trending.results[0].backdrop_path})`; //On met comme fond de la barre de recherche le film ou la série la plus en tendance du moment

//Au chargement de la page, on remplit les 3 listes avec les reglages par défaut
fillList(`${apiLinkBase}trending/all/day`, lists[0]);
fillList(`${apiLinkBase}tv/top_rated`, lists[1]);
fillList(`${apiLinkBase}movie/top_rated`, lists[2]);

buttons.forEach(button => {
  //Au chargement de la page, on affiche les premier bouton activés
  button[0].style.color = white;
  button[0].style.backgroundColor = color;

  button[0].addEventListener('click', ()=>{    //Si on appuie sur un bouton, on lance la fonction fillList avec la value du bouton et on change leur apparence
    button[0].style.color = white;
    button[0].style.backgroundColor = color;
    button[1].style.color = color;
    button[1].style.backgroundColor = white;
    let index = buttons.indexOf(button);
    fillList(`${apiLinkBase}${button[0].value}`, lists[index]);
  });

  button[1].addEventListener('click', ()=>{
    button[1].style.color = white;
    button[1].style.backgroundColor = color;
    button[0].style.color = color;
    button[0].style.backgroundColor = white;
    let index = buttons.indexOf(button)
    fillList(`${apiLinkBase}${button[1].value}`, lists[index]);
  });
});

let resultsSection = document.querySelector('#research_results')
let search_input = document.querySelector('#search-input');
let search_button = document.querySelector('#search-button');
let filterButtons = resultsSection.querySelectorAll('button');
let listResultsMovies = document.querySelector("#listResultsMovies");
let listResultsTV = document.querySelector("#listResultsTV");
let listResultsPerson = document.querySelector("#listResultsPeople");
resultsSection.style.display = "none";
//Si on appuie sur la l'icone de loupe ou sur entrée, ça lance une recherche
search_button.addEventListener('click', ()=>{
  if (search_input.value != ""){
    research(search_input.value);
  }
  else{
    resultsSection.style.display = "none";
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (search_input.value != ""){
    research(search_input.value);
    }
    else{
    resultsSection.style.display = "none";
    }
  }
});

//Fonctionnement des boutons de filtrage pour la recherche
filterButtons[0].addEventListener('click', ()=>{
  filterButtons[0].style.color = white;
  filterButtons[0].style.backgroundColor = color;
  filterButtons[1].style.color = color;
  filterButtons[1].style.backgroundColor = white;
  filterButtons[2].style.color = color;
  filterButtons[2].style.backgroundColor = white;
  listResultsMovies.style.display = "flex";
  listResultsTV.style.display = "none";
  listResultsPerson.style.display = "none";
});
  
filterButtons[1].addEventListener('click', ()=>{
  filterButtons[0].style.color = color;
  filterButtons[0].style.backgroundColor = white;
  filterButtons[1].style.color = white;
  filterButtons[1].style.backgroundColor = color;
  filterButtons[2].style.color = color;
  filterButtons[2].style.backgroundColor = white;
  listResultsMovies.style.display = "none";
  listResultsTV.style.display = "flex";
  listResultsPerson.style.display = "none";
});

filterButtons[2].addEventListener('click', ()=>{
  filterButtons[0].style.color = color;
  filterButtons[0].style.backgroundColor = white;
  filterButtons[1].style.color = color;
  filterButtons[1].style.backgroundColor = white;
  filterButtons[2].style.color = white;
  filterButtons[2].style.backgroundColor = color
  listResultsMovies.style.display = "none";
  listResultsTV.style.display = "none";
  listResultsPerson.style.display = "flex";
});

//Lance une recherche au chargement de la page si la barre de recherche est déjà remplie
if (search_input.value != ""){
  research(search_input.value);
}

async function fillList(apiLink, section){ //Fonction qui remplit une liste avec les films/séries spécifiées par le lien prit en paramètre
  const data = await fetch(apiLink+endApiLink, options) //Récupère la liste grace au lien de l'api pris en paramètre
    .then(res => res.json())
    .catch(err => console.error(err));
  
  let list = section.querySelector(".list");
  list.innerHTML = "";      //On rénitialise ce que contient la liste

  for (let i = 0; i<4; i++){      //On met 4 articles par liste
    let posterPath = "./media/poster.webp";   //Place holder si on n'a pas de poster à disposition
    if (data.results[i].poster_path != null){
      posterPath = `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`;
    }

    let titre = "";
    let date = "";
    let href = "";
    //Condition nécéssaire car l'api ne donne pas le même nom au titre et à la date en fonction de si on a un film ou une séries
    if ("title" in data.results[i]){
      titre = data.results[i].title;
      date = prettyDate(data.results[i].release_date);
      href = `./movie.html?type=movie&id=${data.results[i].id}`;
    }
    else {
      titre = data.results[i].name;
      date = prettyDate(data.results[i].first_air_date);
      href = `./movie.html?type=tv&id=${data.results[i].id}`;
    }
    //On crée un article qui contient les informations fournies par l'API
    list.innerHTML +=`
    <article>
      <a href = ${href}>
        <img src = "${posterPath}" alt="Affiche" class = "poster">
        <div class = "divNote">
          <p class = "movieNote">${Math.round(data.results[i].vote_average*10)}%</p>
        </div>
      </a>
      <p class = "movieTitle">${titre}</p>
      <p class = "movieDate">${date}</p>
    </article>
    `;
  }
}

async function research(toSearch){          //Fonction qui va afficher les résultats d'une recherche
  resultsSection.style.display = "block";   //Affichage des résultats
  //Les résultats son par défaut des films
  filterButtons[0].style.color = white;
  filterButtons[0].style.backgroundColor = color;
  filterButtons[1].style.color = color;
  filterButtons[1].style.backgroundColor = white;
  filterButtons[2].style.color = color;
  filterButtons[2].style.backgroundColor = white;
  listResultsMovies.style.display = "flex";
  listResultsTV.style.display = "none";
  listResultsPerson.style.display = "none";
  
  const urlMovies = `https://api.themoviedb.org/3/search/movie${endApiLink}&query=${toSearch}`;   //On récupère le lien correspondant à la recherche des films
  const responseMovies = await fetch(urlMovies, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  let dataMovies = await responseMovies.json();

  listResultsMovies.innerHTML = "";
  if (dataMovies.results.length == 0){
    listResultsMovies.innerHTML = `<p class = "zero_resultat">Aucun réultat trouvé</p>`;    //Si on obtient aucun résultat
  }
  else{
    for (let i = 0; i < dataMovies.results.length; i++){
      let posterPath = "./media/poster.webp";       //Placeholder si on a pas de poster à disposition
      if (dataMovies.results[i].poster_path != null){
        posterPath = `https://image.tmdb.org/t/p/original${dataMovies.results[i].poster_path}`;
      }
      //Ajout d'un article contenant les valeurs fournies par l'API
      listResultsMovies.innerHTML +=`
        <article>
          <a href = "./movie.html?type=movie&id=${dataMovies.results[i].id}">
            <img src = "${posterPath}" alt="Affiche" class = "poster">
            <div class = "divNote">
              <p class = "movieNote">${Math.round(dataMovies.results[i].vote_average*10)}%</p>
            </div>
          </a>
          <p class = "movieTitle">${dataMovies.results[i].title}</p>
          <p class = "movieDate">${prettyDate(dataMovies.results[i].release_date)}</p>
          </article>
      `;
    }
  }

  //Même logique mais pour les séries
  const urlTV = `https://api.themoviedb.org/3/search/tv${endApiLink}&query=${toSearch}`;
  const responseTV = await fetch(urlTV, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  let dataTV = await responseTV.json();
  
  listResultsTV.innerHTML = "";
  if (dataTV.results.length == 0){
    listResultsTV.innerHTML = `<p class = "zero_resultat">Aucun réultat trouvé</p>`;
  }
  else{
    for (let i = 0; i < dataTV.results.length ; i++){
      let posterPath = "./media/poster.webp";
      if (dataTV.results[i].poster_path != null){
        posterPath = `https://image.tmdb.org/t/p/original${dataTV.results[i].poster_path}`;
      }
      listResultsTV.innerHTML +=`
        <article>
          <a href = "./movie.html?type=tv&id=${dataTV.results[i].id}">
            <img src = "${posterPath}" alt="Affiche" class = "poster">
            <div class = "divNote">
              <p class = "movieNote">${Math.round(dataTV.results[i].vote_average*10)}%</p>
            </div>
          </a>
          <p class = "movieTitle">${dataTV.results[i].name}</p>
          <p class = "movieDate">${prettyDate(dataTV.results[i].first_air_date)}</p>
          </article>
      `;
    }
  }

  //Même logique mais pour les acteurs
  const urlPerson = `https://api.themoviedb.org/3/search/person${endApiLink}&query=${toSearch}`;
  const responsePerson = await fetch(urlPerson, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  let dataPerson = await responsePerson.json();

  listResultsPerson.innerHTML = "";
  if (dataPerson.results.length == 0){
    listResultsPerson.innerHTML = `<p class = "zero_resultat">Aucun réultat trouvé</p>`;
  }
  else{
    for (let i = 0; i < dataPerson.results.length ; i++){
      let portraitPath = "./media/poster.webp";
      if (dataPerson.results[i].profile_path != null){
        portraitPath = `https://image.tmdb.org/t/p/original${dataPerson.results[i].profile_path}`;
      }
      listResultsPerson.innerHTML +=`
        <article>
          <a href = "./actor.html?id=${dataPerson.results[i].id}">
            <img src = "${portraitPath}" alt="Affiche" class = "poster">
          </a>
          <p class = "movieTitle">${dataPerson.results[i].name}</p>
          </article>
      `;
    }
  }
}