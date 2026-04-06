const apiPopulars = 'https://api.themoviedb.org/3/movie/popular';
const apiTrendingsDay = 'https://api.themoviedb.org/3/trending/all/day';
const apiTrendingsWeek = 'https://api.themoviedb.org/3/trending/all/week';
let tendances = document.querySelector('#tendances');

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

function numberToMonth(nb){
  switch (nb) {
    case '01':
      return 'janv'
    case '02':
      return 'févr'
    case '03':
      return 'mars'
    case '04':
      return 'avr'
    case '05':
      return 'mai'
    case '06':
      return 'juin'
    case '07':
      return 'juil'
    case '08':
      return 'août'
    case '09':
      return 'sept'
    case '10':
      return 'oct'
    case '11':
      return 'nove'
    case '12':
      return 'déce'
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