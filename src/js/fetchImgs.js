const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31929702-f7252bd69ed2023a516a522a7';

import axios from "axios";

export function fetchImages(query) {
  return fetch(`${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`)
    .then(response => {
      // console.log(response);
      return response.json();
  });
}