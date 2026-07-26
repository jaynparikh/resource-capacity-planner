import { useMemo, useState } from "react";

import "./employees.css";

import { getEmployees } from "../../services/employeeService";

import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";

import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import SearchBox from "../../components/ui/SearchBox/SearchBox";
import Modal from "../../components/ui/Modal/Modal";

export default function Employees() {
  const [employees, setEmployees] = useState(getEmployees());

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [sortColumn, setSortColumn] = useState("name");

  const [sortDirection, setSortDirection] = useState("asc");

  function handleSort(column) {
    if (sortColumn === column) {
      setSortDirection((prev) =>
        prev === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  }

  function handleAddEmployee() {
    setSelectedEmployee(null);
    setShowModal(true);
  }

  function handleEdit(employee) {
    setSelectedEmployee(employee);
    setShowModal(true);
  }

  function saveEmployee(employee) {
    if (selectedEmployee) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employee.id ? employee : emp
        )
      );
    } else {
      setEmployees((prev) => [...prev, employee]);
    }

    setSelectedEmployee(null);
    setShowModal(false);
  }

  function deleteEmployee(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    setEmployees((prev) =>
      prev.filter((employee) => employee.id !== id)
    );
  }

  function closeModal() {
    setSelectedEmployee(null);
    setShowModal(false);
  }

  const filteredEmployees = useMemo(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.role
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.skill
          .toLowerCase()
          .includes(search.toLowerCase())
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
  }, [
    employees,
    search,
    sortColumn,
    sortDirection,
  ]);

  return (
    <div className="employees-page">
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p>
            Manage employees and resource capacity.
          </p>
        </div>

        <Button onClick={handleAddEmployee}>
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
          onEdit={handleEdit}
          onDelete={deleteEmployee}
        />
      </Card>

      <Modal
        isOpen={showModal}
        onClose={closeModal}
      >
        <EmployeeForm
          employee={selectedEmployee}
          onSave={saveEmployee}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}