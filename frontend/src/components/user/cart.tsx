import React from "react";
import CartContents from "./cart-contents";
import { useNavigate } from "react-router-dom";

interface CartProps {
  onClose: () => void;
  children?: React.ReactNode;
}

const Cart: React.FC<CartProps> = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: 360,
        height: "100%",
        background: "#fff",
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.10)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: 24,
      }}
    >
      {/* Top Bar */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
        <span style={{ fontWeight: 700, fontSize: 24 }}>Your Cart</span>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 30,
            right: 16,
            background: "transparent",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "#000",
            fontWeight: 700,
            lineHeight: 1,
          }}
          aria-label="Close cart"
        >
          ×
        </button>
      </div>
      {/* Cart Contents */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <CartContents />
      </div>
      {/* Checkout Button */}
      <button
        style={{
          width: "100%",
          background: "#000",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          border: "none",
          borderRadius: 8,
          padding: "10px 0",
          marginTop: 24,
          cursor: "pointer",
        }}
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </button>
    </div>
  );
};

export default Cart;