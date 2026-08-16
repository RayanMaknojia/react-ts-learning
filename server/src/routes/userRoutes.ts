import { Router } from "express";
import type { Request, Response } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../data/users";
import type { CreateUserInput, UpdateUserInput } from "../types/user";
import { asyncHandler } from "../middleware/asyncHandler";

// ─────────────────────────────────────────────────────────────────────────
// A Router is a "mini app" - its own bundle of routes that main index.ts
// mounts under a prefix (see `app.use("/api/users", userRouter)`). This
// keeps index.ts short and groups everything about "users" in one file -
// the same organizing idea as splitting React pages into their own files.
// ─────────────────────────────────────────────────────────────────────────

const router = Router();

// GET /api/users
router.get("/", (req: Request, res: Response) => {
  res.json(getAllUsers());
});

// GET /api/users/:id
// `:id` is a route parameter - Express parses it out of the URL for you
// and puts it on req.params, same idea as React Router's useParams().
router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = getUserById(id);

  if (!user) {
    // res.status().json() is the whole "send a response" step - once
    // this is called, the request is done, nothing else can respond
    // to it (calling res.json() twice throws).
    res.status(404).json({ error: `No user with id ${id}` });
    return;
  }

  res.json(user);
});

// POST /api/users
// req.body only exists because express.json() middleware ran first
// (registered in index.ts) and parsed the raw request bytes into an
// object for us.
router.post("/", (req: Request<{}, {}, CreateUserInput>, res: Response) => {
  const { fname, lname, age } = req.body;

  if (!fname || !lname || typeof age !== "number") {
    res.status(400).json({ error: "fname, lname, and age (number) are required" });
    return;
  }

  const newUser = createUser({ fname, lname, age });
  res.status(201).json(newUser);
});

// PUT /api/users/:id
router.put("/:id", (req: Request<{ id: string }, {}, UpdateUserInput>, res: Response) => {
  const id = Number(req.params.id);
  const updated = updateUser(id, req.body);

  if (!updated) {
    res.status(404).json({ error: `No user with id ${id}` });
    return;
  }

  res.json(updated);
});

// DELETE /api/users/:id
router.delete("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const wasDeleted = deleteUser(id);

  if (!wasDeleted) {
    res.status(404).json({ error: `No user with id ${id}` });
    return;
  }

  // 204 = "No Content" - the standard response for a successful delete
  // that has nothing to send back.
  res.status(204).send();
});

// GET /api/users/demo/async-error - deliberately throws, to prove
// asyncHandler + errorHandler actually catch it. Try hitting this route.
router.get(
  "/demo/async-error",
  asyncHandler(async (req: Request, res: Response) => {
    await new Promise((resolve) => setTimeout(resolve, 200)); // pretend this is a slow DB call
    throw new Error("Simulated failure inside an async route handler");
  })
);

export default router;
