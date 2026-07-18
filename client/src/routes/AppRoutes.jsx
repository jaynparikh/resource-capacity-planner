import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../modules/dashboard";
import Employees from "../modules/employees";
import Projects from "../modules/projects";
import Allocation from "../modules/allocation";
import Capacity from "../modules/capacity";
import Reports from "../modules/reports";
import Settings from "../modules/settings";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/allocation" element={<Allocation />} />
          <Route path="/capacity" element={<Capacity />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}