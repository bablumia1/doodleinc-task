import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ComposeContext from "./context/Compose.context.tsx";
import { rootContext } from "./context/root.context.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ComposeContext component={rootContext}>
      <App />
    </ComposeContext>
  </React.StrictMode>
);
