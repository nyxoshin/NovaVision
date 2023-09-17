import React from "react";
import { OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./styles/app.css";
import { Camera } from "three";

export default function App() {
  const gltf = useLoader(GLTFLoader, "./models/testingModel.gltf");

  return (
    <div className="canvas--container">
      <Canvas camera={{ position: [-0.5, 1, 2] }} className="canvas--main">
        <directionalLight position={[-3.3, -0.1, -4.4]} castShadow />
        <ambientLight intensity={0.6} />
        <Sky />
        <primitive
          object={gltf.scene}
          position={[0, 0.6, 0]}
          children-0-castShadow
        />
        <OrbitControls target={[0, 1, 0]} />
      </Canvas>
    </div>
  );
}
