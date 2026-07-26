import { useEffect, useState } from "react";

import Button from "../../../components/ui/Button/Button";

import "../../../components/ui/Form/Form.css";

const initialProject = {
  id: null,
  name: "",
  client: "",
  manager: "",
  teamSize: 1,
  technology: "",
  status: "Planning",
};

export default function ProjectForm({
  project,
  onSave,
  onCancel,
}) {
  const [formData, setFormData] = useState(initialProject);

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        ...initialProject,
        id: Date.now(),
      });
    }
  }, [project]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "teamSize"
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
        {project ? "Edit Project" : "Add Project"}
      </h2>

      <div className="form-group">
        <label>Project Name</label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Client</label>

        <input
          name="client"
          value={formData.client}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Project Manager</label>

        <input
          name="manager"
          value={formData.manager}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Team Size</label>

        <input
          type="number"
          name="teamSize"
          value={formData.teamSize}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div className="form-group">
        <label>Technology</label>

        <input
          name="technology"
          value={formData.technology}
          onChange={handleChange}
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
          <option>Planning</option>
          <option>Active</option>
          <option>Completed</option>
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
          {project
            ? "Update Project"
            : "Save Project"}
        </Button>
      </div>
    </form>
  );
}