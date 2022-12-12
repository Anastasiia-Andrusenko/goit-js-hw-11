// --------- ІМПОРТ БІБЛІОТЕК
import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// --------- ІМПОРТ КЛАСА
import NewsApiService from "./news-service";

// --------- ІМПОРТ РЕФІВ
import getRefs from "./get-refs";
const refs = getRefs();

// --------- РОБИМО ЕКЗЕМПЛЯР
const newsApiService = new NewsApiService();




// --------- ОФОРМЛЕННЯ ГАЛЕРЕЇ
import { renderImgsList } from "./renderMarkup";

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});

// --------- ВИКЛИК ФУНКЦІЇ ПРИ ОНОВЛЕННІ СТОРІНКИ
reloudPage();


// --------- ДОДАЄМО СЛУХАЧА ПОДІЙ НА САБМІТ
refs.form.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();

  // --------- звбираємо значення пошука
  newsApiService.query = evt.currentTarget.elements.searchQuery.value;
  
  newsApiService.resetPage();

  newsApiService.fetchImages().then(images => {
    console.log(images);
    
    if (images.length === 0) {
      return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } 

    clearMarkup();
    localStorage.setItem("currentQuery", JSON.stringify(newsApiService.query));
    showButton();
    renderImgsList(images);
  });
};


// --------- ЗАВАНТАЖУЄМО НАСТУПНУ СТОРІНКУ
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onLoadMore() {
  newsApiService.fetchImages().then(images => {
    renderImgsList(images);
  });
}

// ------ Показуєм кнопку

function showButton() {
  refs.btnLoadMore.classList.toggle('visually-hidden');
}



// ------ ФУНКЦІЯ при перезавантаженні сторінки

function reloudPage() {
  const savedCurrentQuery = localStorage.getItem("currentQuery");
  const parsedSavedQuery = JSON.parse(savedCurrentQuery);
  const savedCurrentPage = localStorage.getItem("currentPage");
  const parsedSavedPage = JSON.parse(savedCurrentPage);

  newsApiService.page = parsedSavedPage;
  newsApiService.query = parsedSavedQuery;
  console.log(newsApiService.query);

  if (newsApiService.query !== null) {
    newsApiService.fetchImages().then(images => {
      renderImgsList(images);
      showButton();
    });
  };
};


// ------ ФУНКЦІЯ ОЧИЩЕННЯ РОЗМІТКИ

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

