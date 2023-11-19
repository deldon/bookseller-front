import "./style.scss";
import React, { useEffect } from "react";
import { useState } from "react";
import { instance } from "../../request/axios";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import request from "../../request/mutation/request";

function Cart({ cart, bookDelete, resetCard, isLogged }) {
  const url = instance.defaults.baseURL;

  const navigate = useNavigate();

  let total = 0;

  for (const b of cart) {
    total = total + b.price;
  }

  const mutation = useMutation(request.addOrder);

  if (mutation.isSuccess) {
    resetCard();
    navigate("/valid");
  }

  if (mutation.error) {
  }

  const submit = () => {
    if (!isLogged) {
      const books = cart.map((book) => {
        return book.book_id;
      });

      const obj = {
        delivery_id: 1,
        books,
      };

      mutation.mutate(obj);
    } else {
      navigate("/login-register");
    }
  };

  return (
    <div className="cart">
      <div className="cart-col">
        {cart[0] && (
          <>
            <div className="cart-wrapper">
              {cart.map((book) => {
                return (
                  <div key={book.id} className="cart-card">
                    <Link to={`/book/${book.book_id}`}>
                      <img
                        className="cart-card-thumbnail"
                        src={book.thumbnail} 
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

                    <div className="cart-card-title">{book.price}€</div>
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
            <div className="cart-col-total">
              <div className="cart-total">
                <div className="cart-total-total">TOTAL {total}€</div>
                <div className="cart-total-info">
                  <p>
                    Pour valider vos achats, veuillez cliquer sur le bouton
                    "Réserver" ci-dessous.
                  </p>
                  <p>
                    Nous nous ferons un plaisir de préparer votre commande dans
                    un délai de 48 heures.
                  </p>
                  <p>
                    Vous recevrez un e-mail de confirmation vous invitant à
                    venir chercher vos livres à
                  </p>
                  <p className="cart-bold">
                    la Maison de la Presse de Lapalud (84840).
                  </p>
                  <p>
                    Le paiement s'effectue en magasin lors du retrait de votre
                    commande.
                  </p>
                </div>
              </div>
              {!isLogged && (
                <div className="cart-submit" onClick={submit}>
                  Réserver
                </div>
              )}
              {isLogged && (
                <>
                  <p className="cart-submit-text"> Pour réserver un livre, vous devez être connecté.</p>{" "}
                  <div
                    className="cart-submit"
                    onClick={() => {
                      navigate("/login-register");
                    }}
                  >
                    Connectez-vous / créez un compte.
                  </div>
                </>
              )}
            </div>
          </>
        )}
        {!cart[0] && (
          <div className="card-empty">
            <p className="cart-empty-title">Votre panier est vide.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
