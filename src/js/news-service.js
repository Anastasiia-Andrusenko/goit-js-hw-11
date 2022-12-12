const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31929702-f7252bd69ed2023a516a522a7';

import axios from "axios";
import Notiflix from "notiflix";
import getRefs from "./get-refs";
const refs = getRefs();

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  };

  fetchImages() {
    console.log(this);
    return fetch(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
    .then(response => {
      // console.log(response);
      return response.json();
    }).then(data => {
      // console.log(data);
      localStorage.setItem("currentPage", JSON.stringify(this.page));

      // console.log(data.totalHits);
      // if (data.totalHits <= Number(this.page) * 40) {
      //   refs.btnLoadMore.classList.add('visually-hidden');
      //   Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      // }
      this.page += 1;
      // const images = data.hits;
      // const totalImages = data.totalHits;
      // Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      return data.hits;
    });
  }

  resetPage() {
    localStorage.removeItem("currentPage");
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}