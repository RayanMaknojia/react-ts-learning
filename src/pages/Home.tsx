import { Link } from "react-router-dom";

// A "page" component is really no different from any other component —
// the folder split (pages/ vs components/) is just a convention to
// separate "things routed to directly" from "reusable building blocks".
function Home() {
  return (
    <div className="container py-5">
      <div className="p-5 mb-4 bg-body-tertiary rounded-3 text-center">
        <h1 className="display-5 fw-bold">React + TypeScript Lab</h1>
        <p className="col-lg-8 mx-auto fs-5 text-muted">
          A companion project for CMPT 372. It rebuilds the ideas from the Angular slides
          — components, inputs, routing, HTTP calls — the React + TypeScript way.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Users (API)</h5>
              <p className="card-text">
                Fetches real data with <code>fetch()</code>, Promises, and{" "}
                <code>async/await</code>, wrapped in a reusable <code>useFetch</code> hook.
              </p>
              <Link to="/users" className="btn btn-primary">Open</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Todos (State)</h5>
              <p className="card-text">
                No API here — just local component state with <code>useReducer</code>,{" "}
                <code>useState</code>, and <code>useRef</code>.
              </p>
              <Link to="/todos" className="btn btn-primary">Open</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Concepts</h5>
              <p className="card-text">
                A plain-English cheat sheet of every concept used in this project.
              </p>
              <Link to="/about" className="btn btn-outline-primary">Open</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
