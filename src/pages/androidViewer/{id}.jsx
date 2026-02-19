import { useEffect, useState } from "react";
import "@google/model-viewer";
import "../../styles/app.css";
import Loader from "../../components/Loader";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "../androidViewer/AVStyle.module.css";
import { isBuiltInModelId, resolveModelId } from "../../constants/models";

export default function AndroidViewer() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Query params
  const [showCanvas, setShowCanvas] = useState(false);
  const [hasUsdz, setHasUsdz] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const modelId = searchParams.get("id");
  const loaderName = searchParams.get("loader");
  const safeModelId = resolveModelId(modelId);
  const usdzModelPath = `./models/usdz/${safeModelId}.usdz`;
  const glbModelPath = `./models/glb/${safeModelId}.glb`;
  const posterPath = "/images/Logo.svg";

  useEffect(() => {
    if (!modelId || !isBuiltInModelId(modelId)) {
      navigate("/error");
    }
  }, [modelId, navigate]);

  useEffect(() => {
    let isCancelled = false;
    const abortController = new AbortController();

    setShowCanvas(false);
    setHasUsdz(false);
    setLoadError("");

    const verifyAssets = async () => {
      try {
        const glbResponse = await fetch(glbModelPath, {
          method: "HEAD",
          signal: abortController.signal,
        });
        if (!glbResponse.ok) {
          throw new Error(`GLB file is not available: ${glbModelPath}`);
        }
        if (!isCancelled) {
          setShowCanvas(true);
        }
      } catch (error) {
        if (!isCancelled && !(error instanceof DOMException && error.name === "AbortError")) {
          setLoadError(`Failed to load model assets: ${glbModelPath}`);
        }
      }

      try {
        const usdzResponse = await fetch(usdzModelPath, {
          method: "HEAD",
          signal: abortController.signal,
        });
        if (!isCancelled && usdzResponse.ok) {
          setHasUsdz(true);
        }
      } catch {
        if (!isCancelled) {
          setHasUsdz(false);
        }
      }
    };

    verifyAssets();

    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [glbModelPath, usdzModelPath, reloadKey]);

  return (
    <div className={styles.modelViewer}>
      {loadError ? (
        <div className={styles.errorState}>
          <p>{loadError}</p>
          <button className={styles.retryButton} onClick={() => setReloadKey((value) => value + 1)}>
            Retry
          </button>
        </div>
      ) : showCanvas ? (
        <model-viewer
          src={glbModelPath}
          ios-src={hasUsdz ? usdzModelPath : undefined}
          poster={posterPath}
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
              src="./images/ar.svg"
              width="50px"
              height="50px"
              className="arbutton--img"
            />
            <span className="linkButtonName">View in your space</span>
          </button>
        </model-viewer>
      ) : (
        <Loader loader={loaderName} />
      )}
    </div>
  );
}
