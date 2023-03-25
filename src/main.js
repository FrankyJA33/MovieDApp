const sectionTradingPreview = document.querySelector('#trendingPreview .trendingPreview-movieList');
const sectionCategoriesPreview = document.querySelector('#categoriesPreview .categoriesPreview-list');

const getTrendingMoviePreview = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
    const data = await response.json();

    const movies = data.results;
    movies.forEach(element => {
        sectionTradingPreview.innerHTML += `
        <div class="movie-container">
            <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="${element.title}" class="movie-img">
        </div>
        `;
    });
}

const getCategoriesPreview = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const data = await response.json();

    const categories = data.genres;
    categories.forEach(element => {
        sectionCategoriesPreview.innerHTML += `
            <div class="category-container">
                <h3 id="id${element.id}" class="category-title">${element.name}</h3>
            </div>
        `;
    });
}
getTrendingMoviePreview();
getCategoriesPreview();
