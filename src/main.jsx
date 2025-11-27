import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { BackgroundProvider } from './utils/background.jsx';
import { LanguageProvider } from './utils/language.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <BackgroundProvider>
        <App />
      </BackgroundProvider>
    </LanguageProvider>
  </React.StrictMode>
);
