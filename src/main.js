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
const getMovies = async (container,url,lazyLoad=false) => {
    const { data } = await api.get(url); // En navigation.js esta la url
    const movies = data.results;
    container.innerHTML = '';
    movies.forEach(movie => {
        // container.innerHTML += `
        //     <div class="movie-container" onclick="detailMovie(${movie.id})">
        //         <img data-img="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.title}" class="movie-img">
                
        //     </div>
        // `;
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
            moviehPage();
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(lazyLoad ? 'data-img' : 'src',
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        );

        if(lazyLoad){
            lazyLoader.observe(movieImg);
        }

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

const getCategoriesPreview = async (url,container) => {
    const { data, status } = await api.get(url);
    const categories = data.genres;
    container.innerHTML = '';
    categories.forEach(element => {
        container.innerHTML += `
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

// const detailMovie = (id) => {
//     location.hash = `#movie=${id}`;
//     moviehPage();
// }

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
    getMovies(relatedMoviesContainer,`/movie/${id}/similar`,1); //getRelatedMoviesById obtiene las peliculas similares o recomendadas a la pelicula seleccionada
}

// const callback = (entries) => {
//     entries.forEach(element => {
//         if (entry.isIntersecting) {
//             const url = entry.target.getAttribute('data-img')
//             entry.target.setAttribute('src', url);
//         }
//     });
// }
// funcion flecha en vez de callback
const lazyLoader = new IntersectionObserver((entries) => {
    // entries: se refiere al elemento que se observa
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url);
        }
    });
});