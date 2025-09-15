import { Link } from "react-router-dom";
import { useTheme } from "../Data/ThemeContext";

function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav
      className={`navbar navbar-expand-lg px-3 ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light border-bottom"
      }`}
    >
      <Link className="navbar-brand fw-bold" to="/">
        CodeSnip
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-semibold" to="/settings">
              Settings
            </Link>
          </li>
        </ul>

        <button
          className={`btn btn-sm ms-3 ${
            darkMode ? "btn-outline-light" : "btn-outline-dark"
          }`}
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
