const tvShowInput = document.getElementById('tv-show-input');
const recommendButton = document.getElementById('recommend-button');
const recommendationsList = document.getElementById('recommendations-list');

recommendButton.addEventListener('click', async() => {
    const tvShow = tvShowInput.value.trim();
    if(tvShow === '') {
        alert("Please enter a TV show.");
        return;
    }
    const shows = await getRecommendations(tvShow);
    displayRecommendations(shows);
});

async function getRecommendations(tvShow) {
    const apiKey = "9057cf76a0f4698dd3c5d50c15b617fc";
    const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(tvShow)}`);
    const data = await response.json();
    const tvShowId = data.results[0].id;
    const recommendationsResponse = await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?api_key=${apiKey}`);
    const recommendationsData = await recommendationsResponse.json();
    return recommendationsData.results;
}

function displayRecommendations(shows) {
    recommendationsList.innerHTML = '';
    for(const show of shows) {
        const li = document.createElement('li');
        li.classList.add('recommendation');
        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w185${show.poster_path}`;
        const info = document.createElement('div');
        info.classList.add('info');
        const h3 = document.createElement('h3');
        h3.textContent = show.name;
        const p = document.createElement('p');
        p.textContent = show.overview;
        info.appendChild(h3);
        info.appendChild(p);
        li.appendChild(img);
        li.appendChild(info);
        recommendationsList.appendChild(li);
    }
}