import "./style.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { instance } from "../../request/axios";


function Cart() {

    const url = instance.defaults.baseURL;
  const [cart, useCart] = useState([]);

  useEffect(() => {
    // Cette fonction sera exécutée au démarrage du composant
    const panier = JSON.parse(localStorage.getItem("cart")) || [];
    useCart(panier);

    // Placez ici le code que vous souhaitez exécuter au démarrage du composant
  }, []); // Le tableau de dépendances est vide pour indiquer que le hook ne dépend d'aucune variable

  const reset = () => {
    localStorage.removeItem("cart");
    useCart([]);
  };
  console.log(cart);
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

  const fdp = 3.90

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
                    <img
                      className="cart-card-thumbnail"
                      src={`${url}/books/${book.thumbnail}.jpg`}
                    />
                    <div className="cart-card-title">
                      <div className="cart-card-title-title">{book.title}</div>
                      <div className="cart-card-title-author">{book.name}</div>
                    </div>

                    <div className="cart-card-title">{price}€</div>
                    <div className="cart-card-delet">X</div>
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
          <div className="cart-total-text">TOTAL {total+fdp}€</div>
          <div onClick={reset}>vider la panier</div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
