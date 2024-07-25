import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// import searchImagesByQuery from './js/pixabay-api';

const form = document.querySelector('.form-search');
const gallery = document.querySelector('.gallery');
const inputSearch = document.querySelector('.input-search');

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

  return fetch(`${URL}?key=${API_KEY}&q=${query}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.info({
          title: 'Info',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topCenter',
        });
        gallery.innerHTML = '';
      } else {
        displayImages(data.hits);
      }
    })
    .catch(error => {
      console.log('Error fetching data:', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to fetch images. Please try again later.',
        position: 'topCenter',
      });
    });
}

// Кінець функції пошуку HTTP запитів

function displayImages(images) {
  gallery.innerHTML = '';

  images.forEach(image => {
    const imgEl = document.createElement('img');
    imgEl.src = image.webformatURL;
    imgEl.alt = image.tags;
    imgEl.classList.add(imgEl);
  });
}
