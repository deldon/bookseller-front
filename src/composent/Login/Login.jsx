import "./style.scss";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import request from "../../request/mutation/request";
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../../request/axios";
import { useState } from "react";

function loginRegister({ setIsLogged, setUser }) {

  const [infoError,setInfoError] = useState(null)
  const location = useLocation();
  const navigate = useNavigate();

  const extractSearchValueFromURL = (search) => {
    const searchParams = new URLSearchParams(search);
    const searchValue = searchParams.get("email") || "";
    return { email: searchValue };
  };

  const { email } = extractSearchValueFromURL(location.search);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email,
    },
  });

  const mutation = useMutation(request.login);

  if (mutation.isSuccess) {
    console.log(mutation.data);
    setToken(mutation.data.headers.authorization);
    setIsLogged(false);
    setUser(mutation.data.data.user);

  navigate("/dashboard");
  }

  if (mutation.error) {
    console.log(mutation.error.response.data.error);
 
  }

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="login">
      <div className="login-box">
        <div className="login-box-header">
          <div className="login-box-header-title">Ravi de vous revoir !</div>
          <div className="login-box-header-subtitle">
            Pour vous connecter, renseignez le mot de passe rattaché à votre
            compte et passer à l'étape suivante.
          </div>
        </div>
        <form className="login-box-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "L'e-mail est requis" }}
            render={({ field }) => (
              <input
                className="login-box-form-input"
                {...field}
                type="email"
                placeholder="Saisissez votre e-mail"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "Le mot de passe est requis" }}
            render={({ field }) => (
              <input
                className="login-box-form-input"
                {...field}
                type="password"
                placeholder="Saisissez votre mot de passe"
              />
            )}
          />

          {mutation.error && (
            <div className="register-info-error">{mutation.error.response.data.error}</div>
          )}

          <button className="login-box-form-submit" type="submit">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
}

export default loginRegister;
