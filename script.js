const apiPopulars = 'https://api.themoviedb.org/3/movie/popular'; //lien vers une liste des films les plus populaires
const apiTrendings = 'https://api.themoviedb.org/3/trending/' // lien vers la liste des tendances (à compléter avec la catégorie et la période de temps)
const trendingsCategories = ['all', 'tv', 'movie'] //les catégories de tendances
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

const options = { //options nécéssaires lorsqu'on fetch une API
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjhjZjZkMGQxZGM3MThiY2Y5MzQzYmUyZWMwMTgxYiIsIm5iZiI6MTc3NDczNjgwNS45NTM5OTk4LCJzdWIiOiI2OWM4NTVhNTk5NWY3YzRiM2ExMTAwM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NTbXlXBMNXFRJo180TmR4OmjIvwidxVVo7URZssCnLk'
  }
};

const populars = await fetch(apiPopulars, options) //on récupère la liste des films les plus populaires
  .then(res => res.json())
  .catch(err => console.error(err));

let search = document.querySelector('#search');
search.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${populars.results[0].backdrop_path})`; //on met comme fond de la barre de recherche le film le plus populaire du moment

//au chargement de la page, on remplit les 3 listes avec les tendances du jour
fillList(`${apiTrendings}${trendingsCategories[0]}/day`, lists[0]);
fillList(`${apiTrendings}${trendingsCategories[1]}/day`, lists[1]);
fillList(`${apiTrendings}${trendingsCategories[2]}/day`, lists[2]);

buttons.forEach(button => {
  //au chargement de la page, on affiche le bouton "Aujourd'hui" actionné
  button[0].style.color = white;
  button[0].style.backgroundColor = color;
  //si on appuie sur le bouton "Aujourd'hui", on remplit la liste avec les tendances du jour
  button[0].addEventListener('click', ()=>{
    button[0].style.color = white;
    button[0].style.backgroundColor = color;
    button[1].style.color = color;
    button[1].style.backgroundColor = white;
    let index = buttons.indexOf(button);
    fillList(`${apiTrendings}${trendingsCategories[index]}/day`, lists[index]);
  });
  //si on appuie sur le bouton "Cette semaine", on remplit la liste avec les tendances de la semaine
  button[1].addEventListener('click', ()=>{
    button[1].style.color = white;
    button[1].style.backgroundColor = color;
    button[0].style.color = color;
    button[0].style.backgroundColor = white;
    let index = buttons.indexOf(button)
    fillList(`${apiTrendings}${trendingsCategories[index]}/week`, lists[index]);
  });
});

function numberToMonth(nb){//fonction qui prend en entrée une chaine de caratères correspondant à un numéro de mois et qui renvoie le nom du mois correspondant
  switch (nb) {
    case '01':
      return 'janvier'
    case '02':
      return 'février'
    case '03':
      return 'mars'
    case '04':
      return 'avril'
    case '05':
      return 'mai'
    case '06':
      return 'juin'
    case '07':
      return 'juillet'
    case '08':
      return 'août'
    case '09':
      return 'septembre'
    case '10':
      return 'octobre'
    case '11':
      return 'novembre'
    case '12':
      return 'décembre'
    default:
      return 'error';
  }
}

function prettyDate(date){ //fonction qui change le format d'affichage des dates (année-mois-jour → jour mois année)
  return `${date.slice(8,10)} ${numberToMonth(date.slice(5,7))} ${date.slice(0,4)}`;
}

async function fillList(apiLink, section){ //fonction qui remplit une liste de tendances avec les films/séries spécifiées par le lien prit en paramètre
  const data = await fetch(apiLink, options) //récupère la liste des tendances grace au lien de l'api pris en paramètre
    .then(res => res.json())
    .catch(err => console.error(err));
  //récupère les éléments de la page html qui devront être modifiés
  let poster = section.querySelectorAll('img');
  let title = section.querySelectorAll('.movieTitle');
  let date = section.querySelectorAll('.movieDate');
  let note = section.querySelectorAll('.movieNote');
  //remplace les valeurs de défaut par les valeurs fournies par l'api
  for (let i = 0; i<4; i++){
    poster[i].src = `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`;
    note[i].innerHTML = `${Math.round(data.results[i].vote_average*10)}%`;
    //condition nécéssaire car l'api ne donne pas le même nom au titre et à la date en fonction de si on a un film ou une séries
    if (data.results[i].media_type == "movie"){
      title[i].innerHTML = data.results[i].title;
      date[i].innerHTML = prettyDate(data.results[i].release_date);
    }
    else if (data.results[i].media_type == "tv"){
      title[i].innerHTML = data.results[i].name;
      date[i].innerHTML = prettyDate(data.results[i].first_air_date);
    }
  }
}