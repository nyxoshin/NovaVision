import React from "react";
import "./style.css";
import isMobile from "../checkDevice";

export default function ARButton() {
  return (
    <>
      {isMobile.iOS() !== null && (
        <div className="container--arbutton">
          <a
            rel="ar"
            href="./models/Apple/AR_barfits.usdz"
            className="link--arbutton"
          >
            <img src="./images/logo-ar.svg" width="50px" height="50px" />
          </a>
        </div>
      )}
      {isMobile.Android() !== null && (
        <div className="container--arbutton">
          <a
            rel="ar"
            href="./models/Apple/AR_barfits.usdz"
            className="link--arbutton"
          >
            <img src="./images/logo-ar.svg" width="50px" height="50px" />
          </a>
        </div>
      )}
    </>
  );
}
