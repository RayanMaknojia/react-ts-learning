import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

// ─────────────────────────────────────────────────────────────────────────
// <NavLink> looks like a plain <a> but React Router intercepts the click,
// updates the browser URL via the History API, and swaps in the matching
// <Route>'s element — no full page reload, same idea as Angular's
// <router-outlet> + routerLink.
// ─────────────────────────────────────────────────────────────────────────

function Navbar() {
  // Reading shared state from context. No props were passed down to get
  // this — Navbar just reaches up to whatever <ThemeProvider> wraps it
  // (see src/main.tsx).
  const { theme, toggleTheme } = useTheme();

  // NavLink accepts a FUNCTION for className, called with { isActive }.
  // This is how we add Bootstrap's "active" class to whichever link
  // matches the current URL.
  function linkClass({ isActive }: { isActive: boolean }): string {
    return `nav-link${isActive ? " active" : ""}`;
  }

  return (
    <nav className={`navbar navbar-expand-lg border-bottom bg-${theme === "light" ? "light" : "dark"}`} data-bs-theme={theme}>
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          CMPT 372 React Lab
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto">
            {/* `end` means this link is only "active" on an EXACT match
                of "/", otherwise it would also light up on every other
                route since they all start with "/". */}
            <li className="nav-item">
              <NavLink to="/" end className={linkClass}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/users" className={linkClass}>Users (API)</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/todos" className={linkClass}>Todos (State)</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={linkClass}>Concepts</NavLink>
            </li>
          </ul>

          <button className="btn btn-outline-secondary btn-sm" onClick={toggleTheme}>
            {theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
