import "./style.scss";
import { useMutation } from "react-query";
import request from "../../request/mutation/request";
import { useForm, Controller } from "react-hook-form";

function Valid({ user, setUser }) {
  const mutation = useMutation(request.ValidMail);

  if (mutation.isSuccess) {
    user.email_valid = true;
    setUser(user);
  }

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      {mutation.isSuccess && (
        <p className="dashboard-valid">Votre email a bien été validé.</p>
      )}
      {!user.email_valid && (
        <div className="dashboard-valid">
          <div className="dashboard-valid-title">
            Attention, il vous reste encore une étape !
          </div>
          <div className="dashboard-valid-text">
            <p>
              Veuillez valider votre e-mail en tapant le code que nous vous
              avons envoyé par e-mail.
            </p>
            <form
              className="dashboard-valid-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <Controller
                  name="key"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input className="dashboard-valid-form-input" {...field} />
                  )}
                />
              </div>

              <button className="dashboard-valid-form-submit" type="submit">
                Valider
              </button>
            </form>
            {mutation.error && (
              <p className="dashboard-valid-text-error">
                Le code est incorrect.
              </p>
            )}
            <p>
              Les utilisateurs validés seront prioritaires pour la préparation
              de vos livres.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default Valid;
