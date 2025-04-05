import React from "react";
import { useState } from "react";
import "./style.css";
import isMobile from "../checkDevice";
import CloseIcon from "../../assets/icons/svg/closeButton";

export default function ARButton({ name, loader }) {
  const [alertOpenWindows, setAlertOpenWindows] = useState(false);
  const [alertOpenAndroid, setAlertOpenAndroid] = useState(false);
  function OpenUrl() {
    if (isMobile.Android() !== null) {
      setAlertOpenAndroid(true);
      if (alertOpenAndroid === true) {
        setAlertOpenAndroid(false);
      }
    } else if (isMobile.Windows() !== null) {
      setAlertOpenWindows(true);
      if (alertOpenWindows === true) {
        setAlertOpenWindows(false);
      }
    }
  }
  return (
    <>
      {isMobile.iOS() !== null && (
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
      {isMobile.Android() !== null && (
        <>
          <div className="container--arbutton">
            <button className="link--arbutton" onClick={() => OpenUrl()}>
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
      {isMobile.Windows() !== null && (
        <>
          <button className="link--arbutton--android" onClick={() => OpenUrl()}>
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
