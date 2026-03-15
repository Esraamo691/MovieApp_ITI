import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import React from "react";
<<<<<<< HEAD
import "@fortawesome/fontawesome-free/css/all.min.css";
=======
import "@fortawesome/fontawesome-free/css/all.min.css"; 
>>>>>>> origin/shahd
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { LoadingProvider } from "./Components/Context/LoadingContext.jsx";
import { WishlistProvider } from "./Components/Context/WishListContext.jsx";
import "animate.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadingProvider>
      <WishlistProvider>
        <App />
      </WishlistProvider>
    </LoadingProvider>
  </StrictMode>
);
