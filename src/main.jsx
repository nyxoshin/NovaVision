import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto";
import "./styles/main.css";
import Router from "./routes/routes";
import AppOne from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AppOne /> */}
    <Router />
    {/* <div>123</div> */}
  </React.StrictMode>
);
