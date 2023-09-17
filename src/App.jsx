import React from "react";
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
import { Camera } from "three";

export default function App() {
  const gltf = useLoader(GLTFLoader, "./models/testingModel.gltf");

  return (
    <div className="canvas--container">
      {/* <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [-1.5, 1, 5.5], fov: 45, near: 1, far: 20 }}
        eventSource={document.getElementById("root")}
        eventPrefix="client"
        className="canvas--main"
      > */}
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
        {/* <PerspectiveCamera /> */}
        {/* <Sky /> */}
        {/* <OrbitControls keyEvents={true} camera={kets} /> */}
      </Canvas>
    </div>
  );
}

{
  /* <Grid
          renderOrder={-1}
          position={[0, 0, 0]}
          infiniteGrid
          cellSize={0.6}
          cellThickness={0.6}
          sectionSize={3.3}
          sectionThickness={1.5}
          sectionColor={[0.5, 0.5, 10]}
          fadeDistance={40}
        /> */
}
