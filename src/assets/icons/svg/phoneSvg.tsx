import * as React from "react";
import { ISvgProps } from "../../../interfaces/utilityProps";
const PhoneIcon = ({ nameClass }: ISvgProps) => (
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0853 2.4002H4.91387V17.6002H15.0853V2.4002ZM3.71387 1.2002V18.8002H16.2853V1.2002H3.71387Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5994 4.8001H8.39941V3.6001H11.5994V4.8001Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.1998 16.4002H6.7998V15.2002H13.1998V16.4002Z"
        fill="white"
      />
    </g>
  </svg>
);
export default PhoneIcon;
