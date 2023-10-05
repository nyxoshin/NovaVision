import React from "react";
import "./style.css";
import isMobile from "../checkDevice";

export default function ARButton() {
  var model_url = `intent://arvr.google.com/scene-viewer/1.0?file=${"./models/barfits_final.gltf"}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
  function OpenUrl() {
    window.open(model_url);
  }
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
        <>
          {/* <div className="container--arbutton">
            <a
              rel="ar"
              href="./models/Apple/AR_barfits.usdz"
              className="link--arbutton"
            >
              <img src="./images/logo-ar.svg" width="50px" height="50px" />
            </a>
          </div> */}
          <div class="container--arbutton">
            <img src="./images/logo-ar.svg" width="50px" height="50px" />
            <button onClick={() => OpenUrl()}></button>
          </div>
        </>
      )}
    </>
  );
}
