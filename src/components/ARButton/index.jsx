import React from "react";
import './style.css'

export default function ARButton() {
  return (
    <div className="container--arbutton">
      <a rel="ar" href="./models/Apple/barfits_AR.usdz" className="link--arbutton">
        <img src="./images/logo-ar.svg" width="44px" height="44px" class="arbutton--img" />
      </a>
    </div>
  );
}
