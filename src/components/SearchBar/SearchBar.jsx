import { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => setValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") return;
    onSubmit(value);
    setValue("");
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          placeholder="Search images..."
          value={value}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
