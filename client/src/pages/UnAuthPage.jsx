import React from "react";
import { Link } from "react-router-dom";

const UnAuthPage = () => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
    <h1>Unauthorized</h1>
    <p>You are not authorized to view this page.</p>
    <Link to="/login" style={{ marginTop: 16, color: "#1976d2", textDecoration: "underline" }}>
      Go to Login
    </Link>
  </div>
);

export default UnAuthPage;
