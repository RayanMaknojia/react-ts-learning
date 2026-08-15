import type { Todo, TodoAction } from "../types";

// ─────────────────────────────────────────────────────────────────────────
// A reducer is a PURE function: (currentState, action) -> newState.
// "Pure" means: given the same inputs it always returns the same output,
// and it never mutates `state` in place — it always builds and returns a
// brand new array/object. React relies on this: it detects changes by
// comparing the OLD state reference to the NEW one, so mutating in place
// (e.g. `state.push(...)`) would silently break re-rendering.
// ─────────────────────────────────────────────────────────────────────────

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  // TypeScript knows, inside each `case`, exactly what `action.payload`
  // looks like — that's the payoff of the discriminated union we defined
  // in src/types/index.ts.
  switch (action.type) {
    case "ADD": {
      const newTodo: Todo = {
        id: Date.now(), // good enough uniqueness for a demo app
        text: action.payload,
        done: false,
      };
      // Spread the old array into a new one, then add the new item.
      // `[...state, newTodo]` — never `state.push(newTodo)`.
      return [...state, newTodo];
    }

    case "TOGGLE":
      // .map() returns a brand new array. For the matching todo we return
      // a brand new object (`{ ...todo, done: !todo.done }`) instead of
      // flipping `todo.done` in place.
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );

    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);

    case "CLEAR_COMPLETED":
      return state.filter((todo) => !todo.done);

    default:
      return state;
  }
}
