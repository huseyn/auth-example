import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { bootstrapAuth } from "./authBootstrap";

async function init() {
  try {
    const user = await bootstrapAuth();

    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App initialUser={user} />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Failed to initialize app:", error);
    // Fallback: render app without user
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <App initialUser={null} />
      </React.StrictMode>
    );
  }
}

init();
