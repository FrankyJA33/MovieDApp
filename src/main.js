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
    trendingMoviesPreviewList.innerHTML = '';
    movies.forEach(element => {
        trendingMoviesPreviewList.innerHTML += `
            <div class="movie-container">
                <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="${element.title}" class="movie-img">
            </div>
        `;
    });
}

const getCategoriesPreview = async () => {
    const { data, status } = await api.get('/genre/movie/list');
    const categories = data.genres;
    categoriesPreviewList.innerHTML = '';
    categories.forEach(element => {
        categoriesPreviewList.innerHTML += `
            <div class="category-container">
            <h3 id="id${element.id}" class="category-title" onclick="onClickCategories(${element.id},'${element.name}')">${element.name}</h3>
            </div>
        `;
    });
}

const onClickCategories = (id, name) => {
    location.hash = `#category=${id}-${name}`;
    categoryPage();
}

const getMovieByCategory = async (id) => {
    const { data } = await api.get(`/discover/movie?with_genres=${id}`);
    const movies = data.results;
    genericSection.innerHTML = '';
    movies.forEach(element => {
        genericSection.innerHTML += `
            <div class="movie-container">
                <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="${element.title}" class="movie-img">
            </div>
        `;
    });
}



