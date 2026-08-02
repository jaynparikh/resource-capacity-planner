import { useEffect, useState } from "react";

import "../../../components/ui/Form/Form.css";
import Button from "../../../components/ui/Button/Button";

export default function AllocationForm({
  employees,
  projects,
  allocations,
  onAssign,
}) {
  const [formData, setFormData] = useState({
    employeeId: "",
    projectId: "",
    allocation: "",
  });

  useEffect(() => {
    if (!formData.employeeId || !formData.projectId) {
      return;
    }

    const existing = allocations.find(
      (allocation) =>
        allocation.employeeId ===
          Number(formData.employeeId) &&
        allocation.projectId ===
          Number(formData.projectId)
    );

    if (existing) {
      setFormData((prev) => ({
        ...prev,
        allocation: existing.allocation,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        allocation: "",
      }));
    }
  }, [
    formData.employeeId,
    formData.projectId,
    allocations,
  ]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await onAssign({
      employeeId: Number(formData.employeeId),
      projectId: Number(formData.projectId),
      allocation: Number(formData.allocation),
    });

    setFormData({
      employeeId: "",
      projectId: "",
      allocation: "",
    });
  }

  const existingAllocation = allocations.find(
    (allocation) =>
      allocation.employeeId ===
        Number(formData.employeeId) &&
      allocation.projectId ===
        Number(formData.projectId)
  );

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-title">
        Resource Allocation
      </h2>

      <div className="form-group">
        <label>Employee</label>

        <select
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Employee
          </option>

          {employees.map((employee) => (
            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Project</label>

        <select
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          required
        >
          <option value="">
            Select Project
          </option>

          {projects.map((project) => (
            <option
              key={project.id}
              value={project.id}
            >
              {project.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Allocation (%)</label>

        <input
          type="number"
          name="allocation"
          min="1"
          max="100"
          value={formData.allocation}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-actions">
        <Button type="submit">
          {existingAllocation
            ? "Update Allocation"
            : "Assign Resource"}
        </Button>
      </div>
    </form>
  );
}