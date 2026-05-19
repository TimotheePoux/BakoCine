const apiLinkBase = 'https://api.themoviedb.org/3/'; //lien de l'api que l'on va agrémenter en fonction de ce que l'on veut chercher
const white = "#ffffff"
const color = "#032541"
let buttons = [];
let lists = [];
lists[0] = document.querySelector('#tendances');
buttons[0] = lists[0].querySelectorAll('button');
lists[1] = document.querySelector('#tv');
buttons[1] = lists[1].querySelectorAll('button');
lists[2] = document.querySelector('#films');
buttons[2] = lists[2].querySelectorAll('button');

const trending = await fetch(`${apiLinkBase}trending/all/day`, options) //on récupère la liste des tendances
  .then(res => res.json())
  .catch(err => console.error(err));
console.log(trending.results);
let search = document.querySelector('#search');
search.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${trending.results[0].backdrop_path})`; //on met comme fond de la barre de recherche le film ou la série la plus en tendance du moment

//au chargement de la page, on remplit les 3 listes avec les reglages par défaut
fillList(`${apiLinkBase}trending/all/day`, lists[0]);
fillList(`${apiLinkBase}tv/top_rated`, lists[1]);
fillList(`${apiLinkBase}movie/top_rated`, lists[2]);

buttons.forEach(button => {
  //au chargement de la page, on affiche le premier bouton activé
  button[0].style.color = white;
  button[0].style.backgroundColor = color;

  button[0].addEventListener('click', ()=>{
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
resultsSection.style.display = "none";
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

filterButtons[0].addEventListener('click', ()=>{
  filterButtons[0].style.color = white;
  filterButtons[0].style.backgroundColor = color;
  filterButtons[1].style.color = color;
  filterButtons[1].style.backgroundColor = white;
  listResultsMovies.style.display = "flex";
  listResultsTV.style.display = "none";
});
  
filterButtons[1].addEventListener('click', ()=>{
  filterButtons[1].style.color = white;
  filterButtons[1].style.backgroundColor = color;
  filterButtons[0].style.color = color;
  filterButtons[0].style.backgroundColor = white;
  listResultsMovies.style.display = "none";
  listResultsTV.style.display = "flex";
});

if (search_input.value != ""){
  research(search_input.value);
}

async function fillList(apiLink, section){ //fonction qui remplit une liste de tendances avec les films/séries spécifiées par le lien prit en paramètre
  const data = await fetch(apiLink, options) //récupère la liste des tendances grace au lien de l'api pris en paramètre
    .then(res => res.json())
    .catch(err => console.error(err));
  
  let list = section.querySelector(".list");
  list.innerHTML = "";

  for (let i = 0; i<4; i++){
    let posterPath = "./poster.webp";
    if (data.results[i].poster_path != null){
      posterPath = `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`;
    }
    let titre = "";
    let date = "";
    //condition nécéssaire car l'api ne donne pas le même nom au titre et à la date en fonction de si on a un film ou une séries
    if (data.results[i].media_type == "movie"){
      titre = data.results[i].title;
      date = prettyDate(data.results[i].release_date);
    }
    else if (data.results[i].media_type == "tv"){
      titre = data.results[i].name;
      date = prettyDate(data.results[i].first_air_date);
    }
    //On crée un article qui contient les informations fournies par l'API
    list.innerHTML +=`
    <article>
      <a href = "./movie.html?type=${data.results[i].media_type}&id=${data.results[i].id}">
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

async function research(toSearch){
  resultsSection.style.display = "block";
  filterButtons[0].style.color = white;
  filterButtons[0].style.backgroundColor = color;
  filterButtons[1].style.color = color;
  filterButtons[1].style.backgroundColor = white;
  listResultsMovies.style.display = "flex";
  listResultsTV.style.display = "none";
  
  const urlMovies = `https://api.themoviedb.org/3/search/movie?query=${toSearch}`;
  const responseMovies = await fetch(urlMovies, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  let dataMovies = await responseMovies.json();
  console.log(dataMovies.results);
  listResultsMovies.innerHTML = "";
  if (dataMovies.results.length == 0){
    listResultsMovies.innerHTML = `<p class = "zero_resultat">Aucun réultat trouvé<\p>`;
  }
  else{
    for (let i = 0; i < dataMovies.results.length; i++){
      let posterPath = "./poster.webp";
      if (dataMovies.results[i].poster_path != null){
        posterPath = `https://image.tmdb.org/t/p/original${dataMovies.results[i].poster_path}`;
      }
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

  const urlTV = `https://api.themoviedb.org/3/search/tv?query=${toSearch}`;
  const responseTV = await fetch(urlTV, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  let dataTV = await responseTV.json();
  
  listResultsTV.innerHTML = "";
  if (dataTV.results.length == 0){
    listResultsTV.innerHTML = `<p class = "zero_resultat">Aucun réultat trouvé<\p>`;
  }
  else{
    for (let i = 0; i < dataTV.results.length ; i++){
      let posterPath = "";
      if (dataTV.results[i].poster_path == null){
        posterPath = "./poster.webp";
      }
      else{
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
}