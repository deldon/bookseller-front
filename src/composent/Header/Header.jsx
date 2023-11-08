import "./style.scss";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Header({ onSubmit, cart, user, isLogged }) {
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
    <form className="header-sub-form" onSubmit={handleSubmit(onSubmits)}>
      <div className="header-sub-form-value">
        <input
          className="header-sub-form-input"
          placeholder="Rechercher ..."
          {...register("search", { required: true })}
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}
      </div>

      <input className="header-sub-form-submit" type="submit" value="" />
    </form>
  );

  return (
    <>
      <header>
        <div className="header-top">
          <div className="header-top-logo">
            <Link to="/">PressLivre</Link>
          </div>

          {estMobile ? null : Myform}

          <div className="header-top-shop">
            {!isLogged && (
              <Link to="/dashboard">
                 <p>{user.lastname}</p>
                <img src="/user.png" alt="" />
              </Link>
            )}
            {isLogged && (
              <Link to="/login-register">
               
                <img src="/user.png" alt="" />
              </Link>
            )}

            <Link to="/cart">
              {cart.length}
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
