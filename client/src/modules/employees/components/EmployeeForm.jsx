import { useState } from "react";

import Button from "../../../components/ui/Button/Button";

export default function EmployeeForm({ onSave, onCancel }) {
  const [employee, setEmployee] = useState({
    name: "",
    role: "",
    skill: "",
    capacity: 100,
    status: "Available",
  });

  function handleChange(e) {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      ...employee,
      id: Date.now(),
      capacity: Number(employee.capacity),
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "15px" }}>
        <label>Name</label>
        <br />
        <input
          name="name"
          value={employee.name}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Role</label>
        <br />
        <input
          name="role"
          value={employee.role}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Skill</label>
        <br />
        <input
          name="skill"
          value={employee.skill}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Capacity</label>
        <br />
        <input
          type="number"
          name="capacity"
          value={employee.capacity}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Status</label>
        <br />
        <select
          name="status"
          value={employee.status}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        >
          <option>Available</option>
          <option>Allocated</option>
          <option>Leave</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <Button type="submit">
          Save
        </Button>

        <Button
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}