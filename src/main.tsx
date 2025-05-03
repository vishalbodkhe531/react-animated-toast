import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AnimatedToaster } from "./hooks/useAnimatedToaster";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AnimatedToaster position="top-right" reverseOrder={true}>
      <App />
    </AnimatedToaster>
  </StrictMode>
);
