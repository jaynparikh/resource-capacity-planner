import Table from "../../../components/ui/Table/Table";
import Badge from "../../../components/ui/Badge/Badge";

const headers = [
  {
    key: "employee",
    label: "Employee",
  },
  {
    key: "project",
    label: "Project",
  },
  {
    key: "allocation",
    label: "Allocation %",
  },
  {
    key: "utilization",
    label: "Utilization",
  },
  {
    key: "remaining",
    label: "Remaining",
  },
  {
    key: "status",
    label: "Status",
  },
];

export default function AllocationTable({
  allocations,
}) {
  function getStatus(utilization) {
    if (utilization >= 100) {
      return "Allocated";
    }

    if (utilization >= 80) {
      return "Partial";
    }

    return "Available";
  }

  return (
    <Table headers={headers}>
      {allocations.map((allocation) => (
        <tr key={allocation.id}>
          <td>{allocation.employee}</td>

          <td>{allocation.project}</td>

          <td>{allocation.allocation}%</td>

          <td>{allocation.utilization}%</td>

          <td>{allocation.remaining}%</td>

          <td>
            <Badge
              status={getStatus(allocation.utilization)}
            />
          </td>
        </tr>
      ))}
    </Table>
  );
}