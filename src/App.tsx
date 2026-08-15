import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UserDetail from "./pages/UserDetail";
import Todos from "./pages/Todos";
import About from "./pages/About";

// App is the top-level component. Its only job is layout + routing:
// always show the Navbar, then render whichever page matches the
// current URL in its place. This is the React equivalent of Angular's
// root component containing <app-navbar> and <router-outlet>.
function App() {
  return (
    <>
      <Navbar />

      {/* <Routes> looks at the current URL and renders the FIRST
          matching <Route>'s element. Each `path` maps 1:1 to a page
          component — ":id" is a dynamic segment read via useParams(). */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
