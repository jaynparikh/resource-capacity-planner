import { useEffect, useMemo, useState } from "react";

import "./employees.css";

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee as deleteEmployeeApi,
} from "../../services/employeeService";

import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";

import Card from "../../components/ui/Card/Card";
import Button from "../../components/ui/Button/Button";
import SearchBox from "../../components/ui/SearchBox/SearchBox";
import Modal from "../../components/ui/Modal/Modal";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortColumn, setSortColumn] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  }

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

  async function saveEmployee(employee) {
    try {
      if (selectedEmployee) {
        await updateEmployee(employee);
      } else {
        await createEmployee(employee);
      }

      await loadEmployees();

      setSelectedEmployee(null);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteEmployee(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      await deleteEmployeeApi(id);
      await loadEmployees();
    } catch (error) {
      console.error(error);
    }
  }

  function closeModal() {
    setSelectedEmployee(null);
    setShowModal(false);
  }

  const filteredEmployees = useMemo(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.role
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.skill
          ?.toLowerCase()
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
          <p>Manage employees and resource capacity.</p>
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