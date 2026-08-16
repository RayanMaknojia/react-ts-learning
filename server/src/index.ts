import "dotenv/config"; // loads .env into process.env before anything else runs
import express from "express";
import cors from "cors";
import { requestLogger } from "./middleware/logger";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import userRoutes from "./routes/userRoutes";
import healthRoutes from "./routes/healthRoutes";

// ─────────────────────────────────────────────────────────────────────────
// This file is the ONE place the server boots from - same role as
// src/main.tsx in the React project. Everything else is imported from
// here, directly or indirectly, and the order things are `app.use()`'d
// in matters: Express checks middleware/routes top-to-bottom for every
// single request until one of them sends a response.
// ─────────────────────────────────────────────────────────────────────────

const app = express();
const PORT = process.env.PORT ?? 3001;

// ----- Global middleware — runs on EVERY request, before any route -----

// Lets the React dev server (a different origin, e.g. localhost:5173)
// call this API. Without this, the browser blocks the response due to
// the Same-Origin Policy, even though the server answered fine.
app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" }));

// Parses an incoming JSON request body into a plain object and attaches
// it as req.body. Without this line, req.body would be undefined in
// every POST/PUT handler.
app.use(express.json());

// Our own custom middleware from src/middleware/logger.ts.
app.use(requestLogger);

// ----- Routes -----

app.use("/health", healthRoutes);
app.use("/api/users", userRoutes);

// A tiny root route, just so hitting http://localhost:3001/ in a browser
// shows something instead of "Cannot GET /".
app.get("/", (req, res) => {
  res.json({ message: "Node + TypeScript + Express API is running." });
});

// ----- These two MUST be registered last -----

// Runs only if nothing above matched the request.
app.use(notFound);

// Runs only if something above called next(err), or an async handler
// wrapped in asyncHandler() rejected. Must be the very last app.use().
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
