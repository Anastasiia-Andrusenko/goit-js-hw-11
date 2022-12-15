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


// --------- function on submit
const onSearch = async evt => {
  evt.preventDefault();

  newsApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();

  try {
    const data = await newsApiService.fetchImages();
    console.log(data);
    const totalImages = data.totalHits;
    let totalPages = Math.ceil(totalImages / data.hits.length) || null;

    if (data.hits.length === 0) {
      
      return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else if (newsApiService.page === totalPages) {

      clearMarkup();
      renderImgsList(data.hits);
      lightbox.refresh();
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      refs.btnLoadMore.classList.add('visually-hidden');
    } else {

      clearMarkup();
      renderImgsList(data.hits);
      lightbox.refresh();
      Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`);
      showButton();
    };

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  } catch (error) {
    console.log(error);
  };
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
    lightbox.refresh();
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

// --------- ДОДАЄМО СЛУХАЧА ПОДІЙ НА САБМІТ
refs.form.addEventListener('submit', onSearch);