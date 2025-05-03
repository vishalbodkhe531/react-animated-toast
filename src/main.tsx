import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AnimatedToaster } from "./hooks/useAnimatedToaster.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnimatedToaster position="top-right" reverseOrder={true}>
      <App />
    </AnimatedToaster>
  </StrictMode>
);
