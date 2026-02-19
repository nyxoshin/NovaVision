import "./style.css";
import { useState } from "react";
import CloseIcon from "../../assets/icons/svg/closeButton";

export default function ARButton() {
  const [instrOpen, setInstrOpen] = useState(true);
  return (
    instrOpen && (
      <div className="instruction">
        <h3>Try it in AR!</h3>
        <span>
          Tap the button below to view the model in augmented reality on your smartphone.
        </span>
        <button
          className="closeSvg"
          onClick={() => setInstrOpen(false)}
        >
          <CloseIcon />
        </button>
      </div>
    )
  );
}
