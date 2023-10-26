import "./App.css";

import { useState, createContext, useContext, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Sherch from "./composent/Sherch/Sherch";
import Header from "./composent/Header/Header";
import Home from "./composent/Home/Home";
import Book from "./composent/Book/Book";
import Aside from "./composent/Aside/Aside";
import Cart from "./composent/Cart/Cart";

function App() {
  const navigate = useNavigate();

  const onSubmit = (value) => {
    // console.log(value);
    navigate(`/search?type=${value.type}&search=${value.search}`);
  };

  return (
    <div className="body">
      <Header onSubmit={onSubmit} />
      <main>
        <Aside />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Sherch />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/cart" element={<Cart />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
