import * as React from "react";
import { ISvgProps } from "../../../interfaces/utilityProps";
const ArrowDown = ({ nameClass }: ISvgProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={nameClass}
  >
    <path d="M4 8L10 14L16 8H4Z" fill="white" />
  </svg>
);
export default ArrowDown;
