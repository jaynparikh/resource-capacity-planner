import "./Table.css";

export default function Table({
  headers,
  children,
  onHeaderClick,
  sortColumn,
  sortDirection,
}) {
  return (
    <table className="app-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header.key}
              onClick={() => header.sortable && onHeaderClick(header.key)}
              className={header.sortable ? "sortable-header" : ""}
            >
              {header.label}

              {sortColumn === header.key &&
                (sortDirection === "asc" ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
}