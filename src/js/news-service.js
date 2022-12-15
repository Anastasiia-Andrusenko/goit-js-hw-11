const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31929702-f7252bd69ed2023a516a522a7';

import axios from "axios";
import getRefs from "./get-refs";
const refs = getRefs();

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  };


  async fetchImages() {

    const response = await fetch(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
    const data = await response.json();
    this.page += 1;
    return data;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}