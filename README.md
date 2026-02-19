# NovaVision

NovaVision is a React + Three.js web viewer for 3D models with iOS Quick Look AR support.

## Features

- Interactive 3D viewer on the main page.
- Built-in model presets selectable from the landing page.
- Local `.glb` drag-and-drop upload.
- In-browser `.glb -> .usdz` conversion for uploaded models.
- iOS/iPadOS AR entry (`rel="ar"`) with USDZ assets.
- Android test page using `model-viewer`.
- Draco-compressed GLB support.

## Tech Stack

- React 18
- Vite
- Three.js
- `@react-three/fiber`
- `@react-three/drei`
- `@google/model-viewer`

## Routes

- `/` main application viewer
- `/testable` model-viewer page (Android-oriented flow)
- `/error` fallback page

## Query Parameters

- `id`: model id without extension, example `/?id=cat`
- `loader`: optional loader variant, example `/?id=cat&loader=BF`

## Model Assets

Built-in models are expected in both formats:

- GLB: `public/models/glb/<id>.glb`
- USDZ: `public/models/usdz/<id>.usdz`

Current preset models:

- `CAT` (`id=cat`)
- `monitor`
- `table`
- `tower`
- `nastya`

## Draco Support

Draco decoder files are served from:

- `public/draco/gltf/draco_decoder.js`
- `public/draco/gltf/draco_decoder.wasm`
- `public/draco/gltf/draco_wasm_wrapper.js`
- `public/draco/gltf/draco_encoder.js`

`GLTFLoader` is configured with `DRACOLoader`, so Draco-compressed GLBs load correctly.

## Local Upload Flow

- Accepted format: `.glb`
- Uploaded GLB is used for stage preview.
- App converts uploaded GLB to USDZ in-browser for AR button usage.
- Loader remains visible until model and conversion are ready.
- If conversion fails, an inline error is shown.

## Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## NPM Scripts

- `npm run dev` - start dev server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Project Structure

```text
src/
  components/
    ARButton/
    Banner/
    DragAndDropModal/
    Loader/
    ModelButtons/
  pages/
    application/{id}.tsx
    androidViewer/{id}.jsx
    errorPage/
  routes/
    routes.data.tsx
  utils/
    preloader.ts
public/
  draco/
    gltf/
  images/
  models/
    glb/
    usdz/
```

## Notes

- If `id` is missing, the main page defaults to `cat` once a model route is used.
- Local object URLs are revoked when replaced/unmounted.
- iOS AR depends on valid USDZ assets.
