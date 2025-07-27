import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import SideBar from "./sidebar";

const COLLAPSED_WIDTH = 56;
const EXPANDED_WIDTH = 240;

function UserLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
      {/* Sticky Header */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, width: "100vw", overflowX: "hidden" }}>
        <Header />
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0, height: "100vh", overflowX: "hidden" }}>
        {/* Sticky Sidebar */}
        <div
          style={{
            position: "fixed",
            top: 55,
            left: 0,
            bottom: 0,
            width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
            minWidth: collapsed ? COLLAPSED_WIDTH : 200,
            background: "#f5f5f5",
            transition: "width 0.2s",
            overflow: "hidden",
            borderRight: "1px solid #eee",
            zIndex: 99,
            height: "calc(100vh - 55px)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Collapse/Expand Button */}
          <button
            onClick={() => setCollapsed((v) => !v)}
            style={{
              position: "absolute",
              top: 10,
              right: collapsed ? "auto" : 10,
              left: collapsed ? 10 : "auto",
              background: "transparent",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              zIndex: 2,
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none", // Disable focus outline
              boxShadow: "none", // Remove any box-shadow on focus
            }}
            tabIndex={-1} // Prevent focus via tab
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <span>
                <div style={{ width: 20, height: 2, background: "#c93939c8", margin: "3px 0" }} />
                <div style={{ width: 20, height: 2, background: "#c93939c8", margin: "3px 0" }} />
                <div style={{ width: 20, height: 2, background: "#c93939c8", margin: "3px 0" }} />
              </span>
            ) : (
              <span style={{ fontSize: 24, color: "#c93939c8" }}>×</span>
            )}
          </button>

          {collapsed ? (
            <div style={{ flex: 1 }} />
          ) : (
            <div style={{ flex: 1, overflowY: "auto", marginTop: 48 }}>
              <SideBar />
            </div>
          )}
        </div>

        {/* Main Content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            position: "relative",
            marginLeft: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
            marginTop: 55,
            height: "calc(100vh - 55px)",
            overflowY: "auto",
            overflowX: "hidden",
            transition: "margin-left 0.2s",
            background: "#fff",
          }}
        >
          <div style={{ minHeight: "100%", padding: 0, boxSizing: "border-box" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLayout;
