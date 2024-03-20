import React from "react";
import { useState } from "react";
import "./style.css";
import isMobile from "../checkDevice";
import CloseIcon from "../../assets/icons/svg/closeButton";

export default function ARButton() {
  const [alertOpenWindows, setAlertOpenWindows] = useState<boolean>(false);
  const [alertOpenAndroid, setAlertOpenAndroid] = useState<boolean>(false);
  // const model_url = `intent://arvr.google.com/scene-viewer/1.0?file=${"./models/barfits_final.gltf"}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
  function OpenUrl() {
    if (isMobile.Android() !== null) {
      setAlertOpenAndroid(true);
      if (alertOpenAndroid === true) {
        setTimeout(() => {
          setAlertOpenAndroid(false);
        }, 5000);
      }
    } else if (isMobile.Windows() !== null) {
      setAlertOpenWindows(true);
      if (alertOpenWindows === true) {
        setTimeout(() => {
          setAlertOpenWindows(false);
        }, 5000);
      }
    }
    // window.open(model_url);
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
            <img
              src="./images/logo-ar.svg"
              width="50px"
              height="50px"
              className=".arbutton--img"
            />
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
          <div className="container--arbutton">
            <button className="link--arbutton" onClick={() => OpenUrl()}>
              <img
                src="./images/logo-ar.svg"
                width="50px"
                height="50px"
                className=".arbutton--img"
              />
            </button>
            {alertOpenAndroid && (
              <div className="openIosAlert">
                <h3>Откройте на iOS или iPadOS</h3>
                <span>
                  К сожалению, для просмотра модели в AR нужно зайти на сайт с
                  iPhone или iPad
                </span>
                <button
                  className="closeSvg"
                  onClick={() => setAlertOpenAndroid(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {isMobile.Windows() !== null && (
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
          <div className="container--arbutton">
            <button className="link--arbutton" onClick={() => OpenUrl()}>
              <img
                src="./images/logo-ar.svg"
                width="50px"
                height="50px"
                className=".arbutton--img"
              />
            </button>
            {alertOpenWindows && (
              <div className="openIosAlert">
                <h3>
                  Откройте на iOS
                  <br /> или iPadOS
                </h3>
                <span>
                  К сожалению, для просмотра модели в AR нужно зайти на сайт с
                  iPhone или iPad
                </span>
                <button
                  className="closeSvg"
                  onClick={() => setAlertOpenWindows(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
