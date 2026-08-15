import { Link } from "react-router-dom";
import type { User } from "../types";

// ─────────────────────────────────────────────────────────────────────────
// This is a "presentational" (a.k.a. "dumb") component: all of its data
// arrives through props, it holds no state of its own, and it renders the
// same output every time it receives the same props. Compare this to
// Angular's @Input() — `user` here is our @Input.
// ─────────────────────────────────────────────────────────────────────────

// Every component's props get their own `interface`. Naming convention:
// <ComponentName>Props.
interface UserCardProps {
  user: User;
}

// Destructuring `{ user }` straight out of the props object is the
// standard React style — equivalent to `function UserCard(props: UserCardProps) { const user = props.user; ... }`.
function UserCard({ user }: UserCardProps) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{user.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">@{user.username}</h6>
          <p className="card-text mb-1">{user.email}</p>
          <p className="card-text text-muted flex-grow-1">{user.company.name}</p>

          {/* Link is the React Router equivalent of <a routerLink="...">.
              Interpolating `user.id` into the `to` string builds a URL
              like "/users/3" which matches the <Route path="/users/:id" />
              defined in App.tsx. */}
          <Link to={`/users/${user.id}`} className="btn btn-primary btn-sm align-self-start">
            View details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
