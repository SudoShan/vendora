import React from "react";

function OrderSummary({ products }) {
  const items = products;

  const total = items.reduce(
    (sum, prod) => sum + prod.price * prod.quantity,
    0
  );

  return (
    <div
      style={{
        background: "#f7f7f9",
        borderRadius: 12,
        padding: 18,
        width: "min(340px, 95vw)",
        minWidth: 180,
        maxWidth: 360,
        boxSizing: "border-box",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
        Order Summary
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 80,
          maxHeight: 260,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {items.map((prod) => (
          <div
            key={prod.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: 0,
            }}
          >
            <img
              src={prod.image}
              alt={prod.name}
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                objectFit: "cover",
                background: "#eee",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{prod.name}</div>
              {prod.size && (
                <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>
                  Size {prod.size}
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 2,
                  gap: 8,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 13 }}>
                  ₹{prod.price}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#888",
                    marginLeft: 6,
                  }}
                >
                  × {prod.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid #e0e0e0",
          marginTop: 8,
          paddingTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 700,
          fontSize: 15,
        }}
      >
        <span>Total</span>
        <span>₹{total}</span>
      </div>
    </div>
  );
}

export default OrderSummary;
