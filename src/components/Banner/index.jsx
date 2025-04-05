import React from "react";
import "./style.css";
import { useState } from "react";
import CloseIcon from "../../assets/icons/svg/closeButton";

export default function ARButton({ name, loader }) {
  const [instrOpen, setInstrOpen] = useState(true);
  return (
    instrOpen && (
      <div className="instruction">
        <h3>Попробуйте в AR!</h3>
        <span>
        Нажмите на кнопку ниже, чтобы увидеть модель в дополненной реальности прямо через свой смартфон.
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
