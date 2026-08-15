import { useReducer, useRef, useState } from "react";
import type { FormEvent } from "react";
import { todoReducer } from "../reducers/todoReducer";
import type { Todo } from "../types";
import "./Todos.css";

// Seed data — normally this might come from an API or localStorage,
// here it's hardcoded so the page has something to show immediately.
const initialTodos: Todo[] = [
  { id: 1, text: "Review Angular components", done: true },
  { id: 2, text: "Learn React + TypeScript", done: false },
];

function Todos() {
  // useReducer(reducerFn, initialState) returns a [state, dispatch] pair,
  // very similar to useState's [value, setValue]. Prefer useReducer over
  // useState when "the next state depends on the action taken" in more
  // than one simple way — here we have add / toggle / delete / clear.
  //
  // Instead of writing setTodos([...todos, newTodo]) inline in a click
  // handler, we dispatch a plain object describing WHAT happened
  // ({ type: "ADD", payload: "..." }), and the reducer (in a separate
  // file) decides HOW state should change. This keeps the component's
  // JSX focused on rendering, not on state-mutation logic.
  const [todos, dispatch] = useReducer(todoReducer, initialTodos);

  // A plain useState for the text box — this is a "controlled input":
  // the <input>'s value is driven entirely by React state, not by the
  // DOM itself, so `text` is always the single source of truth.
  const [text, setText] = useState("");

  // useRef gives us a mutable box (`{ current: ... }`) that persists
  // across re-renders WITHOUT causing a re-render when it changes —
  // unlike useState. We use it here to get a direct handle on the real
  // <input> DOM node so we can imperatively call `.focus()` on it,
  // something React's declarative model doesn't have a prop for.
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Forms reload the page by default when submitted — this stops that,
    // the same job Angular's (click) handler does implicitly for you.
    event.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    dispatch({ type: "ADD", payload: trimmed });
    setText(""); // clear the controlled input
    inputRef.current?.focus(); // `?.` because .current can be null before mount
  }

  const remaining = todos.filter((todo) => !todo.done).length;

  return (
    <div className="container py-4">
      <h2 className="mb-3">Todos</h2>
      <p className="text-muted">
        Purely local component state — <code>useReducer</code>, <code>useState</code>,{" "}
        and <code>useRef</code>. No network calls on this page.
      </p>

      <form className="input-group mb-3" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="form-control"
          placeholder="Add a task..."
          value={text}
          // Every keystroke fires this, updating state, which re-renders
          // the input with the new `value` — this round trip is what
          // "controlled input" means.
          onChange={(event) => setText(event.target.value)}
        />
        <button className="btn btn-primary" type="submit">Add</button>
      </form>

      <ul className="list-group mb-3">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span
              onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}
              className={`todo-text${todo.done ? " todo-text--done" : ""}`}
            >
              {todo.text}
            </span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => dispatch({ type: "DELETE", payload: todo.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between align-items-center">
        <span className="text-muted">{remaining} task(s) remaining</span>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

export default Todos;
