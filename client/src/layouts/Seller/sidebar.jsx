import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiBox, FiPlusSquare, FiClipboard, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/auth-slice";


const navItems = [
  {
    label: "My products",
    path: "/seller/products",
    icon: <FiBox size={22} style={{ marginRight: 12 }} />,
  },
  {
    label: "Add new product",
    path: "/seller/product/new",
    icon: <FiPlusSquare size={22} style={{ marginRight: 12 }} />,
  },
  {
    label: "Orders",
    path: "/seller/orders",
    icon: <FiClipboard size={22} style={{ marginRight: 12 }} />,
  },
];

const activeStyle = {
  background: "#c93939c8",
  color: "#fff",
  borderRadius: 10,
  fontWeight: 600,
};

const inactiveStyle = {
  background: "transparent",
  color: "#222",
  borderRadius: 10,
  fontWeight: 500,
};

function Sidebar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
        navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <aside
      style={{
        position: "fixed",
        left: 0,
        top: "30px", 
        width: 220,
        height: "calc(100vh - 60px)",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "32px 0 24px 0",
        zIndex: 99,
      }}
    >
      <nav>
        <ul style={{ listStyle: "none", padding: "0 10px", margin: 0 }}>
          {navItems.map((item) => (
            <li key={item.path} style={{ marginBottom: 8 }}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 12px",
                  textDecoration: "none",
                  fontSize: 16,
                  ...(isActive ? activeStyle : inactiveStyle),
                  transition: "background 0.2s, color 0.2s",
                })}
              >
                {item.icon}
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={() => dispatch(logoutUser())}
        style={{
          width: "calc(100% - 32px)",
          margin: "0 16px",
          marginBottom: 16,
          padding: "12px 0",
          background: "#f2f2f2",
          color: "#c93939",
          border: "none",
          borderRadius: 10,
          fontWeight: 700,
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          cursor: "pointer",
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = "#c93939";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = "#f2f2f2";
          e.currentTarget.style.color = "#c93939";
        }}
      >
        <FiLogOut size={20} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
