import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import searchImagesByQuery from './js/pixabay-api';

function validForm() {
  const searchQuery = document
    .querySelector('input[name="query"]')
    .value.trim();

  if (searchQuery === '') {
    alert('Fill in the search field');
    return false;
  }

  return true;
}
