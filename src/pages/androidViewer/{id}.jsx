import { useEffect, useState } from "react";
import "../../styles/app.css";
import Loader from "../../components/Loader";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "../androidViewer/AVStyle.module.css";
import BFLoader from "../../assets/icons/svg/BFLoader";
import LoaderPicture from "../../assets/icons/svg/loaderPicture";
import { LoadingManager } from "three";
import { USDZLoader } from "three/examples/jsm/Addons.js";

export default function AndroidViewer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Query параметры
  const [showCanvas, setShowCanvas] = useState(false);
  const modelId = searchParams.get("id");
  const safeModelId = modelId ?? "standart_wall";
  const usdzModelPath = `./models/Apple/${safeModelId}.usdz`;
  const glbModelPath = `./models/models_android/${safeModelId}.glb`;

  useEffect(() => {
    if (!modelId) {
      navigate("/error");
    }
  }, [modelId, navigate]);

  const loaderName = searchParams.get("loader");
  useEffect(() => {
    let isMounted = true;

    setShowCanvas(false);

    const manager = new LoadingManager();

    manager.onLoad = function () {
      if (isMounted) {
        setShowCanvas(true);
      }
    };

    manager.onError = function (url) {
      console.log("There was an error loading " + url);
    };

    const usdzLoader = new USDZLoader(manager);
    usdzLoader.load(usdzModelPath, () => {});

    return () => {
      isMounted = false;
    };
  }, [usdzModelPath]);

  return (
    <div className={styles.modelViewer}>
      {showCanvas ? (
        <model-viewer
          src={glbModelPath}
          ios-src={usdzModelPath}
          poster={loaderName === "BF" ? BFLoader : LoaderPicture}
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
