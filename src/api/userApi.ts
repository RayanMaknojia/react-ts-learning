import type { User } from "../types";

// ─────────────────────────────────────────────────────────────────────────
// This file is our "service layer" (same idea as an Angular @Injectable
// service): components never call fetch() directly, they call these
// functions instead. That means if the API ever changes, we only edit
// this one file.
// ─────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://jsonplaceholder.typicode.com";

// `async function` does two things:
//   1. Lets us use `await` inside the function body.
//   2. Automatically wraps whatever we `return` in a Promise.
// So even though the last line says `return data`, the actual return
// type of this function is `Promise<User[]>`, not `User[]`.
export async function getUsers(): Promise<User[]> {
  // fetch() itself returns a Promise<Response> immediately — the request
  // is in flight in the background. `await` pauses this function (without
  // blocking the browser) until that Promise settles, then unwraps it.
  const response = await fetch(`${BASE_URL}/users`);

  // fetch() only rejects on a *network* failure (no internet, DNS error).
  // A 404 or 500 still counts as a "successful" fetch as far as the
  // Promise is concerned, so we have to check response.ok ourselves and
  // throw manually if the server reported an error.
  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
  }

  // response.json() ALSO returns a Promise (parsing the body takes time),
  // so we await it too. We annotate `data: User[]` to tell TypeScript
  // what shape to trust this JSON as — TypeScript can't check the network
  // response for us, this is us promising the compiler it will match.
  const data: User[] = await response.json();
  return data;
}

export async function getUserById(id: number): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch user ${id}: ${response.status} ${response.statusText}`);
  }

  const data: User = await response.json();
  return data;
}

// ─────────────────────────────────────────────────────────────────────────
// Equivalent written with raw Promise `.then()` chains instead of
// async/await, for comparison — async/await is just syntax sugar over
// this. Not exported/used anywhere, kept here purely as a reference.
//
// export function getUsersWithThen(): Promise<User[]> {
//   return fetch(`${BASE_URL}/users`)
//     .then((response) => {
//       if (!response.ok) throw new Error("Failed to fetch users");
//       return response.json();
//     })
//     .then((data: User[]) => data);
// }
// ─────────────────────────────────────────────────────────────────────────
