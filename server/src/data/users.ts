import type { User } from "../types/user";

// ─────────────────────────────────────────────────────────────────────────
// This is a placeholder for a real database (that's next week's topic).
// Everything below would normally be SQL queries or a MongoDB collection.
// Keeping it in its own file means when a real database gets swapped in
// later, only THIS file changes - routes never touch storage directly.
// ─────────────────────────────────────────────────────────────────────────

let users: User[] = [
  { id: 1, fname: "Bobby", lname: "Chan", age: 24 },
  { id: 2, fname: "Ada", lname: "Lovelace", age: 28 },
  { id: 3, fname: "Alan", lname: "Turing", age: 31 },
];

// Tracks the next id to hand out. Starts one past the highest seed id.
let nextId = users.length + 1;

export function getAllUsers(): User[] {
  return users;
}

export function getUserById(id: number): User | undefined {
  return users.find((u) => u.id === id);
}

export function createUser(data: Omit<User, "id">): User {
  const newUser: User = { id: nextId++, ...data };
  users.push(newUser);
  return newUser;
}

export function updateUser(id: number, data: Partial<Omit<User, "id">>): User | undefined {
  const user = getUserById(id);
  if (!user) return undefined;

  // Object.assign mutates `user` in place, copying over only the fields
  // present in `data`. Since `user` is the SAME object sitting inside the
  // `users` array, this update is reflected there automatically - no
  // need to find-and-replace the array entry ourselves.
  Object.assign(user, data);
  return user;
}

export function deleteUser(id: number): boolean {
  const lengthBefore = users.length;
  users = users.filter((u) => u.id !== id);
  return users.length < lengthBefore;
}
