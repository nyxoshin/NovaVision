import "./style.css";
import LoaderPicture from "../../assets/icons/svg/loaderPicture";
import BFLoader from "../../assets/icons/svg/BFLoader";
import { LinearProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  console.log("queryParams");
  const [searchParams, setSearchParams] = useSearchParams(); // Query параметры

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="container--loader">
      <LoaderPicture />
      <LinearProgress
        className="progressBar"
        variant="determinate"
        value={progress}
      />
    </div>
  );
}
