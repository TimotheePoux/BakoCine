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

let poster = document.querySelector('img');
poster.src = `https://image.tmdb.org/t/p/original${data.results[0].poster_path}`;
let title = document.querySelector('.movieTitle');
title.innerHTML = data.results[0].title;
let date = document.querySelector('.movieDate');
date.innerHTML = data.results[0].release_date;
let note = document.querySelector('.movieNote');
note.innerHTML = `${data.results[0].vote_average*10}%`;