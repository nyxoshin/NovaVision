import React, { useEffect } from "react";
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
// import "@google/model-viewer/dist/model-viewer-legacy";
import styles from "../androidViewer/AVStyle.module.css";
import Nova from "../../assets/images/NovaLogo.png";
// import

export default function AndroidViewer() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // Query параметры
  const loaderData = searchParams.get("loader");

  useEffect(() => {
    const a = searchParams.get("id");
    if (a == null) {
      navigate(`/Error`);
    }
  }, [searchParams]);

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

  console.log("loaderDataqwe", loaderData == "BF");

  return (
    <div className={styles.modelViewer}>
      <model-viewer
        src={`./models/models_android/${searchParams.get("id")}.glb`}
        ios-src={`./models/Apple/${searchParams.get("id")}.usdz`}
        poster={Nova}
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
          {loaderData == "BF" ? (
            <img
              src="./images/BFLoader.svg"
              width="50px"
              height="50px"
              className="arbutton--img"
            />
          ) : (
            <img
              src="./images/logo-ar.svg "
              width="50px"
              height="50px"
              className="arbutton--img"
            />
          )}
          <span className="linkButtonName">Смотреть в пространстве</span>
        </button>
      </model-viewer>
    </div>
  );
}
