export default function getRefs() {
  return {
    form: document.querySelector('#search-form'),
    input: document.querySelector('.input'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
  }
}