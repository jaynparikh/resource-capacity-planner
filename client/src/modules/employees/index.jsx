import { useMemo, useState } from "react";

import "./employees.css";

import { getEmployees } from "../../services/employeeService";

import EmployeeTable from "./components/EmployeeTable";
import EmployeeModal from "./components/EmployeeModal";
import EmployeeForm from "./components/EmployeeForm";

import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import SearchBox from "../../components/ui/SearchBox/SearchBox";

export default function Employees() {
  const [employees, setEmployees] = useState(getEmployees());

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

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

  function addEmployee(employee) {
    setEmployees((prev) => [...prev, employee]);
    setShowModal(false);
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

        <Button onClick={() => setShowModal(true)}>
          + Add Employee
        </Button>
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

      <EmployeeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <EmployeeForm
          onSave={addEmployee}
          onCancel={() => setShowModal(false)}
        />
      </EmployeeModal>
    </div>
  );
}