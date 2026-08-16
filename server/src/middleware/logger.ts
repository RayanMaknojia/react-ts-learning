import type { Request, Response, NextFunction } from "express";

// ─────────────────────────────────────────────────────────────────────────
// This is a "middleware function" - the slides define it as: has access
// to req, res, and the next middleware in the stack. Every route handler
// you write is ALSO technically a middleware function; this one just
// doesn't send a response itself, so it must call next() or every request
// would hang forever waiting for a response that never comes.
// ─────────────────────────────────────────────────────────────────────────

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);

  // Hands control to whatever is registered next (another middleware,
  // or the matching route handler). Forgetting this line is the single
  // most common Express bug - the request just hangs, no error, no
  // response, nothing.
  next();
}
