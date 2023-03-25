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

    getMBCTMP(trendingMoviesPreviewList,'/trending/movie/day');
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

    const [category, idnc] = location.hash.split('='); // idnc = id-nameCategory
    const [id, nameCategory] = idnc.split('-');
    headerCategoryTitle.innerHTML = nameCategory
    getMBCTMP(genericSection,`/discover/movie?with_genres=${id}`);
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
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
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


searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=';
    navigation()
});
trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
    navigation()
});
arrowBtn.addEventListener('click', () => {
    location.hash = '#home';
    navigation()
});
window.addEventListener('DOMContentLoaded', navigation());
window.addEventListener('hashchange', navigation());

