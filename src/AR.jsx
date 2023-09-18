import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Stage, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import "./styles/app.css";
import SmartSuspense from "./components/SuspenseCustom";
import Loader from "./components/Loader";

export default function App() {
  const gltf = useLoader(GLTFLoader, "./models/testingModel.gltf");

  return (
    <div className="canvas--container">
      <a rel="ar" href="./models/testingModel.gltf">
        fjkdlsfj;sd
      </a>
    </div>
  );
}
