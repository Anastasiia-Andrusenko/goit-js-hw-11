// --------- ІМПОРТ БІБЛІОТЕК
import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// --------- ІМПОРТ КЛАСА
import NewsApiService from "./js/news-service";

// --------- ІМПОРТ РЕФІВ
import getRefs from "./js/get-refs";
const refs = getRefs();


// --------- РОБИМО ЕКЗЕМПЛЯР
const newsApiService = new NewsApiService();



// --------- ОФОРМЛЕННЯ ГАЛЕРЕЇ
import { renderImgsList } from "./js/renderMarkup";

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoom: false,
});
// console.log(lightbox);

// --------- ДОДАЄМО СЛУХАЧА ПОДІЙ НА САБМІТ
refs.form.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();

  // --------- звбираємо значення пошука
  newsApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  
  newsApiService.resetPage();

  newsApiService.fetchImages().then(data => {
    console.log(data);
    const totalImages = data.totalHits;
    
    if (data.hits.length === 0) {

      return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else if (data.hits.length === 40) {

      clearMarkup();
      renderImgsList(data.hits);
      Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
      showButton(); 
    } else if (data.hits.length < 40) {

      clearMarkup();
      renderImgsList(data.hits);
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      refs.btnLoadMore.classList.add('visually-hidden');
    }
  });

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};


// --------- ЗАВАНТАЖУЄМО НАСТУПНУ СТОРІНКУ
refs.btnLoadMore.addEventListener('click', onLoadMore);

function onLoadMore() {
  newsApiService.fetchImages().then(data => {
    if (data.hits.length < 40) {
      renderImgsList(data.hits);
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      refs.btnLoadMore.classList.add('visually-hidden');
    }
    renderImgsList(data.hits);
  });
}


// ------ Показуєм кнопку
function showButton() {
  refs.btnLoadMore.classList.remove('visually-hidden');
}

// ------ ФУНКЦІЯ ОЧИЩЕННЯ РОЗМІТКИ

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

