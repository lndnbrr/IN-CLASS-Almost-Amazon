import { signOut } from '../utils/auth';
import { getBooks, booksOnSale, searchBook } from '../api/bookData';
import { showBooks, emptyBooks } from '../pages/books';
import { favoriteAuthor, getAuthors } from '../api/authorData';
import { showAuthors } from '../pages/authors';

// navigation events
const navigationEvents = (user) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE 03
  document.querySelector('#sale-books').addEventListener('click', () => {
    console.warn('CLICKED SALE BOOKS');
    booksOnSale(user.uid).then(showBooks);
  });

  // ALL BOOKS 03
  document.querySelector('#all-books').addEventListener('click', () => {
    console.warn('CLICKED ALL BOOKS');
    getBooks(user.uid).then(showBooks);
  });

  // ALL AUTHORS 03L
  // DONE When a user clicks the authors link, make a call to firebase to get all authors DONE
  document.querySelector('#authors').addEventListener('click', () => {
    console.warn('CLICKED AUTHORS');
    getAuthors(user.uid).then(showAuthors);
    // 2. Convert the response to an array because that is what the makeAuthors function is expecting??
    // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  });

  // FAVORITE AUTHORS 03L
  document.querySelector('#fav-authors').addEventListener('click', () => {
    console.warn('CLICKED FAV AUTHORS');
    favoriteAuthor(user.uid).then(showAuthors);
  });

  // STRETCH: SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    if (e.keyCode === 13) {
      searchBook(user.uid, searchValue).then((result) => {
        if (result.length > 0) {
          showBooks(result);
        } else {
          emptyBooks();
        }
      });

      document.querySelector('#search').value = '';
    }
  });
};

export default navigationEvents;
