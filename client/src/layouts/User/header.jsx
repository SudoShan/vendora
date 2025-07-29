import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../../components/common/search-bar";
import Cart from "../../components/user/cart";
import { FiShoppingCart, FiPackage, FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth-slice";

const navItems = [
  { label: "Deals", path: "/shop/deals", pill: true },
  { label: "Explore", path: "/shop/explore", pill: true },
];

const inactiveStyle = {
  color: "#000",
  textDecoration: "none",
  padding: "6px 18px",
  borderRadius: 999,
  fontWeight: 600,
  fontSize: 14,
};

const activeStyle = {
  background: "#c93939c8",
  color: "#fff",
  borderRadius: 999,
  padding: "6px 18px",
  fontWeight: 600,
  fontSize: 14,
};

function Header({ cartCount = 0 }) {
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 55,
          padding: "0 32px",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#c93939c8",
            letterSpacing: 1,
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Vendora
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <SearchBar />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              style={({ isActive }) =>
                isActive && item.pill ? activeStyle : inactiveStyle
              }
            >
              {item.label}
            </NavLink>
          ))}

          <NavLink
            to="orders"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: 8,
            }}
          >
            <FiPackage size={22} color="#000" />
          </NavLink>

          <span
            style={{
              position: "relative",
              marginLeft: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => setCartOpen(true)}
          >
            <FiShoppingCart size={22} color="#000" />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  background: "#c93939c8",
                  color: "#fff",
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 700,
                  minWidth: 18,
                  height: 18,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 5px",
                  boxSizing: "border-box",
                  border: "2px solid #fff",
                }}
              >
                {cartCount}
              </span>
            )}
          </span>
          {/* Logout Icon */}
          <span
            style={{
              marginLeft: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={handleLogout}
            title="Logout"
          >
            <FiLogOut size={22} color="#000" />
          </span>
        </div>
      </nav>

      {cartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100vh",
            width: "100vw",
            zIndex: 1000,
            background: "rgba(0,0,0,0.10)",
            display: "flex",
            alignItems: "stretch",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: 360,
              background: "transparent",
              transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
              transform: cartOpen ? "translateX(0)" : "translateX(100%)",
              position: "absolute",
              top: 0,
              right: 0,
              willChange: "transform",
            }}
          >
            <Cart onClose={() => setCartOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
