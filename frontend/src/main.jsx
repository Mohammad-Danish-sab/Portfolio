import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App.jsx";
import "./index.css";

// This app does not use offline caching. Remove service workers left behind by
// older deployments so they cannot intercept API POST requests.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
