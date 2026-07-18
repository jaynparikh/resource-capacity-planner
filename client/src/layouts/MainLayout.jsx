import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import "../components/layout/layout.css";

export default function MainLayout() {
  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <Header />

        <main className="page">
          <Outlet />
        </main>

      </div>

    </div>
  );
}