import { NavLink } from "react-router-dom";
import "./layout.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        RCP
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/">
          📊 Dashboard
        </NavLink>

        <NavLink to="/employees">
          👥 Employees
        </NavLink>

        <NavLink to="/projects">
          📁 Projects
        </NavLink>

        <NavLink to="/allocation">
          📌 Allocation
        </NavLink>

        <NavLink to="/capacity">
          📈 Capacity
        </NavLink>

        <NavLink to="/reports">
          📋 Reports
        </NavLink>

        <NavLink to="/settings">
          ⚙ Settings
        </NavLink>

      </nav>

    </aside>
  );
}