import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { getUserById } from "../api/userApi";
import type { User } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";

function UserDetail() {
  // useParams() reads the dynamic segment out of the URL. It's tied to
  // the route defined in App.tsx: <Route path="/users/:id" ... />.
  // Route params always arrive as strings — even though the id looks
  // numeric in the URL bar — so we convert it ourselves.
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  // getUserById needs an argument (userId), but useFetch expects a
  // zero-argument function: () => Promise<T>. Wrapping it in an arrow
  // function bridges the two: `() => getUserById(userId)` IS a valid
  // zero-argument function that, when called, returns a Promise<User>.
  //
  // [userId] as the dependency array means: if the URL changes from
  // /users/1 to /users/2, re-run the fetch automatically.
  const { data: user, loading, error } = useFetch<User>(
    () => getUserById(userId),
    [userId]
  );

  return (
    <div className="container py-4">
      <Link to="/users" className="btn btn-outline-secondary btn-sm mb-3">
        Back to users
      </Link>

      {loading && <LoadingSpinner />}
      {error && <ErrorAlert message={error} />}

      {user && (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{user.name}</h3>
            <h6 className="card-subtitle text-muted mb-3">@{user.username}</h6>
            <ul className="list-group list-group-flush">
              <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
              <li className="list-group-item"><strong>Phone:</strong> {user.phone}</li>
              <li className="list-group-item"><strong>Website:</strong> {user.website}</li>
              <li className="list-group-item">
                <strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}
              </li>
              <li className="list-group-item"><strong>Company:</strong> {user.company.name}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDetail;
