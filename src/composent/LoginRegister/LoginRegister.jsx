import "./style.scss";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import request from "../../request/mutation/request";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function loginRegister() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState("");

  const mutation = useMutation(request.isClient);
  const navigate = useNavigate();

  if (mutation.isSuccess) {
    if (mutation.data.data) {
      navigate("/login/?email=" + email);
    } else {
      navigate("/register/?email=" + email);
    }
  }

  if (mutation.error) {
  }

  const onSubmit = (data) => {
    setEmail(data.email);
    mutation.mutate(data);
  };

  return (
    <div className="login-register">
      <div className="login-register-box">
        <div className="login-register-box-header">
          <div className="login-register-box-header-title">
            Se connecter / S'inscrire
          </div>
          <div className="login-register-box-header-subtitle">
            Renseignez votre adresse e-mail pour vous connecter ou créer votre
            compte.
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="email"
              control={control}
              rules={{ required: "L'e-mail est requis" }}
              render={({ field }) => (
                <input
                  className="login-register-box-input"
                  {...field}
                  type="email"
                  placeholder="Adresse e-mail"
                />
              )}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <button className="login-register-box-submit" type="submit">
            Suivant
          </button>
        </form>
      </div>{" "}
    </div>
  );
}

export default loginRegister;
