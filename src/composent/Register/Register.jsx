import "./style.scss";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import request from "../../request/mutation/request";
import { useNavigate, useLocation } from "react-router-dom";
import { setToken } from "../../request/axios";

function Register({ setIsLogged, setUser }) {
  const navigate = useNavigate();

  const location = useLocation();

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
    watch,
  } = useForm({
    defaultValues: {
      email,
    },
  });

  const password = watch("password");
  const passwordConfirmation = watch("passwordConfirmation");

  const mutation = useMutation(request.addClient);

  if (mutation.isSuccess) {
    setToken(mutation.data.headers.authorization);
    setIsLogged(false);
    setUser(mutation.data.data.user);

    navigate("/dashboard");
  }

  if (mutation.error) {
  }

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="register">
      <div className="register-box">
        <div className="register-box-header">
          <div className="register-box-header-title">Pas encore client·e ?</div>
          <div className="register-box-header-subtitle">
            Renseignez vos informations pour créer votre compte et passer à
            l'étape suivante.
          </div>
        </div>
        <div className="register-box-form">
          {mutation.isError ? (
            <div className="login_form_error">
              {mutation.error.response.data.info}
            </div>
          ) : null}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                name="lastname"
                control={control}
                rules={{ required: "Nom obligatoire" }}
                render={({ field }) => (
                  <input
                    className="register-box-form-input"
                    {...field}
                    type="text"
                    placeholder="Nom"
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name="firstname"
                control={control}
                rules={{ required: "Prénom obligatoire" }}
                render={({ field }) => (
                  <input
                    className="register-box-form-input"
                    {...field}
                    type="text"
                    placeholder="Prénom"
                  />
                )}
              />
            </div>

            <input type="hidden" name="email" />

            <div>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Mot de passe obligatoire",
                minLength: {
                  value: 8,
                  message: 'Le mot de passe doit contenir au moins 8 caractères',
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/,
                  message: 'Le mot de passe doit contenir au moins un chiffre, une lettre majuscule, une lettre minuscule et un caractère spécial (@#$%^&+=).',
                }, }}
                render={({ field }) => (
                  <input
                    className="register-box-form-input"
                    {...field}
                    type="password"
                    placeholder="Mot de passe"
                  />
                )}
              />
            </div>
            {errors.password && <p className="resiter-error">{errors.password.message}</p>}
           

            <div>
              <Controller
                name="passwordConfirmation"
                control={control}
                rules={{
                  required: "Confirmation du mot de passe obligatoire",
                  validate: (value) => value === watch('password') || 'Les mots de passe ne correspondent pas'
                }}
                render={({ field }) => (
                  <input
                    className="register-box-form-input"
                    {...field}
                    type="password"
                    placeholder="Confirmer le mot de passe"
                  />
                )}
              />
              {errors.passwordConfirmation && <p className="resiter-error">{errors.passwordConfirmation.message}</p>}
             
            </div>

            <button className="register-box-form-submit" type="submit">Créer votre compte</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
