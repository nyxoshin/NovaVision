import { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { Stage, OrbitControls } from "@react-three/drei";
import "../../styles/app.css";
import Loader from "../../components/Loader";
import ARButton from "../../components/ARButton";
import Banner from "../../components/Banner";
import { useSearchParams, useNavigate } from "react-router-dom";

function Model({
  modelPath,
  onReady,
}: {
  modelPath: string;
  onReady: () => void;
}) {
  const gltf = useLoader(GLTFLoader, modelPath);

  useEffect(() => {
    onReady();
  }, [gltf, onReady]);

  return (
    <primitive
      object={gltf.scene}
      position={[0, -1.85, 0]}
      scale={5}
      children-0-castShadow
    />
  );
}

export default function Application() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Query параметры
  const [modelReady, setModelReady] = useState<boolean>(false);
  const loaderName = searchParams.get("loader");
  const modelId = searchParams.get("id");
  const safeModelId = modelId ?? "standart_wall";
  const modelPath = `./models/models_android/${safeModelId}.glb`;

  useEffect(() => {
    if (!modelId) {
      navigate("/error");
    }
  }, [modelId, navigate]);

  useEffect(() => {
    setModelReady(false);
  }, [modelPath]);

  return (
    <div className="canvas--container">
      {modelReady && (
        <>
          <Banner />
          <ARButton name={safeModelId} />
        </>
      )}
      <Canvas
        gl={{ logarithmicDepthBuffer: true }}
        shadows
        camera={{ position: [-100, 0, 0], fov: 80 }}
        id="canvasToTrack"
        style={{ visibility: modelReady ? "visible" : "hidden" }}
      >
        <hemisphereLight intensity={0.15} groundColor="black" />
        <Suspense fallback={null}>
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
            <Model modelPath={modelPath} onReady={() => setModelReady(true)} />
          </Stage>
        </Suspense>
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
      {!modelReady && (
        <Loader loader={loaderName} />
      )}
    </div>
  );
}
