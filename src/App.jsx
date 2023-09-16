import React from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import './styles/app.css'

export default function App() {
  const gltf = useLoader(GLTFLoader, './models/Testing.glb')

  return (
    <div className='canvas--container'>
      <Canvas camera={{ position: [-0.5, 1, 2] }} shadows className='canvas--main'>
        <directionalLight position={[3.3, 1.0, 4.4]} castShadow />
        <primitive
          object={gltf.scene}
          position={[0, 1, 0]}
          children-0-castShadow
        />
        <OrbitControls target={[0, 1, 0]} />
      </Canvas>
    </div>
  )
}