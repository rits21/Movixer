const API_KEY="api_key=c06111cb203a340d71259a81b6a0d7f8";
const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&'+API_KEY;
const IMG_URL='https://image.tmdb.org/t/p/w500';
const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');
const searchURL='https://api.themoviedb.org/3/search/movie?'+API_KEY;

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res=>res.json()).then(data=>{
        console.log(data.results);
        // if (!data) return;
        showMovies(data);
    })
}

function showMovies(data){
    main.innerHTML='';
    data.results.forEach(movie => {
        const {title, poster_path, vote_average, overview, id} = movie;
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
            <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <span class="green">
                <svg width="15" height="14" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--star-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>
                ${vote_average}</span>
            </div>
            
            <div class="title">
            <h3>${title}</h3>
            </div>

            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl);
    });
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const searchTerm=search.value;
    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm);
    }
    else{
        getMovies(API_URL);
    }
})
