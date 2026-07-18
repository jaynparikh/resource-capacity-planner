export default function Dashboard() {
  const stats = [
    {
      title: "Total Employees",
      value: "145",
    },
    {
      title: "Allocated",
      value: "112",
    },
    {
      title: "Available",
      value: "33",
    },
    {
      title: "Utilization",
      value: "77%",
    },
  ];

  return (
    <>
      <h1 className="page-title">Dashboard</h1>

      <p className="page-subtitle">
        Overview of resource allocation and organizational capacity.
      </p>

      <div className="stats-grid">
        {stats.map((card) => (
          <div className="stat-card" key={card.title}>
            <div className="stat-title">{card.title}</div>

            <div className="stat-value">{card.value}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">

        <div className="dashboard-panel">
          <h3>Resource Allocation Trend</h3>

          <div className="placeholder">
            Chart coming soon...
          </div>
        </div>

        <div className="dashboard-panel">
          <h3>Bench Resources</h3>

          <div className="placeholder">
            Employee list coming soon...
          </div>
        </div>

        <div className="dashboard-panel">
          <h3>Upcoming Demand</h3>

          <div className="placeholder">
            Project demand coming soon...
          </div>
        </div>

        <div className="dashboard-panel">
          <h3>Skill Availability</h3>

          <div className="placeholder">
            Skill matrix coming soon...
          </div>
        </div>

      </div>
    </>
  );
}