import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginContextProvider } from "./components/context/LoginContext.js";
import { OptionsContextProvider } from "./components/context/OptionsContext.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <OptionsContextProvider>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </OptionsContextProvider>
  </React.StrictMode>
);
