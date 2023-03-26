const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf8',
    },
    params: {
        'api_key': API_KEY,
    },
});

// En esta clase se encuentra getTrendingMoviePreview y getMovieByCategory
const getMovies = async (Element,url) => {
    const { data } = await api.get(url); // En navigation.js esta la url
    const movies = data.results;
    Element.innerHTML = '';
    movies.forEach(element => {
        Element.innerHTML += `
            <div class="movie-container" onclick="detailMovie(${element.id})">
                <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="${element.title}" class="movie-img">
            </div>
        `;
    });
}

const getCategoriesPreview = async (url,Element) => {
    const { data, status } = await api.get(url);
    const categories = data.genres;
    Element.innerHTML = '';
    categories.forEach(element => {
        Element.innerHTML += `
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

const detailMovie = (id) => {
    location.hash = `#movie=${id}`;
    moviehPage();
}

const getMovieById = async (id) => {
    const { data, status } = await api.get(`/movie/${id}`);
    
    //! El linear-gradient que se esta poniendo aqui es simpelmente para que la parte superior en el header se torne un poquito mas oscuro con el propocito de notar la flechita de atras en todo momento
    headerSection.style.background = `
        linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%), 
        url(https://image.tmdb.org/t/p/w500${data.poster_path})
    `;
    movieDetailTitle.innerHTML = data.title;
    movieDetailDescription.innerHTML = data.overview;
    movieDetailScore.innerHTML = data.vote_average;
    getCategoriesPreview(`/movie/${id}`,movieDetailCategoriesList);
}