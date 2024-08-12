import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/roboto";
import "./styles/main.css";
import Router from "./routes/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
