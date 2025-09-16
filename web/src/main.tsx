import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { bootstrapAuth } from "./authBootstrap";

async function init() {
  const user = await bootstrapAuth();

  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App initialUser={user} />  {/* 🔹 user veririk */}
    </React.StrictMode>
  );
}

init();
