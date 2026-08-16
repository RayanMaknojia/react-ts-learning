import type { Request, Response, NextFunction } from "express";

// ─────────────────────────────────────────────────────────────────────────
// Express recognizes this as an ERROR-HANDLING middleware specifically
// because it takes FOUR arguments (err, req, res, next) instead of three.
// That's not a style choice - Express literally checks function.length
// to decide whether to treat it as a normal or error middleware. It must
// be registered LAST, after every route and every other middleware.
//
// It gets called whenever a route handler calls next(err), or - because
// of asyncHandler.ts - whenever an async route handler's Promise rejects.
// ─────────────────────────────────────────────────────────────────────────

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void {
  console.error(`[error] ${req.method} ${req.originalUrl} -`, err.message);

  res.status(500).json({
    error: "Internal server error",
    message: err.message,
  });
}
