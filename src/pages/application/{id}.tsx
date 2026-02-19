import { Component, Suspense, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { Stage, OrbitControls } from "@react-three/drei";
import type { Object3D } from "three";
import "../../styles/app.css";
import Loader from "../../components/Loader";
import ARButton from "../../components/ARButton";
import Banner from "../../components/Banner";
import DragAndDropModal from "../../components/DragAndDropModal";
import ModelButtons from "../../components/ModelButtons";
import { useSearchParams } from "react-router-dom";
import { removePreloader } from "../../utils/preloader";
import { BUILTIN_MODELS, resolveModelId } from "../../constants/models";

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(`${import.meta.env.BASE_URL}draco/gltf/`);

function Model({
  modelPath,
  onReady,
}: {
  modelPath: string;
  onReady: () => void;
}) {
  const gltf = useLoader(GLTFLoader, modelPath, (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });

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

type LocalModel = {
  name: string;
  stageUrl: string;
  usdzUrl: string;
};

type USDZExporterLike = {
  parse: (scene: Object3D) => ArrayBuffer;
  parseAsync?: (scene: Object3D) => Promise<ArrayBuffer>;
};

let usdzExporterCtorPromise: Promise<new () => USDZExporterLike> | null = null;

class SceneErrorBoundary extends Component<
  { onError: (message: string) => void; resetKey: string; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load model.";
    this.props.onError(message);
  }

  componentDidUpdate(prevProps: { resetKey: string }) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

function getUSDZExporterCtor() {
  if (!usdzExporterCtorPromise) {
    usdzExporterCtorPromise = import("three/examples/jsm/exporters/USDZExporter.js").then(
      (module) => module.USDZExporter as new () => USDZExporterLike
    );
  }
  return usdzExporterCtorPromise;
}

export default function Application() {
  const [searchParams] = useSearchParams(); // Query params
  const [modelReady, setModelReady] = useState<boolean>(false);
  const [isConvertingModel, setIsConvertingModel] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [localModel, setLocalModel] = useState<LocalModel | null>(null);
  const [dropzoneError, setDropzoneError] = useState<string | null>(null);
  const [sceneError, setSceneError] = useState<string | null>(null);
  const loaderName = searchParams.get("loader");
  const modelId = searchParams.get("id");
  const safeModelId = resolveModelId(modelId);
  const publicModelPath = `./models/glb/${safeModelId}.glb`;
  const modelPath = localModel?.stageUrl ?? publicModelPath;
  const isLocalModel = Boolean(localModel);
  const isLocalAssetsReady = !isLocalModel || Boolean(localModel?.stageUrl && localModel?.usdzUrl);
  const shouldShowLanding = !modelId && !localModel;
  const shouldRenderScene = !shouldShowLanding;
  const shouldShowLoader =
    !sceneError && (isConvertingModel || !isLocalAssetsReady || (shouldRenderScene && !modelReady));

  useEffect(() => {
    setModelReady(false);
    setSceneError(null);
  }, [modelPath]);

  useEffect(() => {
    removePreloader();
  }, []);

  useEffect(() => {
    return () => {
      revokeModelUrls(localModel);
    };
  }, [localModel]);

  function revokeModelUrls(model: LocalModel | null) {
    if (!model) {
      return;
    }
    const urls = new Set([model.stageUrl, model.usdzUrl]);
    urls.forEach((url) => URL.revokeObjectURL(url));
  }

  async function exportUsdz(scene: Object3D) {
    const USDZExporterCtor = await getUSDZExporterCtor();
    const exporter = new USDZExporterCtor();
    if (typeof exporter.parseAsync === "function") {
      return (await exporter.parseAsync(scene)) as ArrayBuffer;
    }
    return exporter.parse(scene) as ArrayBuffer;
  }

  async function applyLocalFile(file: File) {
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith(".glb")) {
      setDropzoneError("Unsupported format. Please use a .glb file.");
      return;
    }

    setModelReady(false);
    setDropzoneError(null);
    setSceneError(null);
    setIsConvertingModel(true);
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    const sourceUrl = URL.createObjectURL(file);

    try {
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      const gltf = await loader.loadAsync(sourceUrl);
      const usdzBuffer = await exportUsdz(gltf.scene);
      const usdzUrl = URL.createObjectURL(
        new Blob([usdzBuffer], { type: "model/vnd.usdz+zip" })
      );
      const nextModel: LocalModel = {
        name: file.name,
        stageUrl: sourceUrl,
        usdzUrl,
      };

      revokeModelUrls(localModel);
      setLocalModel(nextModel);
    } catch (error) {
      URL.revokeObjectURL(sourceUrl);
      const details = error instanceof Error ? error.message : "Unknown conversion error.";
      setDropzoneError(`Conversion failed. ${details}`);
      console.error("GLB to USDZ conversion failed:", error);
    } finally {
      setIsConvertingModel(false);
    }
  }

  function clearLocalModel() {
    revokeModelUrls(localModel);
    setLocalModel(null);
    setDropzoneError(null);
    setSceneError(null);
    setModelReady(false);
    setIsConvertingModel(false);
  }

  return (
    <div className={`canvas--container ${localModel ? "canvas--withLocalModel" : ""}`}>
      {shouldShowLanding && (
        <img src="/images/Logo.svg" alt="NovaVision" className="mainPageTopLogo" />
      )}
      {!modelId && !shouldShowLoader && (
        <>
          <DragAndDropModal
            isDragActive={isDragActive}
            shouldShowLanding={shouldShowLanding}
            localModelName={localModel?.name ?? null}
            errorMessage={dropzoneError}
            onClearError={() => setDropzoneError(null)}
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragActive(true);
            }}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={(event) => {
              event.preventDefault();
              setIsDragActive(false);
              const file = event.dataTransfer.files?.[0];
              if (file) {
                applyLocalFile(file);
              }
            }}
            onSelectFile={applyLocalFile}
            onClearLocalModel={clearLocalModel}
          />
          {shouldShowLanding && (
            <div className="dropzoneModelsAfterModal">
              <ModelButtons models={BUILTIN_MODELS} loaderName={loaderName} />
            </div>
          )}
        </>
      )}
      {sceneError && (
        <div className="sceneError">{sceneError}</div>
      )}
      {shouldRenderScene && !sceneError && modelReady && isLocalAssetsReady && (
        <>
          <Banner />
          {(!localModel || localModel.usdzUrl) && (
            <ARButton name={safeModelId} usdzUrl={localModel?.usdzUrl} />
          )}
        </>
      )}
      {shouldRenderScene && !sceneError && isLocalAssetsReady && (
        <>
          <Canvas
            gl={{ logarithmicDepthBuffer: true }}
            shadows
            camera={{ position: [-10, 0, 0], fov: 65 }}
            id="canvasToTrack"
            style={{ visibility: modelReady ? "visible" : "hidden" }}
          >
            <hemisphereLight intensity={0.15} groundColor="black" />
            <Suspense fallback={null}>
              <SceneErrorBoundary
                resetKey={modelPath}
                onError={(message) => {
                  setModelReady(false);
                  setSceneError(`Unable to display this model. ${message}`);
                }}
              >
                <Stage intensity={0.5} environment="city" adjustCamera={false}>
                  <Model modelPath={modelPath} onReady={() => setModelReady(true)} />
                </Stage>
              </SceneErrorBoundary>
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
              minDistance={1}
              maxDistance={15}
              zoomToCursor={false}
              makeDefault
              maxPolarAngle={Math.PI / 2}
              enablePan={false}
            />
            <directionalLight position={[-3.3, -0.1, -4.4]} castShadow />
            <ambientLight intensity={0.6} />
          </Canvas>
        </>
      )}
      {shouldShowLoader && <Loader loader={loaderName} />}
    </div>
  );
}
