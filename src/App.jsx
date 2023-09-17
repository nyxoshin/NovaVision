import React, { Suspense } from "react";
import { PerspectiveCamera, Sky } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  useGLTF,
  Stage,
  Grid,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./styles/app.css";
import { Camera, LoaderUtils, LoadingManager } from "three";
import Loader from "./components/Loader";

export default function App() {
  const gltf = useLoader(GLTFLoader, "./models/testingModel.gltf");

  return (
    <div className="canvas--container">
      <Suspense fallback={<Loader />}>
        <Canvas
          gl={{ logarithmicDepthBuffer: true }}
          shadows
          camera={{ position: [-15, 0, 10], fov: 25 }}
        >
          {/* <color attach="background" args={["#4a5861"]} /> */}
          {/* <fog attach="fog" args={["white", 15, 50]} /> */}
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
            autoRotateSpeed={0.05}
            enableZoom={false}
            keyEvents={true}
            makeDefault
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            keys={{ LEFT: "a", RIGHT: "d" }}
          />
          <directionalLight position={[-3.3, -0.1, -4.4]} castShadow />
          <ambientLight intensity={0.6} />
        </Canvas>
      </Suspense>
    </div>
  );
}
