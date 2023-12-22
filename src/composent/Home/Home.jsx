import "./style.scss";
import LatestArrival from "../LatestArrival/LatestArrival";
import LastPublication from "../LastPublication/LastPublication";
import Aside from "../Aside/Aside";

function Home({ mobile }) {
  return (
    <div className="home">
      <div className="home-header">
        <div className="home-header-title">Bienvenue chez LireEncore.fr</div>
        <p className="home-header-description">
          Découvrez un univers de trésors littéraires et d'histoires à portée de
          main.
        </p>
        <p className="home-header-description">
          Chez LireEncore.fr, faites votre choix parmi des milliers de livres,
          réservez les, et venez les chercher à la presse de Lapalud.
        </p>
      </div>
      {mobile ? <Aside mobile={mobile} /> : null}
      <LastPublication />

      <div className="home-middel">
        <div className="home-middel-box">
          <div className="home-middel-box-title">Vente locale</div>
          <div className="home-middel-box-description">
            Réservez vos livres, nous les préparons sous 48 heures.
            <p>
              Un e-mail de confirmation vous indiquera quand venir les chercher
              à la Maison de la Presse de Lapalud (84840).
            </p>
          </div>
        </div>
        <div className="home-middel-box">
          <div className="home-middel-box-title">Notre démarche</div>
          <div className="home-middel-box-description">
            <p>
              Les plateformes conventionnelles, telles que Momox ou Amazon, ne
              reprennent pas tous les ouvrages, principalement en raison de leur
              rentabilité insuffisante, ce qui les condamne inexorablement à
              l'oubli.
            </p>
            <p>
              Chez LireEncore.fr, nous avons pris l'initiative de vous proposer
              ces ouvrages pour leur donner une seconde chance, tout en
              préservant la culture littéraire.
            </p>
          </div>
        </div>
      </div>
      <LatestArrival />

      <div className="home-middel">
        <div className="home-middel-box">
          <div className="home-middel-box-title">Notre Collection</div>
          <div className="home-middel-box-description">
            Parcourez notre collection diversifiée de livres d'occasion, allant
            des classiques de la littérature aux ouvrages spécialisés, en
            passant par les best-sellers du moment. Que vous soyez un amateur de
            fiction, un passionné d'histoire, un étudiant en quête de manuels
            abordables ou un collectionneur de raretés littéraires, vous
            trouverez certainement des trésors parmi nos rayons virtuels.
          </div>
        </div>
        <div className="home-middel-box">
          <div className="home-middel-box-title">
            Explorez, Découvrez, Lisez
          </div>
          <div className="home-middel-box-description">
            <p>
              LireEncore.fr est votre destination pour des livres d'occasion de
              qualité.
            </p>
            <p>
              Faites de chaque achat une découverte, et de chaque lecture une
              aventure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

