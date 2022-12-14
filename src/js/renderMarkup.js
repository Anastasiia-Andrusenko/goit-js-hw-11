// --------- ІМПОРТ РЕФІВ
import getRefs from "./get-refs";
const refs = getRefs();

export function renderImgsList(imgsArray) {
  console.log(imgsArray);
  const markupImgsList = imgsArray.map(img => {
    return `
      <a  href="${img.largeImageURL}" class="gallery__link">
        <img class="gallery__image" src="${img.webformatURL}" 
           alt="${img.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
          <b>Likes</b> ${img.likes}
          </p>
          <p class="info-item">
          <b>Views</b> ${img.views}
          </p>
          <p class="info-item">
          <b>Comments</b> ${img.comments}
          </p>
          <p class="info-item">
          <b>Downloads</b> ${img.downloads}
          </p>
        </div>
      </a>`
  }).join('');

  refs.gallery.insertAdjacentHTML('beforeend', markupImgsList);
};