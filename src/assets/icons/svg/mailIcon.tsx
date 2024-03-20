import * as React from "react";
import { ISvgProps } from "../../../interfaces/utilityProps";
const MailIcon = ({ nameClass }: ISvgProps) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={nameClass}
  >
    <g opacity="0.4">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M17.6002 4.2H2.4002V15.8H17.6002V4.2ZM1.2002 3V17H18.8002V3H1.2002Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.94991 11.8L1.2002 3H18.8002L9.94991 11.8ZM15.8914 4.2L9.95476 10.1029L4.08555 4.2H15.8914Z"
        fill="white"
      />
    </g>
  </svg>
);
export default MailIcon;
