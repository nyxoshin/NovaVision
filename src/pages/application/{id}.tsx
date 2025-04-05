import React, { useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Stage, OrbitControls } from "@react-three/drei";
import "../../styles/app.css";
import Loader from "../../components/Loader";
import ARButton from "../../components/ARButton";
import Banner from "../../components/Banner";
import isMobile from "../../components/checkDevice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { LoadingManager } from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";

export default function Application() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // Query параметры
  const [showCanvas, setShowCanvas] = useState<boolean>(false);
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
    setTimeout(() => {
      setShowCanvas(true);
    }, 1000);
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

  useEffect(() => {
    const a = searchParams.get("id");
    if (a == null) {
      navigate(`/Error`);
    }
  }, [searchParams]);

  const glbLoader = new GLTFLoader(manager);
  glbLoader.load(
    `./models/models_android/${searchParams.get("id")}.glb`,
    (file) => {
      console.log("show is the loader", file);
    }
  );

  const gltf = useLoader(
    GLTFLoader,
    `./models/models_android/${searchParams.get("id")}.glb`
  );

  return (
    <div className="canvas--container">
      {/* <SmartSuspense
        fallback={<Loader loader={loaderName} />}
        fallbackMinDurationMs={3000}
      > */}
      {showCanvas ? (
        <>
          <Banner />
          <ARButton
            name={searchParams.get("id")}
            loader={searchParams.get("loader")}
          />
          <Canvas
            gl={{ logarithmicDepthBuffer: true }}
            shadows
            camera={{ position: [-100, 0, 0], fov: 80 }}
            id="canvasToTrack"
          >
            <hemisphereLight intensity={0.15} groundColor="black" />
            <Stage intensity={0.5} environment="city" adjustCamera={false}>
              <primitive
                object={gltf.scene}
                position={[0, -1.85, 0]}
                scale={5}
                children-0-castShadow
              />
            </Stage>
            <spotLight
              position={[10, 20, 10]}
              angle={0.12}
              penumbra={1}
              intensity={1}
              castShadow
              shadow-mapSize={1024}
            />
            <OrbitControls
              autoRotate
              autoRotateSpeed={1}
              enableZoom={true}
              minDistance={5}
              maxDistance={50}
              zoomToCursor={false}
              makeDefault
              maxPolarAngle={Math.PI / 2}
              enablePan={false}
            />
            <directionalLight position={[-3.3, -0.1, -4.4]} castShadow />
            <ambientLight intensity={0.6} />
          </Canvas>
        </>
      ) : (
        <Loader loader={loaderName} />
      )}
    </div>
  );
}
