const params = new URLSearchParams(window.location.search);

const options = { //options nécéssaires lorsqu'on fetch une API
    method: 'GET',
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjhjZjZkMGQxZGM3MThiY2Y5MzQzYmUyZWMwMTgxYiIsIm5iZiI6MTc3NDczNjgwNS45NTM5OTk4LCJzdWIiOiI2OWM4NTVhNTk5NWY3YzRiM2ExMTAwM2MiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NTbXlXBMNXFRJo180TmR4OmjIvwidxVVo7URZssCnLk'
  }
};

const apiLink = `https://api.themoviedb.org/3/${params.get('type')}/${params.get('id')}`;

const data = await fetch(apiLink, options) //on récupère les données du film ou de la série
    .then(res => res.json())
    .catch(err => console.error(err));

console.log(data);

function convertRuntime(time){
    let runtime = `${(time - time%60)/60}h`;
    if (time%60 < 10){
        runtime += `0`
    }
    runtime += `${time%60}`
    return runtime;
}

let presentation = document.querySelector("#presentation")
presentation.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`;

let poster = document.querySelector("#poster");
poster.src = `https://image.tmdb.org/t/p/original${data.poster_path}`;

let movieNote = document.querySelector(".movieNote");
movieNote.innerHTML = `${Math.round(data.vote_average*10)}%`;

let h2 = document.querySelector("h2");
let dgd = document.querySelector("#dgd");
let genres = "";
data.genres.forEach(genre => {
    genres += `${genre.name}, `;
});
if (params.get('type') == 'movie'){
    h2.innerHTML = `${data.title} (${data.release_date.slice(0,4)})`;
    dgd.innerHTML = `${prettyDate(data.release_date)} - ${genres.slice(0,genres.length-2)} - ${convertRuntime(data.runtime)}`;
}
else{
    h2.innerHTML = `${data.name} (${data.first_air_date.slice(0,4)})`;
    dgd.innerHTML = `${prettyDate(data.first_air_date)} - ${genres.slice(0,genres.length-2)} - ${data.number_of_episodes} episodes`;
}




let synopsis = document.querySelector("#synopsis");
synopsis.innerHTML += data.overview;