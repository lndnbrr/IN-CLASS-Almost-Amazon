import { getAuthors, getSingleAuthor } from '../api/authorData';
import viewBook from '../pages/viewBook';
import { getBooks, deleteBook, getSingleBook } from '../api/bookData';
import { showAuthors } from '../pages/authors';
import { showBooks } from '../pages/books';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import { getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship } from '../api/mergedData';
import viewAuthor from '../pages/viewAuthors';

const domEvents = (user) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
  // IF STATEMENTS FOR BOOKS!!!!!!!

    // CLICK EVENT => SHOWS A FORM THAT ADDS/CREATES A BOOK 04
    if (e.target.id.includes('add-book-btn')) {
      console.warn('CLICKED ADD BOOK BUTTON');
      addBookForm(user);
    }

    // CLICK EVENT => GRABS A SINGULAR BOOK FROM API CALL, SHOWS A FORM TO EDIT/UPDATE THAT BOOK 04
    if (e.target.id.includes('edit-book-btn')) {
      console.warn('CLICKED EDIT BOOK BUTTON');
      const [, firebaseKey] = e.target.id.split('--');

      getSingleBook(firebaseKey).then((bookObj) => addBookForm(user, bookObj));
    }

    // CLICK EVENT => GRABS A SINGULAR BOOK FROM API CALL, DELETES THAT BOOK, THEN REFRESHES THE DOM 03
    if (e.target.id.includes('delete-book')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK BUTTON');
        const [, firebaseKey] = e.target.id.split('--');

        deleteBook(firebaseKey).then(() => {
          getBooks(user.uid).then(showBooks);
        });
      }
    }

    // CLICK EVENT => DIRECTS USER TO VIEW BOOK DETAILS 06
    if (e.target.id.includes('view-book-btn')) {
      console.warn('CLICKED VIEW BOOK DETAILS BUTTON');

      const [, firebaseKey] = e.target.id.split('--');
      getBookDetails(firebaseKey).then(viewBook);
    }
    // IF STATEMENTS FOR AUTHORS!!!!!!!

    // CLICK EVENT => SHOWS FORM THAT ADDS/CREATES AN AUTHOR 04L
    if (e.target.id.includes('add-author-btn')) {
      console.warn('CLICKED ADD AUTHOR BUTTON');
      addAuthorForm(user.uid);
    }

    // CLICK EVENT => GRABS A SINGULAR AUTHOR FROM API CALL, SHOWS A FORM TO EDIT/UPDATE THAT AUTHOR 04L

    if (e.target.id.includes('update-author-btn')) {
      console.warn('CLICKED EDIT AUTHOR BUTTON');
      const [, firebaseKey] = e.target.id.split('--');

      getSingleAuthor(firebaseKey).then((authorObj) => addAuthorForm(authorObj));
    }

    // CLICK EVENT => GRABS A SINGULAR AUTHOR FROM API CALL, DELETES THAT AUTHOR, THEN REFRESHES THE DOM 03L
    if (e.target.id.includes('delete-author-btn')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE AUTHOR BUTTON');
        const [, firebaseKey] = e.target.id.split('--');

        deleteAuthorBooksRelationship(firebaseKey).then(() => {
          getAuthors(user.uid).then(showAuthors);
        });
      }
    }

    // CLICK EVENT => DIRECTS USER TO VIEW AUTHOR DETAILS 06L
    if (e.target.id.includes('view-author-btn')) {
      const [, firebaseKey] = e.target.id.split('--');
      console.warn('CLICKED VIEW AUTHOR DETAILS BUTTON');

      getAuthorDetails(firebaseKey).then(viewAuthor);
    }
  });
};

export default domEvents;
