import type { Request, Response } from "express";

// ─────────────────────────────────────────────────────────────────────────
// Express tries routes in the order they were registered. If a request
// falls through EVERY route without being matched, it reaches whatever
// is registered last - this handler. See src/index.ts for where it's
// mounted (after all real routes, before the error handler).
// ─────────────────────────────────────────────────────────────────────────

export function notFound(req: Request, res: Response): void {
  res.status(404).json({
    error: "Not found",
    path: req.originalUrl,
  });
}
