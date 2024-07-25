// export function searchImagesByQuery(query) {
//   const URL = 'https://pixabay.com/api';
//   const API_KEY = '45098988-0aca0e44808ea00320f5f0e3c';

//   return fetch(`${URL}?key=${API_KEY}&q=${query}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }
