import "./About.css";

// A purely static page — no hooks, no state. Good reminder that not every
// component needs to be "smart"; plain functions returning JSX are the
// majority of any real app.
function About() {
  return (
    <div className="container py-4">
      <h2 className="mb-4">Concepts cheat sheet</h2>

      <section className="mb-4">
        <h4>1. Components &amp; props</h4>
        <p>
          A component is a function that returns JSX (HTML-like syntax inside JS/TS).
          Data flows IN to a component through <code>props</code> — read-only, just like
          Angular's <code>@Input()</code>.
        </p>
        <pre className="cheat-block"><code>{`function Greeting({ name }: { name: string }) {
  return <h2>Hello, {name}</h2>;
}

<Greeting name="Alice" />`}</code></pre>
      </section>

      <section className="mb-4">
        <h4>2. useState</h4>
        <p>
          Holds a single piece of state. Calling the setter schedules a re-render with the
          new value — you never mutate state directly.
        </p>
        <pre className="cheat-block"><code>{`const [count, setCount] = useState(0);
setCount(count + 1);
setCount((prev) => prev + 1); // safer when new value depends on old`}</code></pre>
      </section>

      <section className="mb-4">
        <h4>3. useEffect</h4>
        <p>
          Runs side effects (API calls, subscriptions, timers) after render. The dependency
          array controls when it re-runs — <code>[]</code> means "once, on mount".
        </p>
        <pre className="cheat-block"><code>{`useEffect(() => {
  // runs after the component first renders
  return () => {
    // optional cleanup, runs before the next effect or on unmount
  };
}, [/* dependencies */]);`}</code></pre>
      </section>

      <section className="mb-4">
        <h4>4. Promises</h4>
        <p>
          A <code>Promise</code> represents a value that isn't ready yet, but will resolve
          (success) or reject (failure) eventually. <code>fetch()</code> returns one
          immediately, before the network request finishes.
        </p>
        <pre className="cheat-block"><code>{`fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));`}</code></pre>
      </section>

      <section className="mb-4">
        <h4>5. async / await</h4>
        <p>
          Syntax sugar over <code>.then()</code> chains that reads top-to-bottom like
          synchronous code. <code>await</code> can only be used inside a function marked{" "}
          <code>async</code>, and it pauses that function (not the whole app) until the
          Promise settles.
        </p>
        <pre className="cheat-block"><code>{`async function loadUsers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}`}</code></pre>
      </section>

      <section className="mb-4">
        <h4>6. Calling an API from a component</h4>
        <p>
          This project splits the job three ways: <code>src/api/userApi.ts</code> knows{" "}
          <em>how</em> to call the API, <code>src/hooks/useFetch.ts</code> knows{" "}
          <em>when</em> to call it and tracks loading/error state, and page components
          (<code>Users.tsx</code>, <code>UserDetail.tsx</code>) just consume the result.
        </p>
      </section>

      <section className="mb-4">
        <h4>7. useReducer</h4>
        <p>
          An alternative to <code>useState</code> for state that changes in several
          distinct ways. You <code>dispatch</code> a plain object describing what
          happened, and a separate <code>reducer</code> function decides the new state.
          See <code>src/reducers/todoReducer.ts</code> and <code>src/pages/Todos.tsx</code>.
        </p>
      </section>

      <section className="mb-4">
        <h4>8. useRef</h4>
        <p>
          A mutable box (<code>{`{ current: value }`}</code>) that survives re-renders
          without causing one when it changes. Commonly used to reach a real DOM node
          (focusing an input, measuring size) — React's escape hatch for imperative code.
        </p>
      </section>

      <section className="mb-4">
        <h4>9. React Router</h4>
        <p>
          Client-side routing: swaps components based on the URL without a full page
          reload. <code>&lt;Routes&gt;</code>/<code>&lt;Route&gt;</code> map paths to
          elements, <code>&lt;Link&gt;</code>/<code>&lt;NavLink&gt;</code> navigate, and{" "}
          <code>useParams()</code> reads dynamic segments like <code>:id</code>.
        </p>
      </section>

      <section className="mb-4">
        <h4>10. Context</h4>
        <p>
          Shares a value across many components without passing it down through every
          layer of props ("prop drilling"). See{" "}
          <code>src/context/ThemeContext.tsx</code>, used by the light/dark toggle in
          the navbar.
        </p>
      </section>

      <section>
        <h4>11. TypeScript generics</h4>
        <p>
          A generic type/function is written once but works with many types, filled in
          later with <code>&lt;T&gt;</code>. <code>useFetch&lt;User[]&gt;(...)</code>{" "}
          and <code>useFetch&lt;User&gt;(...)</code> reuse the exact same hook for two
          different shapes of data — see <code>src/hooks/useFetch.ts</code>.
        </p>
      </section>
    </div>
  );
}

export default About;
