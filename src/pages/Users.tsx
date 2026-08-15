import { useFetch } from "../hooks/useFetch";
import { getUsers } from "../api/userApi";
import type { User } from "../types";
import UserCard from "../components/UserCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

function Users() {
  // useFetch<User[]>(...) — the <User[]> tells TypeScript (and our editor)
  // that `users` below will be `User[] | null`, so autocomplete on
  // `user.name`, `user.email` etc. all just works.
  //
  // We pass `getUsers` BY REFERENCE — no parentheses. useFetch calls it
  // internally. If we wrote `useFetch(getUsers(), [])` we'd be handing it
  // an already-started Promise instead of a function that can be re-run.
  const { data: users, loading, error } = useFetch<User[]>(getUsers, []);

  return (
    <div className="container py-4">
      <h2 className="mb-3">Users</h2>
      <p className="text-muted">
        Live data from <code>https://jsonplaceholder.typicode.com/users</code>, fetched with{" "}
        <code>fetch()</code> + <code>async/await</code> through <code>useFetch</code>.
      </p>

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      {/* `users && (...)` only renders the grid once data has arrived —
          on the first render `users` is `null`, and `null && anything`
          short-circuits to `null`, which React simply renders as nothing. */}
      {users && (
        <div className="row">
          {users.map((user) => (
            // `key` is required by React whenever you render a list with
            // .map() — it needs a stable, unique id per item so it can
            // efficiently figure out what changed between renders. It's
            // never actually visible in the DOM.
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
