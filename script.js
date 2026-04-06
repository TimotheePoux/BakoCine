const apiPopulars = 'https://api.themoviedb.org/3/movie/popular';
const apiTrendingsDay = 'https://api.themoviedb.org/3/trending/all/day';
const apiTrendingsWeek = 'https://api.themoviedb.org/3/trending/all/week';
const apiTvDay = 'https://api.themoviedb.org/3/trending/tv/day';
const apiTvWeek = 'https://api.themoviedb.org/3/trending/tv/week';
const apiMoviesDay = 'https://api.themoviedb.org/3/trending/movie/day';
const apiMoviesWeek = 'https://api.themoviedb.org/3/trending/movie/week';
const white = "#ffffff"
const color = "#032541"
let tendances = document.querySelector('#tendances');
let buttonsTendances = tendances.querySelectorAll('button');
let tv = document.querySelector('#tv');
let buttonsTv = tv.querySelectorAll('button');
let movies = document.querySelector('#films');
let buttonsMovies = movies.querySelectorAll('button');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjhjZjZkMGQxZGM3MThiY2Y5MzQzYmUyZWMwMTgxYiIsIm5iZiI6MTc3NDczNjgwNS45NTM5OTk4LCJzdWIiOiI2OWM4NTVhNTk5NWY3YzRiM2ExMTAwM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NTbXlXBMNXFRJo180TmR4OmjIvwidxVVo7URZssCnLk'
  }
};

const populars = await fetch(apiPopulars, options)
  .then(res => res.json())
  .catch(err => console.error(err));

let search = document.querySelector('#search');
search.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${populars.results[0].backdrop_path})`;

fillMoviesList(apiTrendingsDay, tendances);
fillMoviesList(apiTvDay, tv);
fillMoviesList(apiMoviesDay, movies);

buttonsTendances[0].style.color = white;
buttonsTendances[0].style.backgroundColor = color;
buttonsTendances[0].addEventListener('click', ()=>{
  buttonsTendances[0].style.color = white;
  buttonsTendances[0].style.backgroundColor = color;
  buttonsTendances[1].style.color = color;
  buttonsTendances[1].style.backgroundColor = white;
  fillMoviesList(apiTrendingsDay, tendances);
});
buttonsTendances[1].addEventListener('click', ()=>{
  buttonsTendances[1].style.color = white;
  buttonsTendances[1].style.backgroundColor = color;
  buttonsTendances[0].style.color = color;
  buttonsTendances[0].style.backgroundColor = white;
  fillMoviesList(apiTrendingsWeek, tendances);
});

buttonsTv[0].style.color = white;
buttonsTv[0].style.backgroundColor = color;
buttonsTv[0].addEventListener('click', ()=>{
  buttonsTv[0].style.color = white;
  buttonsTv[0].style.backgroundColor = color;
  buttonsTv[1].style.color = color;
  buttonsTv[1].style.backgroundColor = white;
  fillMoviesList(apiTvDay, tv);
});
buttonsTv[1].addEventListener('click', ()=>{
  buttonsTv[1].style.color = white;
  buttonsTv[1].style.backgroundColor = color;
  buttonsTv[0].style.color = color;
  buttonsTv[0].style.backgroundColor = white;
  fillMoviesList(apiTvWeek, tv);
});

buttonsMovies[0].style.color = white;
buttonsMovies[0].style.backgroundColor = color;
buttonsMovies[0].addEventListener('click', ()=>{
  buttonsMovies[0].style.color = white;
  buttonsMovies[0].style.backgroundColor = color;
  buttonsMovies[1].style.color = color;
  buttonsMovies[1].style.backgroundColor = white;
  fillMoviesList(apiMoviesDay, movies);
});
buttonsMovies[1].addEventListener('click', ()=>{
  buttonsMovies[1].style.color = white;
  buttonsMovies[1].style.backgroundColor = color;
  buttonsMovies[0].style.color = color;
  buttonsMovies[0].style.backgroundColor = white;
  fillMoviesList(apiMoviesWeek, movies);
});

function numberToMonth(nb){
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

function prettyDate(date){
  return `${date.slice(8,10)} ${numberToMonth(date.slice(5,7))} ${date.slice(0,4)}`;
}

async function fillMoviesList(apiLink, section){
  const data = await fetch(apiLink, options)
    .then(res => res.json())
    .catch(err => console.error(err));
  console.log('Données récupérées :', data);

  let poster = section.querySelectorAll('img');
  let title = section.querySelectorAll('.movieTitle');
  let date = section.querySelectorAll('.movieDate');
  let note = section.querySelectorAll('.movieNote');
  for (let i = 0; i<4; i++){
    poster[i].src = `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`;
    note[i].innerHTML = `${Math.round(data.results[i].vote_average*10)}%`;
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