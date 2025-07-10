import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        background: "#fff",
        borderRadius: 999,
        boxShadow: "inset 0 2px 8px rgba(0,0,0,0.18), 0 1.5px 6px rgba(0,0,0,0.06)",
        padding: "6px 18px",
        minWidth: 360,
        transition: "box-shadow 0.2s",
      }}
    >
      <FiSearch
        size={20}
        color={active ? "#c93939c8" : "#888"}
        style={{ marginRight: 8, cursor: "pointer", transition: "color 0.2s" }}
      />
      <input
        type="text"
        placeholder="Search for a product"
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={{
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: 16,
          width: "100%",
          color: "#222",
          fontWeight: 500,
          padding: 0,
        }}
      />
    </div>
  );
};

export default SearchBar;
