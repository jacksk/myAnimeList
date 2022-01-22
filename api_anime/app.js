const base_url = "https://api.jikan.moe/v3";


function searchAnime(event){

    event.preventDefault();

    const form = new FormData(this);
    const query = form.get("search");

    console.log(query);

    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message));
}

function updateDom(data){
    data.results.forEach(anime=>console.log(anime));

    const searchResults = document.getElementById('search-results');

    searchResults.innerHTML = data.results
        .sort((a,b)=> a.episodes-b.episodes)
        .map(anime=>{
            return `
                <div class="card">
                    <div class="card-image">
                        <img src="${anime.image_url}">
                    </div>
                    <div class="card-content">
                        <span class="card-title">${anime.title}</span>
                        <p>${anime.synopsis}</p>
                    </div>
                    <div class="card-action">
                        <a href="${anime.url}">Find out more</a>
                    </div>
                </div>
            `
        })
}

function pageLoaded(){
    const form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);