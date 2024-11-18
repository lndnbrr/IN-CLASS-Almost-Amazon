import { signOut } from '../utils/auth';
import { getBooks, booksOnSale } from '../api/bookData';
import { showBooks } from '../pages/books';
import { favoriteAuthor, getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';

// navigation events
const navigationEvents = () => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE 03
  document.querySelector('#sale-books').addEventListener('click', () => {
    console.warn('CLICKED SALE BOOKS');
    booksOnSale().then(showBooks);
  });

  // ALL BOOKS 03
  document.querySelector('#all-books').addEventListener('click', () => {
    console.warn('CLICKED ALL BOOKS');
    getBooks().then(showBooks);
  });

  // ALL AUTHORS 03L
  // DONE When a user clicks the authors link, make a call to firebase to get all authors DONE
  document.querySelector('#authors').addEventListener('click', () => {
    console.warn('CLICKED AUTHORS');
    getAuthors().then(showAuthors);
    // 2. Convert the response to an array because that is what the makeAuthors function is expecting??
    // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  });

  // FAVORITE AUTHORS 03L
  document.querySelector('#fav-authors').addEventListener('click', () => {
    console.warn('CLICKED FAV AUTHORS');
    favoriteAuthor().then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
