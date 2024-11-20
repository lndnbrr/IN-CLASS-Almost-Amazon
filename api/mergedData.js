import { deleteBook, getSingleBook } from './bookData';
import { getSingleAuthor, getAuthorBooks, deleteSingleAuthor } from './authorData';

// for merged promises

// API CALL THAT GIVES A RELATIONSHIP TO BOOKS AND AUTHORS, BUT THIS ULTIMATELY SHOWS A BOOK'S DETAILS 06
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObj) => {
    getSingleAuthor(bookObj.author_id)
      .then((authorObj) => resolve({ ...bookObj, authorObj }));
  }).catch(reject);
});

// API CALL THAT GIVES A RELATIONSHIP TO BOOKS AND AUTHORS, BUT THIS ULTIMATELY SHOWS AN AUTHOR'S DETAILS 06L
const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObj) => {
    getAuthorBooks(authorObj.firebaseKey)
      .then((bookObj) => resolve({ ...authorObj, bookObj }));
  }).catch(reject);
});

// API CALL TO DELETE A SINGLE AUTHOR WHEN THEIR BOOKS ARE GONE (DELETES THE RELATIONSHIP BETWEEN AN AUTHOR AND THEIR BOOKS) 05
const deleteAuthorBooksRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

// ALL EXPORTS
export { getBookDetails, getAuthorDetails, deleteAuthorBooksRelationship };
