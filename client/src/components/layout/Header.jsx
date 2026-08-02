export default function Header() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="top-header">
      <div>
        <h2 className="header-title">Resource Capacity Planner</h2>
        <p className="header-date">{today}</p>
      </div>

      <div className="header-right">
        <button className="icon-button">🔔</button>

        <div className="user-profile">
          <div className="avatar">JP</div>

          <div>
            <div className="user-name">Jay Parikh</div>
            <div className="user-role">Project Manager</div>
          </div>
        </div>
      </div>
    </header>
  );
}