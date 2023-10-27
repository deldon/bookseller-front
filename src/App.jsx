import "./App.css";

import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Sherch from "./composent/Sherch/Sherch";
import Header from "./composent/Header/Header";
import Home from "./composent/Home/Home";
import Book from "./composent/Book/Book";
import Aside from "./composent/Aside/Aside";
import Cart from "./composent/Cart/Cart";
import Footer from "./composent/Footer/Footer";
import Nofund from "./composent/noFund/noFund";

function App() {
  const navigate = useNavigate();
  const [largeurEcran, setLargeurEcran] = useState(window.innerWidth);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    function handleResize() {
      setLargeurEcran(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    const panier = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(panier);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const mobile = largeurEcran <= 1024;

  const onSubmit = (value) => {
    navigate(`/search?q=${value.search}`);
  };

  const addCart = (data) => {
    const panier = JSON.parse(localStorage.getItem("cart")) || [];
    const countPresent = panier.filter((book) => {
      return book.book_id == data.book_id;
    });

    if (countPresent.length < data.library.length) {
      panier.push(data);
      localStorage.setItem("cart", JSON.stringify(panier));
      setCart(panier);
    }
  };

  const bookDelete = (id) => {
    const nCart = cart.filter((book) => {
      return book.book_id != id;
    });

    localStorage.setItem("cart", JSON.stringify(nCart));
    setCart(nCart);
  };

  return (
    <div className="body">
      <Header onSubmit={onSubmit} cart={cart} />
      <main>
        {mobile ? null : <Aside mobile={mobile} />}

        <Routes>
          <Route path="/" element={<Home mobile={mobile} />} />
          <Route path="/search" element={<Sherch />} />
          <Route path="/book/:id" element={<Book addCart={addCart} />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} bookDelete={bookDelete} />}
          />
          <Route component={<Nofund/>} />
        </Routes>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
