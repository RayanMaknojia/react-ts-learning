import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────
// React Context solves "prop drilling": passing a value down through five
// layers of components that don't care about it, just so the sixth layer
// can use it. Instead, any descendant component can reach up and grab the
// value directly. It's the closest React idea to an Angular singleton
// service shared across a component tree.
// ─────────────────────────────────────────────────────────────────────────

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

// createContext<T>(defaultValue) — the default is only used if a component
// tries to read this context WITHOUT a <ThemeProvider> above it in the
// tree. We deliberately default to `undefined` and throw in useTheme()
// below, so mistakes fail loudly instead of silently.
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ThemeProvider owns the actual state and hands it down via `.Provider`.
// `children: ReactNode` means "any renderable JSX" — this component
// doesn't know or care what it's wrapping.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// A small custom hook wrapping useContext. Components call useTheme()
// instead of useContext(ThemeContext) directly — this lets us guarantee
// a helpful runtime error if someone uses it outside the provider, rather
// than a confusing `undefined.theme` crash somewhere else.
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside a <ThemeProvider>");
  }
  return ctx;
}
