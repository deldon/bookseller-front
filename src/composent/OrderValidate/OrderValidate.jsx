import "./style.scss";
import { Link } from "react-router-dom";

function OrderValidate() {
  return (
    <dir className="order-validate">
      <p className="order-validate-title">Votre commande a bien été validée.</p>
      <p>
        Vous recevrez un e-mail de confirmation lorsque la commande sera prête.
      </p>
      <p>
        Nous nous ferons un plaisir de préparer votre commande dans un délai de
        48 heures.
      </p>
      <p>
        Vous recevrez un e-mail de confirmation vous invitant à venir chercher
        vos livres à
      </p>
      <p className="order-validate-info">
        la Maison de la Presse de Lapalud (84840).
      </p>
      <p>
        Le paiement s'effectue en magasin lors du retrait de votre commande.
      </p>
      <Link to="/dashboard">Voir mes commandes !</Link>
    </dir>
  );
}

export default OrderValidate;
