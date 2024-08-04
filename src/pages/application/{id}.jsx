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

export default function Application() {
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
  console.log("pagedidload");

  return (
    <div className="canvas--container">
      <SmartSuspense fallback={<Loader />} fallbackMinDurationMs={3000}>
        <ARButton
          name={searchParams.get("id")}
          loader={searchParams.get("loader")}
        />
        <Canvas
          gl={{ logarithmicDepthBuffer: true }}
          shadows
          camera={{ position: [-15, 0, 10], fov: 25 }}
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
      </SmartSuspense>
    </div>
  );
}
