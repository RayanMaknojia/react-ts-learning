import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Bootstrap's CSS, then our own overrides after it, so our rules can
// still win if there's ever a clash.
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext";

// This is the ONE place the whole app "boots" from — the entry point
// Vite's index.html points to. Everything else is imported from here,
// directly or indirectly.
//
// document.getElementById("root")! finds the empty <div id="root"> in
// index.html; the `!` tells TypeScript "trust me, this element exists"
// (it does — it's in index.html, TypeScript just can't see that file).
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* BrowserRouter must wrap anything that uses routing components
        (Routes, Route, Link, useParams, ...) — it's what reads/writes
        the actual browser URL. */}
    <BrowserRouter>
      {/* ThemeProvider makes theme/toggleTheme available to every
          component below it via useTheme() — see src/context/ThemeContext.tsx. */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
