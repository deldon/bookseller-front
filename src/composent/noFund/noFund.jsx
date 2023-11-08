import "./style.scss";

import LatestArrival from "../LatestArrival/LatestArrival";
import LastPublication from "../LastPublication/LastPublication";

function Nofund() {
  return (
    <div class="nofund">
      <div className="nofund-header">
        <h1>404</h1>
        <p>
          Oups, il semble que le livre que vous recherchez ait été emportée par
          un personnage de livre aventureux !
        </p>
      </div>

      <LatestArrival />
      <LastPublication />
    </div>
  );
}

export default Nofund;
