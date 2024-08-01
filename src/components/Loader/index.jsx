import "./style.css";
import LoaderPicture from "../../assets/icons/svg/loaderPicture";
import { LinearProgress } from "@mui/material";
import { useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);

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
      {/* <div>111</div> */}
      {/* <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div> */}
    </div>
  );
}

export const RandomNumbers = () => {
  const [numbers, setNumbers] = useState([]);

  const generateNumbers = () => {
    const randomNumbers = new Set();

    while (randomNumbers.size < 5) {
      const num = Math.floor(Math.random() * 100) + 1;
      randomNumbers.add(num);
    }

    const sortedNumbers = Array.from(randomNumbers).sort((a, b) => a - b);
    setNumbers(sortedNumbers);
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  return numbers;

  // return (
  //   <div>
  //     <button onClick={generateNumbers}>Generate Random Numbers</button>
  //     {numbers.length > 0 && (
  //       <div>
  //         <h3>Random Numbers:</h3>
  //         <ul>
  //           {numbers.map((number, index) => (
  //             <li key={index}>{number}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     )}
  //   </div>
  // );
};
