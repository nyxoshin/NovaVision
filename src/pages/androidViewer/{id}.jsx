import React, { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Stage, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "../../styles/app.css";
import SmartSuspense from "../../components/SuspenseCustom";
import Loader from "../../components/Loader";
import ARButton from "../../components/ARButton";
import isMobile from "../../components/checkDevice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ModelViewerElement } from "@google/model-viewer/lib/model-viewer";
import styles from "../androidViewer/AVStyle.module.css";
import Nova from "../../assets/images/NovaLogo.png";
import BFLoader from "../../assets/icons/svg/BFLoader";
import LoaderPicture from "../../assets/icons/svg/loaderPicture";
import { LoadingManager } from "three";
import { USDZLoader } from "three/examples/jsm/Addons.js";

export default function AndroidViewer() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // Query параметры
  const [showCanvas, setShowCanvas] = useState(false);
  const loaderData = searchParams.get("loader");

  useEffect(() => {
    const a = searchParams.get("id");
    if (a == null) {
      navigate(`/Error`);
    }
  }, [searchParams]);

  const loaderName = searchParams.get("loader");
  ///////////////////////////////////////////////////////////
  const manager = new LoadingManager();

  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Started loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  manager.onLoad = function () {
    console.log("Loading complete!");
    setShowCanvas(true);
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(
      "Loading file: " +
        url +
        ".\nLoaded " +
        itemsLoaded +
        " of " +
        itemsTotal +
        " files."
    );
  };

  manager.onError = function (url) {
    console.log("There was an error loading " + url);
  };
  ////////////////////////////////////////////////////

  const glbLoader = new USDZLoader(manager);

  glbLoader.load(
    `./models/models_android/${searchParams.get("id")}.usdz`,
    (file) => {
      console.log("show is the loader", file);
    }
  );
  const gltf = useLoader(
    GLTFLoader,
    `./models/models_android/${searchParams.get("id")}.glb`
  );

  const el = document.getElementById("canvasToTrack");

  if (el) {
    el.addEventListener("123321", () => {
      console.log("did loaded");
    });
  }

  console.log("loaderDataqwe", Nova);

  return (
    <div className={styles.modelViewer}>
      {showCanvas ? (
        <model-viewer
          src={`./models/models_android/${searchParams.get("id")}.glb`}
          ios-src={`./models/Apple/${searchParams.get("id")}.usdz`}
          poster={loaderName == "BF" ? BFLoader : LoaderPicture}
          alt="A 3D model"
          shadow-intensity="1"
          camera-controls
          auto-rotate
          ar
        >
          <button
            slot="ar-button"
            id="ar-button"
            className="link--arbutton--android"
          >
            <img
              src="./images/logo-ar-white.svg "
              width="50px"
              height="50px"
              className="arbutton--img"
            />
            <span className="linkButtonName">Смотреть в пространстве</span>
          </button>
        </model-viewer>
      ) : (
        <Loader loader={loaderName} />
      )}
    </div>
  );
}
