import { getSingleBook } from './bookData';
import { getSingleAuthor, getAuthorBooks } from './authorData';

// for merged promises 06
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleBook(firebaseKey).then((bookObj) => {
    getSingleAuthor(bookObj.author_id)
      .then((authorObj) => resolve({ ...bookObj, authorObj }));
  }).catch(reject);
});

// API CALL TO GET A SINGLE AUTHOR'S BOOKS 06L
const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObj) => {
    getAuthorBooks(authorObj.firebaseKey)
      .then((bookObj) => resolve({ ...authorObj, bookObj }));
  }).catch(reject);
});

export { getBookDetails, getAuthorDetails };
