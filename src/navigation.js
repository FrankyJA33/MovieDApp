/*
Location Propiedad del navegador de JS que permite leer la URL en la que nos encontramos actualmente, entre sus propiedades está el hash, puerto, ruta, etc

haschange: Permite que ejecutemos cierto código cada vez que cambie nuestro hash
*/

const navigation = () => {
    if(location.hash.startsWith('#trends')){
        trendsPage();
    }else if(location.hash.startsWith('#search=')){
        searchPage();
    }else if(location.hash.startsWith('#movie=')){
        moviehPage();
    }else if(location.hash.startsWith('#category=')){
        categoryPage();
    }else {
        homePage();
    }
}

const homePage = () => {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getMovies(trendingMoviesPreviewList,'/trending/movie/day');
    getCategoriesPreview();
}

const categoryPage = () => {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [poster_path, idnc] = location.hash.split('='); // idnc = id-nameCategory
    const [id, nameCategory] = idnc.split('-');
    headerCategoryTitle.innerHTML = nameCategory
    getMovies(genericSection,`/discover/movie?with_genres=${id}`);
    window.scrollTo(0, 0); //* Permite mandar al usuario hasta el incion de la pagina
}

const moviehPage = () => {
    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}

const searchPage = () => {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    const [_, query] = location.hash.split('=');
    getMovies(genericSection,`/search/movie?query=${query}`);

    if(historial.length != 0){
        searchPlaceholderWait();
    }
}

const trendsPage = () => {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
}

const searchPlaceholderWait = () => {
    setTimeout(() => {
        searchFormInput.value = '';
        searchFormInput.setAttribute('placeholder', historial[historial.length-1]);
    },2000);
}

const historial = []; // Tambien podemos hacer el historial con history.back()
searchFormBtn.addEventListener('click', () => {
    location.hash = `#search=${searchFormInput.value}`;
    historial.push(searchFormInput.value);
    navigation()
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
    navigation()
});
arrowBtn.addEventListener('click', () => {
    if(historial.length == 0){
        location.hash = '#home';
    }else if(historial.length == 1){
        location.hash = '#home';
        searchFormInput.value = '';
        searchFormInput.setAttribute('placeholder', 'Buscar');
        historial.pop();
    }else{
        location.hash = `#search=${historial[historial.length-2]}`;
        searchFormInput.value = '';
        searchFormInput.setAttribute('placeholder', historial[historial.length-2]);
        historial.pop();
    }
    navigation()
});
window.addEventListener('DOMContentLoaded', navigation());
window.addEventListener('hashchange', navigation());