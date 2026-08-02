import Card from "../../../components/ui/Card/Card";

export default function CapacityCard({
  employee,
  utilization,
  remaining,
  projectCount,
}) {
  let status = "Available";
  let statusClass = "available";
  let progressClass = "available";

  if (utilization === 100) {
    status = "Fully Utilized";
    statusClass = "full";
    progressClass = "full";
  }

  if (utilization > 100) {
    status = "Overallocated";
    statusClass = "over";
    progressClass = "over";
  }

  return (
    <Card>
      <div className="capacity-card-header">
        <h3>{employee}</h3>

        <span className={`capacity-status ${statusClass}`}>
          {status}
        </span>
      </div>

      <div className="capacity-progress">
        <div
          className={`capacity-progress-fill ${progressClass}`}
          style={{
            width: `${Math.min(utilization, 100)}%`,
          }}
        />
      </div>

      <div className="capacity-metrics">
        <div className="capacity-metric">
          <span>Utilization</span>
          <strong>{utilization}%</strong>
        </div>

        <div className="capacity-metric">
          <span>Remaining</span>
          <strong>{remaining}%</strong>
        </div>

        <div className="capacity-metric">
          <span>Projects</span>
          <strong>{projectCount}</strong>
        </div>
      </div>
    </Card>
  );
}