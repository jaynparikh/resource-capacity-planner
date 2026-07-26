import Badge from "../../../components/ui/Badge/Badge";
import Table from "../../../components/ui/Table/Table";

const headers = [
  {
    key: "name",
    label: "Project Name",
    sortable: true,
  },
  {
    key: "client",
    label: "Client",
    sortable: true,
  },
  {
    key: "manager",
    label: "Project Manager",
    sortable: true,
  },
  {
    key: "teamSize",
    label: "Team Size",
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

export default function ProjectTable({
  projects,
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
      {projects.map((project) => (
        <tr key={project.id}>
          <td>{project.name}</td>
          <td>{project.client}</td>
          <td>{project.manager}</td>
          <td>{project.teamSize}</td>

          <td>
            <Badge status={project.status} />
          </td>

          <td className="actions-cell">
            <button
              className="edit-btn"
              onClick={() => onEdit(project)}
            >
              ✏️
            </button>

            <button
              className="delete-btn"
              onClick={() => onDelete(project.id)}
            >
              🗑
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
}