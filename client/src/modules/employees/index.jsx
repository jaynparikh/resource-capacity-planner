import { useMemo, useState } from "react";

import "./employees.css";

import { getEmployees } from "../../services/employeeService";
import EmployeeTable from "./components/EmployeeTable";

import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import SearchBox from "../../components/ui/SearchBox/SearchBox";

export default function Employees() {
  // Employee data (will later come from backend)
  const [employees, setEmployees] = useState(getEmployees());

  // Search
  const [search, setSearch] = useState("");

  // Sorting
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  function handleSort(column) {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  const filteredEmployees = useMemo(() => {
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase())
    );

    filtered.sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (typeof valueA === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortDirection === "asc"
        ? valueA - valueB
        : valueB - valueA;
    });

    return filtered;
  }, [employees, search, sortColumn, sortDirection]);

  return (
    <div className="employees-page">
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p>Manage employees and resource capacity.</p>
        </div>

        <Button>+ Add Employee</Button>
      </div>

      <SearchBox
        placeholder="Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Card>
        <EmployeeTable
          employees={filteredEmployees}
          onHeaderClick={handleSort}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
        />
      </Card>
    </div>
  );
}