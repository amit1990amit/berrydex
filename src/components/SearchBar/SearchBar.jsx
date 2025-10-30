import React from "react";
import "./SearchBar.css";

const SearchBar = ({ value = "", onChange }) => {
  return (
    <div className="searchBar">
      <input
        className="searchBar__input"
        type="text"
        placeholder="Search by name"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        aria-label="Search berries by name"
      />
      <div className="searchBar__icon" aria-hidden>
        🔎
      </div>
    </div>
  );
};

export default SearchBar;
