import React from "react";
import CartContents from "./cart-contents";
import { useNavigate } from "react-router-dom";

const Cart = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: 360,
        height: "100vh",
        background: "#fff",
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
        position: "fixed",
        top: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        padding: "16px 32px", 
        zIndex: 1001,
        maxHeight: "100vh",
        paddingTop: 24,
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 24,
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            fontWeight: 800,
            fontSize: 26,
            color: "#222",
            letterSpacing: 1,
          }}
        >
          Your Cart
        </span>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: 28,
            cursor: "pointer",
            color: "#222",
            fontWeight: 700,
            lineHeight: 1,
            outline: "none",
            boxShadow: "none",
            transition: "color 0.2s",
            padding: 0,
          }}
          tabIndex={-1}
          aria-label="Close cart"
        >
          ×
        </button>
      </div>

      {/* Cart Contents */}
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 16 }}>
        <CartContents />
      </div>

      {/* Checkout Button */}
      <button
        style={{
          width: "100%",
          background: "linear-gradient(90deg, #c93939 30%, orange 100%)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          border: "none",
          borderRadius: 8,
          padding: "12px 0",
          marginTop: 12,
          cursor: "pointer",
          outline: "none",
          boxShadow: "none",
          transition: "background 0.2s",
          marginBottom: 50,
        }}
        tabIndex={-1}
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;
