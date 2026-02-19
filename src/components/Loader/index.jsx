import "./style.css";
import { LinearProgress } from "@mui/material";
import { useEffect } from "react";
import { removePreloader } from "../../utils/preloader";

export default function Loader() {
  useEffect(() => {
    removePreloader();
  }, []);

  return (
    <div className="loader-wrapper">
      <div className="container--loader">
        <img
          src="/images/Logo.svg"
          className="loaderArIcon"
          alt="Loading"
        />
        <LinearProgress
          className="progressBar"
          variant="indeterminate"
        />
      </div>
    </div>
  );
}
