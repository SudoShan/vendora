import Header from "./header";
import SideBar from "./sidebar";
import { Outlet } from "react-router-dom";
import React from "react";

const SellerLayout: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        overscrollBehaviorX: "none", // Prevent horizontal scroll on overscroll
      }}
    >
      {/* Sticky Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          width: "100vw",
          overflowX: "hidden", // Prevent horizontal scroll on header
        }}
      >
        <Header />
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          height: "100vh",
          overflowX: "hidden", // Prevent horizontal scroll on main flex
        }}
      >
        {/* Sticky Sidebar */}
        <div
          style={{
            position: "fixed",
            top: 55, // height of header
            left: 0,
            bottom: 0,
            width: 240,
            minWidth: 200,
            background: "#f5f5f5",
            transition: "width 0.2s",
            overflow: "hidden",
            borderRight: "1px solid #eee",
            zIndex: 99,
            height: "calc(100vh - 55px)",
          }}
        >
          <SideBar />
        </div>
        {/* Main Content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            position: "relative",
            marginLeft: 240,
            marginTop: 55, // height of header
            height: "calc(100vh - 55px)",
            overflowY: "auto",
            overflowX: "hidden", // Prevent horizontal scroll in content
            transition: "margin-left 0.2s",
            background: "#fff",
          }}
        >
          <div style={{ minHeight: "100%", boxSizing: "border-box", padding: 0 }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;

