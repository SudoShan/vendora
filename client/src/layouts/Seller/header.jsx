import React from "react";

function Header() {
  return (
    <nav
      style={{
        width: "100vw",
        height: 60,
        position: "fixed",
        top: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        zIndex: 100,
      }}
    >
      <span
        style={{
          fontSize: 32,
          fontWeight: 700,
          color: "#c93939c8",
          letterSpacing: 2,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        Vendora
      </span>
    </nav>
  );
}

export default Header;
