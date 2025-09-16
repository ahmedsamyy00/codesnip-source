import { Link } from "react-router-dom";
import { useTheme } from "../Data/ThemeContext"; 

function Sidebar() {
// eslint-disable-next-line no-unused-vars
const { darkMode } = useTheme();

  return (
    <aside
      className={`sidebar d-flex flex-column p-3`} 
      style={{ minHeight: "100vh" }}
    >
      <h4 className="mb-4">Menu</h4>
      <ul className="nav flex-column gap-2 mt-auto"> 
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            <i className="fas fa-home me-2"></i> Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/settings">
            <i className="fas fa-cog me-2"></i> Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">
            <i className="fas fa-info-circle me-2"></i> About
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
