import "./style.scss";
import { useQuery } from "react-query";
import request from "../../request/query/request";
import Spinner from "../Spinner/Spinner";
import { instance } from "../../request/axios";
import { useNavigate, useLocation } from "react-router-dom";
import dayjs from "dayjs";

function DashBoard({ user, isLogged }) {
  const url = instance.defaults.baseURL;

  const navigate = useNavigate();
  if (isLogged) {
    navigate("/login-register");
  }

  const { isLoading, error, data, isPreviousData, refetch } = useQuery(
    ["myorder"],
    async () => {
      const data = await request.myorder();
      return data;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 0,
    }
  );

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  data.map((book) => {
    book.created_at = dayjs(book.created_at).format("DD/MM/YYYY");
    return book;
  });

  return (
    <div className="dashboard">
      {!user.email_valid && (
        <div className="dashboard-valid">
          <div className="dashboard-valid-title">
            Attention, il vous reste encore une étape !
          </div>
          <div className="dashboard-valid-text">
            <p>
              Veuillez valider l'e-mail de votre compte en cliquant sur le lien
              que nous vous avons envoyé.
            </p>
            <p>
              Les utilisateurs validés seront prioritaires pour la préparation
              de vos livres.
            </p>
          </div>
        </div>
      )}
      <div className="dashboard-info">
        <div className="dashboard-info-title">Mes infos</div>
        <div className="dashboard-info-card">
          <div className="dashboard-info-card-left">
            <div className="dashboard-info-card-name">
              Bonjour {user.firstname} {user.lastname} 
            </div>
            <div className="dashboard-info-card-email">{user.email}</div>
          </div>
          <div className="dashboard-info-card-edit">
            <img src="/edit.png" alt="" />
          </div>
        </div>
      </div>

      <div className="dashboard-orders">
        <div className="dashboard-orders-title">Mes Commandes</div>

        <div className="dashboard-orders-wrapper">
          {data.map((order) => (
            <div key={order.id} className="dashboard-orders-wrapper-card">
              <div className="dashboard-orders-wrapper-card-header">
                <p>N°{order.id}</p>
                <p>{order.created_at}</p>
              </div>
              <div className="dashboard-orders-wrapper-card-main">
                <div className="dashboard-orders-wrapper-card-main-header">
                  <p>{order.etat}</p>
                  <p>Total {order.total}€</p>
                </div>
                {order.book.map((book) => (
                  <div className="dashboard-orders-wrapper-card-main-cardbook">
                    <img src={`${url}/books/${book.thumbnail}.jpg`} alt="" />
                    <div>
                      {" "}
                      <p>{book.title}</p> <p>{book.author}</p>
                    </div>
                    <p>{book.price}€</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;

// Veuiller vaider l'email de votre compte en clienquen sur le lien du mails que nous vous avon envoyller les utilisateur valider seron prioritaire depour la preparation des vos livre
