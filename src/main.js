import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// import searchImagesByQuery from './js/pixabay-api';

const form = document.querySelector('.form-search');
const gallery = document.querySelector('.gallery');
const inputSearch = document.querySelector('.input-search');
const loader = document.querySelector('.loader');

form.addEventListener('submit', validForm);

function validForm(event) {
  event.preventDefault();

  const query = inputSearch.value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
      position: 'topCenter',
    });
    return;
  }

  searchImagesByQuery(query);
}

// функція пошуку HTTP запитів

function searchImagesByQuery(query) {
  const URL = 'https://pixabay.com/api';
  const API_KEY = '45098988-0aca0e44808ea00320f5f0e3c';

  return fetch(
    `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}

//  Функції для відображення зображень

export function displayImages(images, gallery) {
  gallery.innerHTML = ''; // Очистка галереї
  const markupImg = images
    .map(
      image => `
        <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" class="image"/>
        </a>
    `
    )
    .join('');
  gallery.innerHTML = markupImg;
  new SimpleLightbox('.gallery a').refresh(); // Оновлення SimpleLightbox
}

// функція індикатора завантаження

// export function showLoader(loader)
function showLoader(loader) {
  loader.style.display = 'block';
}

// export function hideLoader(loader)
function hideLoader(loader) {
  loader.style.display = 'none';
}

// export function showError(message)
function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topCenter',
  });
}

// export function showInfo(message)
function showInfo(message) {
  iziToast.info({
    title: 'Info',
    message: message,
    position: 'topCenter',
  });
}
