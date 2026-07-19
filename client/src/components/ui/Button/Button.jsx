import "./Button.css";

export default function Button({ children, onClick }) {
  return (
    <button
      className="primary-btn"
      onClick={onClick}
    >
      {children}
    </button>
  );
}