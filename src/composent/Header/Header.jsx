import "./style.css";
import { useForm } from "react-hook-form";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Header({ onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">PressLivre</Link>
      </div>
   
        <form className="header-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="header-form-value">
            <select className="header-form-select" {...register("type")}>
              <option value="title">Titre</option>
              <option value="author">Auteur</option>
            </select>

            <input
              className="header-form-input"
              placeholder="Rechercher ..."
              {...register("search", { required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}
          </div>

          <input className="header-form-submit" type="submit" src="https://api.iconify.design/material-symbols:search-rounded.svg"/>
        </form>
  

      <div className="header-shop"><Link to="/cart">Panier</Link></div>
    </div>
  );
}

export default Header;
