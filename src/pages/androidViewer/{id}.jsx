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

  console.log("is it testable page?");

  return (
    <div className={styles.modelViewer}>
      <model-viewer
        // className={styles.modelViewerCheck}
        // styles={{ width: "100vw", height: "100vh" }}
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
          <img
            src="./images/logo-ar.svg"
            width="50px"
            height="50px"
            className="arbutton--img"
          />
          <span className="linkButtonName">Смотреть в пространстве</span>
        </button>

        {/* <ARButton
          slot="ar-button"
          id="ar-button"
          name={searchParams.get("id")}
        /> */}
      </model-viewer>
    </div>
    // <div className="canvas--container">
    //   <SmartSuspense fallback={<Loader />} fallbackMinDurationMs={3000}>
    //     <ARButton name={searchParams.get("id")} />
    //     {/* <Canvas
    //       gl={{ logarithmicDepthBuffer: true }}
    //       shadows
    //       camera={{ position: [-15, 0, 10], fov: 25 }}
    //       id="canvasToTrack"
    //     >
    //       <hemisphereLight intensity={0.15} groundColor="black" />
    //       <Stage intensity={0.5} environment="city" adjustCamera={false}>
    //         <primitive
    //           object={gltf.scene}
    //           position={[0, -1.85, 0]}
    //           scale={5}
    //           children-0-castShadow
    //         />
    //       </Stage>
    //       <spotLight
    //         position={[10, 20, 10]}
    //         angle={0.12}
    //         penumbra={1}
    //         intensity={1}
    //         castShadow
    //         shadow-mapSize={1024}
    //       />
    //       <OrbitControls
    //         autoRotate
    //         autoRotateSpeed={1}
    //         enableZoom={true}
    //         minDistance={5}
    //         maxDistance={30}
    //         zoomToCursor={false}
    //         makeDefault
    //         maxPolarAngle={Math.PI / 2}
    //         enablePan={false}
    //       />
    //       <directionalLight position={[-3.3, -0.1, -4.4]} castShadow />
    //       <ambientLight intensity={0.6} />
    //     </Canvas> */}
    //     <model-viewer
    //       className={styles.modelViewerCheck}
    //       src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.glb?1542147958948"
    //       ios-src="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b/Astronaut.usdz?v=1569545377878"
    //       poster="https://cdn.glitch.com/36cb8393-65c6-408d-a538-055ada20431b%2Fposter-astronaut.png?v=1599079951717"
    //       alt="A 3D model of an astronaut"
    //       shadow-intensity="1"
    //       camera-controls
    //       auto-rotate
    //       ar
    //     ></model-viewer>
    //   </SmartSuspense>
    // </div>
  );
}
