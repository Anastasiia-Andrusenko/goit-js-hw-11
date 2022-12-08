// --------- ІМПОРТ БІБЛІОТЕК
import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// --------- ІМПОРТ ФЕТЧА
import { fetchImages } from "./fetchImgs";

// --------- ІМПОРТ РЕФІВ
import getRefs from "./get-refs";


const string = 'cat';

fetchImages(string);