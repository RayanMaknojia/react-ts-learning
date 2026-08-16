import type { Request, Response, NextFunction, RequestHandler } from "express";

// ─────────────────────────────────────────────────────────────────────────
// Express was built before Promises were common in Node, and it never
// learned to catch a rejected Promise on its own. If an `async` route
// handler throws (e.g. `await someDbCall()` fails), Express does NOT
// automatically forward that to errorHandler.ts - the request just hangs,
// and the error only shows up as an "unhandled promise rejection"
// warning in your terminal.
//
// asyncHandler wraps a handler and manually does the forwarding:
// `.catch(next)` means "if the returned Promise rejects, call next(err)",
// which is exactly what routes it into errorHandler.ts.
// ─────────────────────────────────────────────────────────────────────────

export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
