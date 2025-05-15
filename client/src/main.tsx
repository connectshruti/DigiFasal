import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ui/theme-provider";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
  <ThemeProvider defaultTheme="light" storageKey="digi-fasal-theme">
    <App />
  </ThemeProvider>
  </BrowserRouter>
  </React.StrictMode>
);
