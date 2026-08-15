// ─────────────────────────────────────────────────────────────────────────
// This file holds every custom TYPE used in the app.
// TypeScript types only exist while compiling — they disappear completely
// from the JavaScript that ships to the browser. Think of them as
// documentation that the compiler actually checks for you.
// ─────────────────────────────────────────────────────────────────────────

// ----- Shapes returned by the JSONPlaceholder API (src/api/userApi.ts) -----

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
}

// `interface` describes the exact shape an object must have.
// If the API ever sent us `user.name` as a number, TypeScript would
// flag it the moment we tried to render it as text.
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

// ----- Shape used by the local (non-API) Todos page -----

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

// A "discriminated union": each branch has a different `payload` type,
// and TypeScript narrows which one applies based on the `type` string.
// This is what lets useReducer's dispatch() catch typos and bad payloads
// at compile time instead of at runtime.
export type TodoAction =
  | { type: "ADD"; payload: string }
  | { type: "TOGGLE"; payload: number }
  | { type: "DELETE"; payload: number }
  | { type: "CLEAR_COMPLETED" };

// ----- Shape returned by our generic useFetch hook (src/hooks/useFetch.ts) -----

// `<T>` is a placeholder — a "generic" — filled in by whoever uses this
// type. FetchState<User[]> means `data` will be `User[] | null`.
// FetchState<User> means `data` will be `User | null`.
export interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
