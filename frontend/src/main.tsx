import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "./index.css";
import { App } from "./App.tsx";
import { DecksProvider } from "./DecksContext.tsx";
import { theme } from "./theme.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <DecksProvider>
          <App />
        </DecksProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
