import "./style.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import LatestArrival from "../LatestArrival/LatestArrival";
import LastPublication from "../LastPublication/LastPublication";

function Home() {
  return (
    <div className="home">
      <div className="home-header">
        <div className="home-title">Bienvenue chez PressLivre</div>
        <p className="home-description">
          Découvrez un univers de trésors littéraires et d'histoires à portée de
          main.
        </p>
        <p className="home-description">
          Chez PressLivre, nous avons une passion pour les livres d'occasion, et
          nous sommes fiers de vous offrir une sélection soigneusement choisie
          de volumes anciens et classiques, ainsi que des éditions plus récentes
          à des prix abordables.
        </p>
      </div>
      <LastPublication />
     

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
          <div className="home-middel-box-title">Qualité Garantie</div>
          <div className="home-middel-box-description">
            Chez PressLivre, la qualité est notre priorité. Chacun de nos livres
            d'occasion est soigneusement inspecté pour s'assurer de son état, de
            sa propreté et de son authenticité. Vous pouvez acheter en toute
            confiance, en sachant que vous recevrez des livres en excellent
            état, prêts à enrichir votre bibliothèque.
          </div>
        </div>
      </div>
      <LatestArrival />

      <div className="home-middel">
        <div className="home-middel-box">
          <div className="home-middel-box-title">Service Exceptionnel</div>
          <div className="home-middel-box-description">
            Nous sommes déterminés à offrir une expérience de magasinage
            exceptionnelle. Notre équipe dévouée est à votre disposition pour
            répondre à vos questions, vous conseiller dans vos choix de lecture
            et vous assister tout au long de votre parcours sur notre site.
          </div>
        </div>
        <div className="home-middel-box">
          <div className="home-middel-box-title">Explorez, Découvrez, Lisez</div>
          <div className="home-middel-box-description">
            Plongez dans notre univers de livres d'occasion et explorez des
            trésors littéraires qui vous attendent. Faites de chaque achat une
            découverte, et chaque lecture une aventure. PressLivre est
            votre destination pour des livres d'occasion de qualité.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
