import Card from "../../../components/ui/Card/Card";

export default function CapacityCard({
  employee,
  utilization,
  remaining,
  projectCount,
}) {
  return (
    <Card>
      <h3>{employee}</h3>

      <p>
        <strong>Utilization:</strong>{" "}
        {utilization}%
      </p>

      <p>
        <strong>Remaining:</strong>{" "}
        {remaining}%
      </p>

      <p>
        <strong>Projects:</strong>{" "}
        {projectCount}
      </p>

      <progress
        value={utilization}
        max="100"
        style={{
          width: "100%",
          height: "18px",
        }}
      />
    </Card>
  );
}