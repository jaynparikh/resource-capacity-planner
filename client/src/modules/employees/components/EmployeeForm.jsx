import { useEffect, useState } from "react";

import Button from "../../../components/ui/Button/Button";

import "../../../components/ui/Form/Form.css";

const initialEmployee = {
  name: "",
  role: "",
  skill: "",
  capacity: 100,
  status: "Available",
};

export default function EmployeeForm({
  employee,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState(initialEmployee);

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    } else {
      setFormData(initialEmployee);
    }
  }, [employee]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "capacity"
          ? Number(value)
          : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="form-title">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>

      <div className="form-group">
        <label>Name</label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Role</label>

        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Primary Skill</label>

        <input
          name="skill"
          value={formData.skill}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Capacity (%)</label>

        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />
      </div>

      <div className="form-group">
        <label>Status</label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Available">
            Available
          </option>

          <option value="Allocated">
            Allocated
          </option>

          <option value="Leave">
            Leave
          </option>
        </select>
      </div>

      <div className="form-actions">
        <Button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          {employee
            ? "Update Employee"
            : "Save Employee"}
        </Button>
      </div>
    </form>
  );
}