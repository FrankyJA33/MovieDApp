const sectionTradingPreview = document.querySelector('#trendingPreview .trendingPreview-movieList');
const sectionCategoriesPreview = document.querySelector('#categoriesPreview .categoriesPreview-list');

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf8',
    },
    params: {
        'api_key': API_KEY,
    },
});

const getTrendingMoviePreview = async () => {
    const { data } = await api.get('/trending/movie/day');
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
    const { data, status } = await api.get('/genre/movie/list');
    const categories = data.genres;
    categories.forEach(element => {
        sectionCategoriesPreview.innerHTML += `
            <div class="category-container">
                <h3 id="id${element.id}" class="category-title">${element.name}</h3>
            </div>
        `;
    });
}

