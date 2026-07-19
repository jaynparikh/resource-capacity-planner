import "./SearchBox.css";

export default function SearchBox({
  placeholder,
  value,
  onChange,
}) {
  return (
    <input
      className="search-box"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}