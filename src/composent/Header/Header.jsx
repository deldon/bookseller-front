import "./style.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Header({ onSubmit, cart }) {
  const [largeurEcran, setLargeurEcran] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setLargeurEcran(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const estMobile = largeurEcran <= 768;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const loggelLoop = () => {
    setToggel(!toggel);
  };

  const onSubmits = (data) => {
    onSubmit(data);
    reset();
  };


  const Myform = (
    <form className="header-form" onSubmit={handleSubmit(onSubmits)}>
      <div className="header-form-value">
        <input
          className="header-form-input"
          placeholder="Rechercher ..."
          {...register("search", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
      </div>

      <input className="header-form-submit" type="submit" value="" />
    </form>
  );

  return (
    <>
      <header>
        <div className="header-top">
          <div className="header-logo">
            <Link to="/">PressLivre</Link>
          </div>

          {estMobile ? null : Myform}

          <div className="header-shop">
            <Link to="/cart">{cart.length}
            <img src="/cart.png" alt="" />
            </Link>
          </div>
        </div>
        {!estMobile ? null : <div className="header-sub">{Myform}</div>}
      </header>
    </>
  );
}

export default Header;
