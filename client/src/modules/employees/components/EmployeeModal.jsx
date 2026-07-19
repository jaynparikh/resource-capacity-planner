import "./EmployeeModal.css";

export default function EmployeeModal({
  isOpen,
  onClose,
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>Add Employee</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="modal-body">
          {children}
        </div>

      </div>
    </div>
  );
}