# Node + TypeScript + Express API

A small, fully-working REST API built to accompany the CMPT 372 "Server-Side
Scripting" slides. In-memory data only (no database yet - that's next).

## Running it

```bash
npm install
cp .env.example .env    # already done in the zip; edit PORT if 3001 is taken
npm run dev
```

Server starts at `http://localhost:3001`. `npm run dev` uses `tsx watch`,
which re-runs the server automatically whenever you save a `.ts` file - no
manual compile step while developing.

Other scripts:

```bash
npm run build           # tsc — compiles src/ to dist/
npm run start           # runs the COMPILED dist/index.js (what a real deploy would run)
npm run demo:global     # standalone script — the "global object" concepts
npm run demo:eventloop  # standalone script — sync vs async / event loop order
```

## Trying the API

With the server running:

```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/users
curl http://localhost:3001/api/users/2
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"fname":"Grace","lname":"Hopper","age":45}'
curl -X PUT http://localhost:3001/api/users/1 \
  -H "Content-Type: application/json" -d '{"age":25}'
curl -X DELETE http://localhost:3001/api/users/1
curl http://localhost:3001/api/users/demo/async-error   # deliberately throws
curl http://localhost:3001/nope                          # deliberately 404s
```

Or just open `http://localhost:3001/api/users` in a browser for the GET routes.

## File map (concept -> file)

- **Shared types** - `src/types/user.ts`
- **"Database" stand-in** - `src/data/users.ts`
- **Custom middleware (logging)** - `src/middleware/logger.ts`
- **Error-handling middleware** - `src/middleware/errorHandler.ts`
- **Catch-all 404** - `src/middleware/notFound.ts`
- **Async route error forwarding** - `src/middleware/asyncHandler.ts`
- **Routes (CRUD)** - `src/routes/userRoutes.ts`
- **App wiring / server bootstrap** - `src/index.ts`
- **Global object demo (console, process)** - `src/demos/globalObject.ts`
- **Event loop / sync vs async demo** - `src/demos/eventLoop.ts`

## Connecting this to the React project

If you want your React app's Users page to hit THIS server instead of
`jsonplaceholder.typicode.com`, the shapes don't quite match (`fname`/`lname`
here vs `name`/`username`/etc. there) - that's intentional, so you notice the
difference rather than copy-paste blindly. Swapping it in would mean editing
`src/api/userApi.ts` in the React project to point `BASE_URL` at
`http://localhost:3001/api` and adjusting the `User` type to match.
