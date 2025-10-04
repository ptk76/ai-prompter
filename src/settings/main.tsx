import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SettingsUI from "./Settings";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SettingsUI />
  </StrictMode>
);
