import "./style.scss";
import { useQuery } from "react-query";
import request from "../../request/query/request";
import { Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

function Aside({ mobile }) {
  const [toggle, setToggel] = useState(false);

  return (
    <aside>
      <div
        onClick={() => {
          setToggel(!toggle);
        }}
        className="aside-top"
      >
        <div>Menu</div>

        {toggle
          ? mobile && (
              <img
                src="https://api.iconify.design/ic:round-keyboard-arrow-up.svg"
                alt="Mon Image Retournée"
                style={{ transform: "scaleX(-1)" }}
              />
            )
          : mobile && (
              <img
                src="https://api.iconify.design/ic:round-keyboard-arrow-down.svg"
                alt="Mon Image"
              />
            )}
      </div>

      {(!mobile || toggle) && (
        <nav>
          <ul>
            <li>
              <Link to="/livres/0">Tous les livres</Link>
            </li>
            <li>
              <Link to="/authors">Tous les auteurs</Link>
            </li>
          </ul>
        </nav>
      )}
    </aside>
  );
}

export default Aside;
