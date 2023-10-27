import "./style.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { instance } from "../../request/axios";
import { Link } from "react-router-dom";

function Cart({ cart, bookDelete }) {
  const url = instance.defaults.baseURL;

  let total = 0;

  for (const b of cart) {
    let price = null;
    if (b.price < 5) {
      price = 1;
    }
    if (b.price >= 5 && b.price < 8) {
      price = 2;
    }
    if (b.price >= 8) {
      price = "";
    }

    total = total + price;
  }

  const fdp = 3.9;

  return (
    <div className="cart">
      <div className="cart-col">
        {cart[0] && (
          <>
            <div className="cart-wrapper">
              {cart.map((book) => {
                let price = null;
                if (book.price < 5) {
                  price = 1;
                }
                if (book.price >= 5 && book.price < 8) {
                  price = 2;
                }
                if (book.price >= 8) {
                  price = "";
                }

                return (
                  <div className="cart-card">
                    <Link to={`/book/${book.book_id}`}>
                      <img
                        className="cart-card-thumbnail"
                        src={`${url}/books/${book.thumbnail}.jpg`}
                      />
                    </Link>
                    <Link to={`/book/${book.book_id}`}>
                      <div className="cart-card-title">
                        <div className="cart-card-title-title">
                          {book.title}
                        </div>
                        <div className="cart-card-title-author">
                          {book.name}
                        </div>
                      </div>
                    </Link>

                    <div className="cart-card-title">{price}€</div>
                    <div
                      onClick={() => bookDelete(book.book_id)}
                      className="cart-card-delete"
                    >
                      <img src="delete.png" alt="" />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
      <div className="cart-col">
        <div className="cart-total">
          <div className="cart-total-text">Total {total}€</div>
          <div className="cart-total-text">Frait de port {fdp}€</div>
          <div className="cart-total-text">TOTAL {total + fdp}€</div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
