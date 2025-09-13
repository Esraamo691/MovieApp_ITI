import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LoadingProvider } from "./Components/Context/LoadingContext.jsx";
import LoadingOverlay from "./Components/Context/LoadingOverlay.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <LoadingOverlay />
      <App />
    </LoadingProvider>
  </StrictMode>
);
