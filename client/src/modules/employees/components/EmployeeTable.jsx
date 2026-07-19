import Badge from "../../../components/ui/Badge/Badge";
import Table from "../../../components/ui/Table/Table";

const headers = [
  {
    key: "name",
    label: "Name",
    sortable: true,
  },
  {
    key: "role",
    label: "Role",
    sortable: true,
  },
  {
    key: "skill",
    label: "Primary Skill",
    sortable: true,
  },
  {
    key: "capacity",
    label: "Capacity",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
  },
];

export default function EmployeeTable({
  employees,
  onHeaderClick,
  sortColumn,
  sortDirection,
}) {
  return (
    <Table
      headers={headers}
      onHeaderClick={onHeaderClick}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
    >
      {employees.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.name}</td>
          <td>{employee.role}</td>
          <td>{employee.skill}</td>
          <td>{employee.capacity}%</td>
          <td>
            <Badge status={employee.status} />
          </td>
        </tr>
      ))}
    </Table>
  );
}