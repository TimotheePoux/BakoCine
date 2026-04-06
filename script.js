const apiLink = 'https://api.themoviedb.org/3/movie/popular';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjhjZjZkMGQxZGM3MThiY2Y5MzQzYmUyZWMwMTgxYiIsIm5iZiI6MTc3NDczNjgwNS45NTM5OTk4LCJzdWIiOiI2OWM4NTVhNTk5NWY3YzRiM2ExMTAwM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NTbXlXBMNXFRJo180TmR4OmjIvwidxVVo7URZssCnLk'
  }
};

const data = await fetch(apiLink, options)
  .then(res => res.json())
  .catch(err => console.error(err));
console.log('Données récupérées :', data); //vérifie que les donnés sont bien récupérées

let search = document.querySelector('#search');
search.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.results[0].backdrop_path})`;

let poster = document.querySelectorAll('img');
let title = document.querySelectorAll('.movieTitle');
let date = document.querySelectorAll('.movieDate');
let note = document.querySelectorAll('.movieNote');
for (let i = 0; i<4; i++){
poster[i].src = `https://image.tmdb.org/t/p/original${data.results[i].poster_path}`;
title[i].innerHTML = data.results[i].title;
date[i].innerHTML = data.results[i].release_date;
note[i].innerHTML = `${Math.round(data.results[i].vote_average*10)}%`;
}