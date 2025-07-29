import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { fetchProductById } from "../../store/product-slice";

function OrderSummary() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = (itemsArray) => {
    return itemsArray.reduce(
      (sum, prod) => sum + prod.price * prod.quantity,
      0
    );
  };

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    async function fetchDetails() {
      if (Array.isArray(cartItems) && cartItems.length > 0) {
        const results = [];
        for (const item of cartItems) {
          try {
            console.log("Fetching product for cart item:", item);
            const productId = item.product;
            const action = await dispatch(fetchProductById(productId));
            const prod = unwrapResult(action);
            results.push({
              ...prod,
              quantity: item.quantity,
              size: item.size,
            });
          } catch (err) {
            console.error("Error fetching product details:", err);
          }
        }
        setCartProducts(results);
      } else {
        setCartProducts([]);
      }
    }
    fetchDetails();
  }, [cartItems, dispatch]);


  return (
    <div
      style={{
        background: "#fff", // changed to white
        borderRadius: 12,
        padding: 18,
        width: "min(400px, 95vw)",
        minWidth: 180,
        maxWidth: 520,
        boxSizing: "border-box",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: "#000" }}>
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
        {cartProducts.map((prod) => (
          <div
            key={prod._id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: 0,
            }}
          >
            <img
              src={prod.images[0]}
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
              <div style={{ fontWeight: 600, fontSize: 13, color: "#000" }}>{prod.name}</div>
              {prod.size && (
                <div style={{ fontSize: 11, color: "#444", marginTop: 1 }}>
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
                <span style={{ fontWeight: 700, fontSize: 13, color: "#000" }}>
                  ₹{prod.price}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: "#444",
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
          color: "#000"
        }}
      >
        <span>Total</span>
        <span>₹{total(cartProducts)}</span>
      </div>
    </div>
  );
}
export default OrderSummary;
