import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();
  console.warn(obj);
  let domString = '';
  domString += `
  <div class="mt-3 d-flex flex-wrap">
    <div class="d-flex flex-row">

     <div id="viewInfoAuthorInfo">
        <h5>${obj.first_name} ${obj.last_name} ${obj.favorite ? '<span class="badge bg-danger"><i class="fa fa-heart" aria-hidden="true"></i></span>' : ''}</h5>
        Author Email: <a href="mailto:${obj.email}">${obj.email}</a>  
        <div>
          <i id="update-author-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info"></i>
          <i id="delete-author-btn--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
        </div>
      </div>
    </div>
  </div>
<div id="viewAuthorDividing">
  <hr>
  <h5>Books</h5>
</div>`;

  obj.bookObj.forEach((book) => {
    domString += `
    <div class="d-flex flex-wrap">
        <div class="card" style="width: 300px;" id="booksOnViewAuthors">
          <img src=${book.image} alt=${book.title} style="max-width: 300px;">
            <div class="card-body" style="height: 180px;">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text bold">
              ${book.sale ? `
                <span class="badge badge-info sale-badge">
                  <i class="fa fa-bell" aria-hidden="true"></i>Sale
                </span> $${book.price}` : `$${book.price}`}
              </p>
            <hr>
          <i class="btn btn-success fas fa-eye" id="view-book-btn--${book.firebaseKey}"></i>
         <i id="edit-book-btn--${book.firebaseKey}" class="fas fa-edit btn btn-info"></i>
         <i id="delete-book-btn--${book.firebaseKey}" class="btn btn-danger fas fa-trash-alt"></i>
       </div>
      </div>`;
  });

  renderToDOM('#view', domString);
};

export default viewAuthor;
