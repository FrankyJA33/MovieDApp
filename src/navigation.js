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
    console.log('HOME');
    getTrendingMoviePreview();
    getCategoriesPreview();
}

const categoryPage = () => {
    console.log('estas en CATEGORIAS');
}

const moviehPage = () => {
    console.log('estas en PELICULAS');
}

const searchPage = () => {
    console.log('estas en BUSQUEDAS');
}

const trendsPage = () => {
    console.log('estas en TREND');
}



window.addEventListener('DOMContentLoaded', navigation());
window.addEventListener('hashchange', navigation());

