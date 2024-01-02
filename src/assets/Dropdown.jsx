const Dropdown = ({ options, value, onChange, placeholder }) => {
  return (
    <div className="dropdown">
      <select value={value} onChange={onChange} className="dropbtn">
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
