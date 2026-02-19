import { useState } from "react";
import "./style.css";
import isMobile from "../checkDevice";
import CloseIcon from "../../assets/icons/svg/closeButton";

export default function ARButton({ name, usdzUrl }) {
  const [alertOpenWindows, setAlertOpenWindows] = useState(false);
  const [alertOpenAndroid, setAlertOpenAndroid] = useState(false);
  const href = usdzUrl || `./models/usdz/${name}.usdz`;

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
        <a rel="ar" href={href} className="link--arbutton--android">
          <img
            src="./images/ar.svg"
            width="50px"
            height="50px"
            className="arbutton--img"
          />
          <span className="linkButtonName">View in your space</span>
        </a>
      )}
      {isMobile.Android() && (
        <>
          <div className="container--arbutton">
            <button className="link--arbutton" onClick={openUrl}>
              <img
                src="./images/ar.svg"
                width="50px"
                height="50px"
                className="arbutton--img"
              />
            </button>
            {alertOpenAndroid && (
              <div className="openIosAlert">
                <h3>Open on iOS or iPadOS</h3>
                <span>
                  To view this model in AR, please open this site on an iPhone or iPad.
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
              src="./images/ar.svg"
              width="34px"
              height="34px"
              className="arbutton--img winMacin"
            />
            <span className="linkButtonName">View in your space</span>
          </button>
          {alertOpenWindows && (
            <div className="openIosAlert">
              <h3>
                Open on iOS
                <br /> or iPadOS
              </h3>
              <span>
                To view this model in AR, please open this site on an iPhone or iPad.
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
