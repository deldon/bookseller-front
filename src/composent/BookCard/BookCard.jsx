import "./style.scss";
import { useForm } from "react-hook-form";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { instance } from "../../request/axios";


function BookCard({ book }) {
  const url = instance.defaults.baseURL;

  return (
    <div className="grid-item" key={book.book_id}>
    <div className="grid-item-card">
      <div className="grid-item-book">
        <div className="grid-item-thumbnail">
          <Link to={`/book/${book.book_id}`}>
            <img
              src={book.thumbnail}
              alt=""
            />
          </Link>
        </div>

        <div className="grid-item-title">{book.title}</div>
        <div className="grid-item-author">
          <Link to={`/search?q=${book.author_name}`}>
            {book.author_name}
          </Link>
        </div>
        <div className="grid-item-price">{book.price}€</div>
      </div>
    </div>
  </div>
  );
}

export default BookCard;