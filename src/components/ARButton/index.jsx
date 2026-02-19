import { useState } from "react";
import "./style.css";
import isMobile from "../checkDevice";
import CloseIcon from "../../assets/icons/svg/closeButton";

export default function ARButton({ name }) {
  const [alertOpenWindows, setAlertOpenWindows] = useState(false);
  const [alertOpenAndroid, setAlertOpenAndroid] = useState(false);

  function openUrl() {
    if (isMobile.Android()) {
      setAlertOpenWindows(false);
      setAlertOpenAndroid(true);
    } else if (isMobile.Windows() || isMobile.Mac()) {
      setAlertOpenAndroid(false);
      setAlertOpenWindows(true);
    }
  }

  return (
    <>
      {isMobile.iOS() && (
        <a
          rel="ar"
          href={`./models/Apple/${name}.usdz`}
          className="link--arbutton--android"
        >
          <img
            src="./images/logo-ar-white.svg"
            width="50px"
            height="50px"
            className="arbutton--img"
          />
          <span className="linkButtonName">Смотреть в пространстве</span>
        </a>
      )}
      {isMobile.Android() && (
        <>
          <div className="container--arbutton">
            <button className="link--arbutton" onClick={openUrl}>
              <img
                src="./images/logo-ar-white.svg"
                width="50px"
                height="50px"
                className="arbutton--img"
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
      {(isMobile.Windows() || isMobile.Mac()) && (
        <>
          <button className="link--arbutton--android" onClick={openUrl}>
            <img
              src="./images/logo-ar-white.svg"
              width="34px"
              height="34px"
              className="arbutton--img winMacin"
            />
            <span className="linkButtonName">Смотреть в пространстве</span>
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
        </>
      )}
    </>
  );
}
