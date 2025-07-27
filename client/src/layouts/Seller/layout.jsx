import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

function SellerLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <div style={{ display: "flex"}}>
        <Sidebar />
        <main
          style={{
            background: "#f8f8f8",
            minHeight: "100vh",
            minWidth: "100vw",
            marginLeft: 220,
            padding: "32px",
            paddingTop: "92px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SellerLayout;
