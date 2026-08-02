import { useEffect, useState } from "react";
import "./settings.css";

export default function Settings() {
  const [settings, setSettings] = useState({
    companyName: "",
    workingHours: 8,
    defaultCapacity: 100,
  });

  useEffect(() => {
    const saved = localStorage.getItem("planner-settings");

    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem(
      "planner-settings",
      JSON.stringify(settings)
    );

    alert("Settings saved successfully.");
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-card">
        <div className="form-group">
          <label>Company Name</label>

          <input
            type="text"
            name="companyName"
            value={settings.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
          />
        </div>

        <div className="form-group">
          <label>Working Hours / Day</label>

          <input
            type="number"
            name="workingHours"
            value={settings.workingHours}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Default Capacity (%)</label>

          <input
            type="number"
            name="defaultCapacity"
            value={settings.defaultCapacity}
            onChange={handleChange}
          />
        </div>

        <button
          className="save-btn"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}