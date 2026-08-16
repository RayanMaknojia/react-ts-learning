import { Router } from "express";
import type { Request, Response } from "express";

// A tiny route, kept separate from userRoutes.ts on purpose - it's a good
// first example of "one Router per concern" before userRoutes.ts shows a
// busier one.
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    uptimeSeconds: process.uptime(), // process is a global object - see src/demos/globalObject.ts
    timestamp: new Date().toISOString(),
  });
});

export default router;
