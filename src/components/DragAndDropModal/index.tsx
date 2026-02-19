import type { DragEvent } from "react";

type DragAndDropModalProps = {
  isDragActive: boolean;
  shouldShowLanding: boolean;
  localModelName: string | null;
  errorMessage: string | null;
  onClearError: () => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDragLeave: () => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onSelectFile: (file: File) => void;
  onClearLocalModel: () => void;
};

export default function DragAndDropModal({
  isDragActive,
  shouldShowLanding,
  localModelName,
  errorMessage,
  onClearError,
  onDragOver,
  onDragLeave,
  onDrop,
  onSelectFile,
  onClearLocalModel,
}: DragAndDropModalProps) {
  const isCompactMode = Boolean(localModelName) && !shouldShowLanding;

  if (isCompactMode) {
    return (
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`dropzoneCompact ${isDragActive ? "dropzoneCompactActive" : ""}`}
      >
        {errorMessage && (
          <div className="dropzoneError">
            <span>{errorMessage}</span>
            <button
              className="dropzoneErrorClose"
              onClick={onClearError}
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        )}
        <label className="dropzoneCompactAction dropzoneCompactDropArea">
          <span className="dropzoneCompactText">
            Drag and drop another <span className="dropzoneNoBreak">.glb</span>
          </span>
          <input
            type="file"
            accept=".glb,model/gltf-binary"
            style={{ display: "none" }}
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];
              if (file) {
                onSelectFile(file);
              }
              event.currentTarget.value = "";
            }}
          />
        </label>
        <button
          className="dropzoneCompactAction dropzoneChooseButton dropzoneResetButton"
          onClick={onClearLocalModel}
        >
          <svg
            className="dropzoneResetIcon"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M9 3h6l1 2h4v2H4V5h4l1-2zm-2 6h2v9H7V9zm4 0h2v9h-2V9zm4 0h2v9h-2V9z"
              fill="currentColor"
            />
          </svg>
          Remove local model
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`dropzoneModal ${shouldShowLanding ? "dropzoneModalLanding" : ""} ${
        isDragActive ? "dropzoneModalActive" : ""
      }`}
    >
      <div className="dropzoneTitle">Drop your 3D model</div>
      <p className="dropzoneDescription">
        Drag and drop a <code>.glb</code> file <span className="dropzoneNoBreak">to preview it.</span>
      </p>
      <label className="dropzoneDropArea">
        <span className="dropzoneDropHint">Drop file here</span>
        <span className="dropzoneDropOr">or</span>
        <span className="dropzoneChooseButton">Choose file</span>
        <input
          type="file"
          accept=".glb,model/gltf-binary"
          style={{ display: "none" }}
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            if (file) {
              onSelectFile(file);
            }
            event.currentTarget.value = "";
          }}
        />
      </label>
      {errorMessage && (
        <div className="dropzoneError">
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
