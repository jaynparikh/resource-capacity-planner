import Badge from "../../../components/ui/Badge/Badge";
import Table from "../../../components/ui/Table/Table";

const headers = [
  {
    key: "name",
    label: "Employee",
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
    label: "Max Capacity",
    sortable: true,
  },
  {
    key: "status",
    label: "Status",
    sortable: true,
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },
];

export default function EmployeeTable({
  employees,
  onHeaderClick,
  sortColumn,
  sortDirection,
  onEdit,
  onDelete,
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

          <td className="actions-cell">
            <button
              className="edit-btn"
              onClick={() => onEdit(employee)}
            >
              ✏️
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(employee.id)}
            >
              🗑
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
}