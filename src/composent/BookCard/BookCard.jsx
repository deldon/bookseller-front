import "./style.css";
import { useForm } from "react-hook-form";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { instance } from "../../request/axios";


function BookCard({ book }) {
  const url = instance.defaults.baseURL;

    let price = null;
    if (book.price < 5) {
      price = 1;
    }
    if (book.price >= 5 && book.price < 8) {
      price = 2;
    }
    if (book.price >= 8) {
      price = 50;
    }
  return (
    <div className="grid-item" key={book.book_id}>
    <div className="grid-item-card">
      <div className="grid-item-book">
        <div className="grid-item-thumbnail">
          <Link to={`/book/${book.book_id}`}>
            <img
              src={`${url}/books/${book.thumbnail}.jpg`}
              alt=""
            />
          </Link>
        </div>

        <div className="grid-item-title">{book.title.slice(0,24)}</div>
        <div className="grid-item-author">
          <Link to={`/search?type=author&search=${book.author_name}`}>
            {book.author_name}
          </Link>
        </div>
        <div className="grid-item-price">{price}€</div>
      </div>
    </div>
  </div>
  );
}

export default BookCard;