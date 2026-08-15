# CMPT 372 React Lab — React + TypeScript starter

A small, fully-working app built to teach React + TypeScript to someone who
already knows JavaScript. It's built with [Vite](https://vite.dev), styled
with Bootstrap 5, and covers components, props, state, effects, promises,
`async/await`, a real API call, routing, `useReducer`, `useRef`, and Context.

## Running it

You need [Node.js](https://nodejs.org) installed (18+). Then, in a terminal,
inside this folder:

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

Other useful commands:

```bash
npm run build      # type-checks and produces an optimized dist/ folder
npm run preview    # serves that dist/ folder locally, like production
```

## What's in the app

| Page | Route | What it demonstrates |
|---|---|---|
| Home | `/` | Static component, `<Link>` navigation |
| Users | `/users` | `fetch()`, Promises, `async/await`, a custom `useFetch` hook |
| User detail | `/users/:id` | Dynamic routes, `useParams` |
| Todos | `/todos` | `useReducer`, `useState`, `useRef`, controlled forms |
| Concepts | `/about` | Plain-English write-up of every concept, with code snippets |

## File map (concept → file)

- **Types** — `src/types/index.ts`
- **API calls (Promises / async-await)** — `src/api/userApi.ts`
- **Custom hook (generics + useEffect + useState)** — `src/hooks/useFetch.ts`
- **useReducer state machine** — `src/reducers/todoReducer.ts`
- **React Context** — `src/context/ThemeContext.tsx`
- **Router setup** — `src/App.tsx`, `src/main.tsx`
- **Reusable components** — `src/components/`
- **Routed pages** — `src/pages/`

Each `.tsx`/`.ts` file has inline comments explaining *why* the code is
written the way it is, not just what it does. Each component that needs
styling beyond Bootstrap utility classes has its own `.css` file sitting
right next to it (e.g. `Navbar.tsx` + `Navbar.css`).
