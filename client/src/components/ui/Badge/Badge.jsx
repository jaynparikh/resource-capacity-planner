import "./Badge.css";

export default function Badge({ status }) {
  const className = `badge ${status.toLowerCase()}`;

  return (
    <span className={className}>
      {status}
    </span>
  );
}