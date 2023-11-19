import "./App.scss";

import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import useScrollToTop from "./hooks/useScrollToTop";

import Sherch from "./composent/Sherch/Sherch";
import Header from "./composent/Header/Header";
import Home from "./composent/Home/Home";
import Book from "./composent/Book/Book";
import Aside from "./composent/Aside/Aside";
import Cart from "./composent/Cart/Cart";
import Footer from "./composent/Footer/Footer";
import Nofund from "./composent/noFund/noFund";
import LoginRegister from "./composent/LoginRegister/LoginRegister";
import Login from "./composent/Login/Login";
import DashBoard from "./composent/DashBoard/Dashboard";
import Register from "./composent/Register/Register";
import OrderValidate from "./composent/OrderValidate/OrderValidate";
import AllBook from "./composent/AllBook/AllBook";
import TopAuthors from "./composent/TopAuthors/TopAuthors";

function App() {
  const navigate = useNavigate();
  useScrollToTop();
  const [largeurEcran, setLargeurEcran] = useState(window.innerWidth);
  const [cart, setCart] = useState([]);
  const [isLogged, setIsLogged] = useState(true);
  const [user, setUser] = useState({});

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

  const resetCard = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    setCart([]);
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
      <Header onSubmit={onSubmit} cart={cart} user={user} isLogged={isLogged} />
      <main>
        {mobile ? null : <Aside mobile={mobile} />}

        <Routes>
          <Route path="/" element={<Home mobile={mobile} />} />
          <Route path="/authors" element={<TopAuthors />} />
          <Route path="/search" element={<Sherch />} />
          <Route path="/book/:id" element={<Book addCart={addCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                bookDelete={bookDelete}
                resetCard={resetCard}
                isLogged={isLogged}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <DashBoard user={user} isLogged={isLogged} setUser={setUser} />
            }
          />
          <Route path="/books/:page" element={<AllBook />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route
            path="/register"
            element={<Register setIsLogged={setIsLogged} setUser={setUser} />}
          />
          <Route
            path="/login"
            element={<Login setIsLogged={setIsLogged} setUser={setUser} />}
          />
          <Route path="/valid" element={<OrderValidate />} />
          <Route component={<Nofund />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
