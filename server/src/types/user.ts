// ─────────────────────────────────────────────────────────────────────────
// Same idea as the React project's src/types/index.ts: one file holding
// the shapes everything else agrees on. On the backend this doubles as
// documentation for anyone calling your API - "a User looks like this."
// ─────────────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  fname: string;
  lname: string;
  age: number;
}

// The shape of the JSON body a client sends on POST /api/users.
// It's deliberately `Omit<User, "id">` - everything a User has, minus
// `id`, because the SERVER assigns the id, the client never should.
export type CreateUserInput = Omit<User, "id">;

// PUT /api/users/:id lets a client update any subset of the fields.
// `Partial<T>` makes every property optional - Partial<CreateUserInput>
// means "any of fname/lname/age, zero or more of them."
export type UpdateUserInput = Partial<CreateUserInput>;
